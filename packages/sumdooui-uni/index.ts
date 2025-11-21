
import type { App } from 'vue'
import { config } from './config'

export * from './page/page'

export function setThemeVars(vars: Record<string, any>) {
    config.theme_vars = vars
}

interface Options {
    theme_vars?: Record<string, any> // 主题变量 (依赖页面组件)
    locale?    : string                  // 默认语言
}

export default function install(app: App, options?: Options) {
    // 设置组件主题
    if (options?.theme_vars) {
        config.theme_vars = options.theme_vars
    }
}
