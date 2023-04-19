
/** 路由操作类型 */
export type RouterRawType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack'

/** 路由 query */
export type RouterQuery = Record<string, string | number | boolean>

/** 路由函数传餐对象形式 */
export interface RouterBaseOption {
    path      : string
    query    ?: RouterQuery
    success  ?: (res: any) => void
    fail     ?: (res: any) => void
    complete ?: (res: any) => void
}

/** Tabbar 路由参数 */
export type RouterTabBarOption = string | RouterBaseOption

/** 重置 路由参数 */
export type RouterRelaunchOption = string |  RouterBaseOption

/** 替换 路由参数 */
export type RouterReplaceOption = string | RouterBaseOption

/** 新开 路由参数 */
export type RouterPushOption = string | RouterBaseOption & { events?: UniApp.NavigateToOptions['events'] }

/** 后退 路由参数对象形式 */
export type RouterBackBaseOptions = Omit<RouterBaseOption, 'path' | 'query'> & { delta: number }

/** 返回 路由参数 */
export type RouterBackOptions = number | RouterBackBaseOptions

/** 规范化后的参数 */
export type NormalRouterOption =
        RouterBaseOption & { url: string }
        |   RouterBaseOption & { url: string; events?: UniApp.NavigateToOptions['events'] }
        |   RouterBackBaseOptions

export type RouterOption =
        RouterTabBarOption
        |   RouterRelaunchOption
        |   RouterReplaceOption
        |   RouterPushOption
        |   RouterBackBaseOptions

/** 守卫函数的参数 */
export type RouterBeforeEachNextOptions =
        string
        |   boolean
        |   { path: string; query?: RouterQuery; replace?: boolean; reLaunch?: boolean }

/** 前置守卫 */
export type RouterBeforeEachHandle = (
    to   : { path: string; query?: RouterQuery },
    from : {},
    next : (result?: RouterBeforeEachNextOptions) => void,
) => void

/** 路由构造器配置 */
export interface RouterConstructorConfig {
    /** tabbar 页面 */ tab_bars   ?: string[]
    /** 首页路径    */ home_path  ?: string
    /** 路径前缀    */ path_prefix?: string
    /** 路径后缀    */ path_suffix?: string
    /** 打印路径    */ print_url  ?: boolean
}
