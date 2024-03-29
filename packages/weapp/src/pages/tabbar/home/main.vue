<script setup lang="ts">
import tabs from './config'
import { reactive } from 'vue'

const system_info = uni.getSystemInfoSync()
// const menu_button = uni.getMenuButtonBoundingClientRect()
const m = reactive({
    scroll_into: '',
    tab_index  : 0,
    height     : `${ system_info.windowHeight - uni.upx2px(108) }px`,
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
    <sd-page title="Sumdooui-Uni" :show-home-button="false" lock-scroll background="#F1F4FA">
        <template #header-extra>
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
        </template>

        <swiper
            :current="m.tab_index"
            :duration="300"
            style="height: 100%"
            @change="onSwiperChange"
        >
            <swiper-item v-for="tab in tabs" :key="tab.id" class="swiper-box-item">
                <scroll-view scroll-y :style="{ height: '100%' }">
                    <view class="tabs-list">
                        <sd-cell
                            v-for="(item, item_index) in tab.data"
                            :key="item_index"
                            :title="item.name"
                            :custom-style="{ height: '112rpx', marginTop: '32rpx' }"
                            round
                            arrow
                            @click="handleToPage(tab.id, item)"
                        >
                            <template #extra>
                                <sd-tag v-if="!item.page">
                                    开发中13
                                </sd-tag>
                            </template>
                        </sd-cell>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

        <!-- <view
            class="add-my-app-tip"
            :style="{
                top  : `${ menu_button.bottom + 10 }px`,
                right: `30px`,
            }"
        >
            点击<text> “添加至我的小程序” </text>下次访问更方便

            <sd-icon icon="close" />
        </view> -->
    </sd-page>
</template>

<style lang="scss" scoped>
.add-my-app-tip {
    position: fixed;
    display: flex;
    align-items: center;
    background-color: $sd-white;
    border-radius: $sd-radius-round;
    padding: 12px 32px;
    z-index: 10000;
    color: $sd-text-color;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08);

    &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: 30px;
        top: 0;
        transform: translateY(-100%);
        border: 10px solid $sd-white;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
    }

    > text {
        display: inline-block;
        color: $sd-warning-color;
        margin: 0 3px;
    }
}


.tabs-scroll-box {
    background-color: #fff;
}

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
        color: $sd-text-color-secondary;

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
    padding: 8rpx 32rpx 32rpx;
    box-sizing: border-box;

    &-item__icon {
        width: 48rpx;
        height: 48rpx;
        flex-shrink: 0;
    }
}
</style>
