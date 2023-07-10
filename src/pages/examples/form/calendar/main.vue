<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    visible             : false,
    mode                : 'single' as 'single' | 'multiple' | 'range',
    scrollable          : false,
    single_value        : '',
    multiple_value      : [] as string[],
    range_value         : [] as string[],
    default_date        : '' as string | string[],
    // ---------------------------------------
    custom_visible      : false, // 自定义文案
    custom_range_visible: false, // 自定义区间文案
})

function onClick(mode: 'single' | 'multiple' | 'range', scrollable = false) {
    state.visible    = true
    state.mode       = mode
    state.scrollable = scrollable

    if (mode === 'single') {
        state.default_date = state.single_value
    } else if (mode === 'multiple') {
        state.default_date = state.multiple_value
    } else if (mode === 'range') {
        state.default_date = state.range_value
    }
}

function onConfirm(date: string | string[]) {
    switch (state.mode) {
        case 'single': {
            state.single_value = date as string
            return
        }
        case 'multiple': {
            state.multiple_value = date as string[]
            return
        }
        case 'range': {
            state.range_value = date as string[]
        }
    }
}

function formatDate(date: string | string[]) {
    return Array.isArray(date) ? date.join(', ') : date
}

function formatter(item: { date: string; type: string; bottomInfo: string; topInfo: string; className: string }) {
    const d        = new Date(item.date)
    const year     = d.getFullYear()
    const month    = d.getMonth() + 1
    const cur_date = d.getDate()

    item.bottomInfo = '¥60'

    if (year === 2022) {
        if (month === 2) {
            const map: Record<number, string> = {
                1 : '初一',
                2 : '初二',
                3 : '初三',
                14: '情人节',
                15: '元宵节',
            }
            if (cur_date in map) {
                item.topInfo    = map[cur_date]
                item.bottomInfo = '¥100'
                item.className  = 'is-holiday'
            }
        }
    }

    return item
}

function formatRnage(item: { date: string; type: string; bottomInfo: string; topInfo: string; className: string }) {
    if (item.type === 'start') {
        item.bottomInfo = '住店'
    } else if (item.type === 'end') {
        item.bottomInfo = '离店'
    } else if (item.type === 'start-end') {
        item.bottomInfo = '住店/离店'
    }
    return item
}

// 打印操作
function printAction(text: string, params: any) {
    console.log('---', text, params)
}
</script>

<template>
    <sd-page title="Calendar 日历">
        <demo-card title="弹窗滚动模式" :card="false">
            <sd-cell-group arrow>
                <sd-cell
                    title="选择单个日期"
                    :value="formatDate(state.single_value)"
                    @click="onClick('single', true)"
                />
                <sd-cell
                    title="选择多个日期"
                    :value="formatDate(state.multiple_value)"
                    @click="onClick('multiple', true)"
                />
                <sd-cell
                    title="选择日期范围"
                    :value="formatDate(state.range_value)"
                    @click="onClick('range', true)"
                />
            </sd-cell-group>
        </demo-card>

        <demo-card title="弹窗切换模式" :card="false">
            <sd-cell-group arrow>
                <sd-cell
                    title="选择单个日期"
                    :value="formatDate(state.single_value)"
                    @click="onClick('single', false)"
                />
                <sd-cell
                    title="选择多个日期"
                    :value="formatDate(state.multiple_value)"
                    @click="onClick('multiple', false)"
                />
                <sd-cell
                    title="选择日期范围"
                    :value="formatDate(state.range_value)"
                    @click="onClick('range', false)"
                />
            </sd-cell-group>
        </demo-card>

        <demo-card title="自定义日历" :card="false">
            <sd-cell-group arrow>
                <sd-cell title="自定义文案、颜色、按钮文本" @click="state.custom_visible = true" />
            </sd-cell-group>
            <sd-cell-group arrow>
                <sd-cell title="自定义区间文案、颜色、按钮文本" @click="state.custom_range_visible = true" />
            </sd-cell-group>
        </demo-card>

        <demo-card title="平铺模式-只读" :card="false">
            <sd-calendar
                :poppable="false"
                mode="multiple"
                @prev-month="printAction('prev-month', $event)"
                @prev-year="printAction('prev-year', $event)"
                @next-month="printAction('next-month', $event)"
                @next-year="printAction('next-year', $event)"
                @click-subtitle="printAction('click-subtitle', $event)"
                @select="printAction('select', $event)"
                @unselect="printAction('unselect', $event)"
                @confirm="printAction('confirm', $event)"
            />
        </demo-card>

        <sd-calendar
            v-model:visible="state.visible"
            :default-date="state.default_date"
            :scrollable="state.scrollable"
            :mode="state.mode"
            show-confirm-button
            @confirm="onConfirm"
        />

        <sd-calendar
            v-model:visible="state.custom_visible"
            scrollable
            start-date="2022-02-01"
            end-date="2022-03-31"
            default-date="2022-02-15"
            color="#09BE4F"
            :row-height="64"
            :formatter="formatter"
            show-confirm-button
            confirm-button-text="我选好了"
            @confirm="onConfirm"
        />

        <sd-calendar
            v-model:visible="state.custom_range_visible"
            scrollable
            mode="range"
            color="#09BE4F"
            :row-height="64"
            :formatter="formatRnage"
            show-confirm-button
            confirm-button-text="我选好了"
            @confirm="onConfirm"
        />
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-popup .sd-calendar__day.is-holiday) {
    color: $sd-danger-color;
}
:deep(.sd-calendar .sd-calendar__day .sd-calendar__bottom-info) {
    color: $sd-text-color-placeholder;
}
:deep(.sd-calendar .sd-calendar__day--selected),
:deep(.sd-calendar .sd-calendar__day--start),
:deep(.sd-calendar .sd-calendar__day--end) {
    color: $sd-white !important;

    .sd-calendar__bottom-info {
        color: $sd-white !important;
    }
}
</style>
