<script setup lang="ts">
import tabs from './config'
import { reactive } from 'vue'

const system_info = uni.getSystemInfoSync()
const m = reactive({
    scroll_into: '',
    tab_index  : 0,
    height     : `${ system_info.windowHeight - uni.upx2px(538) }px`,
})

function handleTabClick(index: number) {
    if (m.tab_index === index) return
    m.tab_index = index
    const scroll_index = index - 1 < 0 ? 0 : index - 1
    m.scroll_into = tabs[scroll_index].id
}

function onSwiperChange(e: any) {
    if (e.detail.source === 'touch') {
        const index = e.target.current || e.detail.current
        handleTabClick(index)
    }
}

function handleToPage(type: string, item: { name: string; page: string }) {
    const url = item.page
        ? `/pages/examples/${ type }/${ item.page }/main`
        : `/pages/common/coding/main?title=${ item.name }`
    uni.navigateTo({ url })
}
</script>

<template>
    <sd-page title="Sumdooui-Uni" :show-home-button="false">
        <view class="page-box">
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
                <view class="tabs-box">
                    <scroll-view
                        class="tabs-scroll-box"
                        scroll-with-animation
                        scroll-x
                        :show-scrollbar="false"
                        :scroll-into-view="m.scroll_into"
                    >
                        <view class="scroll-view">
                            <view
                                v-for="(tab, index) in tabs" :id="tab.id"
                                :key="index"
                                class="scroll-view-item"
                                :class="{ 'is-active': m.tab_index === index }"
                                @tap="handleTabClick(index)"
                            >
                                <view :class="{ 'scroll-view-item__text': m.tab_index === index }">
                                    {{ tab.name }}
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    <swiper
                        :current="m.tab_index"
                        :duration="300"
                        :style="{ height: m.height }"
                        class="swiper-box"
                        @change="onSwiperChange"
                    >
                        <swiper-item v-for="tab in tabs" :key="tab.id" class="swiper-box-item" :style="{ height: m.height }">
                            <scroll-view scroll-y :style="{ height: m.height }">
                                <view class="tabs-list">
                                    <sd-cell
                                        v-for="(item, item_index) in tab.data"
                                        :key="item_index"
                                        :title="item.name"
                                        :custom-style="{ height: '112rpx', marginTop: '32rpx' }"
                                        round
                                        @click="handleToPage(tab.id, item)"
                                    >
                                        <template #icon>
                                            <image class="tabs-list-item__icon" :src="`/static/index/light/icon_${ item.icon }_3x.png`" />
                                        </template>
                                    </sd-cell>
                                </view>
                            </scroll-view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
    </sd-page>
</template>

<style lang="scss" scoped>
.page-box {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
}

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
            color: $sd-text-color;
        }
    }
}

.tabs-box {
    width: 100%;
    height: 108rpx;
    background: $sd-bg-color-white;
    color: $sd-text-color;
    border-radius: 40rpx 40rpx 0 0;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 12;

    .tabs-scroll-box,
    .tabs-swiper-box,
    .tabs-swiper-box-item {
        width: 100%;
    }

    .scroll-view {
        display: flex;
        align-items: center;
        min-width: 100%;
        height: 108rpx;
        white-space: nowrap;

        &-item {
            position: relative;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            padding: 0 26rpx;
            height: 108rpx;
            font-size: 28rpx;
            color: $sd-text-color-subtitle;

            &__text {
                transform: scale(1.2);
                color: $sd-primary-color;
                transition: transform 0.2s linear;
            }

            &.is-active::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                background-color: $sd-primary-color;
                border-radius: 2px;
                left: 24rpx;
                bottom: 0;
                transform: scale(1.2);
                animation: ani 0.2s linear forwards;
            }

            @keyframes ani {
                0% {
                    width: 0;
                }

                100% {
                    width: 45rpx;
                }
            }
        }
    }

    .tabs-list {
        width: 100%;
        min-height: 101%;
        padding: 8rpx 32rpx 32rpx;
        box-sizing: border-box;
        background-color: #F1F4FA;

        &-item__icon {
            width: 48rpx;
            height: 48rpx;
            flex-shrink: 0;
        }
    }
}
</style>
