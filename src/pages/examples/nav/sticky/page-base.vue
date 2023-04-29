<script setup lang="ts">

</script>

<template>
    <sd-image width="100%" height="50%" />
    <sd-sticky>
        <view class="demo-sticky__title">
            标题信息1
        </view>
    </sd-sticky>
    <sd-cell v-for="idx in 10" :key="idx" title="名称" arrow />
    <sd-sticky>
        <view class="demo-sticky__title">
            标题信息2
        </view>
    </sd-sticky>
    <sd-cell v-for="idx in 20" :key="idx" title="名称" arrow />
</template>
