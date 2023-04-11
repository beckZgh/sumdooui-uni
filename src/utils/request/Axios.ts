import Utils from '../index'

import {
    errorMsg,
    hideLoading,
    showLoading,
} from '../notification'

import type {
    AxiosConstructorConfig,
    AxiosDownloadConfig,
    AxiosRequestConfig,
    AxiosRequestResult,
    AxiosTransformRequest,
    AxiosTransformResponse,
    AxiosUploadConfig,
} from './types'

/**
 * 1. 支持配置全局 Loading、全局 error 开关
 * 5. 取消请求
 * 6. 转换请求数据和响应数据
 * 7. 支持上传文件
 * 7. 支持下载文件
 * 8. 支持 Promise API
 *
 *  待处理
 *  * 2. 支持自动取消重复请求、完全相同的接口在上一个 pending 状态下，自动取消下一个请求
 *      - 取消 A 请求，只发送 B 请求（存在的问题是，A 请求可能已发送并被处理）
 *      - 取消 B 请求，只发送 A 请求（结合实际业务需求，目前采用该方案）
 *          - 当 A 请求处于 pending 状态时，后发相同的请求将全部取消，实际只发送 A 请求
 *      - 取消 B 请求，只发送 A 请求，将 A 请求的结果作为 B 请求的返回结果（实现具有一定的复杂度）
 * 3. 支持请求失败自动重试，接口请求后台异常时，自动重新发起多次请求，直到达到所设次数
 * 4. 支持请求接口数据缓存，将请求后的数据自动缓存
 */

export class Axios {
    private baseURL            : string
    private timeout           ?: number
    private showLoading       ?: boolean
    private showError         ?: boolean
    private transformRequest  ?: AxiosTransformRequest
    private transformResponse ?: AxiosTransformResponse
    private requestTaskMap    : Map<Symbol, UniApp.RequestTask>
    private uploadTaskMap     : Map<Symbol, UniApp.UploadTask>
    private downloadTaskMap   : Map<Symbol, UniApp.DownloadTask>

    // 创建 axios 实例
    public static create(config: AxiosConstructorConfig) {
        return new Axios(config)
    }

    /** 生成 Task id */
    public static genTaskId(): Symbol {
        return Symbol('task_id')
    }

    public constructor(config: AxiosConstructorConfig) {
        this.baseURL           = config.baseURL
        this.timeout           = config.timeout ?? 60 * 1000
        this.showLoading       = config.showLoading
        this.showError         = config.showError
        this.transformRequest  = config.transformRequest
        this.transformResponse = config.transformResponse
        this.requestTaskMap    = new Map()
        this.uploadTaskMap     = new Map()
        this.downloadTaskMap   = new Map()
    }

    /** GET 请求 */
    public get<T = any>(
        url   : string,
        params: Record<string, any>,
        config: Omit<AxiosRequestConfig, 'url' | 'params'>,
    ) : AxiosRequestResult<T> {
        return this.request('GET', { ...config, url, params })
    }

    /** POST 请求 */
    public post<T = any>(
        url   : string,
        params: Record<string, any>,
        config: Omit<AxiosRequestConfig, 'url' | 'params'>,
    ): AxiosRequestResult<T> {
        return this.request('POST', { ...config, url, params })
    }

