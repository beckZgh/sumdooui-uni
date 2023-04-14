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
        <view class="demo-page-body">
            <view class="demo-section__title">
                基础使用
            </view>
            <sd-navbar title="标题" />

            <view class="demo-section__title">
                带左侧箭头
            </view>
            <sd-navbar
                title="标题"
                left-arrow
                @click-left="onClickLeft"
            />

            <view class="demo-section__title">
                右侧内容
            </view>
            <sd-navbar
                title="标题"
                left-arrow
                right-icon="location"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />

            <view class="demo-section__title">
                自定义颜色
            </view>
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

            <view class="demo-section__title">
                自定义高度
            </view>
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
    </sd-page>
</template>

