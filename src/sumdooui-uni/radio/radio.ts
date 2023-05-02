
import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentSize } from '../common/types'
import { COMMON_PROPS } from '../common/props'

export const radio_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue  : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 唯一标识符 */
    name        : { type: [String, Number] },
    /** 组件尺寸 */
    size        : { type: String as PropType<ComponentSize>, default: 'normal' },
    /** 禁用状态 */
    disabled    : { type: Boolean },
    /** 标题 */
    label       : { type: String },
    /** 标题大小 */
    labelSize   : { type: [Number, String] },
    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 图标大小 */
    iconSize    : { type: [Number, String] },
    /** 图标形状 */
    shape       : { type: String as PropType<'circle' | 'square'>, default: 'circle' },
}

export type RadioProps = ExtractPropTypes<typeof radio_props>
