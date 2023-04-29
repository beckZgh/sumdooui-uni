import * as is from './is'
import * as dt from './dt'
import { sleep } from './sleep'

/** 转换单位 */
function toUnit(val: string | number | undefined, unit = 'rpx') {
    return is.isNumber(val) ? `${ val }${ unit }` : val
}

/** 通过路径获取对应值 */
function getValueByPath(model: any, key_path: string): any {
    try {
        // 非对象和数组不处理
        if (!is.isObject(model) && !is.isArray(model)) return undefined

        // 提取 path 路径的值
        return key_path.split('.').reduce((map, key) => {
            return (map as any)[key]
        }, model)
    } catch (error) {
        return undefined
    }
}

export function getCurrentPage<T>() {
    const pages = getCurrentPages()
    return pages[pages.length - 1] as T & Page.PageInstance
}

export default {
    ...is,
    dt,
    toUnit,
    getValueByPath,
    getCurrentPage,
    sleep,
}
