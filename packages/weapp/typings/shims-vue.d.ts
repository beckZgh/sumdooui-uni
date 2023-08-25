import type { RouterInstance } from '@sumdoo/sumdooui-uni/utils/router'

declare module 'vue' {
    interface ComponentCustomProperties {
        /** 路由实例 */
        $router: RouterInstance

        /** 主题色 */
        $theme_color: string
    }
}

export {}
