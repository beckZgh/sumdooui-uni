import type { PropType, ExtractPropTypes } from 'vue'

export type PickerOptionItem = { label: string | number; value: string | number; children?: PickerOptionItem[]; [key: string]: any }
export type PickerMode = 'single-column' | 'multi-column' | 'auto-column'

export const picker_props = {
    /** 显示隐藏开关 */
    visible         : { type: Boolean, default: false },
    /** 默认选中值 */
    defaultValue    : { type: Array as PropType<(string | number)[]> },
    /** 标题 */
    title           : { type: String },
    /** 选择器模式 */
    mode            : { type: String as PropType<PickerMode>, default: 'single-column' },
    /** 取消文本 */
    cancelText      : { type: String, default: '取消' },
    /** 确认文本 */
    confirmText     : { type: String, default: '确认' },
    /** 数据源 */
    options         : { type: Array as PropType<PickerOptionItem[] | PickerOptionItem[][]>, default: () => [] },
    /** 单个选项的高度 */
    itemHeight      : { type: Number, default: 50 },
    /** 每列中可见选项的数量 */
    visibleItemCount: { type: Number, default: 5 },
    /** 是否在手指松开时立即触发 change 事件。 若不开启则会在滚动动画结束后触发 change 事件 */
    immediateChange : { type: Boolean, default: false },
}

export type PickerProps = ExtractPropTypes<typeof picker_props>
