<script setup lang="ts">

</script>

<template>
    <sd-page title="Tag 标签">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-tag text="标签一" />
                <sd-tag text="标签二" type="primary" />
                <sd-tag text="标签三" type="success" />
                <sd-tag text="标签四" type="warning" />
                <sd-tag text="标签五" type="danger" />

                <view style="margin-top: 16rpx;">
                    <sd-tag text="标签一" />
                    <sd-tag text="标签二" variant="light" type="primary" />
                    <sd-tag text="标签三" variant="light" type="success" />
                    <sd-tag text="标签四" variant="light" type="warning" />
                    <sd-tag text="标签五" variant="light" type="danger" />
                </view>

                <view style="margin-top: 16rpx;">
                    <sd-tag text="标签一" variant="plain" />
                    <sd-tag text="标签二" variant="plain" type="primary" />
                    <sd-tag text="标签三" variant="plain" type="success" />
                    <sd-tag text="标签四" variant="plain" type="warning" />
                    <sd-tag text="标签五" variant="plain" type="danger" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                定义圆角
            </view>
            <view class="demo-card__body">
                <sd-tag text="标签一" round />
                <sd-tag text="标签二" round />
                <sd-tag text="标签三" round />
                <sd-tag text="标签四" round />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                最大宽度
            </view>
            <view class="demo-card__body">
                <sd-tag text="我是一段很大文本的标签" :max-width="200" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义颜色
            </view>
            <view class="demo-card__body">
                <sd-tag text="我是一段很大文本的标签" :max-width="200" background="red" color="white" />
            </view>
        </view>
    </sd-page>
</template>

<style lang='scss' scoped>
:deep(.sd-tag) {
    margin-right: 16rpx;
}
</style>
