<script setup lang="ts">

</script>

<template>
    <sd-image width="100%" height="50%" />
    <sd-sticky :offset-top="50">
        <view class="demo-sticky__title">
            标题信息
        </view>
    </sd-sticky>
    <sd-cell v-for="idx in 20" :key="idx" title="名称" arrow />
</template>
