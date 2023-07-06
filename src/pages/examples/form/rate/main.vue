<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
const half_value = ref(3.5)
</script>

<template>
    <sd-page title="Rate 评分">
        <demo-card title="基本用法">
            <sd-rate v-model="value" />
        </demo-card>

        <demo-card title="自定义图标">
            <sd-rate v-model="value" inactive-icon="heart" active-icon="heart-fill" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-rate v-model="value" active-color="rgb(255, 210, 30)" />
        </demo-card>

        <demo-card title="允许半星">
            <sd-rate v-model="half_value" allow-half />
        </demo-card>

        <demo-card title="自定义数量">
            <sd-rate v-model="value" :count="8" />
        </demo-card>

        <demo-card title="只读状态">
            <sd-rate :model-value="3" readonly />
        </demo-card>

        <demo-card title="禁用状态">
            <sd-rate :model-value="3" disabled />
        </demo-card>
    </sd-page>
</template>
