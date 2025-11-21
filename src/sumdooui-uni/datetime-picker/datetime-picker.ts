import type {  ExtractPropTypes } from 'vue'

export type DatetimeMode = 'year' | 'year-month' | 'date' | 'time' | 'datetime'

export const datetime_picker_props = {
    /** 显示隐藏开关 */
    visible         : { type: Boolean, default: false },
    /** 默认值 */
    defaultValue    : { type: String },
    /** 日期时间选择器模式 */
    mode            : { type: String, default: 'datetime' },
    /** 最小日期 */
    minDate         : { type: String },
    /** 最大日期 */
    maxDate         : { type: String },
    /** 最小小时 */
    minHour         : { type: Number, default: 0 },
    /** 最大小时 */
    maxHour         : { type: Number, default: 23 },
    /** 最小分钟 */
    minMinute       : { type: Number, default: 0 },
    /** 最大分钟 */
    maxMinute       : { type: Number, default: 59 },
    /** 标题 */
    title           : { type: String },
    /** 选择器模式 */
    cancelText      : { type: String, default: '取消' },
    /** 确认文本 */
    confirmText     : { type: String, default: '确认' },
    /** 单个选项的高度 */
    itemHeight      : { type: Number, default: 50 },
    /** 每列中可见选项的数量 */
    visibleItemCount: { type: Number, default: 5 },
    /** 是否在手指松开时立即触发 change 事件。 若不开启则会在滚动动画结束后触发 change 事件 */
    immediateChange : { type: Boolean, default: false },
}

export type DatetimePickerProps = ExtractPropTypes<typeof datetime_picker_props>
