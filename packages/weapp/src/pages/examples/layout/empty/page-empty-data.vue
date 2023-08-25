<script setup lang="ts">
function onClickButton() {
    uni.navigateBack({ delta: 1 })
}
</script>

<template>
    <sd-page title="页面内容为空" lock-scroll>
        <sd-empty scene="page" button-text="返回" @click-button="onClickButton" />
    </sd-page>
</template>
