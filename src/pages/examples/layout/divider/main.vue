<script setup lang="ts">

</script>

<template>
    <sd-page title="Divider 分割线">
        <demo-card title="基本用法">
            <sd-divider />
            <sd-divider line-type="dashed" />
            <sd-divider line-type="dotted" />
        </demo-card>

        <demo-card title="自定义内容">
            <sd-divider text="属性定义的内容" />
            <sd-divider>插槽定义的内容</sd-divider>
        </demo-card>

        <demo-card title="自定义线条颜色">
            <sd-divider text="提示信息" line-color="#07c16c" />
        </demo-card>

        <demo-card title="自定义文本颜色">
            <sd-divider text="全部评论 (99)" color="#07c16c" />
        </demo-card>

        <demo-card title="自定义左右间隔">
            <sd-divider text="提示信息" :row-gap="80" />
        </demo-card>

        <demo-card title="自定义上下间隔">
            <sd-divider text="提示信息" :column-gap="120" />
        </demo-card>

        <demo-card title="预设主题">
            <sd-divider text="提示信息" type="primary" />
            <sd-divider text="提示信息" type="success" />
            <sd-divider text="提示信息" type="warning" />
            <sd-divider text="提示信息" type="danger" />
        </demo-card>

        <demo-card title="预设主题 - 线条">
            <sd-divider text="提示信息" sence="line" type="primary" />
            <sd-divider text="提示信息" sence="line" type="success" />
            <sd-divider text="提示信息" sence="line" type="warning" />
            <sd-divider text="提示信息" sence="line" type="danger" />
        </demo-card>

        <demo-card title="预设主题 - 文本">
            <sd-divider text="提示信息" sence="text" type="primary" />
            <sd-divider text="提示信息" sence="text" type="success" />
            <sd-divider text="提示信息" sence="text" type="warning" />
            <sd-divider text="提示信息" sence="text" type="danger" />
        </demo-card>
    </sd-page>
</template>
