import type { RouterConstructorConfig } from './types'
import { Router } from './Router'

export * from './types'
export type RouterInstance = Router

/** 创建路由 */
let router: Router
export const createRouter = (opt: RouterConstructorConfig) => {
    router = router || new Router(opt)
    return router
}
