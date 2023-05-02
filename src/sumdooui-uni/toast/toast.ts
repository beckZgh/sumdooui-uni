export type ToastMessage = string | number
export type ToastProps = {
    message     : string | number
    type        ?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'none'
    loadingType ?: 'circle' | 'line'
    icon        ?: string
    iconSize    ?: number
    iconColor   ?: string
    image       ?: string
    imageWidth  ?: number | string
    imageHeight ?: number | string
    direction   ?: 'row' | 'column'
    mask        ?: boolean
    duration    ?: number
    onClose     ?: Function | null
}

export const DEFAULT_OPTIONS = {
    /** 提示消息 */
    message    : '',
    /** 提示类型 */
    type       : 'none'   as Required<ToastProps>['type'],
    /* Loading 类型 */
    loadingType: 'circle' as Required<ToastProps>['loadingType'],
    /* 提示图标 */
    icon       : undefined as ToastProps['icon'],
    /* 提示图标大小 */
    iconSize   : undefined as ToastProps['iconSize'],
    /* 提示图标颜色 */
    iconColor  : undefined as ToastProps['iconColor'],
    /* 提示图片 */
    image      : undefined as ToastProps['image'],
    /* 提示图片宽度 */
    imageWidth : undefined as ToastProps['imageWidth'],
    /* 提示图片高度 */
    imageHeight: undefined as ToastProps['imageHeight'],
    /* 排列方向 */
    direction  : 'column' as Required<ToastProps>['direction'],
    /* 遮罩层 */
    mask       : false,
    /* 动画时间 */
    duration   : 1500,
    /* 关闭回调 */
    onClose    : null as Required<ToastProps>['onClose'],
}
