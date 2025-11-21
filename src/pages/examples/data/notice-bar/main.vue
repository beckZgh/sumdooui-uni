<script setup lang="ts">
const content1 = 'SumdooUI-UNI 是一套移动端UI组件库'
const content = 'SumdooUI-UNI 是一套基于 uniapp 开发的组件化、可复用、偏业务端型的移动端UI组件库'
</script>

<template>
    <sd-page title="NoticeBar 通告栏">
        <demo-card title="基本用法">
            <sd-notice-bar :content="content1" prefix-icon="sound" />
            <sd-notice-bar :content="content" prefix-icon="sound" type="primary" />
            <sd-notice-bar :content="content" prefix-icon="sound" type="success" />
            <sd-notice-bar :content="content" prefix-icon="sound" type="danger" />
        </demo-card>

        <demo-card title="自定义滚动速率">
            <sd-notice-bar :content="content" prefix-icon="sound" :speed="200" />
        </demo-card>

        <demo-card title="可关闭的">
            <sd-notice-bar :content="content" prefix-icon="sound" closeable />
        </demo-card>

        <demo-card title="不滚动播放、超出省略">
            <sd-notice-bar :content="content" :scrollable="false" />
        </demo-card>

        <demo-card title="多行展示">
            <sd-notice-bar :content="content" wrapable closeable />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-notice-bar) {
    margin-bottom: 20rpx;
}
</style>
