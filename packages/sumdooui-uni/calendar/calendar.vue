<script lang="ts">
import { calendar_props, type CalendarDefaultDate, type CalendarDay } from './calendar'

import { defineComponent, reactive, toRefs, computed, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
import { MpMixin } from '../common/mixins'

import CalendarHeader from './components/CalendarHeader.vue'
import CalendarMonth  from './components/CalendarMonth.vue'

import { dt } from '../utils'
export default defineComponent({
    ...MpMixin,

    name      : 'Calendar',
    components: {
        CalendarHeader,
        CalendarMonth,
    },
    props: calendar_props,
    emits: [
        'update:visible',
        'confirm',
        'select',
        'unselect',
        'open',
        'close',
        'click-subtitle',
        'prev-year',
        'prev-month',
        'next-year',
        'next-month',
    ],
    setup(props, { emit }) {
        const visible$ = computed({
            get() { return props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        const state = reactive({
            year_month_title: '',              // 日历副标题
            current_date    : [] as string[],  // 当前选中数据
            today           : '',              // 今日
            scroll_into_view: '',              // 滚动至可视区域
            start_date      : '',              // 开始日期
            end_date        : '',              // 结束日期
            months          : [] as number[],  // 生成的所有月份
        })

        // 监听类型变化，重新计算选中值
        watch(() => props.defaultDate, init)
        watch(() => props.mode      , resetOnModeChanged)
        watch(() => props.scrollable, init)
        watch(() => props.visible   , () => {
            init()
            initRect()
            scrollIntoView()
        })

        onMounted(() => {
            initRect()
            scrollIntoView()
        })

        // 平铺模式，初始化一次
        init()
        function init() {
            if (!props.visible) return
            const today = dt.format(new Date())
            state.today = today
            // 滚动模式默认展示包含当月共七个月
            if (props.scrollable) {
                state.start_date = props.startDate ? dt.format(props.startDate) : state.today
                state.end_date   = props.endDate   ? dt.format(props.endDate)   : dt.newDate(dt.getYear(today), dt.getMonth(today) + 6, dt.getDay(today))
                state.months     = dt.getMonths(state.start_date, state.end_date)

            // 切换模式默认展示当月
            } else {
                state.start_date = ''
                state.end_date   = ''
                if (props.startDate) state.start_date = dt.format(props.startDate)
                if (props.endDate  ) state.end_date   = dt.format(props.endDate)
            }
            state.current_date = getInitialDate(props.defaultDate)

            // 切换模式
            if (!props.scrollable) {
                state.months = [new Date(state.current_date[0] || state.today).getTime()]
            }
            // 格式化月份标题
            state.year_month_title = formatMonthTitle(state.current_date[0] || state.today)
        }

        // 取得初始化选中日期
        function getInitialDate(default_date?: CalendarDefaultDate | CalendarDefaultDate[]): string[] {
            if (props.mode === 'range') {
                const current_date = [] as string[]
                if (Array.isArray(default_date) && default_date[0] && default_date[1]) {
                    current_date[0] = limitDateRange(dt.format(default_date[0]))
                    current_date[1] = limitDateRange(dt.format(default_date[1]))

                    if (!props.allowSameDay && current_date[0] === current_date[1]) {
                        current_date[1] = ''
                    }
                }
                return current_date
            } else if (props.mode === 'multiple') {
                const dates = (Array.isArray(props.defaultDate) ? props.defaultDate : [])
                    .map(date => limitDateRange(dt.format(date)))
                return dates.length ? dates : [state.today]
            } else {
                const default_date = (Array.isArray(props.defaultDate) ? props.defaultDate[0] : props.defaultDate) || state.today
                return [limitDateRange(dt.format(default_date))]
            }
        }

        // 检查日期是否在规定范围内
        function limitDateRange(default_date: string) {
            const { start_date, end_date } = state
            if (start_date && default_date < start_date) return start_date
            if (end_date   && default_date > end_date  ) return end_date
            return default_date
        }

        function onClickDay(item: CalendarDay) {
            // 只读状态或禁用状态不处理
            if (props.readonly || props.disabled) return

            switch (props.mode) {
                case 'range': {
                    const [start_date, end_date] = state.current_date
                    if (start_date && !end_date) {
                        if (item.date > start_date) {
                            state.current_date = [start_date, item.date]
                            if (!props.showConfirmButton) onConfirm()
                        } else if (item.date < start_date) {
                            state.current_date = [item.date, state.current_date[0]]
                        } else if (item.date === start_date && props.allowSameDay) {
                            state.current_date = [item.date, item.date]
                            if (!props.showConfirmButton) onConfirm()
                        }
                    } else {
                        state.current_date = [item.date]
                    }
                    return
                }
                case 'multiple': {
                    const idx = state.current_date.indexOf(item.date)
                    if (idx === -1) {
                        state.current_date = [...state.current_date, item.date]
                        emit('select', item.date)
                    } else {
                        state.current_date.splice(idx, 1)
                        state.current_date = [...state.current_date]
                        emit('unselect', item.date)
                    }
                    return
                }
                case 'single': {
                    state.current_date = [item.date]
                    emit('select', item.date)
                    if (!props.showConfirmButton) onConfirm()
                    break
                }
            }
        }

        function onConfirm() {
            emit('confirm', props.mode === 'single' ? state.current_date[0] : [...state.current_date])
            visible$.value = false
        }

        function formatMonthTitle(date: string | number | Date) {
            return dt.format(date, 'YYYY年MM月')
        }

        const instance = getCurrentInstance()
        let content_observer = null as null | UniApp.IntersectionObserver
        function initRect() {
            if (!props.scrollable || !props.visible) return

            if (content_observer) content_observer.disconnect()
            content_observer = uni.createIntersectionObserver(instance, {
                thresholds: [0, 0.1, 0.9, 1],
                observeAll: true,
            })

            content_observer.relativeTo('.sd-calendar__body')
            content_observer.observe('.month', (res) => {
                if (res.boundingClientRect.top <= res.relativeRect.top) {
                    state.year_month_title = formatMonthTitle((res as any).dataset.month)
                }
            })
        }

        // 目标月份日期滚动到可视区域
        function scrollIntoView() {
            if (!props.poppable || !props.visible) return

            state.scroll_into_view = '' // 解决 scroll-into-view 相同值不触发滚动
            nextTick(() => {
                const date = (Array.isArray(state.current_date) ? state.current_date[0] : state.current_date) || state.today
                const index = state.months.findIndex(month => dt.getMonth(month) === dt.getMonth(date))
                if (index !== -1) state.scroll_into_view = `month_${ index }`
            })
        }

        // 监听模式变化重置数据
        function resetOnModeChanged() {
            state.current_date = getInitialDate(props.defaultDate)
            scrollIntoView()
        }

        // 月、日点击切换
        function onPannelSwitch(type: 'prev-year' | 'prev-month' | 'next-month' | 'next-year') {
            const year  = dt.getYear(state.months[0])
            const month = dt.getMonth(state.months[0])

            if (type === 'prev-year' ) state.months = [new Date(dt.newDate(year - 1, month, 1)).getTime()]
            if (type === 'prev-month') state.months = [new Date(dt.newDate(year, month - 1, 1)).getTime()]
            if (type === 'next-month') state.months = [new Date(dt.newDate(year, month + 1, 1)).getTime()]
            if (type === 'next-year' ) state.months = [new Date(dt.newDate(year + 1, month, 1)).getTime()]

            state.year_month_title = formatMonthTitle(state.months[0])

            emit(type)
        }

        return {
            ...toRefs(state),
            visible$,
            onClickDay,
            onConfirm,
            onPannelSwitch,
        }
    },
})
</script>

<template>
    <sd-popup
        v-if="poppable"
        v-model:visible="visible$"
        :scrollable="false"
        :title="showTitle ? (title || '请选择日期') : ''"
        position="bottom"
        @open="$emit('open')"
        @close="$emit('close')"
    >
        <view class="sd-calendar sd-calendar--popup">
            <CalendarHeader
                :scrollable="scrollable"
                :show-title="showTitle"
                :title="title"
                :show-subtitle="showSubtitle"
                :subtitle="year_month_title"
                :first-day-of-week="firstDayOfWeek"
                :poppable="poppable"
                @prev-year="onPannelSwitch('prev-year')"
                @prev-month="onPannelSwitch('prev-month')"
                @next-month="onPannelSwitch('next-month')"
                @next-year="onPannelSwitch('next-year')"
                @click-subtitle="$emit('click-subtitle')"
            />
            <scroll-view
                class="sd-calendar__body"
                scroll-y
                :scroll-into-view="scroll_into_view"
            >
                <view
                    v-for="(item, index) in months"
                    :id="`month_${ index }`"
                    :key="`month_${ index }`"
                    :data-month="item"
                    class="month"
                >
                    <CalendarMonth
                        :today="today"
                        :date="item"
                        :mode="mode"
                        :scrollable="scrollable"
                        :color="color"
                        :show-mark="showMark"
                        :row-height="rowHeight"
                        :formatter="formatter"
                        :current-date="current_date"
                        :start-date="start_date"
                        :end-date="end_date"
                        :first-day-of-week="firstDayOfWeek"
                        :allow-same-day="allowSameDay"
                        :show-subtitle="false"
                        :show-month-title="scrollable && index > 0"
                        :show-non-current-month="showNonCurrentMonth"
                        :weeks-with-month="weeksWithMonth"
                        :disabled="disabled"
                        @click="onClickDay"
                    />
                </view>
            </scroll-view>
        </view>

        <template #footer>
            <view v-if="showConfirmButton" class="sd-calendar__footer">
                <sd-button
                    block round type="primary"
                    :disabled="disabled || readonly"
                    :custom-style="color ? { background: color } : undefined"
                    @click="onConfirm"
                >
                    {{ confirmButtonText || '确认' }}
                </sd-button>
            </view>
        </template>
    </sd-popup>

    <view v-else class="sd-calendar">
        <CalendarHeader
            :scrollable="scrollable"
            :show-title="showTitle"
            :title="title"
            :show-subtitle="showSubtitle"
            :subtitle="year_month_title"
            :first-day-of-week="firstDayOfWeek"
            :poppable="poppable"
            @prev-year="onPannelSwitch('prev-year')"
            @prev-month="onPannelSwitch('prev-month')"
            @next-month="onPannelSwitch('next-month')"
            @next-year="onPannelSwitch('next-year')"
            @click-subtitle="$emit('click-subtitle')"
        />
        <view class="sd-calendar__body">
            <view
                v-for="(item, index) in months"
                :id="`month_${ index }`"
                :key="`month_${ index }`"
                :data-month="item"
                class="month"
            >
                <CalendarMonth
                    :today="today"
                    :date="item"
                    :mode="mode"
                    :scrollable="scrollable"
                    :color="color"
                    :show-mark="showMark"
                    :row-height="rowHeight"
                    :formatter="formatter"
                    :current-date="current_date"
                    :start-date="start_date"
                    :end-date="end_date"
                    :first-day-of-week="firstDayOfWeek"
                    :allow-same-day="allowSameDay"
                    :show-subtitle="false"
                    :show-month-title="scrollable && index > 0"
                    :show-non-current-month="showNonCurrentMonth"
                    :weeks-with-month="weeksWithMonth"
                    :disabled="disabled"
                    @click="onClickDay"
                />
            </view>
        </view>
        <view v-if="showConfirmButton" class="sd-calendar__footer">
            <sd-button
                block round type="primary"
                :disabled="disabled || readonly"
                :custom-style="color ? { background: color } : undefined"
                @click="onConfirm"
            >
                {{ confirmButtonText || '确认' }}
            </sd-button>
        </view>
    </view>
</template>

