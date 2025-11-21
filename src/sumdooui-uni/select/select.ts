import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'

export const select_props = {
    /** 显示隐藏开关 */
    visible      : { type: Boolean, default: false },
    /** 标题 */
    title        : { type: String, default: '请选择' },
    /** 选择器模式 */
    cancelText   : { type: String, default: '取消' },
    /** 确认文本 */
    confirmText  : { type: String, default: '确认' },
    /** 默认值 */
    defaultValue : { type: [String, Number, Array] as PropType<string | number | (string | number)[]> },
    /** 显示属性名 */
    labelField   : { type: String, default: 'label' },
    /** 值属性名 */
    valueField   : { type: String, default: 'value' },
    /** 数据源 */
    options      : { type: Array as PropType<Component.OptionItem[]>, default: () => [] },
    /** 是否多选 */
    multi        : { type: Boolean, default: undefined },
    /** 多选时，最小选择项数 */
    min          : { type: Number },
    /** 多选时，最多选择项数 */
    max          : { type: Number },
    /** 图标位置 */
    iconPosition : { type: String as PropType<'left' | 'right'>, default: 'right' },
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
    /** 过滤函数 */
    filter       : { type: Function as PropType<(item: Component.OptionItem) => boolean> },
}

export type SelectProps = ExtractPropTypes<typeof select_props>
