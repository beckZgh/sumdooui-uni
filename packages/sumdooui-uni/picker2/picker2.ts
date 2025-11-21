import type { PropType, ExtractPropTypes } from 'vue'

export type PickerOptionItem = { label: string | number; value: string | number; [key: string]: any }

export const picker2_props = {
    /** 显示隐藏开关 */
    visible         : { type: Boolean, default: false },
    /** 默认值 */
    defaultValue    : { type: Array as PropType<any[]> },
    /** 显示属性名 */
    labelField      : { type: String, default: 'label' },
    /** 值属性名 */
    valueField      : { type: String, default: 'value' },
    /** 标题 */
    title           : { type: String },
    /** 选择器模式 */
    cancelText      : { type: String, default: '取消' },
    /** 确认文本 */
    confirmText     : { type: String, default: '确认' },
    /** 数据源 */
    options         : { type: Array as PropType<PickerOptionItem[][]>, default: () => [] },
    /** 单个选项的高度 */
    itemHeight      : { type: Number, default: 50 },
    /** 每列中可见选项的数量 */
    visibleItemCount: { type: Number, default: 5 },
    /** 是否在手指松开时立即触发 change 事件。 若不开启则会在滚动动画结束后触发 change 事件 */
    immediateChange : { type: Boolean, default: false },
}

export type Picker2Props = ExtractPropTypes<typeof picker2_props>
