
import type { PropType, ExtractPropTypes } from 'vue'
import type { CheckboxProps } from '../checkbox/checkbox'
import { COMMON_PROPS } from '../common/props'

export type CheckboxOptionItem = Omit<CheckboxProps, 'modelValue'> & { value: CheckboxProps['activeValue'] }
export type CheckboxDirection  = 'row' | 'column'

export const checkbox_group_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue   : { type: Array as PropType<(string | number | boolean)[]>, default: () => [] },
    /** 选择框选项 */
    options      : { type: Array as PropType<CheckboxOptionItem[]>, default: () => [] },
    /** 排列方式 */
    direction    : { type: String as PropType<CheckboxDirection> },
    /** 禁用 */
    disabled     : { type: Boolean },
    /** 最多选择数量 */
    max          : { type: Number },
    /** 标题大小 */
    labelSize    : { type: [Number, String] },
    /** 图标位置 */
    iconPosition : { type: String as PropType<'left' | 'right'> },
    /** 图标大小 */
    iconSize     : { type: [Number, String] },
    /** 未选中的颜色 */
    inactiveColor: { type: String },
    /** 未选中的图标 */
    inactiveIcon : { type: String },
    /** 选中的颜色 */
    activeColor  : { type: String },
    /** 选中的图标 */
    activeIcon   : { type: String },
}


export type CheckboxGroupProps = ExtractPropTypes<typeof checkbox_group_props>
