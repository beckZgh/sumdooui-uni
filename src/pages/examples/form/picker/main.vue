<script setup lang="ts">
import { ref, reactive } from 'vue'
import { citys, years, seasons, area_list } from './config'
const state = reactive({
    city_text   : '',
    city_value  : '成都市',
    city_visible: false,
    date_text   : '',
    date_value  : ['2020', '秋'],
    date_visible: false,
    area_text   : '',
    area_value  : ['ZH', '200', '2003'],
    area_visible: false,
})

function onCityConfirm(item: any) {
    state.city_text  = item.selectedOptions.label
}

function onDateConfirm(item: any) {
    state.date_text  = item.selectedValue.join('')
}

function onAreaConfirm(item: any) {
    console.log('-=--item', item)
    // state.area_value = value
    // state.area_text = items.map(item => item.label).join('')
}
</script>

<template>
    <sd-page title="Picker 选择器">
        <demo-card title="基础选择器" :card="false" transparent>
            <sd-cell title="选择城市" :value="state.city_text" arrow @click="state.city_visible = true" />
            <view class="sd-h-20" />
            <sd-cell title="选择时间" :value="state.date_text" arrow @click="state.date_visible = true" />
            <view class="sd-h-20" />
            <sd-cell title="选择地区" :value="state.area_text" arrow @click="state.area_visible = true" />
        </demo-card>

        <!-- 单列选择器 -->
        <sd-picker
            v-model:visible="state.city_visible"
            title="请选择城市"
            :default-value="state.city_value"
            :options="citys"
            @confirm="onCityConfirm"
        />

        <!-- 多列不联动选择器 -->
        <sd-picker
            v-model:visible="state.date_visible"
            title="请选择时间"
            :default-value="state.date_value"
            :options="[years, seasons]"
            @confirm="onDateConfirm"
        />

        <!-- 多列联动选择器 -->
        <sd-picker
            v-model:visible="state.area_visible"
            title="请选择地区"
            :default-value="state.area_value"
            :options="area_list"
            @confirm="onAreaConfirm"
        />
    </sd-page>
</template>

