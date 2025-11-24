
import type { PropType, ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const checkbox_group2_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue: { type: Array as PropType<(string | number | boolean)[]>, default: () => [] },

    /** 选项 */
    options: { type: Array as PropType<{ label?: string; value?: string | number | boolean; [k: string]: any }[]>, default: () => [] },

    /** 选项键属性配置 */
    keys: { type: Object as PropType<Record<string, string>>, default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }) },

    /** 未选中的颜色 */
    inactiveColor: { type: String },

    /** 未选中的图标 */
    inactiveIcon: { type: String },

    /** 选中的颜色 */
    activeColor: { type: String },

    /** 选中的图标 */
    activeIcon: { type: String },

    /** 禁用 */
    disabled: { type: Boolean, default: undefined },

    /** 只读模式 */
    readonly: { type: Boolean, default: undefined },

    /** 显示边框 */
    border: { type: Boolean, default: undefined },

    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'> },

    /** 最多可选择的数量 */
    max: { type: Number },

    /** 显示列数 */
    column: { type: Number, default: undefined },
}

export type CheckboxGroup2Props = ExtractPropTypes<typeof checkbox_group2_props>
