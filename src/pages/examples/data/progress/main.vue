<script setup lang="ts">
import { reactive, computed } from 'vue'
const m = reactive({
    percentage_1: 20,
    percentage_2: 20,
})

const progress_text$ = computed(() => {
    if (m.percentage_2 < 60) {
        return '差太远了'
    } else if (m.percentage_2 <= 70) {
        return '刚过及格线'
    } else if (m.percentage_2 <= 80) {
        return '不错，再努力一点'
    } else if (m.percentage_2 <= 90) {
        return '优秀'
    } else {
        return '优秀到炸裂'
    }
})

function plus(key: keyof typeof m) {
    if (m[key] >= 100) return
    m[key] += 10
}

function minus(key: keyof typeof m) {
    if (m[key] <= 0) return
    m[key] -= 10
}
</script>

<template>
    <sd-page title="Progress 进度条">
        <demo-card title="基本用法">
            <sd-progress :value="m.percentage_1" />
            <sd-progress :value="m.percentage_1" :text-inside="false" />

            <view class="sd-flex-x-center">
                <sd-button width="200rpx" size="small" ghost round type="primary" @click="plus('percentage_1')">
                    增加
                </sd-button>
                <sd-button width="200rpx" size="small" ghost round type="primary" :custom-style="{ marginLeft: '30rpx' }" @click="minus('percentage_1')">
                    减少
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="设置进度条宽度">
            <sd-progress :value="m.percentage_1" :stoke-width="16" circle />

            <view class="sd-flex-x-center">
                <sd-button width="200rpx" size="small" ghost round type="primary" @click="plus('percentage_1')">
                    增加
                </sd-button>
                <sd-button width="200rpx" size="small" ghost round type="primary" :custom-style="{ marginLeft: '30rpx' }" @click="minus('percentage_1')">
                    减少
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="设置进度条、轨道颜色">
            <sd-progress :value="m.percentage_1" track-color="#85ce61" background="#e1f3d8" />

            <view class="sd-flex-x-center">
                <sd-button width="200rpx" size="small" ghost round type="primary" @click="plus('percentage_1')">
                    增加
                </sd-button>
                <sd-button width="200rpx" size="small" ghost round type="primary" :custom-style="{ marginLeft: '30rpx' }" @click="minus('percentage_1')">
                    减少
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="不显示文本及自定义文本">
            <sd-progress :value="m.percentage_2" :show-text="false" />
            <sd-progress :value="m.percentage_2" :text="progress_text$" />

            <view class="sd-flex-x-center">
                <sd-button width="200rpx" size="small" ghost round type="primary" @click="plus('percentage_2')">
                    增加
                </sd-button>
                <sd-button width="200rpx" size="small" ghost round type="primary" :custom-style="{ marginLeft: '30rpx' }" @click="minus('percentage_2')">
                    减少
                </sd-button>
            </view>
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-progress) {
    margin-bottom: 30rpx;
}

.btn-wrap {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
}
</style>
