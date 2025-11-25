
import type { PropType, ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const radio2_props = {
    ...COMMON_PROPS,

    // 绑定值
    modelValue: { type: Boolean, default: undefined },

    // 是否默认选中，非受控属性
    defaultChecked: { type: Boolean, default: undefined },

    // 允许不选中
    allowUncheck: { type: Boolean, default: undefined },

    // 唯一标识符（Group 模式必须声明 name）
    name: { type: [String, Number, Boolean] as PropType<string | number | boolean>, default: undefined },

    // 未选中的颜色
    inactiveColor: { type: String },

    // 选中的颜色
    activeColor: { type: String },

    // 未选中的图标 （非 border 模式有效）
    inactiveIcon: { type: String },

    // 选中的图标（非 border 模式有效）
    activeIcon: { type: String },

    // 禁用
    disabled: { type: Boolean, default: undefined },

    // 只读模式
    readonly: { type: Boolean, default: undefined },

    // 主标题
    label: { type: String },

    // 内容
    content: { type: String },

    // 显示边框
    border: { type: Boolean, default: undefined },

    // 图标位置
    iconPosition: { type: String as PropType<'left' | 'right'> },

    /** 显示分割线 */
    divider: { type: Boolean, default: undefined },
}

export type Radio2Props = ExtractPropTypes<typeof radio2_props>
