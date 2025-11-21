<script lang="ts">
import type { PropType, CSSProperties   } from 'vue'
import type { CalendarMode, CalendarDay } from '../calendar'

import { defineComponent, computed, ref, watch } from 'vue'
import { MpMixin } from '../../common/mixins'

import CalendarWeeks from './CalendarWeeks.vue'

import { dt } from '../../utils'
export default defineComponent({
    ...MpMixin,

    name      : 'CalendarMonth',
    components: { CalendarWeeks },
    props     : {
        /** 日历模式, 默认滚动模式、关闭为切换模式  */
        scrollable         : { type: Boolean },
        /** 选择类型 */
        mode               : { type: String as PropType<CalendarMode> },
        /** 今日 */
        today              : { type: String, required: true },
        /** 当前日期 */
        date               : { type: [Number, Date] as PropType<Date | number>, required: true },
        /** 开始日期 */
        startDate          : { type: String },
        /** 结束日期 */
        endDate            : { type: String },
        /** 当前选中日期 */
        currentDate        : { type: Array as PropType<string[]>, default: () => [] },
        /** 自定义主题 */
        color              : { type: String },
        /** 显示月份背景 */
        showMark           : { type: Boolean },
        /** 日历行高 */
        rowHeight          : { type: Number },
        /** 格式化函数 */
        formatter          : { type: Function },
        /** 一周起始日 */
        firstDayOfWeek     : { type: Number, default: 1 },
        /** 运行相同日期 */
        allowSameDay       : { type: Boolean },
        /** 显示月份标题 */
        showMonthTitle     : { type: Boolean },
        /** 显示非当月数据，仅切换模式生效 */
        showNonCurrentMonth: { type: Boolean },
        /** 每个月下方都显示周星期刻度, 用于平铺时，单独月样式显示 */
        weeksWithMonth     : { type: Boolean },
        /** 禁用状态 */
        disabled           : { type: Boolean },
    },
    emits: ['click'],
    setup(props, { emit }) {
        const month_num$   = computed(() => dt.getMonth(props.date))
        const month_title$ = computed(() => dt.format(props.date, `YYYY年MM月`))

        const days = ref<CalendarDay[]>(getDays())

        // 取得当前月的星期，距离起始日的偏移量
        const offset_day$ = computed(() => getOffsetDay())

        watch(() => [
            props.date,
            props.startDate,
            props.endDate,
            props.formatter,
            props.firstDayOfWeek,
            props.currentDate,
        ], () => {
            days.value = getDays()
        })

        function getDays() {
            const start_date = dt.firstDateOfMonth(props.date)
            const end_date   = dt.lastDateOfMonth(props.date)
            const total_day  = dt.getDiffDays(start_date, end_date) + 1

            const year  = dt.getYear(props.date)
            const month = dt.getMonth(start_date)

            const days: CalendarDay[] = []
            for (let day = 1; day <= total_day; day++) {
                const date = dt.newDate(year, month, day)
                const type = getDayType(date)

                let config: CalendarDay = {
                    date,
                    type      ,
                    text      : day,
                    bottomInfo: getBottomInfo(type),
                    monthType : 'current',
                }

                // 处理格式化
                if (props.formatter) config = props.formatter(config)

                days.push(config)
            }

            // 切换模式，补充上下月数据
            if (!props.scrollable) {
                // 补充上月数据
                let first_date = start_date
                let prev_count = getOffsetDay()
                while (prev_count > 0) {
                    first_date = dt.prevDate(first_date)
                    let config: CalendarDay = {
                        date      : first_date,
                        type      : 'disabled',
                        text      : dt.getDay(first_date),
                        bottomInfo: '',
                        monthType : 'prev',
                        className : '',
                    }
                    // 处理格式化
                    if (props.formatter) config = props.formatter(config)

                    days.unshift(config)
                    prev_count -= 1
                }

                // 补充下月数据
                let last_date  = end_date
                let next_count = 42 - days.length
                while (next_count > 0) {
                    while (next_count) {
                        last_date = dt.nextDate(last_date)
                        let config: CalendarDay = {
                            date      : last_date,
                            type      : 'disabled',
                            text      : dt.getDay(last_date),
                            bottomInfo: '',
                            monthType : 'next',
                        }
                        // 处理格式化
                        if (props.formatter) config = props.formatter(config)

                        days.push(config)
                        next_count -= 1
                    }
                }
            }
            return days
        }

        function getOffsetDay() {
            // 取得当前月份的第一天的星期几
            const  current = dt.getWeekday(dt.firstDateOfMonth(props.date))
            return current < props.firstDayOfWeek
                ? (7 - props.firstDayOfWeek + current)
                : current === 7 && props.firstDayOfWeek === 0
                    ? 0
                    : (current - props.firstDayOfWeek)
        }

        function getDayStyle(item: CalendarDay, index: number) {
            const style: CSSProperties = {}
            if (props.color) {
                if (['start', 'end', 'start-end', 'selected', 'multiple-selected', 'multiple-selected'].includes(item.type)) {
                    style.backgroundColor = props.color
                } else if (['middle'].includes(item.type)) {
                    style.color = props.color
                }
            }
            if (props.scrollable && index === 0) {
                style.marginLeft = `${ 100 / 7 * offset_day$.value }%`
            }
            if (props.rowHeight) {
                style.height = `${ props.rowHeight }px`
            }
            return style
        }

        function getDayType(date: string) {
            if (props.disabled) return 'disabled'

            const { mode, startDate, endDate, currentDate } = props

            // 超出给定范围
            if ((startDate && date < startDate) || (endDate && date > endDate)) {
                return 'disabled'
            }

            switch (mode) {
                case 'date'     : return dt.compareDay(date, currentDate[0]) === 0 ? 'selected' : ''
                case 'dates'    : return getMultipeDayType(date)
                case 'daterange': return getRangeDayType(date)
                default         : return ''
            }
        }

        function getMultipeDayType(date: string) {
            const isSelected = (date: string) => {
                return props.currentDate.some(curr_date => dt.compareDay(curr_date, date) === 0)
            }
            const curr_selected = isSelected(date)
            if ( !curr_selected) return ''

            const prev_day = dt.prevDate(date)
            const next_day = dt.nextDate(date)
            const prev_selected = isSelected(prev_day)
            const next_selected = isSelected(next_day)

            if (prev_selected && next_selected) return 'multiple-middle'
            if (prev_selected) return 'end'
            return next_selected ? 'start' : 'multiple-selected'
        }

        function getRangeDayType(date: string) {
            const [start_date, end_date] = props.currentDate
            if ( !start_date ) return ''

            const start_result = dt.compareDay(date, start_date)
            if (!end_date) return start_result === 0 ? 'start' : ''

            const end_result = dt.compareDay(date, end_date)
            if (start_result === 0 && end_result === 0 && props.allowSameDay) return 'start-end'

            if (start_result === 0) return 'start'
            if (end_result === 0  ) return 'end'
            if (start_result > 0 && end_result < 0) return 'middle'

            return ''
        }

        function getBottomInfo(type: string) {
            if (props.mode === 'daterange') {
                if (type === 'start') {
                    return '开始'
                }
                if (type === 'end') {
                    return '结束'
                }
                if (type === 'start-end') {
                    return '开始/结束'
                }
            }
        }

        function onClick(item: CalendarDay) {
            if (item.type === 'disabled') return
            emit('click', item)
        }

        return {
            month_num$,
            month_title$,
            days,
            getDayStyle,
            onClick,
        }
    },
})
</script>

<template>
    <view v-if="showMonthTitle" class="sd-calendar__month-title">
        {{ month_title$ }}
    </view>
    <CalendarWeeks v-if="weeksWithMonth" :first-day-of-week="firstDayOfWeek" />
    <view class="sd-calendar__days">
        <view v-if="showMark" class="sd-calendar__month-mark">
            {{ month_num$ }}
        </view>
        <view
            v-for="(item, index) in days" :key="index"
            class="sd-calendar__day"
            :style="getDayStyle(item, index)"
            :class="{
                'is-disabled'                       : item.type === 'disabled',
                [`sd-calendar__day--${ item.type }`]: item.type !== 'disabled',
                [item.className || '']              : !!item.className,
            }"
            @tap="onClick(item)"
        >
            <view v-if="showNonCurrentMonth || item.monthType === 'current'">
                <view v-if="item.topInfo" class="sd-calendar__top-info">
                    {{ item.topInfo }}
                </view>
                {{ item.text }}
                <view v-if="item.bottomInfo" class="sd-calendar__bottom-info">
                    {{ item.bottomInfo }}
                </view>
            </view>
        </view>
    </view>
</template>
