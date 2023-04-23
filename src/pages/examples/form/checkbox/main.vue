<script setup lang="ts">
import { ref } from 'vue'
const checkbox_1 = ref(false)
const checkbox_2 = ref(true)
const fruits = ref([1])
const fruit_opts = ref([
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: '西瓜', value: 3 },
])
</script>

<template>
    <sd-page title="Checkbox 多选框">
        <demo-card title="基本用法 - 单独使用">
            <sd-checkbox v-model="checkbox_1" :label="checkbox_1 ? '选中状态' : '未选状态'" />
            <view style="height: 16rpx" />
            <sd-checkbox v-model="checkbox_2" :label="checkbox_2 ? '选中状态' : '未选状态'" />
            <view style="height: 16rpx" />
            <sd-checkbox :model-value="false" disabled label="禁用状态" />
            <view style="height: 16rpx" />
            <sd-checkbox :model-value="true" disabled label="禁用状态" />
        </demo-card>

        <demo-card title="卡片风格 - 单独使用">
            <sd-checkbox v-model="checkbox_1" type="card" :label="checkbox_1 ? '选中状态' : '未选状态'" />
            <view style="height: 16rpx" />
            <sd-checkbox v-model="checkbox_2" type="card" :label="checkbox_2 ? '选中状态' : '未选状态'" />
            <view style="height: 16rpx" />
            <sd-checkbox :model-value="false" type="card" disabled label="禁用状态" />
            <view style="height: 16rpx" />
            <sd-checkbox :model-value="true" type="card" disabled label="禁用状态" />
        </demo-card>

        <demo-card title="基本用法 - group">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" />
        </demo-card>

        <demo-card title="卡片风格 - group">
            <sd-checkbox-group v-model="fruits" type="card" :options="fruit_opts" />
        </demo-card>

        <demo-card title="卡片风格(最多二个) - group">
            <sd-checkbox-group v-model="fruits" type="card" :max="2" :options="fruit_opts" />
        </demo-card>
    </sd-page>
</template>
