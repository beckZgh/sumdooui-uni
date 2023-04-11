import type { App } from 'vue'
import { app_config } from '@/config'
import { createI18n } from 'vue-i18n'

import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

export const $il8n = createI18n({
    legacy        : false,
    locale        : loadLocale(),
    fallbackLocale: 'zh-CN',
    // 关闭 warning 提示
    fallbackWarn  : false, // 本地化失败时是否抑制回退警告。
    missingWarn   : false, // 是否抑制本地化失败时输出的警告。
    messages      : {
        'zh-CN': {
            ...zhCN,
            currency_symbol: app_config.currency_symbol,
            currency_unit  : app_config.currency_unit,
        },
        'en-US': {
            ...enUS,
            currency_symbol: app_config.currency_symbol,
            currency_unit  : app_config.currency_unit,
        },
    },
})

/** 切换本地语言 */
export const switchLanguage = (lang: 'zh-CN' | 'en-US') => {
    $il8n.global.locale.value = lang
    saveLocale()
}

/** 读取语言缓存 */
function loadLocale(): string {
    try {
        // 有自定义设置语言，则认自定义
        const  cache_locale = uni.getStorageSync('locale') as string
        return cache_locale || 'zh-CN'
    } catch (e) {
        return 'zh-CN'
    }
}

/** 保存本地缓存 */
function saveLocale() {
    try {
        uni.setStorageSync('locale', $il8n.global.locale.value)
    } catch (e) { }
}

export const setupIl8n = (app: App) => {
    app.use($il8n)
}
