
import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const overlay_props = {
    ...COMMON_PROPS,

    /** 显示隐藏绑定值 */
    visible     : { type: Boolean, default: false },
    /** 背景色 */
    background  : { type: String },
    /** 过渡动画时间 */
    duration    : { type: Number },
    /** 遮罩层层级 */
    zIndex      : { type: Number },
    /** 点击遮罩层关闭 */
    closeOnClick: { type: Boolean },
    /** 锁定滚动 */
    lockScroll  : { type: Boolean, default: false },
}

export type OverlayProps = ExtractPropTypes<typeof overlay_props>
