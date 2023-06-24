<script setup lang="ts">
//
</script>

<template>
    <sd-page title="页面加载成功">
        <sd-image width="100%" height="50%" :custom-style="{ fontSize: '50rpx' }" />
        <template v-for="item in 40" :key="item">
            <sd-cell :title="`列表-${ item + 1 }`" />
        </template>

        <template #footer>
            <sd-button block round>
                我是页面底部按钮
            </sd-button>
        </template>
    </sd-page>
</template>

