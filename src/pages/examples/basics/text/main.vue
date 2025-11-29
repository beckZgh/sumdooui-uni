<script lang="ts" setup>
//
</script>

<template>
    <sd-page tilte="Text 文本">
        <demo-card title="预设主题">
            <sd-text value="文本" />
            <sd-text value="文本" type="primary" />
            <sd-text value="文本" type="success" />
            <sd-text value="文本" type="warning" />
            <sd-text value="文本" type="danger" />
        </demo-card>

        <demo-card title="自定义颜色大小">
            <sd-text value="文本" :size="80" color="#626aef" />
        </demo-card>

        <demo-card title="独占一行">
            <sd-text value="文本" block type="primary" />
            <sd-text value="文本" block type="success" />
            <sd-text value="文本" block type="warning" />
            <sd-text value="文本" block type="danger" />
        </demo-card>

        <demo-card title="占位符文本">
            <sd-text placeholder="我是占位符文本" block type="primary" />
            <sd-text placeholder="我是占位符文本" block type="success" />
            <sd-text placeholder="我是占位符文本" block type="warning" />
            <sd-text placeholder="我是占位符文本" block type="danger" />
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
.icons-box {
    display: flex;
    flex-wrap: wrap;

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-basis: 33.33333%;
        overflow: hidden;
        height: 160rpx;
        background-color: $sd-white;
        box-sizing: border-box;
        border-bottom: 1px solid $sd-border-color;
        border-right: 1px solid $sd-border-color;

        &__text {
            width: 100%;
            text-align: center;
            margin-top: 16rpx;
            font-size: 24rpx;
        }
    }
}
</style>
