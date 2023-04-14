<script setup lang="ts">
import img_search from './images/search.png'

function onClickButton() {
    uni.showToast({ title: '您点击按钮' })
}

function toPage(name: string) {
    uni.navigateTo({ url: name })
}
</script>

<template>
    <sd-page title="Empty 缺省页">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-empty />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                定义缺省图片与文本
            </view>
            <view class="demo-card__body">
                <sd-empty
                    :src="img_search"
                    :img-style="{ width: '230rpx', height: '230rpx' }"
                    text="没有找到对应的内容～"
                />
            </view>
        </view>
        <view class="demo-card">
            <view class="demo-card__title">
                定义扩展按钮
            </view>
            <view class="demo-card__body">
                <sd-empty button-text="返回" @click-button="onClickButton" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                页面内容为空
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-empty-data')">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                所有缺省预设
            </view>
            <view class="demo-card__body" style="text-align: center;">
                <sd-button type="primary" :custom-style="{ width: '70%' }" variant="plain" @click="toPage('page-empty-parse')">
                    应用
                </sd-button>
            </view>
        </view>
    </sd-page>
</template>
