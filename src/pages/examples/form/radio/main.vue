<script setup lang="ts">
import { ref } from 'vue'
const fruits = ref(1)
const fruit_opts = ref([
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: '西瓜', value: 3 },
])
</script>

<template>
    <sd-page title="Radio 单选框">
        <demo-card title="基本用法">
            <sd-radio-group v-model="fruits" :options="fruit_opts" />
        </demo-card>

        <demo-card title="占一行">
            <sd-radio-group v-model="fruits" wrap :options="fruit_opts" />
        </demo-card>

        <demo-card title="占一行且文本靠右">
            <sd-radio-group v-model="fruits" wrap align="right" :options="fruit_opts" />
        </demo-card>

        <demo-card title="占一行且文本靠左，图标靠右">
            <sd-radio-group v-model="fruits" wrap icon-position="right"  :options="fruit_opts" />
        </demo-card>

        <demo-card title="占一行且文本靠右，图标靠右">
            <sd-radio-group v-model="fruits" wrap icon-position="right" align="right"  :options="fruit_opts" />
        </demo-card>

        <demo-card title="标签风格">
            <sd-radio-group v-model="fruits" type="tag" :options="fruit_opts" />
        </demo-card>

        <demo-card title="标签风格 - 占一行">
            <sd-radio-group v-model="fruits" type="tag" wrap :options="fruit_opts" />
        </demo-card>

        <demo-card title="卡片风格">
            <sd-radio-group v-model="fruits" type="card" :options="fruit_opts" />
        </demo-card>

        <demo-card title="卡片风格 - 占一行">
            <sd-radio-group v-model="fruits" type="card" wrap :options="fruit_opts" />
        </demo-card>
    </sd-page>
</template>
