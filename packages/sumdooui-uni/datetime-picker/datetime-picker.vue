<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { datetime_picker_props } from './datetime-picker'

export default defineComponent({
    name : 'SdDatetimePicker',
    props: datetime_picker_props,
    emits: [
        'update:visible',
        'cancel',
        'confirm',
        'pickerstart',
        'pickerend',
        'change',
        'open',
        'close',
    ],
    setup(props, { emit }) {
        const visible$ = computed({
            get() { return props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        const state = reactive({
            today          : new Date(),
            selected_indexs: [] as number[],
            years          : [] as (string | number)[],
            months         : [] as (string | number)[],
            days           : [] as (string | number)[],
            hours          : [] as (string | number)[],
            minutes        : [] as (string | number)[],
            seconds        : [] as (string | number)[],
            curr_year      : 0,
            curr_month     : 0,
            show_year      : false,
            show_month     : false,
            show_day       : false,
            show_hour      : false,
            show_minute    : false,
            show_seconds   : false,
        })

        function reset() {
            state.today           = new Date()
            state.selected_indexs = []
            state.years           = []
            state.months          = []
            state.days            = []
            state.hours           = []
            state.minutes         = []
            state.seconds         = []
            state.curr_year       = 0
            state.curr_month      = 0
            state.show_year       = false
            state.show_month      = false
            state.show_day        = false
            state.show_hour       = false
            state.show_minute     = false
            state.show_seconds    = false
        }

        init()
        function init() {
            reset()
            switch (props.mode) {
                case 'year': {
                    setYears()
                    const curr_year = state.today.getFullYear()
                    const year_idx  = state.years.findIndex(year => year === curr_year)

                    state.selected_indexs = [year_idx === -1 ? 0 : year_idx]
                    state.show_year       = true
                    return
                }
                case 'month': {
                    setMonths()
                    const curr_month = state.today.getMonth() + 1
                    const month_idx  = state.months.findIndex(month => month === curr_month)

                    state.selected_indexs = [month_idx === -1 ? 0 : month_idx]
                    state.show_month      = true
                    return
                }
                case 'year-month': {
                    setYears()
                    setMonths()
                    const curr_year  = state.today.getFullYear()
                    const year_idx   = state.years.findIndex(year => year === curr_year)
                    const curr_month = state.today.getMonth() + 1
                    const month_idx  = state.months.findIndex(month => month === curr_month)

                    state.selected_indexs = [year_idx === -1 ? 0 : year_idx, month_idx === -1 ? 0 : month_idx]
                    state.show_year       = true
                    state.show_month      = true
                    return
                }
                case 'date': {
                    setYears()
                    setMonths()
                    setDays()

                    const curr_year  = state.today.getFullYear()
                    const year_idx   = state.years.findIndex(year => year === curr_year)
                    const curr_month = state.today.getMonth() + 1
                    const month_idx  = state.months.findIndex(month => month === curr_month)
                    const curr_day   = state.today.getDate()
                    const day_idx    = state.days.findIndex(day => day === curr_day)

                    state.selected_indexs = [
                        year_idx === -1 ? 0 : year_idx,
                        month_idx === -1 ? 0 : month_idx,
                        day_idx === -1 ? 0 : day_idx,
                    ]
                    state.show_year       = true
                    state.show_month      = true
                    state.show_day        = true
                    return
                }
                case 'time': {
                    state.show_hour    = true
                    state.show_minute  = true
                    state.show_seconds = true
                }
            }
        }

        function setYears() {
            const curr_year  = state.today.getFullYear()
            const start_year = props.startYear || curr_year - 10
            const end_year   = props.endYear   || curr_year + 10

            const years = [] as number[]
            for (let i = start_year; i <= end_year; i++) {
                years.push(i)
            }
            state.years = years
        }

        function setMonths() {
            state.months = (new Array(12).fill('').map((_, index) => (index + 1)))
        }

        function setDays() {
            const year  = +state.years[state.selected_indexs[0]]
            const month = +state.months[state.selected_indexs[1]]
            // const days = new Date(year, month, 0).getDate()
            // state.days = (new Array(days).fill('').map((_, index) => (index + 1)))
        }

        function onCancel() {
            emit('update:visible', false)
            emit('cancel')
        }

        function onConfirm() {
            emit('update:visible', false)
            emit('confirm', getSelectedValue())
        }

        function getSelectedValue() {
            return ''
        }

        return {
            ...toRefs(state),
            visible$,
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
        :show-top-close="false"
        @open="$emit('open')"
        @close="$emit('close')"
    >
        <view class="sd-picker">
            <view v-if="title" class="sd-picker__title">
                {{ title }}
            </view>
            <view class="sd-picker-content">
                <picker-view
                    :value="selected_indexs"
                    class="sd-picker-view"
                    indicator-style="height: 50px; line-height: 50px;"
                    immediate-change
                >
                    <picker-view-column v-if="show_year">
                        <view v-for="year in years" :key="year" class="sd-picker-view-column">
                            <text>{{ year }}</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="show_month">
                        <view v-for="month in months" :key="month" class="sd-picker-view-column">
                            <text>{{ month }}</text>
                        </view>
                    </picker-view-column>
                    <picker-view-column v-if="show_day">
                        <view v-for="day in days" :key="day" class="sd-picker-view-column">
                            <text>{{ day }}</text>
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

<style lang='scss' scoped></style>
