
import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const overlay_props = {
    ...COMMON_PROPS,

    /** 显示隐藏绑定值 */
    visible            : { type: Boolean, default: false },
    /** 背景色 */
    background         : { type: String },
    /** 过渡动画时间 */
    duration           : { type: Number, default: 0.3 },
    /** 遮罩层层级 */
    zIndex             : { type: Number },
    /** 点击遮罩层关闭 */
    closeOnClickOverlay: { type: Boolean },
}

export type OverlayProps = ExtractPropTypes<typeof overlay_props>
