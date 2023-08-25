<script setup lang="ts">

</script>

<template>
    <sd-page title="Avatar 头像">
        <demo-card title="基本用法">
            <sd-avatar src="/static/images/avatar.png" shape="round" />
            <sd-avatar src="/static/images/avatar.png" shape="circle" />
        </demo-card>

        <demo-card title="使用图标">
            <sd-avatar background="rgb(255, 179, 75)" icon="user" />
            <sd-avatar background="rgb(241, 128, 128)" icon="user" />
            <sd-avatar background="rgb(154, 205, 203)" icon="user" />
            <sd-avatar background="rgb(68, 138, 202)" icon="user" />
        </demo-card>

        <demo-card title="文字头像">
            <sd-avatar text="U" background="rgb(255, 179, 75)" />
            <sd-avatar text="邓" background="rgb(241, 128, 128)" />
            <sd-avatar text="张" background="rgb(154, 205, 203)" />
            <sd-avatar text="王" background="rgb(68, 138, 202)" />
        </demo-card>

        <demo-card title="徽标头像">
            <sd-badge dot>
                <sd-avatar src="/static/images/avatar.png" shape="round" />
            </sd-badge>
            <sd-badge content="12">
                <sd-avatar src="/static/images/avatar.png" />
            </sd-badge>
            <sd-badge content="New">
                <sd-avatar src="/static/images/avatar.png" />
            </sd-badge>
        </demo-card>

        <demo-card title="预设尺寸">
            <sd-avatar src="/static/images/avatar.png" size="large" />
            <sd-avatar src="/static/images/avatar.png" />
            <sd-avatar src="/static/images/avatar.png" size="small" />
            <sd-avatar src="/static/images/avatar.png" size="mini" />
        </demo-card>

        <demo-card title="自定义大小">
            <sd-avatar src="/static/images/avatar.png" :size="80" />
            <sd-avatar icon="user" :size="80" />
            <sd-avatar text="邓" :size="80" />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-avatar + .sd-avatar),
:deep(.sd-badge + .sd-badge) {
    margin-left: 30rpx;
}
</style>
