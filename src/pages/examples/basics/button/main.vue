<script lang="ts" setup>
//
</script>

<template>
    <sd-page title="Button 按钮">
        <demo-card title="基本用法">
            <sd-button theme="primary" block text="主要按钮" />
            <sd-button theme="primary" block variant="light" text="填充按钮" />
            <sd-button theme="primary" block variant="plain" text="幽灵按钮" />
            <sd-button text="默认按钮" block />
            <sd-button variant="text" block text="文本按钮" />
        </demo-card>

        <demo-card title="不同主题">
            <view class="sd-mb-20">
                <sd-button shape="square" text="默认" />
            </view>

            <view class="sd-mb-20">
                <sd-button shape="square" theme="primary" text="主要" />
                <sd-button shape="square" theme="success" text="成功" />
                <sd-button shape="square" theme="warning" text="警告" />
                <sd-button shape="square" theme="danger" text="危险" />
            </view>

            <view class="sd-mb-20">
                <sd-button shape="square" variant="light" theme="primary" text="主要" />
                <sd-button shape="square" variant="light" theme="success" text="成功" />
                <sd-button shape="square" variant="light" theme="warning" text="警告" />
                <sd-button shape="square" variant="light" theme="danger" text="危险" />
            </view>

            <view class="sd-mb-20">
                <sd-button shape="square" variant="plain" theme="primary" text="主要" />
                <sd-button shape="square" variant="plain" theme="success" text="成功" />
                <sd-button shape="square" variant="plain" theme="warning" text="警告" />
                <sd-button shape="square" variant="plain" theme="danger" text="危险" />
            </view>

            <view class="sd-mb-20">
                <sd-button shape="square" variant="text" text="默认" />
            </view>

            <view>
                <sd-button shape="square" variant="text" theme="primary" text="主要" />
                <sd-button shape="square" variant="text" theme="success" text="成功" />
                <sd-button shape="square" variant="text" theme="warning" text="警告" />
                <sd-button shape="square" variant="text" theme="danger" text="危险" />
            </view>
        </demo-card>

        <demo-card title="按钮形状">
            <sd-button theme="primary" text="椭圆按钮" />
            <sd-button theme="primary" text="方形按钮" shape="square" />
            <sd-button theme="primary" text="圆" shape="circle" />
        </demo-card>

        <demo-card title="按钮大小">
            <sd-button theme="primary" size="small" text="小号按钮" />
            <sd-button theme="primary" text="普通按钮" />
            <sd-button theme="primary" size="large" text="大号按钮" />

            <view class="sd-mt-16">
                <sd-button theme="primary" shape="square" size="small" text="小号按钮" />
                <sd-button theme="primary" shape="square" text="普通按钮" />
                <sd-button theme="primary" shape="square" size="large" text="大号按钮" />
            </view>
        </demo-card>

        <demo-card title="图形按钮">
            <sd-button icon="star" shape="square" />
            <sd-button icon="like" shape="square" />
            <sd-button icon="star" shape="square" text="收藏" />
            <sd-button icon="like" shape="square" text="点赞" />
            <view class="sd-pt-40">
                <sd-button block icon="star" text="收藏" variant="square" />
                <sd-button block icon="like" text="点赞" variant="square" />
            </view>
        </demo-card>

        <demo-card title="禁用状态">
            <view class="sd-mb-20">
                <sd-button disabled shape="square" text="默认" />
            </view>

            <view class="sd-mb-20">
                <sd-button disabled shape="square" theme="primary" text="主要" />
                <sd-button disabled shape="square" theme="success" text="成功" />
                <sd-button disabled shape="square" theme="warning" text="警告" />
                <sd-button disabled shape="square" theme="danger" text="危险" />
            </view>

            <view class="sd-mb-20">
                <sd-button disabled shape="square" variant="light" theme="primary" text="主要" />
                <sd-button disabled shape="square" variant="light" theme="success" text="成功" />
                <sd-button disabled shape="square" variant="light" theme="warning" text="警告" />
                <sd-button disabled shape="square" variant="light" theme="danger" text="危险" />
            </view>

            <view class="sd-mb-20">
                <sd-button disabled shape="square" variant="plain" theme="primary" text="主要" />
                <sd-button disabled shape="square" variant="plain" theme="success" text="成功" />
                <sd-button disabled shape="square" variant="plain" theme="warning" text="警告" />
                <sd-button disabled shape="square" variant="plain" theme="danger" text="危险" />
            </view>

            <view class="sd-mb-20">
                <sd-button disabled shape="square" variant="text" text="默认" />
            </view>

            <view>
                <sd-button disabled shape="square" variant="text" theme="primary" text="主要" />
                <sd-button disabled shape="square" variant="text" theme="success" text="成功" />
                <sd-button disabled shape="square" variant="text" theme="warning" text="警告" />
                <sd-button disabled shape="square" variant="text" theme="danger" text="危险" />
            </view>
        </demo-card>

        <demo-card title="加载状态">
            <sd-button theme="primary" block loading text="主要按钮" />
            <sd-button theme="success" block loading text="成功按钮" />
            <sd-button theme="warning" block loading text="警告按钮" />
            <sd-button theme="danger" block loading text="危险按钮" />
            <sd-button theme="primary" block loading variant="light" text="填充按钮" />
            <sd-button theme="primary" block loading variant="plain" text="幽灵按钮" />
            <sd-button block loading variant="plain" text="默认按钮" />
        </demo-card>

        <demo-card title="微信特征按钮">
            <sd-button theme="primary" block variant="light" open-type="contact" text="打开客户" />
            <sd-button theme="primary" block variant="plain" open-type="openSetting" text="打开授权设置页" />
        </demo-card>

        <demo-card title="自定义按钮样式">
            <sd-button block :custom-style="{ background: 'linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36))', color: '#fff' }" text="自定义颜色" />
            <sd-button block theme="primary" :custom-style="{ height: '140rpx' }" text="自定义高度" />
            <sd-button block theme="primary" width="360rpx" text="自定义宽度" />
        </demo-card>
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
