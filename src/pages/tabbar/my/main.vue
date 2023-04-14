<script setup lang="ts">
//
</script>

<template>
    <sd-page title="我的" :show-home-button="false">
        <view class="banner-box">
            <image class="banner" src="/static/index/light/img_banner_3x.png" mode="widthFix" />
            <view class="banner-content">
                <view class="banner-content__logo" />
                <view class="banner-content__title">
                    Sumdoo Weapp
                </view>
                <view class="banner-content__desc">
                    Sumdoo Weapp是一款轻量、偏业务型的移动端组件库
                </view>
            </view>
        </view>
        <sd-cell title="开源介绍" bottom-border arrow />
        <sd-cell title="开源地址" bottom-border arrow />
        <sd-cell title="帮助中心" bottom-border arrow />
        <sd-cell title="关于我们" bottom-border arrow />
        <sd-cell title="合作伙伴" arrow />
    </sd-page>
</template>

<style lang="scss" scoped>
.banner-box {
    position: relative;
    width: 100%;
    min-height: 538rpx;
    background-color: #EDF9FF;

    .banner {
        display: block;
        width: 100%;
        height: 538rpx;
    }

    .banner-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        padding: 80rpx 32rpx 0;
        box-sizing: border-box;

        &__logo {
            display: block;
            width: 80rpx;
            height: 80rpx;
            border-radius: 16rpx;
        }

        &__title {
            font-size: 40rpx;
            line-height: 40rpx;
            padding: 24rpx 0 40rpx;
            box-sizing: border-box;
        }

        &__desc {
            width: 280rpx;
            font-size: 24rpx;
            line-height: 40rpx;
            color: #333;
        }
    }
}
</style>
