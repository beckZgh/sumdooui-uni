<script setup lang="ts">
//
</script>

<template>
    <sd-page title="Alert 警告提示">
        <demo-card title="基本用法">
            <sd-alert type="primary" description="山不在高，有仙则灵" />
            <sd-alert type="success" description="水不在深，有龙则灵" />
            <sd-alert type="warning" description="一日之计在于晨" />
            <sd-alert type="danger" description="谈笑有鸿儒，往来无白丁" />

            <sd-alert type="primary" :light="false" description="山不在高，有仙则灵" />
            <sd-alert type="success" :light="false" description="水不在深，有龙则灵" />
            <sd-alert type="warning" :light="false" description="一日之计在于晨" />
            <sd-alert type="danger"  :light="false" description="谈笑有鸿儒，往来无白丁" />
        </demo-card>

        <demo-card title="显示图标">
            <sd-alert show-icon type="success" description="水不在深，有龙则灵" />
            <sd-alert show-icon type="warning" description="一日之计在于晨" />
            <sd-alert show-icon type="danger" description="谈笑有鸿儒，往来无白丁" />
        </demo-card>

        <demo-card title="文本居中">
            <sd-alert type="success" center description="水不在深，有龙则灵" />
            <sd-alert type="success" center :light="false" description="水不在深，有龙则灵" />
        </demo-card>

        <demo-card title="带标题">
            <sd-alert show-icon type="success" title="成功标题" description="水不在深，有龙则灵" />
            <sd-alert show-icon type="warning" title="警告标题" description="一日之计在于晨" />
            <sd-alert show-icon type="danger" title="危险标题" description="谈笑有鸿儒，往来无白丁谈笑有鸿儒，往来无白丁谈笑有鸿儒，往来无白丁谈笑有鸿儒，往来无白丁" />
        </demo-card>

        <demo-card title="可关闭">
            <sd-alert show-icon type="success" description="水不在深，有龙则灵" closeable />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-alert background="#f3f3f3" color="#606266" show-icon icon="sound" center description="水不在深，有龙则灵" />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-alert + .sd-alert) {
    margin-top: 20rpx;
}
</style>
