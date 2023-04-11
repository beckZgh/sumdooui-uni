/**
 * 订阅消息处理
 * v23.01.05
 */

// const message_text: Record<string, string> = {
//     'Xf36n5Ez21V9qIFSU1MQna70jUyzkvDkoIf61a3Shuw': '充值成功通知' , // deposit
//     'AO4WvDxC-y2YV15tbFmKZqZWX9DUGnIQk3jH2y974qM': '取餐提醒'     , // mn_order_finish
//     'mPGhlyQvHac0qUw2V5NIcsQljwQbILmrviFqvsdnUp8': '外卖通知'     , // mn_order_0
//     'mPGhlyQvHac0qUw2V5NIcjES46dRqwpWDGhzT1KK80g': '堂食通知'     , // mn_order_1
//     't1aJHbgKG3kse-Lzne197cOE4vyMHFH3EbHc2yJ6e0Y': '自提出品通知' , // mn_order_3
// }

// 发起订阅消息授权
export async function requestSubscribe(tmplIds: string[]): Promise<{ ok: boolean; err?: string }> {
    // 发起订阅消息授权
    return new Promise((resolve) => {
        uni.requestSubscribeMessage({
            tmplIds,
            success: async (res) => {
                const all_accept = tmplIds.every(id => (res as any)[id] === 'accept')

                // 已同意所有订阅消息
                if (all_accept) {
                    resolve({ ok: true })
                    return
                }

                const reject_ids = tmplIds.filter(id => (res as any)[id] === 'reject')
                uni.getSetting({
                    withSubscriptions: true,
                    success(res) {
                        const itemSettings = res.subscriptionsSetting.itemSettings || {}
                        const has_await_reject = reject_ids.some(id => itemSettings[id] === 'reject')
                        if (has_await_reject) {
                            uni.showModal({
                                title      : '温馨提示',
                                content    : '检测到您已永久关闭订阅消息,这将导致您一直无法接收消息通知，是否前往开启？',
                                cancelText : '稍后设置',
                                confirmText: '前往设置',
                                success(res) {
                                    if (res.confirm) {
                                        uni.openSetting({
                                            withSubscriptions: true,
                                            success(res) {
                                                const itemSettings = res.subscriptionsSetting.itemSettings || {}
                                                const has_await_reject = reject_ids.some(id => itemSettings[id] === 'reject')
                                                if (has_await_reject) {
                                                    resolve({ ok: false, err: '接收订阅消息失败: 尚未开启' })
                                                } else {
                                                    resolve({ ok: true })
                                                }
                                            },
                                            fail() {
                                                resolve({ ok: false, err: '打开设置界面失败' })
                                            },
                                        })
                                    }
                                },
                            })
                        } else {
                            uni.showModal({
                                title      : '温馨提示',
                                content    : '检测到您尚未订阅消息通知',
                                cancelText : '我再想想',
                                confirmText: '重新订阅',
                                success(res) {
                                    if (res.confirm) {
                                        requestSubscribe(tmplIds).then(resolve)
                                    } else {
                                        resolve({ ok: false })
                                    }
                                },
                            })
                        }
                    },
                    fail() {
                        resolve({ ok: false, err: '读取订阅消息配置失败,请稍后重试' })
                    },
                })
            },
            fail(err) {
                // 用户关闭了主开关，无法进行订阅
                // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html
                if (err.errCode === 20004) {
                    uni.showModal({
                        title      : '温馨提示',
                        content    : '检测到您未开启订阅消息，开启后可及时了解进度通知，是否前往开启？',
                        cancelText : '稍后设置',
                        confirmText: '前去设置',
                        success    : async (res) => {
                            if (res.confirm) {
                                uni.openSetting({
                                    withSubscriptions: true,
                                    success(res) {
                                        if (res.subscriptionsSetting.mainSwitch) {
                                            uni.showModal({
                                                title      : '温馨提示',
                                                content    : '检测到您已开启订阅消息，是否接收消息通知？',
                                                cancelText : '我再想想',
                                                confirmText: '订阅通知',
                                                success(res) {
                                                    if (res.confirm) {
                                                        requestSubscribe(tmplIds).then(resolve)
                                                    } else {
                                                        resolve({ ok: false })
                                                    }
                                                },
                                            })
                                        } else {
                                            resolve({ ok: false, err: '接收订阅消息失败: 尚未开启' })
                                        }
                                    },
                                    fail() {
                                        resolve({ ok: false })
                                    },
                                })
                            } else {
                                resolve({ ok: false })
                            }
                        },
                    })
                } else {
                    resolve({ ok: false, err: err.errMsg })
                }
            },
        })
    })
}
