<script setup lang="ts">
import { ref } from 'vue'
const checkbox_1 = ref(false)
const checkbox_2 = ref(true)
const fruits     = ref([1, 2])
const fruit_opts = ref([
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: '西瓜', value: 3 },
])
</script>

<template>
    <sd-page title="Checkbox 多选框">
        <demo-card title="基本用法">
            <sd-checkbox v-model="checkbox_1" :label="checkbox_1 ? '选中状态' : '未选状态'" />
        </demo-card>

        <demo-card title="禁用状态">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" disabled />
        </demo-card>

        <demo-card title="自定义图标">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" active-icon="check-circle-fill" inactive-icon="circle" />
        </demo-card>

        <demo-card title="自定义大小">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" :icon-size="50" :label-size="32" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" active-color="#09BE4F" inactive-color="#777777" />
        </demo-card>

        <demo-card title="图标在右侧">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" icon-position="right" />
        </demo-card>

        <demo-card title="限制最多选中两个">
            <sd-checkbox-group v-model="fruits" :options="fruit_opts" :max="2" />
        </demo-card>
    </sd-page>
</template>
