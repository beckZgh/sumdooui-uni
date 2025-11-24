import type { PropType, CSSProperties } from 'vue'

/**
 * 用于适配未开启 virtualHost
 * https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E8%99%9A%E6%8B%9F%E5%8C%96%E7%BB%84%E4%BB%B6%E8%8A%82%E7%82%B9
 */
export const COMMON_PROPS = {
    /** 自定义类名 */
    customClass: { type: [Object, String] },
    /** 自定义样式 */
    customStyle: { type: Object as PropType<any> }, // 待排查类型问题 ，CSSProperties 不兼容
}
