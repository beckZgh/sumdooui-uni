<script setup lang="ts">
//
</script>

<template>
    <sd-page title="Animate 动画/动效">
        <demo-card title="点击触发动画">
            <view style="display: flex; justify-content: space-between;">
                <sd-animate type="slide-left" trigger="click">
                    <sd-button type="primary" button-text="由左向右划入" />
                </sd-animate>

                <sd-animate type="slide-right" trigger="click">
                    <sd-button type="primary" button-text="由右向左划入" />
                </sd-animate>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate type="slide-top" trigger="click">
                    <sd-button type="primary" button-text="由上到下划入" />
                </sd-animate>

                <sd-animate type="slide-bottom" trigger="click">
                    <sd-button type="primary" button-text="由下到上划入" />
                </sd-animate>
            </view>
        </demo-card>

        <demo-card title="循环触发动画">
            <view style="display: flex; justify-content: space-between;">
                <sd-animate type="shake" loop>
                    <sd-button type="primary" button-text="shake-抖动" />
                </sd-animate>

                <sd-animate type="ripple" loop>
                    <sd-button type="primary" button-text="ripple-心跳" />
                </sd-animate>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate type="breath" loop>
                    <sd-button type="primary" button-text="breath-呼吸灯" />
                </sd-animate>

                <sd-animate type="twinkle" loop>
                    <sd-button type="primary" button-text="twinkle-水波" />
                </sd-animate>
            </view>

            <view style="display: flex; justify-content: space-between;">
                <sd-animate type="flicker" loop>
                    <sd-button type="primary" button-text="flicker-擦亮" />
                </sd-animate>

                <sd-animate type="jump" loop>
                    <sd-button type="primary" button-text="Jump 跳跃" />
                </sd-animate>
            </view>

            <sd-animate type="float" loop>
                <sd-button type="primary" button-text="float 漂浮" />
            </sd-animate>
        </demo-card>
    </sd-page>
</template>

<style lang='scss' scoped>
:deep(.sd-button) {
    margin-bottom: 32rpx;
}
</style>
