<script setup lang="ts">
import { ref } from 'vue'
const status_1 = ref(false)
const status_2 = ref(true)
const status_3 = ref(true)
const status_4 = ref(false)
const status_5 = ref(false)
const status_6 = ref(false)

let lock = false
function onBeforeChange(status: boolean) {
    if (lock) return
    lock = true

    $utils.showLoading(status ? '正在开启中...' : '正在关闭中...')
    return new Promise((resolve) => {
        setTimeout(() => {
            $utils.hideLoading()
            lock = false
            resolve(true)
        }, 1000)
    })
}
</script>

<template>
    <sd-page title="Switch 开关">
        <demo-card title="基本用法">
            <sd-switch v-model="status_1" />
            <sd-switch v-model="status_2" />
        </demo-card>

        <demo-card title="禁用状态">
            <sd-switch v-model="status_1" disabled />
            <sd-switch v-model="status_2" disabled />
        </demo-card>

        <demo-card title="预设类型">
            <sd-switch v-model="status_3" type="primary" />
            <sd-switch v-model="status_3" type="success" />
            <sd-switch v-model="status_3" type="warning" />
            <sd-switch v-model="status_3" type="danger" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-switch v-model="status_3" inactive-color="#eee" active-color="blue" />
        </demo-card>

        <demo-card title="自定义大小">
            <sd-switch v-model="status_3" :size="60" />
        </demo-card>

        <demo-card title="异步变更">
            <sd-switch v-model="status_4" :before-change="onBeforeChange" />
        </demo-card>

        <demo-card title="结合单元格使用" body-style="padding: 0">
            <sd-cell title="是否必须登录" :clickable="false" border :border-style="{ left: '30rpx', right: '30rpx' }">
                <template #extra>
                    <sd-switch v-model="status_5" />
                </template>
            </sd-cell>
            <sd-cell title="是否允许下载" :clickable="false">
                <template #extra>
                    <sd-switch v-model="status_6" />
                </template>
            </sd-cell>
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-switch + .sd-switch) {
    margin-left: 30rpx;
}
</style>
