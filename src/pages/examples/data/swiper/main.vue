<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    images: [
        { src: 'https://img0.baidu.com/it/u=2900833435,993445529&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500', openType: 'contact' },
        { src: 'https://img1.baidu.com/it/u=847956157,2750448390&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500' },
        { src: 'https://img2.baidu.com/it/u=2243573419,589412055&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500' },
        { src: 'https://img0.baidu.com/it/u=2289446283,2987162055&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=500' },
        { src: 'https://img0.baidu.com/it/u=3957758939,1600769248&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=500' },
    ],
})
</script>

<template>
    <sd-page title="Swiper 轮播图">
        <view class="demo-card is-custom">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-swiper
                    height="500rpx"
                    :items="m.images"
                />
            </view>
        </view>

        <view class="demo-card is-custom">
            <view class="demo-card__title">
                卡片类型
            </view>
            <view class="demo-card__body">
                <sd-swiper
                    type="card"
                    height="500rpx"
                    :items="m.images"
                />
            </view>
        </view>

        <view class="demo-card is-custom">
            <view class="demo-card__title">
                垂直轮播
            </view>
            <view class="demo-card__body">
                <sd-swiper
                    height="500rpx"
                    vertical
                    :items="m.images"
                />
            </view>
        </view>
    </sd-page>
</template>
