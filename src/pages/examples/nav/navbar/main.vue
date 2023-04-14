<script setup lang="ts">
function onClickLeft() {
    uni.showToast({ title: '点击了左侧' })
}

function onClickRight() {
    uni.showToast({ title: '点击了右侧' })
}
</script>

<template>
    <sd-page title="Navbar 顶部导航">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-navbar title="标题" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带左侧箭头
            </view>
            <view class="demo-card__body">
                <sd-navbar
                    title="标题"
                    left-arrow
                    @click-left="onClickLeft"
                />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                右侧内容
            </view>
            <view class="demo-card__body">
                <sd-navbar
                    title="标题"
                    left-arrow
                    right-icon="location"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
                />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义颜色
            </view>
            <view class="demo-card__body">
                <sd-navbar
                    title="标题"
                    left-arrow
                    left-text="返回"
                    right-icon="location"
                    background="#465CFF"
                    color="#fff"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
                />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义高度
            </view>
            <view class="demo-card__body">
                <sd-navbar
                    title="标题"
                    left-arrow
                    left-text="返回"
                    right-icon="location"
                    background="#465CFF"
                    color="#fff"
                    :custom-style="{ height: '130rpx' }"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
                />
            </view>
        </view>
    </sd-page>
</template>

