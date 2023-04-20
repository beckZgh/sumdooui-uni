<script setup lang="ts">
import { onPageScroll } from '@dcloudio/uni-app'

/** 页面不执行一次，不会输出 pageScroll 的监听函数，组件内部监听也不会触发 */
onPageScroll(() => {})
</script>

<template>
    <sd-image width="100%" height="50%" />
    <sd-sticky>
        <view class="demo-sticky__title">
            标题信息
        </view>
    </sd-sticky>
    <sd-cell v-for="idx in 20" :key="idx" title="名称" arrow />
</template>
