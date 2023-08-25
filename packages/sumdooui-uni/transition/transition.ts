import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export type TransitionMode = 'top' | 'bottom' | 'left' | 'right' | 'center'
export const transition_props = {
    ...COMMON_PROPS,

    /** 过渡动画 */
    mode    : { type: String as PropType<TransitionMode>, default: 'bottom' },
    /** 动画时间 */
    duration: { type: Number, default: 0.3 },
    /** 是否显示 */
    visible : { type: Boolean, default: false },
    /** CSS z-index  */
    zIndex  : { type: Number },
    /** 宽度 */
    width   : { type: [Number, String] },
}

export type TransitionProps = ExtractPropTypes<typeof transition_props>
