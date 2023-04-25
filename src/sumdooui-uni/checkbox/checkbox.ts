
import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentSize } from '../common/types'

export const checkbox_props = {
    /** 绑定值 */
    modelValue   : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 为 true 时的值 */
    activeValue  : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: true  },
    /** 为 false 时的值 */
    inactiveValue: { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 标题 */
    label        : { type: String },
    /** 标题大小 */
    labelSize    : { type: [Number, String] },
    /** 图标位置 */
    iconPosition : { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 图标大小 */
    iconSize     : { type: [Number, String] },
    /** 图标形状 */
    shape        : { type: String as PropType<'circle' | 'square'>, default: 'square' },
    /** 组件尺寸 */
    size         : { type: String as PropType<ComponentSize>, default: 'normal' },
}

export type CheckboxProps = ExtractPropTypes<typeof checkbox_props>
