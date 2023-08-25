<script lang="ts" setup>
//
</script>

<template>
    <sd-page title="Button 按钮">
        <demo-card title="基本用法">
            <sd-button button-text="默认按钮" />
            <sd-button type="primary" button-text="主要按钮" />
            <sd-button type="success" button-text="成功按钮" />
            <sd-button type="warning" button-text="警告按钮" />
            <sd-button type="danger" button-text="危险按钮" />
        </demo-card>

        <demo-card title="朴素按钮">
            <sd-button plain button-text="默认按钮" />
            <sd-button type="primary" plain button-text="主要按钮" />
            <sd-button type="success" plain button-text="成功按钮" />
            <sd-button type="warning" plain button-text="警告按钮" />
            <sd-button type="danger" plain button-text="危险按钮" />
        </demo-card>

        <demo-card title="幽灵按钮">
            <sd-button ghost button-text="默认按钮" />
            <sd-button type="primary" ghost button-text="主要按钮" />
            <sd-button type="success" ghost button-text="成功按钮" />
            <sd-button type="warning" ghost button-text="警告按钮" />
            <sd-button type="danger" ghost button-text="危险按钮" />
        </demo-card>

        <demo-card title="文本按钮">
            <sd-button text button-text="默认按钮" />
            <sd-button type="primary" text button-text="主要按钮" />
            <sd-button type="success" text button-text="成功按钮" />
            <sd-button type="warning" text button-text="警告按钮" />
            <sd-button type="danger" text button-text="危险按钮" />
        </demo-card>

        <demo-card title="显示背景色的文本按钮">
            <sd-button bg text button-text="默认按钮" />
            <sd-button bg type="primary" text button-text="主要按钮" />
            <sd-button bg type="success" text button-text="成功按钮" />
            <sd-button bg type="warning" text button-text="警告按钮" />
            <sd-button bg type="danger" text button-text="危险按钮" />
        </demo-card>


        <demo-card title="按钮大小">
            <sd-button type="primary" size="mini" button-text="迷你按钮" />
            <sd-button type="primary" size="small" button-text="小号按钮" />
            <sd-button type="primary" button-text="普通按钮" />
            <sd-button type="primary" size="large" button-text="大号按钮" />
        </demo-card>

        <demo-card title="按钮形状">
            <sd-button type="primary" button-text="方形按钮" />
            <sd-button type="primary" button-text="椭圆按钮" round />
            <sd-button type="primary" icon="setting" circle />
        </demo-card>

        <demo-card title="禁用状态">
            <view class="sd-mb-20">
                <sd-button disabled button-text="默认按钮" />
                <sd-button disabled type="primary" button-text="主要按钮" />
                <sd-button disabled type="success" button-text="成功按钮" />
                <sd-button disabled type="warning" button-text="警告按钮" />
                <sd-button disabled type="danger" button-text="危险按钮" />
            </view>
        </demo-card>

        <demo-card title="加载状态">
            <sd-button loading button-text="默认按钮" />
            <sd-button loading type="primary" button-text="主要按钮" />
            <sd-button loading type="success" button-text="成功按钮" />
            <sd-button loading type="warning" button-text="警告按钮" />
            <sd-button loading type="danger" button-text="危险按钮" />
        </demo-card>

        <demo-card title="微信特征按钮">
            <sd-button type="primary" block open-type="contact" button-text="打开客户" />
            <sd-button type="primary" block open-type="openSetting" button-text="打开授权设置页" />
        </demo-card>

        <demo-card title="自定义按钮样式">
            <sd-button block :custom-style="{ background: 'linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36))', color: '#fff' }" button-text="自定义颜色" />
            <sd-button block type="primary" :custom-style="{ height: '140rpx' }" button-text="自定义高度" />
            <sd-button block type="primary" width="360rpx" button-text="自定义宽度" />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-button) {
    margin-right: 16rpx;
    margin-bottom: 16rpx;
}
:deep(.sd-button.is-block) {
    margin-right: 0;
    margin-bottom: 32rpx;
}
</style>
