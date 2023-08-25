export type AxiosTransformRequest  = (config: { data: Record<string, any>; header: Record<string, any> }) => void
export type AxiosTransformResponse = (result:  UniApp.RequestSuccessCallbackResult | UniApp.UploadFileSuccessCallbackResult ) => void

export interface AxiosConstructorConfig {
    /** 基础路径       */ baseURL            : string
    /** 接口超时时间   */ timeout           ?: number
    /** 显示 Loading   */ showLoading       ?: boolean
    /** 显示错误信息   */ showError         ?: boolean
    /** 请求前数据转换 */ transformRequest  ?: AxiosTransformRequest
    /** 请求后数据转换 */ transformResponse ?: AxiosTransformResponse
}

export interface AxiosProgressResult {
    /** 进度百分比 */
    progress: number
    /** 已处理的数据长度，单位 Bytes */
    totalBytesSent: number
    /** 预期处理的数据总长度，单位 Bytes */
    totalBytesExpectedToSend: number
}

export interface AxiosRequestConfig extends Omit<UniApp.RequestOptions, 'url' | 'data'> {
    url         : string
    params     ?: Record<string, any>

    showLoading?: boolean
    showError  ?: boolean
    delay      ?: number | boolean
    task_id    ?: Symbol
}

export interface AxiosUploadConfig extends Pick<UniApp.UploadFileOption, 'name' | 'header' | 'timeout'> {
    showLoading?: boolean
    showError  ?: boolean
    delay      ?: number | boolean
    task_id    ?: Symbol
    onProgressUpdate?: (res: AxiosProgressResult) => void
}

export interface AxiosDownloadConfig extends Pick<UniApp.DownloadFileOption, 'timeout' | 'header'> {
    showLoading?: boolean
    showError  ?: boolean
    delay      ?: number | boolean
    task_id    ?: Symbol
    onProgressUpdate?: (res: AxiosProgressResult) => void
}

interface RequestBaseResult { server_date?: string; server_time?: number }
export type AxiosRequestResult<T = any> = Promise<
        { ok: true ; data: T     } & RequestBaseResult
        |   { ok: false; err: string } & RequestBaseResult
>
