/**
 * 用户授权配置
 * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
 *
 * 使用完整授权名称，会引起服务商管理模式下，
 * 代码会被扫描，并被匹配认为该小程序需要使用所有授权api，导致需要填写所有说明，事实上并没有使用
*/

export const SCOPE_API_PREFIX = 'scope'
export const SCOPE_API_CONFIG = {
    // 精确地理位置
    getLocation        : 'userLocation',
    startLocationUpdate: 'userLocation',
    // chooseLocation     : 'userLocation', // v22.11.29 不在授权列表内

    // 模糊地理位置
    // v22.07.14 新增
    // 公告：https://developers.weixin.qq.com/community/develop/doc/000a02f2c5026891650e7f40351c01
    getFuzzyLocation: 'userFuzzyLocation',

    // 后台定位
    startLocationUpdateBackground: 'userLocationBackground',

    // 麦克风
    startRecord : 'record',
    joinVoIPChat: 'record',

    // 摄像头
    createVKSession: 'camera',

    // 蓝牙
    openBluetoothAdapter     : 'bluetooth',
    createBLEPeripheralServer: 'bluetooth',

    // 添加到相册
    saveImageToPhotosAlbum: 'writePhotosAlbum',
    saveVideoToPhotosAlbum: 'writePhotosAlbum',

    // sco添加到联系人
    addPhoneContact: 'addPhoneContact',

    // 添加到日历
    addPhoneRepeatCalendar: 'addPhoneCalendar',
    addPhoneCalendar      : 'addPhoneCalendar',

    // 微信运动步数
    getWeRunData: 'werun',
} as const
