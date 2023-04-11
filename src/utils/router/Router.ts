import Utils from '../index'

import type {
    NormalRouterOption,
    RouterBackBaseOptions,
    RouterBackOptions,
    RouterBeforeEachHandle,
    RouterBeforeEachNextOptions,
    RouterConstructorConfig,
    RouterBaseOption,
    RouterOption,
    RouterPushOption,
    RouterRawType,
    RouterRelaunchOption,
    RouterReplaceOption,
    RouterTabBarOption,
} from './types'

export class Router {
    private beforeEachHandle: RouterBeforeEachHandle | null // 路由导航前守卫

    private tab_bars    : string[]  // tab 页面
    private home_path   : string    // 首页路径
    private path_prefix : string    // 路径不以 “/” 开头的前缀
    private path_suffix : string    // 路径后缀
    private print_url   : boolean   // 打印导航日志

    public static create(config?: RouterConstructorConfig) {
        return new Router(config)
    }

    public constructor(config?: RouterConstructorConfig) {
        this.beforeEachHandle = null
        this.print_url        = config?.print_url ?? false
        this.path_prefix      = config?.path_prefix ? config.path_prefix.replace(/(\/|\\)/g, '') : 'pages'
        this.path_suffix      = config?.path_suffix ? config.path_suffix.replace(/(\/|\\)/g, '') : 'main'
        this.home_path        = this.normalPath(config?.home_path ?? '')
        this.tab_bars         = this.getTabBars(config?.tab_bars || [])
    }

    /** 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 */
    public tabBar(opt: RouterTabBarOption) {
        const path = typeof opt === 'string' ? opt : opt.path
        if ( !this.isTabbarPath(path) ) return

        return this.run('switchTab', opt)
    }

    /** 关闭所有页面，打开到应用内的某个页面 */
    public reLaunch(opt: RouterRelaunchOption) {
        return this.run('reLaunch', opt)
    }

    /** 关闭所有页面，重置到首页 */
    public home(opt?: { reLaunch?: boolean; replace?: boolean }) {
        if (!this.home_path) return

        if (this.isTabbarPath(this.home_path)) {
            this.tabBar(this.home_path)
        } else if (opt && opt.reLaunch) {
            return this.reLaunch(this.home_path)
        } else if (opt && opt.replace) {
            return this.reLaunch(this.home_path)
        } else {
            return this.push(this.home_path)
        }
    }

    /** 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面 */
    public push(opt: RouterPushOption) {
        const path = Utils.isString(opt) ? opt : opt.path

        if (this.isTabbarPath(path)) {
            return this.tabBar(opt)
        } else {
            return this.run('navigateTo', opt)
        }
    }

    /** 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面 */
    public replace(opt: RouterReplaceOption) {
        const path = Utils.isString(opt) ? opt : opt.path

        if (this.isTabbarPath(path)) {
            return this.tabBar(opt)
        } else {
            return this.run('redirectTo', opt)
        }
    }

    /** 关闭当前页面，返回上一页面或多级页面 */
    public back = (opt: RouterBackOptions = 1) => {
        const page_paths = [...getCurrentPages()].map(item => item.route || '') || []

        let delta  = Utils.isNumber(opt) ? opt : opt.delta
        delta  = delta > page_paths.length ? page_paths.length - 1 : delta
        const path = page_paths[page_paths.length - (delta + 1)] || ''

        return this.run('navigateBack', { ...(Utils.isObject(opt) ? opt : {}), path, delta })
    }

    /** 前置守卫 */
    public beforeEach(fn: RouterBeforeEachHandle) {
        this.beforeEachHandle = fn
    }

    /** 获取所有页面 */
    public getPages() {
        return getCurrentPages() || []
    }

    /** 获取当前页面 */
    public getCurrentPage() {
        const pages = this.getPages()
        return pages[pages.length - 1]
    }

    /** 获取当前页面路径 */
    public getCurrentPagePath() {
        const page  = this.getCurrentPage()
        return page ? (page.route || '') : ''
    }

    /** 是否 tab 页面路径 */
    public isTabbarPath(page_path: string) {
        return this.tab_bars.includes(this.normalPath(page_path))
    }

    /** 是否插件路径 */
    public isPluginPath(page_path: string) {
        return page_path.startsWith('plugin://')
    }

    /** 是否相对根目录下的绝对路径 */
    public isAbsolutePath(page_path: string) {
        return page_path.startsWith(this.getRootPath())
    }

    /** 是否相对路径 */
    public isRelativePath(page_path: string) {
        return page_path.startsWith('./')
    }

    /** 规范路由路径 */
    public normalPath(page_path: string) {
        if (!page_path) return ''

        if (this.isPluginPath  (page_path)) return page_path
        if (this.isAbsolutePath(page_path)) return page_path
        if (this.isRelativePath(page_path)) {
            // 获取当前页面路径目录
            let curr_page_path = this.getCurrentPagePath()
            curr_page_path = curr_page_path.slice(0, curr_page_path.lastIndexOf('/')) // pages/route/main => pages/route

            // 补充子页面默认文件名
            let sub_page_path = page_path.slice(1) // ./test => /test
            if (sub_page_path.endsWith('/')) {
                sub_page_path += this.path_suffix
            }

            // 拼接最终跳转路径
            return `/${ curr_page_path }${ sub_page_path }`
        }

        page_path = page_path.startsWith('/') ? page_path.slice(1) : page_path
        if (page_path.endsWith('/')) {
            page_path += this.path_suffix
        }

        return `${ this.getRootPath() }/${ page_path }`
    }

