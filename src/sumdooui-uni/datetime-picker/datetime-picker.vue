<script lang="ts">
import { defineComponent, computed, reactive, watch } from 'vue'
import { MpMixin               } from '../common/mixins'
import { datetime_picker_props } from './datetime-picker'
import $utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdDatetimePicker',
    props: datetime_picker_props,
    emits: [
        'update:visible',
        'pickerstart',
        'pickerend',
        'change',
        'open',
        'close',
        'cancel',
        'confirm',
    ],
    setup(props, ctx) {
        const now = new Date()
        const state = reactive({
            moving      : false,                        // 是否滚动中
            indexs      : [] as number[],               // 当前选中值列表
            // --------------------------------------------------------------------
            def_min_year: $utils.dt.getYear(now) - 10,  // 默认生成最小年份
            def_max_year: $utils.dt.getYear(now) + 10,  // 默认生成最大年份
            min_year    : 0,
            max_year    : 0,
            min_month   : 0,
            max_month   : 0,
            min_day     : 0,
            max_day     : 0,
            // --------------------------------------------------------------------
            year        : $utils.dt.getYear(now),       // 当前选中年份
            month       : $utils.dt.getMonth(now),      // 当前选中月份
        })

        const visible$ = computed({
            get() { return props.visible },
            set(value) { ctx.emit('update:visible', value) },
        })

        watch(() => props.minDate, (minDate) => {
            const d = getParseDate(minDate)
            state.min_year  = d ? $utils.dt.getYear(d)  : 0
            state.min_month = d ? $utils.dt.getMonth(d) : 0
            state.min_day   = d ? $utils.dt.getDay(d)   : 0
        }, { immediate: true })

        watch(() => props.maxDate, (maxDate) => {
            const d = getParseDate(maxDate)
            state.max_year  = d ? $utils.dt.getYear(d)  : 0
            state.max_month = d ? $utils.dt.getMonth(d) : 0
            state.max_day   = d ? $utils.dt.getDay(d)   : 0
        }, { immediate: true })

        // 年份
        const years$ = computed(() => {
            const min_year = state.min_year || state.def_min_year
            const max_year = state.max_year || state.def_max_year
            return genRange(min_year, max_year)
        })

        // 月份
        const months$ = computed(() => {
            let min_month = 1
            let max_month = 12

            // 最小或最大年的月份限制
            if (state.year === state.min_year && state.min_month) min_month = state.min_month
            if (state.year === state.max_year && state.max_month) max_month = state.max_month

            return genRange(min_month, max_month)
        })

        // 天数
        const days$ = computed(() => {
            const y_m_day = $utils.dt.getMonthDays(state.year, state.month) // 当前年月最大天数

            let min_day = 1
            let max_day = y_m_day // 取限制天数与当前年月份天数最小值

            // 最小或最大年月的天数限制
            const same_min_year  = state.year  === state.min_year
            const same_min_month = state.month === state.min_month
            const same_max_year  = state.year  === state.max_year
            const same_max_month = state.month === state.max_month
            if (same_min_year && same_min_month && state.min_day) min_day = state.min_day
            if (same_max_year && same_max_month && state.max_day) max_day = state.max_day

            return genRange(min_day, Math.min(max_day, y_m_day))
        })

        // 小时
        const hours$ = computed(() => {
            if (props.mode === 'time') {
                return genRange(props.minHour, props.maxHour)
            } else {
                return genRange(0, 23)
            }
        })

        // 分钟
        const minutes$ = computed(() => {
            if (props.mode === 'time') {
                return genRange(props.minMinute, props.maxMinute)
            } else {
                return genRange(0, 59)
            }
        })

        // 秒
        const seconds$ = computed(() => genRange(0, 59))

        // 显示列
        const columns$ = computed(() => {
            switch (props.mode) {
                case 'year'      : return [years$.value]
                case 'year-month': return [years$.value, months$.value]
                case 'date'      : return [years$.value, months$.value, days$.value]
                case 'time'      : return [hours$.value, minutes$.value]
                case 'datetime'  : return [years$.value, months$.value, days$.value, hours$.value, minutes$.value, seconds$.value]
                default          : return []
            }
        })

        function onOpen() {
            const date  = safeParseDefaultValue(props.defaultValue)
            state.year  = $utils.dt.getYear(date)
            state.month = $utils.dt.getMonth(date)

            initIndexs(date)
        }

        // 初始化选中下标
        function initIndexs(date: Date) {
            // 日期范围限制，如超出默认选择当前时间
            if (props.minDate || props.maxDate) {
                const min_date = getParseDate(props.minDate)
                const max_date = getParseDate(props.maxDate)
                const is_min_over = min_date ? $utils.dt.format(date) < $utils.dt.format(min_date) : false
                const is_max_over = max_date ? $utils.dt.format(date) > $utils.dt.format(max_date) : false
                if (is_min_over || is_max_over) {
                    date = new Date()
                }
            }

            const year     = $utils.dt.getYear(date)
            const year_idx = years$.value.findIndex(y => +y === year)

            const month     = $utils.dt.getMonth(date)
            const month_idx = months$.value.findIndex(m => +m === month)

            const day     = $utils.dt.getDay(date)
            const day_idx = days$.value.findIndex(d => +d === day)

            const hour     = date.getHours()
            const hour_idx = hours$.value.findIndex(hh => +hh === hour)

            const minute     = date.getMinutes()
            const minute_idx = minutes$.value.findIndex(mm => +mm === minute)

            const second     = date.getSeconds()
            const second_idx = seconds$.value.findIndex(ss => +ss === second)

            switch (props.mode) {
                case 'year': {
                    state.indexs = [Math.max(year_idx, 0)]
                    break
                }
                case 'year-month': {

                    state.indexs = [
                        Math.max(year_idx, 0),
                        Math.max(month_idx, 0),
                    ]
                    break
                }
                case 'date': {
                    state.indexs = [
                        Math.max(year_idx, 0),
                        Math.max(month_idx, 0),
                        Math.max(day_idx, 0),
                    ]
                    break
                }
                case 'time': {
                    state.indexs = [
                        Math.max(hour_idx, 0),
                        Math.max(minute_idx, 0),
                    ]
                    break
                }
                case 'datetime': {
                    state.indexs = [
                        Math.max(year_idx  , 0),
                        Math.max(month_idx , 0),
                        Math.max(day_idx   , 0),
                        Math.max(hour_idx  , 0),
                        Math.max(minute_idx, 0),
                        Math.max(second_idx, 0),
                    ]
                }
            }

        }

        // 安全解析日期
        function getParseDate(val: any): Date | null {
            const d = new Date(val)
            return isNaN(d.getTime()) ? null : d
        }

        // 安全解析日期时间
        function safeParseDefaultValue(val: unknown): Date {
            let d = new Date()

            // 非有效值不处理
            if (!$utils.isString(val) || !val) return d

            const value = props.defaultValue
            if (value) {
                switch (props.mode) {
                    case 'year': {
                        d = new Date(`${ value }-01-01`)
                        break
                    }
                    case 'year-month': {
                        d = new Date(`${ value }-01`)
                        break
                    }
                    case 'date'    :
                    case 'datetime': {
                        d = new Date(value)
                        break
                    }
                    case 'time': {
                        const [hh = 0, mm = 0] = value.split(':')
                        d.setHours(+hh)
                        d.setMinutes(+mm)
                        break
                    }
                }
            }

            return isNaN(d.getTime()) ? new Date() : d
        }

        // 生成指定范围的选项列表
        function genRange(start: number, end: number, suffix: string = ''): string[] {
            const arr: string[] = []
            for (let i = start; i <= end; i++) {
                arr.push(i < 10 ? `0${ i }${ suffix }` : `${ i }${ suffix }`)
            }
            return arr
        }

        // 滚动开始
        function onPickerStart() {
            state.moving = true
            ctx.emit('pickerstart')
        }

        // 选择器变化
        function onPickChange(e: any) {
            const old_indexs = state.indexs
            const new_indexs = e.detail.value as number[]

            // 变更列下标
            const changeColumnIndex = old_indexs.findIndex((val, idx) => val !== new_indexs[idx])

            // 联动更新 state，确保 days$ 响应式更新
            const mode = props.mode
            if (['month', 'date', 'datetime'].includes(mode)) {
                if (new_indexs[0] != null) state.year  = Number(years$.value[new_indexs[0]])
                if (new_indexs[1] != null) state.month = Number(months$.value[new_indexs[1]])
            }

            if (['date', 'datetime'].includes(mode)) {
                if (new_indexs[2] != null) {
                    const maxDay = $utils.dt.getMonthDays(state.year, state.month)
                    if (Number(days$.value[new_indexs[2]]) > maxDay) {
                        // 自动修正越界日
                        new_indexs[2] = days$.value.findIndex(d => Number(d) === maxDay)
                    }
                }
            }

            state.indexs = new_indexs

            ctx.emit('change', { changeColumnIndex, selectedIndexs: new_indexs })
        }

        // 滚动结束
        function onPickerEnd() {
            state.moving = false
            ctx.emit('pickerend')
        }

        // 取消选择
        function onCancel() {
            visible$.value = false
            ctx.emit('cancel')
        }

        // 确认选择
        function onConfirm() {
            if (state.moving) return // 滚动中不处理

            visible$.value = false

            ctx.emit('confirm', { value: getConfirmValue(), mode: props.mode })
        }

        function getConfirmValue() {
            switch (props.mode) {
                case 'year': {
                    return years$.value[state.indexs[0] ?? 0]
                }
                case 'year-month': {
                    return [
                        years$.value[state.indexs[0] ?? 0],
                        months$.value[state.indexs[1] ?? 0],
                    ].join('-')
                }
                case 'date': {
                    return [
                        years$.value[state.indexs[0] ?? 0],
                        months$.value[state.indexs[1] ?? 0],
                        days$.value[state.indexs[2] ?? 0],
                    ].join('-')
                }
                case 'time': {
                    return [
                        hours$.value[state.indexs[0] ?? 0],
                        minutes$.value[state.indexs[1] ?? 0],
                    ].join(':')
                }
                case 'datetime': {
                    const date = [
                        years$.value[state.indexs[0] ?? 0],
                        months$.value[state.indexs[1] ?? 0],
                        days$.value[state.indexs[2] ?? 0],
                    ].join('-')

                    const time = [
                        hours$.value[state.indexs[3] ?? 0],
                        minutes$.value[state.indexs[4] ?? 0],
                        seconds$.value[state.indexs[5] ?? 0],
                    ].join(':')

                    return `${ date } ${ time }`
                }
            }
        }

        return {
            state,
            visible$,
            columns$,
            onOpen,
            onPickerStart,
            onPickChange,
            onPickerEnd,
            onCancel,
            onConfirm,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="visible$"
        position="bottom"
        max-height="initial"
        :show-top-close="false"
        @open="onOpen"
        @close="$emit('close')"
    >
        <view class="sd-picker">
            <view v-if="title" class="sd-picker__title">
                {{ title }}
            </view>
            <view class="sd-picker-content" :style="{ height: `${ itemHeight * visibleItemCount }px` }">
                <picker-view
                    class="sd-picker-view"
                    :value="state.indexs"
                    :indicator-style="`height: ${ itemHeight }px`"
                    :immediate-change="immediateChange"
                    @pickstart="onPickerStart"
                    @pickend="onPickerEnd"
                    @change="onPickChange"
                >
                    <picker-view-column v-for="(columns, column_index) in columns$" :key="`column_${ column_index }`">
                        <view
                            v-for="(text, index) in columns" :key="index"
                            class="sd-picker-view-column"
                            :style="`height: ${ itemHeight }px`"
                        >
                            <text>{{ text }}</text>
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="sd-picker-footer">
                <sd-button text bg type="success" width="240rpx" :custom-style="{ marginRight: '15px' }" @click="onCancel">
                    {{ cancelText }}
                </sd-button>
                <sd-button width="240rpx" type="success" @click="onConfirm">
                    {{ confirmText }}
                </sd-button>
            </view>
        </view>
    </sd-popup>
</template>
