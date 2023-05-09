import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'
import { COMMON_PROPS } from '../common/props'

export type CalendarMode = 'scroll' | 'switch'
export type CalendarType = 'single' | 'multiple' | 'range'
export type CalendarDefaultDate = string | number | Date

export interface CalendarDay {
    date: string
    type: string
    text: number
    topInfo?: string
    bottomInfo?: string
    monthType: 'prev' | 'current' | 'next'
}

export const calendar_props = {
    ...COMMON_PROPS,

    /** 日历模式, scroll 滚动模式、switch 切换模式  */
    mode               : { type: String as PropType<CalendarMode>, default: 'scroll' },
    /** 日期选择类型 */
    type               : { type: String as PropType<CalendarType>, default: 'single' },
    /** 日期自定义主题色 */
    color              : { type: String },
    /** 预设主题 */
    theme              : { type: String as PropType<Component.Theme>, default: 'primary' },
    /** 显示标题 */
    showTitle          : { type: Boolean, default: true },
    /** 显示副标题 */
    showSubtitle       : { type: Boolean, default: true },
    /** 标题 */
    title              : { type: String },
    /** 显示背景水印 */
    showMark           : { type: Boolean, default: true },
    /** 可选择的最小日期 */
    startDate          : { type: [String, Number, Date] as PropType<CalendarDefaultDate> },
    /** 可选择的最大日期 */
    endDate            : { type: [String, Number, Date] as PropType<CalendarDefaultDate> },
    /** 默认选中的日期 */
    defaultDate        : { type: [String, Number, Array] as PropType<CalendarDefaultDate | CalendarDefaultDate[]> },
    /** 日期行高 */
    rowHeight          : { type: Number, default: 64 },
    /** 日期格式化函数 */
    formatter          : { type: Function },
    /** 只读状态 */
    readonly           : { type: Boolean },
    /** 禁用状态 */
    disabled           : { type: Boolean },
    /** 周起始日 */
    firstDayOfWeek     : { type: Number, default: 1 },
    /** 允许相同日期 */
    allowSameDay       : { type: Boolean },
    /** 弹窗形式展示 */
    poppable           : { type: Boolean, default: true },
    /** 是否显示 */
    visible            : { type: Boolean, default: false },
    /** 显示确认按钮 */
    showConfirmButton  : { type: Boolean, default: true },
    /** 确认按钮文本 */
    confirmButtonText  : { type: String },
    /** 显示非当月数据，仅切换模式生效 */
    showNonCurrentMonth: { type: Boolean, default: true },
    /** 每个月下方都显示周星期刻度, 用于平铺时，单独月样式显示 */
    weeksWithMonth     : { type: Boolean, default: false },
}

export type CalendarProps = ExtractPropTypes<typeof calendar_props>
