<script setup lang="ts">
//
</script>

<template>
    <sd-page title="Animate Box">
        <view class="demo-section__title">
            基本用法
        </view>
        <view class="demo-page__spacing">
            <view style="display: flex; justify-content: space-between;">
                <sd-animate-box type="slide-right" action="click">
                    <sd-button type="primary" text="由右向左划入" />
                </sd-animate-box>

                <sd-animate-box type="slide-left" action="click">
                    <sd-button type="primary" text="由左向右划入" />
                </sd-animate-box>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate-box type="slide-top" action="click">
                    <sd-button type="primary" text="由上到下划入" />
                </sd-animate-box>

                <sd-animate-box type="slide-bottom" action="click">
                    <sd-button type="primary" text="由下到上划入" />
                </sd-animate-box>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate-box type="shake" loop>
                    <sd-button type="primary" text="shake-抖动" />
                </sd-animate-box>

                <sd-animate-box type="ripple" loop>
                    <sd-button type="primary" text="ripple-心跳" />
                </sd-animate-box>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate-box type="breath" loop>
                    <sd-button type="primary" text="breath-呼吸灯" />
                </sd-animate-box>

                <sd-animate-box type="twinkle" loop>
                    <sd-button type="primary" text="twinkle-水波" />
                </sd-animate-box>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate-box type="flicker" loop>
                    <sd-button type="primary" text="flicker-擦亮" />
                </sd-animate-box>

                <sd-animate-box type="jump" loop>
                    <sd-button type="primary" text="Jump 跳跃" />
                </sd-animate-box>
            </view>

            <sd-animate-box type="float" loop>
                <sd-button type="primary" text="float 漂浮" />
            </sd-animate-box>
        </view>
    </sd-page>
</template>

<style lang='scss' scoped>
:deep(.sd-button) {
    margin-bottom: 32rpx;
}
</style>
