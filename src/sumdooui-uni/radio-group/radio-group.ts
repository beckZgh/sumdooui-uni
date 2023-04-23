
import type { PropType, ExtractPropTypes } from 'vue'

export type RadioOptionItem = {
    label: string | number
    value: string | number | boolean
}

export const radio_group_props = {
    /** 显示类型 */
    type        : { type: String as PropType<'card' | 'block'> },
    /** 绑定值 */
    modelValue  : { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },
    /** 一行显示数量 */
    column      : { type: Number, default: 1 },
    /** 选择框选项 */
    options     : { type: Array as PropType<RadioOptionItem[]>, default: () => [] },
    /** 禁用 */
    disabled    : { type: Boolean },
    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 文本位置 */
    align       : { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 元素每个占一行 */
    wrap        : { type: Boolean, default: false },
}

export type RadioGroupProps = ExtractPropTypes<typeof radio_group_props>
