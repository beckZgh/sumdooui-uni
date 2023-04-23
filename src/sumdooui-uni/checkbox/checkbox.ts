
import type { PropType, ExtractPropTypes } from 'vue'

export const checkbox_props = {
    /** 显示类型 */
    type          : { type: String as PropType<'card'> },
    /** 绑定值 */
    modelValue    : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 为 true 时的值 */
    activeValue   : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: true  },
    /** 为 false 时的值 */
    inactiveValue : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 为 true 时的颜色 */
    activeColor   : { type: String },
    /** 为 false 时的颜色 */
    inactiveColor : { type: String },
    /** 标题 */
    label         : { type: String },
    /** 描述 */
    desc          : { type: String },
    /** 禁用状态 */
    disabled      : { type: Boolean },
    /** 只读状态 */
    readonly      : { type: Boolean },
    /** 默认值 */
    defaultChecked: { type: Boolean, default: undefined },
    /** 图标位置 */
    iconPosition  : { type: String as PropType<'left' | 'right'>, default: 'left' },
}

export type CheckboxProps = ExtractPropTypes<typeof checkbox_props>
