import type { PropType, ExtractPropTypes } from 'vue'

export type PickerOptionItem = { label: string | number; value: string | number; [key: string]: any }

export const picker2_props = {
    /** 显示隐藏开关 */
    visible: { type: Boolean, default: false },

    /** 默认值 */
    defaultValue: { type: Array as PropType<any[]> },

    /** 数据源 */
    columns: { type: Array as PropType<PickerOptionItem[][]>, default: () => [] },

    /** 选项键属性配置 */
    keys: { type: Object as PropType<Record<string, string>>, default: () => ({ label: 'label', value: 'value', disabled: 'disabled' }) },

    /** 标题 */
    title: { type: String },

    /** 取消按钮文本 */
    cancelButtonText: { type: String, default: '取消' },

    /** 确认按钮文本 */
    confirmButtonText: { type: String, default: '确认' },

    /** 单个选项的高度 */
    itemHeight: { type: Number, default: 50 },

    /** 每列中可见选项的数量 */
    visibleItemCount: { type: Number, default: 5 },

    /** 是否在手指松开时立即触发 change 事件。 若不开启则会在滚动动画结束后触发 change 事件 */
    immediateChange: { type: Boolean, default: false },

    /** 延迟渲染 (30毫秒)：用于解决数据量过大，渲染卡住动画界面，可延迟绑定数据等待动画完成进行渲染 */
    delay: { type: Number, default: 30 },
}

export type Picker2Props = ExtractPropTypes<typeof picker2_props>
