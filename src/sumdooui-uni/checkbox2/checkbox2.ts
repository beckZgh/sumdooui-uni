
import type { PropType, ExtractPropTypes } from 'vue'
import type { EcheckboxGroupTypes } from '../checkbox-group2/types'

import { COMMON_PROPS } from '../common/props'


export const checkbox2_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },

    /** 是否默认选中，非受控属性 */
    defaultChecked: { type: Boolean, default: undefined },

    /** 形状：square | circle | button | button-check */
    shape: { type: String as PropType<EcheckboxGroupTypes.CheckboxShape>, default: 'square' },

    /** 是否为块级元素 */
    block: { type: Boolean, default: undefined },

    /** 选中图标自定义 （shape 值为: square | circle 有效） */
    activeIcon: { type: String },

    /** 选中的颜色 */
    activeColor: { type: String },

    /** 非选中状态自定义值 */
    inactiveValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },

    /** 选中状态自定义值 */
    activeValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: true },

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

export type Checkbox2Props = ExtractPropTypes<typeof checkbox2_props>
