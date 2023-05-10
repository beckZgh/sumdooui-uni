<script setup lang="ts">
const links = [
    { name: '底部链接' },
    { name: '底部链接' },
]
</script>

<template>
    <sd-page title="Footer 页脚">
        <demo-card title="基本用法">
            <sd-footer text="深圳市三度软件有限公司" />
        </demo-card>
        <demo-card title="含有链接">
            <sd-footer :links="[links[0]]" text="深圳市三度软件有限公司" />
        </demo-card>
        <demo-card title="含有多个链接">
            <sd-footer :links="links" text="深圳市三度软件有限公司" />
        </demo-card>

        <sd-footer is-fixed :links="links" text="深圳市三度软件有限公司" />
    </sd-page>
</template>
