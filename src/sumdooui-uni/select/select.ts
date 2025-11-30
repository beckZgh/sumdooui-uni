import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'

export const select_props = {
    /** 显示隐藏开关 */
    visible          : { type: Boolean, default: false },
    /** 默认值 */
    defaultValue     : { type: [String, Number, Array] as PropType<string | number | (string | number)[]> },
    /** 数据源 */
    options          : { type: Array as PropType<Component.OptionItem[]>, default: () => [] },
    /** 选项键属性配置 */
    keys             : { type: Object as PropType<Record<string, string>>, default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }) },
    /** 过滤函数 */
    filter           : { type: Function as PropType<(item: Component.OptionItem) => boolean> },
    /** 是否多选 */
    multi            : { type: Boolean, default: undefined },
    /** 多选时，最多选择项数 */
    max              : { type: Number },
    /** 标题 */
    title            : { type: String, default: '请选择' },
    /** 选择器模式 */
    cancelButtonText : { type: String, default: '取消' },
    /** 确认文本 */
    confirmButtonText: { type: String, default: '确认' },
    /** 图标位置 */
    iconPosition     : { type: String as PropType<'left' | 'right'>, default: 'right' },
    /** 选中的颜色 */
    activeColor      : { type: String },
    /** 选中的图标 */
    activeIcon       : { type: String },
}

export type SelectProps = ExtractPropTypes<typeof select_props>
