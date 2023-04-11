/**
 * 跳转点餐应用
 * v22.12.09
 */

import { useSessionStore } from '@/store'
import { $router         } from '@/router'
import { app_config      } from '@/config'
import { $il8n           } from '@/locale'

interface AttachConfig {
    distance  ?: string
    address_id?: string
    address   ?: string
}

type EatinMode = { url: string }
type TaketoutOrTakeoutexMode = { BranchID: string; TableID: string; OrderID?: string; attach?: AttachConfig }

export async function getTakeoutUrl(params: TaketoutOrTakeoutexMode | EatinMode) {
    // 取得小程序登录凭证
    const sessionStore = useSessionStore()
    const code  = await sessionStore.getLoginCode()
    if ( !code ) return

    const appid    = app_config.app_id
    const time     = Date.now()
    const lang     = $il8n.global.locale.value || 'zh-CN'
    const debug    = false // 开启本地调试

    // 堂食模式
    let url = ''
    if ('url' in params) {
        url = params.url
    } else {
        // 目标页面
        const target_page = params.OrderID ? `order/${ params.OrderID }` : 'menu'
        if (debug) { // 本地联调模式
            url = `http://192.168.2.178:5173/mn/${ params.BranchID }/${ params.TableID }/${ target_page }`
        } else { // 目标服务器模式
            url = `${ app_config.host }/${ app_config.company_id }/mn/${ params.BranchID }/${ params.TableID }/${ target_page }`
        }
    }

    // query 参数
    const obj: Record<string, any> = {
        code,
        appid,
        time,
        attach: { lang, ...('attach' in params ? params.attach : {}) },
    }

    if (process.env.NODE_ENV === 'development') {
        if (!debug || 'url' in params) {
            obj.app_base = 'https://app.jzzp.vip/mb/member-next/'
            obj.reload   = true
        } else {
            obj.app_id   = app_config.app_id
            obj.user_id  = sessionStore.openid
            obj.app_type = 'wxapp'
            obj.pay_type = 'wxpay'
        }
    }

    return encodeURIComponent(url + $router.objToQuery(obj, { encode: true }))
}

export async function toTakeoutApp(params: TaketoutOrTakeoutexMode | EatinMode) {
    const url = await getTakeoutUrl(params)
    if ( !url ) return

    // 跳转网页点餐
    $router.push({
        path : 'common/webview/',
        query: { url },
    })
}
