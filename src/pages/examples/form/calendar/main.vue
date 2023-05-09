<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    visible       : false,
    type          : 'single' as 'single' | 'multiple' | 'range',
    mode          : 'scroll' as 'scroll' | 'switch',
    single_value  : '',
    multiple_value: [] as string[],
    range_value   : [] as string[],
    default_date  : '' as string | string[],
})

function onClick(type: 'single' | 'multiple' | 'range', mode: 'switch' | 'scroll') {
    state.visible = true
    state.type = type
    state.mode = mode
    if (type === 'single') {
        state.default_date = state.single_value
    } else if (type === 'multiple') {
        state.default_date = state.multiple_value
    } else if (type === 'range') {
        state.default_date = state.range_value
    }
    console.log('---', state.mode)
}

function onConfirm(date: string | string[]) {
    switch (state.type) {
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

function formatter(item: { type: string; bottomInfo: string; topInfo: string }) {
    if (item.type === 'start') {
        item.bottomInfo = '住店'
    } else if (item.type === 'end') {
        item.bottomInfo = '离店'
    } else if (item.type === 'start-end') {
        item.bottomInfo = '住店/离店'
    }
    return item
}
</script>

<template>
    <sd-page title="Calendar 日历">
        <demo-card title="弹窗滚动模式" :card="false">
            <sd-cell-group arrow>
                <sd-cell
                    title="选择单个日期"
                    :value="formatDate(state.single_value)"
                    @click="onClick('single', 'scroll')"
                />
                <sd-cell
                    title="选择多个日期"
                    :value="formatDate(state.multiple_value)"
                    @click="onClick('multiple', 'scroll')"
                />
                <sd-cell
                    title="选择日期范围"
                    :value="formatDate(state.range_value)"
                    @click="onClick('range', 'scroll')"
                />
            </sd-cell-group>
        </demo-card>

        <demo-card title="弹窗切换模式" :card="false">
            <sd-cell-group arrow>
                <sd-cell
                    title="选择单个日期"
                    :value="formatDate(state.single_value)"
                    @click="onClick('single', 'switch')"
                />
                <sd-cell
                    title="选择多个日期"
                    :value="formatDate(state.multiple_value)"
                    @click="onClick('multiple', 'switch')"
                />
                <sd-cell
                    title="选择日期范围"
                    :value="formatDate(state.range_value)"
                    @click="onClick('range', 'switch')"
                />
            </sd-cell-group>
        </demo-card>

        <demo-card title="平铺切换模式" :card="false">
            <sd-calendar
                mode="switch"
                :poppable="false"
                :show-confirm-button="false"
            />
        </demo-card>

        <demo-card title="平铺所有日期展示范围选择-自定义主题、描述" :card="false">
            <sd-calendar
                type="range"
                start-date="2023-05-01"
                end-date="2023-06-30"
                allow-same-day
                :poppable="false"
                :show-confirm-button="false"
                :formatter="formatter"
            />
        </demo-card>
    </sd-page>

    <sd-calendar
        v-model:visible="state.visible"
        :default-date="state.default_date"
        :type="state.type"
        :mode="state.mode"
        @confirm="onConfirm"
    />
</template>
