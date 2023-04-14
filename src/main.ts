import './styles/index.scss'

import { createSSRApp } from 'vue'
import App              from './App.vue'

export function createApp() {
    const app = createSSRApp(App)

    app.config.globalProperties.$sd = {
        home_path: '/pages/tabbar/home/main',
    }

    return { app }
}
