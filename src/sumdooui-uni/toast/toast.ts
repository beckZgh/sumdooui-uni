export type ToastProps = {
    message: string
    type?: 'success' | 'error' | 'warning' | 'info' | 'loading' | 'none'
    loadingType?: 'circle' | 'line'
    icon?: string
    iconSize?: number
    iconColor?: string
    image?: string
    imageWidth?: number | string
    imageHeight?: number | string
    direction?: 'row' | 'column'
    mask?: boolean
    duration?: number
    onClose?: Function | null
}

export const DEFAULT_OPTIONS = {
    message    : '',
    type       : 'none'   as Required<ToastProps>['type'],
    loadingType: 'circle' as Required<ToastProps>['loadingType'],
    icon       : undefined as ToastProps['icon'],
    iconSize   : undefined as ToastProps['iconSize'],
    iconColor  : undefined as ToastProps['iconColor'],
    image      : undefined as ToastProps['image'],
    imageWidth : undefined as ToastProps['imageWidth'],
    imageHeight: undefined as ToastProps['imageHeight'],
    direction  : 'column' as Required<ToastProps>['direction'],
    mask       : false,
    duration   : 1500,
    onClose    : null as Required<ToastProps>['onClose'],
}

