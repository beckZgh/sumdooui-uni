// import {
//     SCOPE_API_CONFIG,
//     SCOPE_API_PREFIX,
// } from './config'
// import { $il8n } from '@/locale'

// /** 检查接口是否已被用户授权 */
// export async function isAuthorizedOfApi(api_name: keyof typeof SCOPE_API_CONFIG) {
//     if (!api_name) throw new Error('[utils/scope-api]: 授权接口名称不能为空')

//     // 不是授权接口
//     const scope_name_suffix = SCOPE_API_CONFIG[api_name]
//     if ( !scope_name_suffix ) return true

//     // 拼接完整授权API路径
//     const scope_name = `${ SCOPE_API_PREFIX }.${ scope_name_suffix }` as keyof UniApp.AuthSetting

//     const userAuthSettingRes = await getAuthSetting()
//     if ( !userAuthSettingRes ) return false

//     const authSetting = userAuthSettingRes.authSetting

//     // 未申请过授权、先提前向用户发起授权
//     if (authSetting[scope_name] === undefined) {
//         return await launchAuthorize(scope_name)
//     }

//     // 用户已拒绝过授权
//     if (authSetting[scope_name] === false) {
//         // 引导用户至设置页面开启授权
//         const result = await openAuthSetting({ showCancel: true })
//         if ( !result ) return false

//         return result.authSetting[scope_name]
//     }

//     // 用户已授权
//     return true
// }

// /** 获取授权接口名称 */
// export function getScopeName(api_name: keyof typeof SCOPE_API_CONFIG) {
//     return `${ SCOPE_API_PREFIX }.${ SCOPE_API_CONFIG[api_name] }` as keyof UniApp.AuthSetting
// }

// /** 发起授权 */
// export async function launchAuthorize(scope_name: keyof UniApp.AuthSetting): Promise<boolean> {
//     return new Promise((resolve) => {
//         uni.authorize({
//             scope: scope_name,
//             success() {
//                 resolve(true)
//             },
//             fail() {
//                 resolve(false)
//             },
//         })
//     })
// }

// /** 获取授权设置状态 */
// export function getAuthSetting(): Promise<UniApp.GetSettingSuccessResult | undefined> {
//     return new Promise((resolve) => {
//         uni.getSetting({
//             success(res) {
//                 resolve(res)
//             },
//             fail() {
//                 resolve(undefined)
//             },
//         })
//     })
// }

// /** 打开权限设置界面 */
// export async function openAuthSetting(
//     opt?: {
//         showModal         ?: boolean
//         withSubscriptions ?: boolean
//         title             ?: string
//         content           ?: string
//         showCancel        ?: boolean
//         cancelText        ?: string
//         cancelColor       ?: string
//         confirmText       ?: string
//         confirmColor      ?: string
//     },
// ): Promise<{ authSetting: UniApp.AuthSetting } | undefined> {
//     return new Promise((resolve) => {
//         if (opt?.showModal === false) {
//             uni.openSetting({
//                 withSubscriptions: opt?.withSubscriptions,
//                 success(res) {
//                     resolve(res)
//                 },
//                 fail() {
//                     resolve(undefined)
//                 },
//             })
//         }
//         else {
//             uni.showModal({
//                 title       : opt?.title        || $il8n.global.t('scope_api.openAuthSetting.title'),
//                 content     : opt?.content      || $il8n.global.t('scope_api.openAuthSetting.content'),
//                 showCancel  : opt?.showCancel === true,
//                 cancelText  : opt?.cancelText   || $il8n.global.t('scope_api.openAuthSetting.cancel_text'),
//                 cancelColor : opt?.cancelColor  || '',
//                 confirmText : opt?.confirmText  || $il8n.global.t('scope_api.openAuthSetting.confirm_text'),
//                 confirmColor: opt?.confirmColor || '',
//                 success(res) {
//                     if (res.confirm) {
//                         uni.openSetting({
//                             withSubscriptions: opt?.withSubscriptions,
//                             success(res) {
//                                 resolve(res)
//                             },
//                             fail() {
//                                 resolve(undefined)
//                             },
//                         })
//                     }
//                     else {
//                         resolve(undefined)
//                     }
//                 },
//                 fail() {
//                     resolve(undefined)
//                 },
//             })
//         }
//     })
// }
