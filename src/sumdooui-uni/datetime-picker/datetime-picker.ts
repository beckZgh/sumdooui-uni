import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'


export type DatetimePickerMode = 'year' | 'month' | 'date' | 'year-month' | 'time'
export const datetime_picker_props = {
    ...COMMON_PROPS,

    /** 显示隐藏开关 */
    visible     : { type: Boolean, default: false },
    /** 默认选中值 */
    defaultValue: { type: [String, Number, Array] as PropType<string | number | (string | number)[]> },
    /** 标题 */
    title       : { type: String },
    /** 选择器模式 */
    mode        : { type: String as PropType<DatetimePickerMode>, default: 'date' },
    startYear   : { type: Number },
    endYear     : { type: Number },
    /** 取消文本 */
    cancelText  : { type: String, default: '取消' },
    /** 确认文本 */
    confirmText : { type: String, default: '确认' },
}

export type DatetimePickerProps = ExtractPropTypes<typeof datetime_picker_props>
