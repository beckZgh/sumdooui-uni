
import type { PropType, ExtractPropTypes } from 'vue'
import type { EcheckboxGroupTypes } from './types'

import { COMMON_PROPS } from '../common/props'

export const checkbox_group2_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue: { type: Array as PropType<(string | number | boolean)[]>, default: () => [] },

    /** 最多可选择的数量 */
    max: { type: Number },

    /** 选项 */
    options: { type: Array as PropType<EcheckboxGroupTypes.OptionItem[]>, default: () => [] },

    /** 选项键属性配置 */
    keys: { type: Object as PropType<EcheckboxGroupTypes.OptionItemKeys>, default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }) },

    /** 形状：square | circle | button | button-check */
    shape: { type: String as PropType<EcheckboxGroupTypes.CheckboxShape>, default: 'square' },

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

export type CheckboxGroup2Props = ExtractPropTypes<typeof checkbox_group2_props>
