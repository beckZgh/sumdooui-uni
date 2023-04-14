<script setup lang="ts">
//
</script>

<template>
    <sd-page title="Badge 徽标">
        <view class="demo-card">
            <view class="demo-card__title">
                基础用法
            </view>
            <view class="demo-card__body">
                <sd-badge dot />
                <sd-badge :content="1" />
                <sd-badge :content="10" />
                <sd-badge :content="100" />
                <sd-badge :content="1000" :max="999" />
                <sd-badge content="New" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义颜色
            </view>
            <view class="demo-card__body">
                <sd-badge background="#626aef" dot />
                <sd-badge background="#626aef" :content="1" />
                <sd-badge background="#626aef" :content="10" />
                <sd-badge background="#626aef" :content="100" />
                <sd-badge background="#626aef" :content="1000" :max="999" />
                <sd-badge background="#626aef" content="New" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                预设主题
            </view>
            <view class="demo-card__body">
                <sd-badge :content="10" />
                <sd-badge :content="10" type="primary" />
                <sd-badge :content="10" type="success" />
                <sd-badge :content="10" type="warning" />
                <sd-badge dot />
                <sd-badge dot type="primary" />
                <sd-badge dot type="success" />
                <sd-badge dot type="warning" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                场景应用
            </view>
            <view class="demo-card__body">
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
            </view>
        </view>
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
</style>
