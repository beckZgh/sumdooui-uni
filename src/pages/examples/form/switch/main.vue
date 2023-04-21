<script setup lang="ts">
import { ref } from 'vue'
const status_1 = ref(false)
const status_2 = ref(true)
const status_3 = ref(false)
const status_4 = ref(true)
const status_5 = ref(true)
</script>

<template>
    <sd-page title="Switch 开关">
        <demo-card title="基本用法" body-style="padding: 0;">
            <sd-cell title="未启用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_1" />
                </template>
            </sd-cell>
            <sd-cell title="已启用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_2" />
                </template>
            </sd-cell>
            <sd-cell title="未开启禁用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_3" disabled />
                </template>
            </sd-cell>
            <sd-cell title="已开启禁用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_4" disabled />
                </template>
            </sd-cell>
        </demo-card>

        <demo-card title="开关颜色" body-style="padding: 0;">
            <sd-cell title="未启用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_5" active-color="#09BE4F" />
                </template>
            </sd-cell>
            <sd-cell title="已启用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_5" active-color="#FFB703" />
                </template>
            </sd-cell>
            <sd-cell title="未开启禁用" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_5" active-color="#FF2B2B" />
                </template>
            </sd-cell>
        </demo-card>
    </sd-page>
</template>
