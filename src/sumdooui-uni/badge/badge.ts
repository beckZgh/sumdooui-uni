import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentType } from '../common/types'

export const badge_props = {
    /** 徽标类型 */
    type      : { type: String as PropType<Omit<ComponentType, 'default'>> },
    /** 徽标内容 */
    content   : { type: [Number, String] },
    /** 最大数值 */
    max       : { type: Number },
    /** 显示小红点 */
    dot       : { type: Boolean },
    /** 徽标位置 */
    position  : { type: String },
    /** 偏移位置 */
    offset    : { type: Array as PropType<(string | number)[]> },
    /** 背景颜色 */
    background: { type: String },
    /** 内容颜色 */
    color     : { type: String },
    /** 是否显示 0 */
    showZero  : { type: Boolean },
}

export type  BadgeProps = ExtractPropTypes<typeof badge_props>
