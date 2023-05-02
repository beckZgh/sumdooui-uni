<script setup lang="ts">
import { ref } from 'vue'
const number = ref(0)

function onPlus() {
    uni.showLoading()
    setTimeout(() => {
        uni.hideLoading()
        number.value += 1
    }, 1500)
}

function onMinus() {
    uni.showLoading()
    setTimeout(() => {
        uni.hideLoading()
        number.value -= 1
    }, 1500)
}
</script>

<template>
    <sd-page title="Stepper 步进器">
        <demo-card title="基本用法" :card="false" bottom-gap>
            <sd-cell-group border>
                <sd-cell title="基本用法">
                    <template #extra>
                        <sd-stepper />
                    </template>
                </sd-cell>
                <sd-cell title="步长设置">
                    <template #extra>
                        <sd-stepper :step="2" />
                    </template>
                </sd-cell>
                <sd-cell title="限制输入范围">
                    <template #extra>
                        <sd-stepper :min="5" :max="10" />
                    </template>
                </sd-cell>
                <sd-cell title="禁用状态">
                    <template #extra>
                        <sd-stepper disabled />
                    </template>
                </sd-cell>
                <sd-cell title="自定义大小">
                    <template #extra>
                        <sd-stepper input-width="40px" button-size="32px" />
                    </template>
                </sd-cell>
                <sd-cell title="异步变更">
                    <template #extra>
                        <sd-stepper v-model="number" async-change @plus="onPlus" @minus="onMinus" />
                    </template>
                </sd-cell>
            </sd-cell-group>
        </demo-card>
    </sd-page>
</template>

