
import type { PropType, ExtractPropTypes } from 'vue'
import type { RadioProps } from '../radio/radio'

import { COMMON_PROPS } from '../common/props'

export type RadioOptionItem = Omit<RadioProps, 'modelValue' | 'name'> & { value: RadioProps['name'] }
export type RadioDirection  = 'row' | 'column'

export const radio_group_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue   : { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },
    /** 选择框选项 */
    options      : { type: Array as PropType<RadioOptionItem[]>, default: () => [] },
    /** 排列方式 */
    direction    : { type: String as PropType<RadioDirection>, default: 'row' },
    /** 禁用 */
    disabled     : { type: Boolean },
    /** 图标大小 */
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

export type RadioGroupProps = ExtractPropTypes<typeof radio_group_props>
