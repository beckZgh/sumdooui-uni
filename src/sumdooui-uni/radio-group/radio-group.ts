
import type { PropType, ExtractPropTypes } from 'vue'
import type { RadioProps } from '../radio/radio'
import { COMMON_PROPS } from '../common/props'

export type RadioOptionItem = Omit<RadioProps, 'modelValue' | 'name'> & { value: RadioProps['name'] }

export const radio_group_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue  : { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },
    /** 选择框选项 */
    options     : { type: Array as PropType<RadioOptionItem[]>, default: () => [] },
    /** 禁用 */
    disabled    : { type: Boolean },
    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 图标形状 */
    shape       : { type: String as PropType<'circle' | 'square'>, default: 'circle' },
    /** 元素每个占一行 */
    wrap        : { type: Boolean, default: false },
    /** 显示列数 */
    column      : { type: Number, default: 1 },
    /** 激活颜色 */
    activeColor : { type: String },
}

export type RadioGroupProps = ExtractPropTypes<typeof radio_group_props>
