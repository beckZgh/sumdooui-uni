
import type { PropType, ExtractPropTypes } from 'vue'
import type { RadioGroupTypes } from './types'

import { COMMON_PROPS } from '../common/props'

export const radio_group_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean> },

    // 允许不选中
    allowUncheck: { type: Boolean, default: undefined },

    /** 最多可选择的数量 */
    max: { type: Number },

    /** 选项 */
    options: { type: Array as PropType<RadioGroupTypes.OptionItem[]>, default: () => [] },

    /** 选项键属性配置 */
    keys: { type: Object as PropType<RadioGroupTypes.OptionItemKeys>, default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }) },

    /** 形状：square | circle | button | button-check */
    shape: { type: String as PropType<RadioGroupTypes.RadioShape>, default: 'circle' },

    /** 选中的颜色 */
    activeColor: { type: String },

    /** 选中的图标 */
    activeIcon: { type: String },

    /** 禁用 */
    disabled: { type: Boolean, default: undefined },

    /** 只读模式 */
    readonly: { type: Boolean, default: undefined },

    /** 转换为块级元素 */
    block: { type: Boolean, default: undefined },

    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'> },

    /** 显示列数 */
    column: { type: Number, default: 0 },

    /** 显示分割线 */
    divider: { type: Boolean, default: undefined },
}

export type RadioGroupProps = ExtractPropTypes<typeof radio_group_props>
