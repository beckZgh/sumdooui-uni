<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name : 'DemoCard',
    props: {
        title: { type: String },
        dark : { type: Boolean },
        card : { type: Boolean },
    },
})
</script>

<template>
    <view class="card" :class="{ 'is-dark': dark, 'card--card': card }">
        <view class="card__title">
            {{ title }}
        </view>
        <view class="card__body">
            <slot />
        </view>
        <view class="card__footer">
            <slot nmae="footer" />
        </view>
    </view>
</template>

<style lang='scss' scoped>
.card {
    background-color: $sd-white;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    padding: 40rpx 0 0;

    &__title {
        font-size: 30rpx;
        line-height: 1;
        margin-left: $sd-spacer-2;
        padding-left: 36rpx;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 30rpx;

        &::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            background: #07c16c; // $sd-primary-color;
            border-radius: $sd-border-radius-circle;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    &.is-dark {
        background-color: #1B1B1B;
        color: #D1D1D1;
    }

    // 卡片展示
    &--card {
        margin-left: 30rpx;
        margin-right: 30rpx;
        border-radius: $sd-spacer;
        padding-bottom: 40rpx;

        .card_title {
            margin-bottom: 20rpx;
        }

        .card__body {
            padding: $sd-spacer-2;
            box-sizing: border-box;
        }
    }
}
</style>
