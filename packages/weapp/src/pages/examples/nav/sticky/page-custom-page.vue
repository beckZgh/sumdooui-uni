<script setup lang="ts">
import { ref } from 'vue'
const offset_top = ref(0)
function onPageMounted({ header_height }: { header_height: number }) {
    offset_top.value = header_height
}
</script>

<template>
    <sd-page ref="page_ref" @mounted="onPageMounted">
        <sd-image width="100%" height="50%" />
        <sd-sticky :offset-top="offset_top">
            <view class="demo-sticky__title">
                标题信息
            </view>
        </sd-sticky>
        <sd-cell v-for="idx in 20" :key="idx" title="名称" arrow />
    </sd-page>
</template>
