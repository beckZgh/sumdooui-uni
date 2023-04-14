<script lang="ts">
import { defineComponent } from 'vue'
import { cell_props } from './cell'

export default defineComponent({
    name : 'SdCell',
    props: cell_props,
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
