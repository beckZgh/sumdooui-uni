<script lang="ts">
import type { CSSProperties, PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name : 'SdCellGroup',
    props: {
        customClass: { type: String                            }, // 自定义类名
        customStyle: { type: Object as PropType<CSSProperties> }, // 自定义样式
        title      : { type: String, default: ''               }, // 标题
        titleStyle : { type: Object as PropType<CSSProperties> }, // 标题自定义样式
    },
})
</script>

<template>
    <view class="sd-cell-group" :class="[customClass]" :style="customStyle">
        <slot v-if="$slots.title" name="title" />
        <view v-else-if="title" class="sd-cell-group__title" :style="titleStyle">
            {{ title }}
        </view>
        <view class="sd-cell-group">
            <slot />
        </view>
    </view>
</template>

<style lang="scss">
.sd-cell-group {
    &__title {
        padding: 32rpx 32rpx 20rpx 32rpx;
        font-size: 28rpx;
        color: var(--sd-cell-group-title-color, var(--sd-text-color-subtitle, #7F7F7F));
    }
}
</style>
