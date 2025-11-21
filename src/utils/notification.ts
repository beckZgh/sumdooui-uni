/**
 * 简化界面相关交互API
 * v22.12.09
 *
 * - 注意:
 * 1. confirmText | cancelText 都不允许超过一定的字符、超出会无反应
 */

import { $il8n } from '@/locale'

const config = {
    toast_mask  : false,
    loading_mask: true,
}

let mTimeout: ReturnType<typeof setTimeout> // 避免 loading Toast 相互覆盖
let mLoading = false

/** 显示 Loading */
export const showLoading = (title = $il8n.global.t('loading.title'), opt?: { mask?: boolean; duration?: number }) => {
    // if (mLoading) return
    mLoading = true

    clearTimeout(mTimeout)

    mTimeout = setTimeout(() => {
        if (!mLoading) return
        uni.showLoading({ title, mask: opt?.mask ?? config.loading_mask })
    }, opt?.duration ?? 0)
}

/** 强制显示 Loading */
export const showLoadingX = (title = $il8n.global.t('loading.title'), opt?: { mask?: boolean; duration?: number }) => {
    mLoading = true

    clearTimeout(mTimeout)

    mTimeout = setTimeout(() => {
        if (!mLoading) return
        uni.showLoading({ title, mask: opt?.mask ?? config.loading_mask })
    }, opt?.duration ?? 0)
}

/** 隐藏 Loading */
export const hideLoading = (opt?: { duration: number }) => {
    if (!mLoading) return
    mLoading = false

    clearTimeout(mTimeout)

    mTimeout = setTimeout(() => {
        if (mLoading) return
        uni.hideLoading() // TODO: 待检查 noConflict 参数的支持度
    }, opt?.duration ?? 0)
}

/** 显示 Toast */
export const showToast = (text: string, opt?: Omit<UniApp.ShowToastOptions, 'text'>) => {
    if (!text) return
    mLoading = false

    clearTimeout(mTimeout)
    mTimeout = setTimeout(() => {
        uni.showToast({
            title   : text,
            ...(opt || {}),
            mask    : opt?.mask     ?? config.toast_mask,
            icon    : opt?.icon     ?? 'none',
            duration: opt?.duration ?? 2000,
        })
    }, 100)
}

/** 显示成功 Toast */
export const successMsg = (text: string, opt?: Omit<UniApp.ShowToastOptions, 'icon' | 'text'>) => {
    showToast(text, { icon: 'success', ...(opt || {}) })
}

/** 显示失败 Toast */
export const errorMsg = (text: string, opt?: Omit<UniApp.ShowToastOptions, 'icon' | 'text'>) => {
    showToast(text, { icon: 'error', ...(opt || {}) })
}

/** 显示文字 Toast */
export const textMsg = (text: string, opt?: Omit<UniApp.ShowToastOptions, 'icon' | 'text'>) => {
    showToast(text, { icon: 'none', ...(opt || {}) })
}

/** 模态框 */
type ShowModalOptions = Omit<UniApp.ShowModalOptions, 'success' | 'fail' | 'complete'>
const _showModal = async (content: string, title = $il8n.global.t('alert.tip'), opt?: ShowModalOptions): Promise<boolean> => {
    return new Promise((resolve) => {
        uni.showModal({
            content,
            title,
            ...(opt || {}),
            success(res) {
                resolve(!!(res || {}).confirm)
            },
            fail() {
                resolve(false)
            },
        })
    })
}

/** 提示框 */
export interface AlertModalOptions { confirmText?: string; confirmColor?: string }
export const showAlert = async (content: string, title?: string, opt?: AlertModalOptions): Promise<boolean> => {
    const options: AlertModalOptions = {
        confirmText: opt?.confirmText ? opt?.confirmText : $il8n.global.t('alert.confirm_text'),
    }
    if (opt?.confirmColor) options.confirmColor = opt.confirmColor

    return await _showModal(content, title, { ...options, showCancel: false })
}

/** 确认框 */
export interface ConfirmModalOptions { cancelText?: string; cancelColor?: string; confirmText?: string; confirmColor?: string }
export const showConfirm = async (content: string, title?: string, opt?: ConfirmModalOptions): Promise<boolean> => {
    const options: ConfirmModalOptions = {
        cancelText : opt?.cancelText  ? opt.cancelText  : $il8n.global.t('confirm.cancel_text'),
        confirmText: opt?.confirmText ? opt.confirmText : $il8n.global.t('confirm.confirm_text'),
    }
    if (opt?.cancelColor ) options.cancelColor  = opt.cancelColor
    if (opt?.confirmColor) options.confirmColor = opt.confirmColor

    return await _showModal(content, title, options)
}

/** 确认框 */
export type PromptModalOptions = Omit<ShowModalOptions, 'editable'>
export const showPrompt = async (title?: string, opt?: PromptModalOptions): Promise<UniApp.ShowModalRes> => {
    return new Promise((resolve) => {
        const options: ConfirmModalOptions = {
            cancelText : opt?.cancelText  ? opt.cancelText  : $il8n.global.t('confirm.cancel_text'),
            confirmText: opt?.confirmText ? opt.confirmText : $il8n.global.t('confirm.confirm_text'),
        }
        if (opt?.cancelColor ) options.cancelColor  = opt.cancelColor as string
        if (opt?.confirmColor) options.confirmColor = opt.confirmColor as string

        uni.showModal({
            ...options,
            placeholderText: opt?.placeholderText || $il8n.global.t('prompt.placeholder_text'),
            editable       : true,
            title,
            success(res) {
                resolve(res)
            },
            fail() {
                resolve({
                    confirm: false,
                    cancel : false,
                    content: '',
                })
            },
        })
    })
}

/** 显示 ActionSheet */
type ShowActionSheetOptions = Omit<UniApp.ShowActionSheetOptions, 'success' | 'fail' | 'itemList'>
export const showActionSheet = (
    item_list: string[],
    opt?: ShowActionSheetOptions,
): Promise<{ ok: true; data: { tapIndex: number; tapItem: string } } | { ok: false; err: string }> => {
    return new Promise((resolve) => {
        uni.showActionSheet({
            ...(opt || {}),
            itemList: item_list,
            success(res) {
                resolve({
                    ok  : true,
                    data: { tapIndex: res.tapIndex, tapItem: item_list[res.tapIndex] },
                })
            },
            fail(res) {
                resolve({ ok: false, err: res.errMsg })
            },
        })
    })
}
