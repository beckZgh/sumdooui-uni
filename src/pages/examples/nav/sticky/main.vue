<script setup lang="ts">
const toPage = (name: string) => {
    uni.navigateTo({ url: `./${ name }` })
}
</script>

<template>
    <sd-page title="Sticky 吸顶组件">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法 - 非自定义页面
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-base')">
                    应用
                </sd-button>
            </view>
        </view>
        <view class="demo-card">
            <view class="demo-card__title">
                定义吸附距离- 非自定义页面
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-offset')">
                    应用
                </sd-button>
            </view>
        </view>
        <view class="demo-card">
            <view class="demo-card__title">
                自定义页面吸附
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-container')">
                    应用
                </sd-button>
            </view>
        </view>
    </sd-page>
</template>