    /** 发送请求 */
    public request<T = any>(method: UniApp.RequestOptions['method'], config: AxiosRequestConfig): AxiosRequestResult<T> {
        const request_url = this.normalUrl(config.url)
        if ( !request_url ) throw new Error(`[utils/request]: 无效的请求路径 ${ request_url }`)

        // 合并实例与当前请求配置
        const _config_ = this.mergeConfig(config)

        // 请求前数据转换
        this.transformRequest && this.transformRequest(_config_)

        return this.requestWrap<T>(_config_, () => {
            return new Promise((resolve) => {
                const request_task = uni.request({
                    url                 : request_url,
                    method              ,
                    data                : _config_.data,
                    header              : _config_.header,
                    dataType            : _config_?.dataType     || 'json',
                    responseType        : _config_?.responseType || 'text',
                    // --------------------------------------------
                    // 以下是 uniapp 官网未纳入的配置，不知道是否会注入
                    enableHttp2         : (_config_ as any)?.enableHttp2,
                    enableQuic          : (_config_ as any)?.enableQuic,
                    enableHttpDNS       : (_config_ as any)?.enableHttpDNS,
                    httpDNSServiceId    : (_config_ as any)?.httpDNSServiceId,
                    enableChunked       : (_config_ as any)?.enableChunked,
                    forceCellularNetwork: (_config_ as any)?.forceCellularNetwork,

                    success: (res: UniApp.RequestSuccessCallbackResult) => {
                        this.transformResponse && this.transformResponse(res)
                        resolve(this.responseSuccess(res))
                    },
                    fail: (res: UniApp.GeneralCallbackResult) => {
                        resolve(this.responseFail(res))
                    },
                } as any)

                // 收集请求任务
                _config_.task_id && this.requestTaskMap.set(_config_.task_id, request_task)
            })
        })
    }

    /** 发送请求 */
    public upload(
        url     : string,
        params  : { filePath: string; [k: string]: any },
        config ?: AxiosUploadConfig,
    ): Promise<{ ok: true; data: UniApp.UploadFileSuccessCallbackResult } | { ok: false; err: string }> {
        const request_url = this.normalUrl(url)
        if ( !request_url ) throw new Error(`[utils/request]: 无效的上传路径 ${ request_url }`)

        // 合并实例与当前请求配置
        const _config_ = this.mergeConfig(config)

        // 请求前数据转换
        this.transformRequest && this.transformRequest(_config_)

        const filePath = params.filePath
        const formData = { ..._config_.data }
        Reflect.deleteProperty(formData, 'filePath')

        return this.requestWrap(_config_, () => {
            return new Promise((resolve) => {
                const upload_task = uni.uploadFile({
                    filePath,
                    formData,
                    url    : request_url,
                    header : _config_.header,
                    name   : _config_?.name ?? 'file',
                    timeout: _config_.timeout,
                    success: (res) => {
                        this.transformResponse && this.transformResponse(res)
                        resolve(this.responseSuccess(res))
                    },
                    fail: (res) => {
                        resolve(this.responseFail(res))
                    },
                })

                // 监听进度变化
                if (_config_.onProgressUpdate && Utils.isFunction(_config_.onProgressUpdate))
                    upload_task.onProgressUpdate(_config_.onProgressUpdate)

                // 收集上传任务
                _config_.task_id && this.uploadTaskMap.set(_config_.task_id, upload_task)
            })
        })
    }

    /** 下载 */
    public download(
        url     : string,
        config ?: AxiosDownloadConfig,
    ): Promise<{ ok: true; data: UniApp.DownloadSuccessData } | { ok: false; err: string }> {
        const request_url = this.normalUrl(url)
        if ( !request_url ) throw new Error(`[utils/request]: 无效的下载路径 ${ request_url }`)

        // 合并实例与当前请求配置
        const _config_ = this.mergeConfig(config)

        return this.requestWrap(_config_, () => {
            return new Promise((resolve) => {
                const download_task = uni.downloadFile({
                    url    : request_url,
                    header : _config_.header,
                    timeout: _config_.timeout,
                    success(res) {
                        resolve({ ok: true, data: res })
                    },
                    fail(res) {
                        resolve({ ok: false, err: res.errMsg })
                    },
                })

                // 监听进度变化
                if (_config_.onProgressUpdate && Utils.isFunction(_config_.onProgressUpdate))
                    download_task.onProgressUpdate(_config_.onProgressUpdate)

                // 收集下载任务
                _config_.task_id && this.downloadTaskMap.set(_config_.task_id, download_task)
            })
        })
    }

