// /**
//  * 代理 uni 对象
//  * v22.12.09
//  *
//  * - 统一异步函数返回格式
//  * - 处理授权 API、自动发起授权和引导打开授权设置
//  */
// import { isAuthorizedOfApi } from './scope-api'


// type Result = { ok: true; data: any } | { ok: false; err: string }

// export const setupProxy = () => {
//     (uni as any).$ = new Proxy(uni, {
//         get(target: UniApp.Uni, prop: keyof UniApp.Uni) {
//             return (opt: any): Promise<Result> => {
//                 return new Promise((resolve) => {
//                     // 访问不存在的属性
//                     // 注意点：target 也是个 proxy
//                     if (!target[prop]) throw new Error(`[utils/proxy-uni]: ${ prop } 无效属性`)

//                     // 是否授权接口
//                     isAuthorizedOfApi(prop as any)
//                         .then(() => {
//                             // 同步接口
//                             const apiOption = Utils.isObject(opt) ? opt : {}

//                             try {
//                                 if (prop.endsWith('Sync')) {
//                                     _resolve({ ok: true, data: (target[prop] as Function)(apiOption) })
//                                 } else {
//                                     // 调用接口返回结果
//                                     (target[prop] as Function)({
//                                         ...apiOption,
//                                         success(result: any) {
//                                             _resolve({ ok: true, data: result })
//                                         },
//                                         fail(error: any) {
//                                             _resolve({ ok: false, err: error })
//                                         },
//                                     })
//                                 }
//                             } catch (error: any) {
//                                 _resolve({ ok: false, err: error })
//                             }

//                             // 返回接口数据
//                             function _resolve(opt: { ok: true; data: any } | { ok: false; err: (string | { errMsg: string }) }) {
//                                 if (opt.ok === true) {
//                                     resolve(opt)
//                                 } else {
//                                     let err = opt.err
//                                     err = Utils.isObject(err) ? err.errMsg : err                 // 正常错误信息含有 errMsg
//                                     err = Utils.isString(err) ? err        : JSON.stringify(err) // 防止获取到的异常信息是对象，外部当字符串处理

//                                     resolve({ ok: false, err })
//                                 }
//                             }
//                         })
//                         .catch(() => {
//                             resolve({ ok: false, err: '授权失败' })
//                         })
//                 })
//             }
//         },
//     })
// }
