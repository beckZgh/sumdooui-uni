<script setup lang="ts">
import { reactive } from 'vue'
import { citys, years, seasons, area_list } from './config'

const state = reactive({
    city_text   : '',
    curr_city   : [] as (string | number)[],
    city_visible: false,
    date_text   : '',
    date_value  : ['2020', '秋'],
    date_visible: false,
    area_text   : '',
    area_value  : ['ZH', '200', '2003'],
    area_visible: false,

    default_city_value: '',
})

function onCityConfirm({ selectedValues, selectedItems }: { selectedValues: (string | number)[]; selectedItems: { label: string; value: string }[] }) {
    state.city_text = selectedItems[0]?.value || ''
    state.curr_city = selectedValues
}

function onDateConfirm({ selectedValues }: { selectedValues: string[] }) {
    state.date_value = selectedValues
    state.date_text  = selectedValues.join('')
}

function onAreaConfirm({ selectedValues, selectedItems }: { selectedValues: string[];  selectedItems: { label: string; value: string }[] }) {
    state.area_value = selectedValues
    state.area_text  = selectedItems.map(item => item.label).join('-')
}
</script>

<template>
    <sd-page title="Picker 选择器">
        <demo-card title="基础选择器" :card="false" transparent>
            <sd-cell title="选择城市(单列)" :value="state.city_text" arrow @click="state.city_visible = true" />
            <view class="sd-h-20" />
            <sd-cell title="选择时间(多列)" :value="state.date_text" arrow @click="state.date_visible = true" />
            <view class="sd-h-20" />
            <sd-cell title="选择地区(联动)" :value="state.area_text" arrow @click="state.area_visible = true" />
        </demo-card>

        <!-- 单列选择器 -->
        <sd-picker
            v-model:visible="state.city_visible"
            title="请选择城市"
            :default-value="state.curr_city"
            :options="citys"
            @confirm="onCityConfirm"
        />

        <!-- 多列不联动选择器 -->
        <sd-picker
            v-model:visible="state.date_visible"
            title="请选择时间"
            mode="multi-column"
            :default-value="state.date_value"
            :options="[years, seasons]"
            @confirm="onDateConfirm"
        />

        <!-- 多列联动选择器 -->
        <sd-picker
            v-model:visible="state.area_visible"
            title="请选择地区"
            mode="auto-column"
            :default-value="state.area_value"
            :options="area_list"
            @confirm="onAreaConfirm"
        />
    </sd-page>
</template>

