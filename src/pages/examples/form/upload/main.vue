<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    files: [
        { src: 'https://img.jzzp.vip/jzzp/image/02f169777869008a0eaba1f7f2fe7473.jpg', status: 'success' },
        { src: 'https://img.jzzp.vip/jzzp/image/c16c67f56e7c44c4afeaa9ec40fe9d8c.jpg', status: 'uploading' },
        { src: 'https://img.jzzp.vip/jzzp/image/5f92243fac080fd4b61b6f6795237db0.jpg', status: 'fail' },
    ],
})

async function requestMethod(item: any) {
    console.log(item)
}
</script>

<template>
    <sd-page title="Upload 上传组件">
        <demo-card title="基本用法">
            <sd-upload v-model="state.files" :request-method="requestMethod" />
        </demo-card>
    </sd-page>
</template>

<style lnag="scss" scoped>
:deep(.sd-input + .sd-input) {
    margin-top: 20rpx;
}
</style>