    /** 规范路由参数 */
    private normalOption(opt: RouterOption, type: RouterRawType): NormalRouterOption  {
        // 页面回退
        if (type === 'navigateBack') {
            return {
                delta: (opt as RouterBackBaseOptions).delta,
                path : (opt as RouterBaseOption).path,
                query: {},
            }
        }

        // 跳转页面参数
        const option: { url: string; path: string; query: any; events?: any } = {
            url  : '',
            path : '', // 跳转路径
            query: {}, // 携带 query 参数
        }

        /**
         * 页面间事件通信通道
         * https://developers.weixin.qq.com/miniprogram/dev/api/route/EventChannel.html
         */
        if (type === 'navigateTo') {
            option.events = (Utils.isObject(opt) && 'events' in opt) ? opt.events : undefined
        }

        // 传入字符串
        if (Utils.isString(opt)) {
            const idx = opt.indexOf('?')
            if (idx !== -1) {
                const path   = opt.slice(0, idx)
                const query  = opt.slice(idx)
                option.path  = this.normalPath(path)  // 规范路径
                option.query = this.queryToObj(query) // queryString 转换成对象
                option.url   = `${ option.path }${ query }`
            } else {
                option.url = option.path = this.normalPath(opt) // 规范路径
            }

        // 传入对象
        } else if (Utils.isObject(opt) && 'path' in opt) {
            option.path  = this.normalPath(opt.path) // 规范路径
            option.query = opt.query || {}           // 对象无需处理
            option.url   = `${ option.path }${ this.objToQuery(option.query) }`
        }

        return option
    }

    /**
     * query 转对象
     * - 不自动处理编码、解码的过程，仅是将字符串转换成对象形式
    */
    queryToObj(query: string) {
        const obj: Record<string, string | boolean> = {}
        if (!query) return obj
        if ( query.startsWith('?') ) query = query.slice(1)

        query.split('&').forEach((q) => {
            if (!q) return

            const [key, val] = q.split('=')
            if (key) {
                obj[key] = val !== undefined ? val : true
            }
        })

        return obj
    }

    /** 对象转 query */
    objToQuery(obj: Record<string, any>, option?: { encode?: boolean; prefix?: boolean }) {
        // 编码
        const encode = (obj: any) => {
            try {
                if (typeof obj === 'object') {
                    obj = JSON.stringify(obj)
                }
            } catch (error) {}
            return option?.encode ? encodeURIComponent(`${ obj }`) : `${ obj }`
        }

        // 转换成字符串
        const query = Object.keys(obj).map((key) => {
            if (typeof obj[key] === 'boolean') {
                return obj[key] === true ? key : ''
            } else {
                return `${ key }=${ encode(obj[key]) }`
            }
        }).filter(s => !!s).join('&')

        const prefix = option?.prefix !== false ? '?' : ''
        return query ? `${ prefix }${ query }` : ''
    }

    /** 处理路由跳转 */
    private run(type: RouterRawType, opt: RouterOption): Promise<boolean> {
        return new Promise((resolve) => {
            const option = this.normalOption(opt, type)
            const path   = (option as RouterBaseOption).path
            const query  = (option as RouterBaseOption).query

            // 跳转页面
            const toPage = (option: any) => {
                uni[type]({
                    ...option,
                    success: () => {
                        // 打印输出
                        this.log(`结束导航：${ path }`)
                        resolve(true)
                    },
                    fail: (err: any) => {
                        try {
                            this.log(`导航失败${ path }: ${ JSON.stringify(err) }`)
                        } catch (error) {}
                        resolve(false)
                    },
                })
            }

            if (!Utils.isFunction(this.beforeEachHandle)) {
                toPage(option)
            } else {
                // 执行路由导航前置守卫
                this.beforeEachHandle({ path, query }, {}, (payload?: RouterBeforeEachNextOptions) => {
                    // 允许往下执行
                    if (payload === undefined || payload === true) {
                        // 打印输出
                        this.log(`\n开始导航：${ path }`)

                        Reflect.deleteProperty(option, 'path')
                        toPage(option)
                        return
                    }

                    // 中断跳转
                    if (payload === false) {
                        resolve(false)
                        return
                    }

                    // 跳转新页面
                    if (Utils.isString(payload)) {
                        this.push(payload)
                        resolve(false)
                        return
                    }

                    // 跳转到指定页面
                    if (payload.reLaunch) {
                        resolve(false)
                        this.reLaunch({ path: payload.path, query: payload.query || {} })
                    } else if (payload.replace) {
                        resolve(false)
                        this.replace({ path: payload.path, query: payload.query || {} })
                    } else {
                        resolve(false)
                        this.push({ path: payload.path, query: payload.query || {} })
                    }
                })
            }
        })
    }

    /** 输出日志  */
    private log(msg: string) {
        if (this.print_url === true) {
            console.warn(`${ msg }`)
        }
    }

    /** 根目录路径 */
    private getRootPath() {
        return `/${ this.path_prefix }`
    }

    /** 初始化 tabs */
    private getTabBars(tab_tabs: string[]) {
        return tab_tabs.map(tab_path => this.normalPath(tab_path))
    }
}
