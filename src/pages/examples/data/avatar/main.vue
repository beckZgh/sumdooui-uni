<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    notify_1: false,
})
</script>

<template>
    <sd-page title="Avatar 头像">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-avatar src="/static/images/avatar.png" shape="round" />
                <sd-avatar src="/static/images/avatar.png" shape="circle" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                默认三种尺寸
            </view>
            <view class="demo-card__body">
                <sd-avatar src="/static/images/avatar.png" />
                <sd-avatar src="/static/images/avatar.png" size="medium" />
                <sd-avatar src="/static/images/avatar.png" size="small" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                使用图标
            </view>
            <view class="demo-card__body">
                <sd-avatar icon="user" />
                <sd-avatar icon="user" size="medium" />
                <sd-avatar icon="user" size="small" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                使用文字
            </view>
            <view class="demo-card__body">
                <sd-avatar text="A" />
                <sd-avatar text="A" size="medium" />
                <sd-avatar text="A" size="small" />
            </view>
        </view>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-avatar) {
    margin-right: 30rpx;
}
</style>
