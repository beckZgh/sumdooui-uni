import type { ExtractPropTypes } from 'vue'

export const sticky_props = {
    /** 吸顶位置 */
    offsetTop: { type: Number, default: 0 },
    /** 当前滚动容器的滚动位置 */
    scrollTop: { type: Number, default: 0 },
    /** 设置层叠 */
    zIndex   : { type: Number, default: 1000 },
    /** 是否自定义监听滚动容器，默认监听页面滚动 */
    custom   : { type: Boolean, default: false },
}

export type StickyProps = ExtractPropTypes<typeof sticky_props>
