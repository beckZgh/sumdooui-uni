<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name : 'DemoCard',
    props: {
        title      : { type: String , default: ''    },
        dark       : { type: Boolean, default: false },
        card       : { type: Boolean, default: true  },
        bodyStyle  : { type: [Object, String], default: '' },
        bodyClass  : { type: [Object, String] },
        bottomGap  : { type: Boolean }, // 底部留白
        transparent: { type: Boolean },
    },
})
</script>

<template>
    <view class="card" :class="{ 'is-dark': dark, 'card--card': card, 'not-content': transparent || !$slots.default }">
        <view class="card__title">
            {{ title }}
        </view>
        <view v-if="$slots.default" class="card__body"  :class="bodyClass" :style="bodyStyle">
            <slot />
            <view v-if="bottomGap" style="height: 60rpx" />
        </view>
        <view class="card__footer">
            <slot nmae="footer" />
        </view>
    </view>
</template>

<style lang='scss' scoped>
.card {
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    padding: 40rpx 0 0;
    background-color: $sd-white;
    color: $sd-text-color;
    &.is-dark {
        background-color: $sd-bg-color;
    }

    &.not-content {
        background-color: transparent;
    }

    &__title {
        font-size: 30rpx;
        line-height: 1;
        margin-left: $sd-padding-sm;
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
            border-radius: $sd-radius-circle;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    // 卡片展示
    &--card {
        margin-left: 30rpx;
        margin-right: 30rpx;
        border-radius: $sd-padding-base;
        padding-bottom: 40rpx;

        .card_title {
            margin-bottom: 20rpx;
        }

        .card__body {
            padding: $sd-padding-sm;
            box-sizing: border-box;
        }
    }
}
</style>
