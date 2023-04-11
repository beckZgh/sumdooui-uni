// 生成 api 接口 v22.06.14

import { app_config } from '@/config'
import { $http      } from './http'
import   api_schema   from './api'

const urlPrefix = app_config.url

interface IApiSchema { [key: string] : IApiSchema | [string, string] }
interface IApiRecord { [key: string] : IApiRecord | IApiAction       }
type IApiAction = (params: Record<string, any>, config: Record<string, any>) => any

/** 生成 action */
function makeApiAction(url: string): IApiAction {
    return (params: Record<string, any>, config: Record<string, any>) => {
        return $http.post(url, params, config)
    }
}

/** 生成 api 接口 */
function initApiSchema(schema: IApiSchema): IApiRecord {
    const api: IApiRecord = {}

    Object.keys(schema).forEach((k) => {
        const val = schema[k]
        if (Array.isArray(val)) {
            const act = val[1] ? `&act=${ val[1] }` : ''
            const url = `${ urlPrefix }?api=${ val[0] }${ act }`
            api[k] = makeApiAction(url)
        } else if (typeof val === 'object') {
            api[k] = initApiSchema(val)
        }
    })

    return api
}

export * from './http'
export default initApiSchema(api_schema)
