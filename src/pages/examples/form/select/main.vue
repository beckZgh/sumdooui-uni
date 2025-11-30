<script setup lang="ts">
import { reactive } from 'vue'

const OPTIONS = Array.from({ length: 50 }).map((_, idx) => {
    const i = idx + 1
    return {
        label: `选项${ i }`,
        value: i,
    }
})

const m = reactive({
    visible    : false,
    multi      : false,
    text       : '',
    value      : '',
    multi_value: [],
    multi_text : '',
    shape      : '',
    options    : [] as any[],
})

function showSingleSelect() {
    m.multi   = false
    m.options = OPTIONS.map(item => ({ ...item }))
    m.visible = true
}

function showMultiSelect() {
    m.multi   = true
    m.options = OPTIONS.map(item => ({ ...item }))
    m.visible = true
}

function showDisabledSelect() {
    m.multi   = false
    m.options = OPTIONS.map((item, idx) => ({ ...item, disabled: idx === 1 }))
    m.visible = true
}

function onConfirm({ selectedValues, selectedLabels }: any) {
    if (m.multi) {
        m.multi_text  = selectedLabels.join('，')
        m.multi_value = selectedValues
    } else {
        m.text  = selectedLabels[0]
        m.value = selectedValues[0]
    }
}
</script>

<template>
    <sd-page title="Select 选择器">
        <demo-card title="基本用法-单选" :card="false" transparent>
            <sd-cell title="已选择" :value="m.text" arrow @click="showSingleSelect" />
        </demo-card>

        <demo-card title="基本用法-多选" :card="false" transparent>
            <sd-cell title="已选择" :value="m.multi_text" arrow @click="showMultiSelect" />
        </demo-card>

        <demo-card title="基本用法-禁用" :card="false" transparent>
            <sd-cell title="已选择" :value="m.text"  arrow @click="showDisabledSelect" />
        </demo-card>

        <sd-select
            v-model:visible="m.visible"
            :options="m.options"
            :multi="m.multi"
            :default-value="m.multi ? m.multi_value : m.value[0]"
            @confirm="onConfirm"
        />
    </sd-page>
</template>
