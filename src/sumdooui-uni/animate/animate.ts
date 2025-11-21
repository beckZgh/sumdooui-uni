import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

/**
 * shake        抖动，建议 loop 为 true
 * ripple       不循环则是放大后缩小，循环则是心跳
 * breath       呼吸灯，建议 loop 为 true
 * float        漂浮，建议 loop 为 true
 * slide-right  由右向左划入
 * slide-left   由左向右划入
 * slide-top    由上至下划入
 * slide-bottom 由下至上划入
 * jump         跳跃，建议 loop 为 true
 * twinkle      水波，建议 loop 为 true
 * flicker      擦亮按钮，建议 loop 为 true
 */
export type AnimateType    = 'shake' | 'ripple' | 'breath' | 'float' | 'jump' | 'twinkle' | 'flicker' |  'slide-right' | 'slide-left' | 'slide-top' | 'slide-bottom'
export type AnimateTrigger = 'initial' | 'click'

export const animate_props = {
    ...COMMON_PROPS,

    type   : { type: String as PropType<AnimateType> }, // 动画类型
    trigger: { type: String as PropType<AnimateTrigger>, default: 'initial' }, // 触发方式
    loop   : { type: Boolean, default: false         }, // 是否循环执行
}

export type AnimateProps = ExtractPropTypes<typeof animate_props>
