
import type { PropType, ExtractPropTypes } from 'vue'
import type { RadioGroupTypes } from '../radio-group2/types'

import { COMMON_PROPS } from '../common/props'

export const radio_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue: { type: Boolean, default: undefined },

    /** 是否默认选中，非受控属性 */
    defaultChecked: { type: Boolean, default: undefined },

    // 允许不选中
    allowUncheck: { type: Boolean, default: undefined },

    // 唯一标识符（Group 模式必须声明 name）
    name: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },

    /** 形状：square | circle | button | button-check */
    shape: { type: String as PropType<RadioGroupTypes.RadioShape>, default: 'circle' },

    /** 是否为块级元素 */
    block: { type: Boolean, default: undefined },

    /** 选中图标自定义 （shape 值为: square | circle 有效） */
    activeIcon: { type: String },

    /** 选中的颜色 */
    activeColor: { type: String },

    /** 禁用状态 */
    disabled: { type: Boolean, default: undefined },

    /** 只读模式 */
    readonly: { type: Boolean, default: undefined },

    /** 文本内容 */
    label: { type: String },

    /** 描述内容 */
    content: { type: String },

    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'> },

}

export type RadioProps = ExtractPropTypes<typeof radio_props>
