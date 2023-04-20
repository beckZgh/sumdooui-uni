<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    active_tab : 0,
    items      : ['最新', '热门'],
    three_items: ['最新', '热门', '关注'],
})
</script>

<template>
    <sd-page title="SwitchBar 条件切换栏">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <view class="bar-item">
                    <text>全部</text>
                    <sd-switch-bar :items="m.items" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                显示圆角
            </view>
            <view class="demo-card__body">
                <view class="bar-item">
                    <text>全部</text>
                    <sd-switch-bar round :items="m.items" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                三项选项
            </view>
            <view class="demo-card__body">
                <view class="bar-item">
                    <text>全部</text>
                    <sd-switch-bar round :items="m.three_items" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                默认选中
            </view>
            <view class="demo-card__body">
                <view class="bar-item">
                    <text>全部</text>
                    <sd-switch-bar :current="1" round :items="m.three_items" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义背景色
            </view>
            <view class="demo-card__body">
                <view class="bar-item">
                    <text>全部</text>
                    <sd-switch-bar backgrond="#b5beff" :current="1" round :items="m.three_items" />
                </view>
            </view>
        </view>
    </sd-page>
</template>

<style lang="scss">
.bar-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
