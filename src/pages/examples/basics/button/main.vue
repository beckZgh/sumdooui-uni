<script lang="ts" setup>
//
</script>

<template>
    <sd-page title="Button 按钮">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-button type="primary" block text="主要按钮" />
                <sd-button type="primary" block variant="light" text="填充按钮" />
                <sd-button type="primary" block variant="plain" text="幽灵按钮" />
                <sd-button text="默认按钮" block />
                <sd-button variant="text" block text="文本按钮" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                不同主题
            </view>
            <view class="demo-card__body">
                <view style="margin-bottom: 20rpx;">
                    <sd-button shape="square" text="默认" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button shape="square" type="primary" text="主要" />
                    <sd-button shape="square" type="success" text="成功" />
                    <sd-button shape="square" type="warning" text="警告" />
                    <sd-button shape="square" type="danger" text="危险" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button shape="square" variant="light" type="primary" text="主要" />
                    <sd-button shape="square" variant="light" type="success" text="成功" />
                    <sd-button shape="square" variant="light" type="warning" text="警告" />
                    <sd-button shape="square" variant="light" type="danger" text="危险" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button shape="square" variant="plain" type="primary" text="主要" />
                    <sd-button shape="square" variant="plain" type="success" text="成功" />
                    <sd-button shape="square" variant="plain" type="warning" text="警告" />
                    <sd-button shape="square" variant="plain" type="danger" text="危险" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button shape="square" variant="text" text="默认" />
                </view>

                <view>
                    <sd-button shape="square" variant="text" type="primary" text="主要" />
                    <sd-button shape="square" variant="text" type="success" text="成功" />
                    <sd-button shape="square" variant="text" type="warning" text="警告" />
                    <sd-button shape="square" variant="text" type="danger" text="危险" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                按钮形状
            </view>
            <view class="demo-card__body">
                <sd-button type="primary" text="椭圆按钮" />
                <sd-button type="primary" text="方形按钮" shape="square" />
                <sd-button type="primary" text="圆" shape="circle" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                按钮大小
            </view>
            <view class="demo-card__body">
                <sd-button type="primary" size="small" text="小号按钮" />
                <sd-button type="primary" text="普通按钮" />
                <sd-button type="primary" size="large" text="大号按钮" />

                <view style="margin-top: 16rpx;">
                    <sd-button type="primary" shape="square" size="small" text="小号按钮" />
                    <sd-button type="primary" shape="square" text="普通按钮" />
                    <sd-button type="primary" shape="square" size="large" text="大号按钮" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                图形按钮
            </view>
            <view class="demo-card__body">
                <sd-button type="primary" icon="star" shape="square" />
                <sd-button type="primary" icon="like" shape="square" />

                <view style="margin-top: 20rpx;">
                    <sd-button block icon="star" text="收藏" />
                    <sd-button block icon="like" text="点赞" />
                    <sd-button block icon="star" icon-color="red" text="收藏" variant="square" />
                    <sd-button block icon="like" icon-color="red" text="点赞" variant="square" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                禁用状态
            </view>
            <view class="demo-card__body">
                <view style="margin-bottom: 20rpx;">
                    <sd-button disabled shape="square" text="默认" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button disabled shape="square" type="primary" text="主要" />
                    <sd-button disabled shape="square" type="success" text="成功" />
                    <sd-button disabled shape="square" type="warning" text="警告" />
                    <sd-button disabled shape="square" type="danger" text="危险" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button disabled shape="square" variant="light" type="primary" text="主要" />
                    <sd-button disabled shape="square" variant="light" type="success" text="成功" />
                    <sd-button disabled shape="square" variant="light" type="warning" text="警告" />
                    <sd-button disabled shape="square" variant="light" type="danger" text="危险" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button disabled shape="square" variant="plain" type="primary" text="主要" />
                    <sd-button disabled shape="square" variant="plain" type="success" text="成功" />
                    <sd-button disabled shape="square" variant="plain" type="warning" text="警告" />
                    <sd-button disabled shape="square" variant="plain" type="danger" text="危险" />
                </view>

                <view style="margin-bottom: 20rpx;">
                    <sd-button disabled shape="square" variant="text" text="默认" />
                </view>

                <view>
                    <sd-button disabled shape="square" variant="text" type="primary" text="主要" />
                    <sd-button disabled shape="square" variant="text" type="success" text="成功" />
                    <sd-button disabled shape="square" variant="text" type="warning" text="警告" />
                    <sd-button disabled shape="square" variant="text" type="danger" text="危险" />
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                加载状态
            </view>
            <view class="demo-card__body">
                <sd-button type="primary" block loading text="主要按钮" />
                <sd-button type="success" block loading text="成功按钮" />
                <sd-button type="warning" block loading text="警告按钮" />
                <sd-button type="danger" block loading text="危险按钮" />
                <sd-button type="primary" block loading variant="light" text="填充按钮" />
                <sd-button type="primary" block loading variant="plain" text="幽灵按钮" />
                <sd-button block loading variant="plain" text="默认按钮" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                微信特征按钮
            </view>
            <view class="demo-card__body">
                <sd-button type="primary" block variant="light" open-type="contact" text="打开客户" />
                <sd-button type="primary" block variant="plain" open-type="openSetting" text="打开授权设置页" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义按钮样式
            </view>
            <view class="demo-card__body">
                <sd-button block :custom-style="{ background: 'linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36))', color: '#fff' }" text="自定义颜色" />
                <sd-button block type="primary" :custom-style="{ height: '140rpx' }" text="自定义高度" />
                <sd-button block type="primary" :custom-style="{ width: '360rpx' }" text="自定义宽度" />
            </view>
        </view>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-button) {
    margin-right: 8rpx;
}
:deep(.sd-button.is-block) {
    margin-right: 0;
    margin-bottom: 32rpx;
}
</style>
