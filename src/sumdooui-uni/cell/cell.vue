<script lang="ts">
import type { CSSProperties, PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name : 'SdCell',
    props: {
        customClass      : { type: String                            }, // 自定义类名
        customStyle      : { type: Object as PropType<CSSProperties> }, // 自定义样式
        title            : { type: String, default: ''               }, // 标题
        titleStyle       : { type: Object as PropType<CSSProperties> }, // 标题自定义样式
        subTitle         : { type: String, default: ''               }, // 副标题
        subTitleStyle    : { type: Object as PropType<CSSProperties> }, // 副标题自定义样式
        value            : { type: String, default: ''               }, // 值
        valueStyle       : { type: Object as PropType<CSSProperties> }, // 值自定义样式
        topBorder        : { type: Boolean, deafult: false           }, // 顶部边框线
        topBorderStyle   : { type: Object as PropType<CSSProperties> }, // 顶部边框线自定义样式
        bottomBorder     : { type: Boolean, default: false           }, // 底部边框
        bottomBorderStyle: { type: Object as PropType<CSSProperties> }, // 底部边框自定义样式
        round            : { type: Boolean, default: false           }, // 是否圆角
        clickable        : { type: Boolean, default: true            }, // 是否点击反馈
        arrow            : { type: Boolean, default: false           }, // 是否显示右侧箭头
    },
    emits: ['click'],
})
</script>

<template>
    <view class="sd-cell" :class="[{ 'is-round': round, 'is-active': clickable }, customClass]" :style="customStyle" @tap="$emit('click', $event)">
        <!-- 顶部边框 -->
        <view v-if="topBorder" class="sd-cell__top-border" :style="topBorderStyle" />

        <!-- 单元格内容区域 -->
        <slot>
            <!-- 单元格图标内容 -->
            <view v-if="$slots.icon" class="sd-cell__icon">
                <slot name="icon" />
            </view>

            <!-- 单元格标题、副标题内容 -->
            <view v-if="title" class="sd-cell__content">
                <view class="sd-cell__title" :style="titleStyle">
                    {{ title }}
                </view>
                <view v-if="subTitle" class="sd-cell__sub-title" :style="subTitleStyle">
                    {{ subTitle }}
                </view>
            </view>

            <!-- 单元格右侧内容 -->
            <slot v-if="$slots.extra" name="extra" />
            <view v-else-if="value" class="sd-cell__value" :style="valueStyle">
                {{ value }}
            </view>

            <!-- 右侧箭头 -->
            <view v-if="arrow" class="sd-cell__arrow" />
        </slot>

        <!-- 底部边框 -->
        <view v-if="bottomBorder" class="sd-cell__bottom-border" :style="bottomBorderStyle" />
    </view>
</template>

<style lang="scss">
.sd-cell {
    position: relative;
    display: flex;
    align-items: center;
    padding: 32rpx;
    background-color: var(--sd-cell-bg-color, var(--sd-bg-color-white, #fff));
    box-sizing: border-box;

    &.is-active:active {
        background-color: var(--sd-bg-color-hover, rgba(0, 0, 0, 0.2));
    }

    &.is-round {
        border-radius: var(--sd-cell-border-radius, 16rpx);
    }

    &__content {
        flex: 1;
    }

    &__value {
        text-align: right;
        flex: 1;
    }

    &__icon {
        font-size: 0;
        margin-right: 32rpx;
    }

    &__sub-title {
        font-size: 28rpx;
        margin-top: 16rpx;
        color: var(--sd-text-color-subtitle, #7F7F7F);
    }

    &__arrow {
        width: 40rpx;
        height: 40rpx;
        border-width: 3px 3px 0 0;
        border-style: solid;
        transform: rotate(45deg) scale(0.5);
        border-radius: 4rpx;
        flex-shrink: 0;
        box-sizing: border-box;
        transform-origin: center center;
        margin-right: -5.8579rpx;
        border-color: var(--sd-cell-arrow-border-color, #969799);
    }

    &__top-border,
    &__bottom-border {
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        transform: scaleY(.5);
        transform-origin: 0 0;
        z-index: 1;
        background-color: var(--sd-border-color, #dcdfe6);
    }

    &__top-border {
        top: 0;
    }

    &__bottom-border {
        bottom: 0;
    }
}
</style>
