<script setup lang="ts">
const content = `我是内容`.repeat(20)

const NUM_MAP = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

function onChange(item: any) {
    console.log('--item', item)
}
</script>

<template>
    <sd-page title="Collapse 折叠面板">
        <demo-card title="基本用法" :card="false">
            <sd-collapse-item v-for="item in 5" :key="item" :title="`面板${ NUM_MAP[item - 1] }`" :content="content" />
        </demo-card>

        <demo-card title="定义默认展开选项" :card="false">
            <sd-collapse-item v-for="item in 5" :key="item" :title="`面板${ NUM_MAP[item - 1] }`" :open="item === 2" :content="content" />
        </demo-card>

        <demo-card title="手风琴效果" :card="false">
            <sd-collapse accordion @change="onChange">
                <sd-collapse-item v-for="item in 5" :key="item" :index="`test${ item }`" open :title="`面板${ NUM_MAP[item - 1] }`" :content="content" />
            </sd-collapse>
        </demo-card>

        <demo-card title="自定义样式" :card="false">
            <sd-collapse-item v-for="item in 5" :key="item" icon="github-fill" :title="`面板${ NUM_MAP[item - 1] }`">
                <view class="content-wrap">
                    {{ content }}
                </view>
            </sd-collapse-item>
        </demo-card>
    </sd-page>
</template>

<style lang="scss">
.content-wrap {
    background-color: $sd-bg-color-container;
    padding: 30rpx;
    border-radius: 16rpx;
    box-sizing: border-box;
}
</style>
