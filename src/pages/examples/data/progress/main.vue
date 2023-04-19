<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    percentage_1: 20,
    percentage_2: 20,
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
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-progress :value="m.percentage_1" />
                <sd-progress :value="m.percentage_1" :text-inside="false" />

                <view class="btn-wrap">
                    <sd-button type="primary" size="small" @click="plus('percentage_1')">
                        增加
                    </sd-button>
                    <sd-button size="small" :custom-style="{ marginLeft: '30rpx' }" variant="plain" @click="minus('percentage_1')">
                        减少
                    </sd-button>
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                设置进度条高度
            </view>
            <view class="demo-card__body">
                <sd-progress :value="m.percentage_2" :stoke-width="16" circle />

                <view class="btn-wrap">
                    <sd-button type="primary" size="small" @click="plus('percentage_2')">
                        增加
                    </sd-button>
                    <sd-button size="small" :custom-style="{ marginLeft: '30rpx' }" variant="plain" @click="minus('percentage_2')">
                        减少
                    </sd-button>
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                设置进度条颜色
            </view>
            <view class="demo-card__body">
                <sd-progress :value="m.percentage_2" stoke-color="#85ce61" />

                <view class="btn-wrap">
                    <sd-button type="primary" size="small" @click="plus('percentage_2')">
                        增加
                    </sd-button>
                    <sd-button size="small" :custom-style="{ marginLeft: '30rpx' }" variant="plain" @click="minus('percentage_2')">
                        减少
                    </sd-button>
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                不显示文本及自定义文本
            </view>
            <view class="demo-card__body">
                <sd-progress :value="m.percentage_2" :show-text="false" />
                <sd-progress :value="m.percentage_2" text="差的远了" />

                <view class="btn-wrap">
                    <sd-button type="primary" size="small" @click="plus('percentage_2')">
                        增加
                    </sd-button>
                    <sd-button size="small" :custom-style="{ marginLeft: '30rpx' }" variant="plain" @click="minus('percentage_2')">
                        减少
                    </sd-button>
                </view>
            </view>
        </view>
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
