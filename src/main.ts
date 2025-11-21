import './uni_modules/sky-nutui/components/sky-nutui/app.scss'
import './uni_modules/uview-plus/index.scss'
import './sumdooui-uni/styles/index.scss'
import './sumdooui-uni/styles/utils.scss'
import './sumdooui-uni/styles/dark.scss'
import './styles/index.scss'

import { createSSRApp } from 'vue'
import App              from './App.vue'
// import uviewPlus from '@/uni_modules/uview-plus'

export function createApp() {
    const app = createSSRApp(App)

    // app.use(uviewPlus)

    app.config.globalProperties.$sd = {
        home_path: '/pages/tabbar/home/main',
    }

    // Vue 提示函数屏蔽注入寻找相关提示
    app.config.warnHandler = (msg) => {
        if (msg.includes('injection')) return
        console.warn(msg)
    }

    return { app }
}
