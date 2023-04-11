import { Axios      } from '@/utils/request'
import { app_config } from '@/config'
import { useAppStore, useSessionStore } from '@/store'

export const $http = Axios.create({
    baseURL    : app_config.host || '',
    showLoading: false,
    showError  : true,

    transformRequest(config)  {
        const sessionStore = useSessionStore()
        const UserID       = config.data.UserID

        // header 字段
        config.header.CompanyID  = app_config.company_id
        config.header.company_id = app_config.company_id
        config.header.extid      = app_config.extid
        config.header.openid     = sessionStore.openid
        config.header.userid     = UserID || sessionStore.openid

        // 当前请求参数
        config.data.CompanyID    = app_config.company_id
        config.data.company_id   = app_config.company_id
        config.data.UserID       = UserID || sessionStore.openid
        config.data.user_id      = UserID || sessionStore.openid
    },

    transformResponse(res) {
        if ($utils.isObject(res.data) && 'ok' in res.data && res.data.ok) {
            useAppStore().updateServerTime(res.data.server_time as number)
        }

        // 异构其他 API 返回格式
        if ($utils.isObject(res.data) && 'result' in res.data) {
            res.data.data = res.data.result
            res.data.ok   = res.data.status === 0
        }
    },
})
