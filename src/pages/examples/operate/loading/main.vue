<script setup lang="ts">
const toPage = (name: string) => {
    uni.navigateTo({ url: `./${ name }` })
}
</script>

<template>
    <sd-page title="Loading 加载动画">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-loading />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                显示横向文本
            </view>
            <view class="demo-card__body">
                <sd-loading text="正在加载中" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                显示纵向文本
            </view>
            <view class="demo-card__body">
                <sd-loading text="正在加载中" direction="column" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义颜色
            </view>
            <view class="demo-card__body">
                <sd-loading color="#09BE4F" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                音符动画
            </view>
            <view class="demo-card__body">
                <sd-loading type="line" color="#09BE4F" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                相遇动画
            </view>
            <view class="demo-card__body">
                <sd-loading type="meet" color="#09BE4F" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                页面 Loading (一)
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-circle')">
                    应用
                </sd-button>
            </view>
        </view>
        <view class="demo-card">
            <view class="demo-card__title">
                页面 Loading (二)
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-line')">
                    应用
                </sd-button>
            </view>
        </view>
        <view class="demo-card">
            <view class="demo-card__title">
                页面 Loading (三)
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-meet')">
                    应用
                </sd-button>
            </view>
        </view>
    </sd-page>
</template>
