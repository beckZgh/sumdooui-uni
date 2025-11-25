/**
 * 小程序 API 兼容性处理
 * v25.11.25
 */

/**
 * 背景：单页模式下, getWindowInfo、getAppBaseInfo、getDeviceInfo 等接口均返回 undefined。
 * 复现路径：分享到朋友圈，再打开单页模式的该页面，uni.getWindowInfo() 等接口返回 undefined
 * 代码片段：https://developers.weixin.qq.com/s/mzvZ8FmH7vVW
 */

export const getWindowInfo = () => {
    return uni.getWindowInfo ? uni.getWindowInfo() || uni.getSystemInfoSync() : uni.getSystemInfoSync()
}

export const getAppBaseInfo = () => {
    return uni.getAppBaseInfo ? uni.getAppBaseInfo() || uni.getSystemInfoSync() : uni.getSystemInfoSync()
}

export const getDeviceInfo = () => {
    return uni.getDeviceInfo ? uni.getDeviceInfo() || uni.getSystemInfoSync() : uni.getSystemInfoSync()
}
