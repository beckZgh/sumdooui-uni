
import type { PropType, ExtractPropTypes } from 'vue'

export type CheckboxOptionItem = {
    label: string | number
    value: string | number | boolean
}

export const checkbox_group_props = {
    /** 显示类型 */
    type      : { type: String as PropType<'card'> },
    /** 绑定值 */
    modelValue: { type: Array as PropType<(string | number | boolean)[]>, default: () => [] },
    /** 最多选择数量 */
    max       : { type: Number },
    /** 最低选择数量 */
    min       : { type: Number },
    /** 一行显示数量 */
    column    : { type: Number, default: 1 },
    /** 选择框选项 */
    options   : { type: Array as PropType<CheckboxOptionItem[]>, default: () => [] },
    /** 禁用 */
    disabled  : { type: Boolean },
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkbox_group_props>
