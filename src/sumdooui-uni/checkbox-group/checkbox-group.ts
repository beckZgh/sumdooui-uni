
import type { PropType, ExtractPropTypes } from 'vue'
import type { CheckboxProps } from '../checkbox/checkbox'
import { COMMON_PROPS } from '../common/props'

export type CheckboxOptionItem = Omit<CheckboxProps, 'modelValue'> & { value: CheckboxProps['activeValue'] }

export const checkbox_group_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue  : { type: Array as PropType<(string | number | boolean)[]>, default: () => [] },
    /** 选择框选项 */
    options     : { type: Array as PropType<CheckboxOptionItem[]>, default: () => [] },
    /** 禁用 */
    disabled    : { type: Boolean },
    /** 最多选择数量 */
    max         : { type: Number },
    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 图标形状 */
    shape       : { type: String as PropType<'circle' | 'square'>, default: 'circle' },
    /** 元素每个占一行 */
    wrap        : { type: Boolean, default: false },
    /** 一行显示数量 */
    column      : { type: Number, default: 1 },
    /** 激活颜色 */
    activeColor : { type: String },
}


export type CheckboxGroupProps = ExtractPropTypes<typeof checkbox_group_props>
