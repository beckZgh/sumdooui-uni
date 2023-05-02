<script setup lang="ts">
const content = 'SumdooUI-UNI 是一套基于 uniapp 开发的组件化、可复用、偏业务端型的移动端UI组件库'
</script>

<template>
    <sd-page title="NoticeBar 通告栏">
        <demo-card title="基本用法">
            <sd-notice-bar :content="content" prefix-icon="sound" />
            <sd-notice-bar :content="content" prefix-icon="sound" theme="primary" />
            <sd-notice-bar :content="content" prefix-icon="sound" theme="success" />
            <sd-notice-bar :content="content" prefix-icon="sound" theme="danger" />
            <sd-notice-bar :content="content" prefix-icon="sound" theme="default" />
        </demo-card>

        <demo-card title="滚动播放">
            <sd-notice-bar :content="content" />
            <sd-notice-bar :content="content" :scrollable="false" />
        </demo-card>

        <demo-card title="多行展示">
            <sd-notice-bar :content="content" :scrollable="false" wrapable closeable />
        </demo-card>

        <demo-card title="可关闭的">
            <sd-notice-bar :content="content" prefix-icon="sound" closeable />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-notice-bar) {
    margin-bottom: 20rpx;
}
</style>
