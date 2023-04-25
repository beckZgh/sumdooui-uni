<script setup lang="ts">
import { ref } from 'vue'
const fruits = ref(1)
const fruit_opts = ref([
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: '西瓜', value: 3 },
    { label: '橘子', value: 4 },
])
</script>

<template>
    <sd-page title="Radio 单选框">
        <demo-card title="基本用法">
            <sd-radio-group v-model="fruits" :options="fruit_opts" />
        </demo-card>

        <demo-card title="方形图标">
            <sd-radio-group v-model="fruits" shape="square" :options="fruit_opts" />
        </demo-card>

        <demo-card title="不同大小">
            <sd-radio-group v-model="fruits">
                <sd-radio :name="1" label="苹果" size="small" />
                <sd-radio :name="2" label="香蕉" size="normal" />
                <sd-radio :name="3" label="西瓜" size="large" />
            </sd-radio-group>
        </demo-card>

        <demo-card title="占一行">
            <sd-radio-group v-model="fruits" wrap :options="fruit_opts" />
        </demo-card>

        <demo-card title="显示两行">
            <sd-radio-group v-model="fruits" :column="2" :options="fruit_opts" />
        </demo-card>
    </sd-page>
</template>
