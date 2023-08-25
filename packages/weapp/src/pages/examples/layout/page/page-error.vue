<script setup lang="ts">
function onClickErrorButton() {
    uni.reLaunch({
        url: '/pages/tabbar/home/main',
    })
}
</script>

<template>
    <sd-page
        title="页面加载失败"
        error="加载失败"
        error-button-text="回到首页"
        :loading="-1"
        @click-error-button="onClickErrorButton"
    />
</template>