    /** 规范化请求路径 */
    public normalUrl(url: string) {
        if (/^https?:\/\//.test(url)) return url

        const base_url = this.baseURL.replace(/\/*$/, '') // 剔除结尾斜线
        let api_url    = url.replace(/\/+/g, '/') // 合并多个斜线为一个斜线
        api_url    = api_url.replace(/(^\/*|\/*$)*/, '') // 剔除起始结尾斜线

        return `${ base_url }/${ api_url }`
    }

    /** 生成 Task id */
    public genTaskId(): Symbol {
        return Symbol('task_id')
    }

    /** 获取 Task */
    public getTask(task_id: Symbol): UniApp.RequestTask | UniApp.UploadTask | UniApp.DownloadTask | undefined {
        const req_task = this.getRequestTask(task_id)
        if (req_task) return req_task

        const upload_task = this.getUploadTask(task_id)
        if (upload_task) return upload_task

        const down_task = this.getDownloadTask(task_id)
        if (down_task) return down_task

        return undefined
    }

    /** 获取请求 Task */
    public getRequestTask(task_id: Symbol) {
        return this.requestTaskMap.get(task_id)
    }

    /** 获取上传 Task */
    public getUploadTask(task_id: Symbol) {
        return this.uploadTaskMap.get(task_id)
    }

    /** 获取下载 Task */
    public getDownloadTask(task_id: Symbol) {
        return this.downloadTaskMap.get(task_id)
    }

    /** 请求容器包装, 处理 loading, 异常提示等 */
    private async requestWrap<T = any>(
        config: { showLoading: boolean; showError: boolean; delay: number },
        fn: () => Promise<any>,
    ): AxiosRequestResult<T> {
        let loadingTimer: ReturnType<typeof setTimeout> | undefined

        // 显示 loading
        if (config.showLoading) {
            loadingTimer = setTimeout(() => {
                showLoading()
            }, config.delay)
        }

        try {
            const res = await fn()

            // 隐藏 loading
            loadingTimer       && clearTimeout(loadingTimer)
            config.showLoading && hideLoading()

            // 发出错误提示
            if (res.ok === false && config.showError)
                errorMsg(res.err)

            return res
        }
        catch (error) {
            const err = typeof error === 'string' ? error : JSON.stringify(error)
            return Promise.resolve({ ok: false, err })
        }
    }

    /** 合并请求函数配置与实例配置 */
    private mergeConfig<T>(config: T): T & {
        showLoading: boolean
        showError  : boolean
        delay      : number
        timeout    : number
        data       : Record<string, any>
        header     : Record<string, any>
    } {
        const conf = Utils.isObject(config) ? config : {} as any

        if ('delay' in conf) {
            const delay = (conf as any).delay
            if (Utils.isNumber(delay))
                (conf as any).delay = delay

            else if (delay === false)
                (conf as any).delay = 0

            else
                (conf as any).delay = 300
        }

        return {
            delay      : 300, // 请求配置后，覆盖此默认值
            ...conf    ,
            data       : { ...(Utils.isObject((conf as any).params) ? (conf as any).params : {}) },
            header     : { ...(Utils.isObject((conf as any).header) ? (conf as any).header : {}) },
            showLoading: ('showLoading' in conf) ? (conf as any).showLoading : this.showLoading,
            showError  : ('showError'   in conf) ? (conf as any).showError   : this.showError,
            timeout    : ('timeout'     in conf) ? (conf as any).timeout     : this.timeout,
        }
    }

    /** 请求成功 */
    private responseSuccess(res: UniApp.RequestSuccessCallbackResult | UniApp.UploadFileSuccessCallbackResult): {
        ok         : true
        data       : any
        err        : string
        server_date: string
        server_time: number
    } {
        const d = Utils.isObject(res.data) ? res.data : undefined
        return {
            ok         : d ?  d.ok                 : true,
            data       : d ?  d.data               : res.data,
            err        : d ?  d.err                : '',
            server_date: d ? (d.server_date ?? '') : '',
            server_time: d ? (d.server_time ?? 0 ) : 0,
        }
    }

    /** 请求失败 */
    private responseFail(res: UniApp.GeneralCallbackResult): { ok: false; err: string } {
        return { ok: false, err: res.errMsg }
    }
}
