<script setup lang="ts">
import { ref, onMounted } from 'vue'
const offset_top = ref(0)
const sticky_container = ref<any>(null)
onMounted(() => {
    sticky_container.value = () => {
        return uni.createSelectorQuery().select('#sticky_container')
    }
})
</script>

<template>
    <sd-page @navbar-ready="(height: number) => { offset_top = height }">
        <view id="sticky_container" ref="sticky_container">
            <sd-sticky :offset-top="offset_top" :container="sticky_container">
                <view class="demo-sticky__title">
                    容器标题
                </view>
            </sd-sticky>
            <view class="placeholder" style="height: 300px;">
                容器范围
            </view>
        </view>
        <sd-cell v-for="idx in 20" :key="idx" title="名称" arrow />
    </sd-page>
</template>

<style lang="scss" scoped>
.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    background-color: $sd-bg-color-container;
}
</style>
