import './styles/index.scss'

import { createSSRApp } from 'vue'
import App              from './App.vue'
import uviewPlus from '@/uni_modules/uview-plus'

export function createApp() {
    const app = createSSRApp(App)

    app.use(uviewPlus)

    app.config.globalProperties.$sd = {
        home_path: '/pages/tabbar/home/main',
    }

    return { app }
}
