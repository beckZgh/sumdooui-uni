import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentType } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export type BadgeShape = 'circle' | 'square' | 'bubble'
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'


export const badge_props = {
    ...COMMON_PROPS,

    /** 徽标类型 */
    type      : { type: String as PropType<Omit<ComponentType, 'default'>> },
    /** 显示小红点 */
    dot       : { type: Boolean },
    /** 徽标内容 */
    content   : { type: [Number, String] },
    /** 最大数值 */
    max       : { type: Number },
    /** 徽标位置 */
    position  : { type: String as PropType<BadgePosition>, default: 'top-right' },
    /** 偏移位置 */
    offset    : { type: Array as PropType<(string | number)[]> },
    /** 背景颜色 */
    background: { type: String },
    /** 内容颜色 */
    color     : { type: String },
    /** 内容大小 */
    size      : { type: [Number, String] },
    /** 是否显示 0 */
    showZero  : { type: Boolean },
    /** 形状 */
    shape     : { type: String, default: 'circle' },
}

export type  BadgeProps = ExtractPropTypes<typeof badge_props>
