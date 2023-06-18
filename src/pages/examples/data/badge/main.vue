<script setup lang="ts">
//
</script>

<template>
    <sd-page title="Badge 徽标">
        <demo-card title="基本用法">
            <sd-badge dot />
            <sd-badge :content="1" />
            <sd-badge :content="10" />
            <sd-badge :content="100" />
            <sd-badge :content="1000" :max="999" />
            <sd-badge content="New" />
        </demo-card>

        <demo-card title="徽标形状">
            <sd-badge :content="10">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" shape="square">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" shape="bubble">
                <view class="badge-block" />
            </sd-badge>
        </demo-card>

        <demo-card title="徽标位置">
            <sd-badge :content="10">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" position="bottom-right">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" position="top-left">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" position="bottom-left">
                <view class="badge-block" />
            </sd-badge>
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-badge background="#626aef" dot />
            <sd-badge background="#626aef" :content="1" />
            <sd-badge background="#626aef" :content="10" />
            <sd-badge background="#626aef" :content="100" />
            <sd-badge background="#626aef" :content="1000" :max="999" />
            <sd-badge background="#626aef" content="New" />
        </demo-card>

        <demo-card title="预设主题">
            <sd-badge :content="10" />
            <sd-badge :content="10" type="primary" />
            <sd-badge :content="10" type="success" />
            <sd-badge :content="10" type="warning" />
            <sd-badge dot />
            <sd-badge dot type="primary" />
            <sd-badge dot type="success" />
            <sd-badge dot type="warning" />
        </demo-card>

        <demo-card title="场景应用">
            <sd-badge :content="10">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" type="primary">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" type="success">
                <view class="badge-block" />
            </sd-badge>
            <sd-badge :content="10" type="warning">
                <view class="badge-block" />
            </sd-badge>

            <view>
                <sd-badge dot>
                    <view class="badge-block" />
                </sd-badge>
                <sd-badge dot type="primary">
                    <view class="badge-block" />
                </sd-badge>
                <sd-badge dot type="success">
                    <view class="badge-block" />
                </sd-badge>
                <sd-badge dot type="warning">
                    <view class="badge-block" />
                </sd-badge>
            </view>

            <view>
                <sd-badge>
                    <view class="badge-block" />
                    <template #content>
                        <sd-icon custom-class="badge-icon" name="check" />
                    </template>
                </sd-badge>
                <sd-badge type="primary">
                    <view class="badge-block" />
                    <template #content>
                        <sd-icon custom-class="badge-icon" name="check" />
                    </template>
                </sd-badge>
                <sd-badge type="success">
                    <view class="badge-block" />
                    <template #content>
                        <sd-icon custom-class="badge-icon" name="check" />
                    </template>
                </sd-badge>
                <sd-badge type="warning">
                    <view class="badge-block" />
                    <template #content>
                        <sd-icon custom-class="badge-icon" name="check" />
                    </template>
                </sd-badge>
            </view>
        </demo-card>
    </sd-page>
</template>

<style lang="scss">
:deep(.sd-badge) {
    margin-right: 36rpx;
}

.badge-block {
    display: inline-block;
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 30rpx;
    background-color: #ddd;
}

.badge-icon {
    display: block;
    font-size: 10px;
    line-height: 16px;
}
</style>
