<script setup lang="ts">

</script>

<template>
    <sd-page title="Avatar 头像">
        <demo-card title="基本用法">
            <sd-avatar src="/static/images/avatar.png" shape="round" />
            <sd-avatar src="/static/images/avatar.png" shape="circle" />
        </demo-card>

        <demo-card title="默认三种尺寸">
            <sd-avatar src="/static/images/avatar.png" size="large" />
            <sd-avatar src="/static/images/avatar.png" />
            <sd-avatar src="/static/images/avatar.png" size="small" />
        </demo-card>

        <demo-card title="使用图标">
            <sd-avatar icon="user" size="large" />
            <sd-avatar icon="user" />
            <sd-avatar icon="user" size="small" />
        </demo-card>

        <demo-card title="使用文字">
            <sd-avatar text="A" size="large" />
            <sd-avatar text="A" />
            <sd-avatar text="A" size="small" />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-avatar) {
    margin-right: 30rpx;
}
</style>
