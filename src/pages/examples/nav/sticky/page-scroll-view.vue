<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scroll_top = ref(0)
const offset_top = ref(0)

onMounted(() => {
    uni.createSelectorQuery()
        .select('#scroll_view')
        .boundingClientRect((rect) => {
            if (!Array.isArray(rect)) {
                offset_top.value = rect?.top || 0
            }
        })
        .exec()
})

function onScroll(e: any) {
    scroll_top.value = e.detail.scrollTop
}
</script>

<template>
    <sd-page lock-scroll>
        <template #header>
            <view class="detail">
                <view class="detail-title">
                    Sticky
                </view>
                <view class="detail-desc">
                    向下滑动内容，在 scroll-view 容器中吸附内容。
                </view>
            </view>
        </template>

        <scroll-view id="scroll_view" scroll-y style="position: absolute; width: 100%; height: 100%" @scroll="onScroll">
            <sd-image width="100%" height="50%" />

            <sd-sticky :offset-top="offset_top" :scroll-top="scroll_top">
                <view class="demo-sticky__title">
                    标题信息
                </view>
            </sd-sticky>
            <sd-cell v-for="idx in 20" :key="idx" title="名称" arrow />
        </scroll-view>
    </sd-page>
</template>

<style lang="scss" scoped>
.detail {
    padding: 40rpx 30rpx;
    background-color: $sd-white;

    &-title {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
    }
}
</style>
