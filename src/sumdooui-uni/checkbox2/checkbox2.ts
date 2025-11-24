
import type { PropType, ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const checkbox2_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },

    /** 是否默认选中，非受控属性 */
    defaultChecked: { type: Boolean, default: undefined },

    /** 非选中状态自定义值 */
    inactiveValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: false },

    /** 选中状态自定义值 */
    activeValue: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: true },

    /** 未选中的颜色 */
    inactiveColor: { type: String },

    /** 选中的颜色 */
    activeColor: { type: String },

    /** 未选中的图标 （非 border 模式有效） */
    inactiveIcon: { type: String },

    /** 选中的图标（非 border 模式有效） */
    activeIcon: { type: String },

    /** 选中的图标（非 border 模式有效） */
    disabled: { type: Boolean, default: undefined },

    /** 只读模式 */
    readonly: { type: Boolean, default: undefined },

    /** 文本内容 */
    label: { type: String },

    /** 描述内容 */
    content: { type: String },

    /** 显示边框 */
    border: { type: Boolean, default: undefined },

    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'> },
}

export type Checkbox2Props = ExtractPropTypes<typeof checkbox2_props>
