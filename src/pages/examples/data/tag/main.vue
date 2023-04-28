<script setup lang="ts">
import { ref } from 'vue'
const show_1 = ref(true)
const show_2 = ref(true)
const show_3 = ref(true)
</script>

<template>
    <sd-page title="Tag 标签">
        <demo-card title="基本用法">
            <sd-tag text="标签一" />
            <sd-tag text="标签二" theme="primary" />
            <sd-tag text="标签三" theme="success" />
            <sd-tag text="标签四" theme="warning" />
            <sd-tag text="标签五" theme="danger" />

            <view class="sd-mt-16">
                <sd-tag text="标签一" />
                <sd-tag text="标签二" variant="light" theme="primary" />
                <sd-tag text="标签三" variant="light" theme="success" />
                <sd-tag text="标签四" variant="light" theme="warning" />
                <sd-tag text="标签五" variant="light" theme="danger" />
            </view>

            <view class="sd-mt-16">
                <sd-tag text="标签一" variant="plain" />
                <sd-tag text="标签二" variant="plain" theme="primary" />
                <sd-tag text="标签三" variant="plain" theme="success" />
                <sd-tag text="标签四" variant="plain" theme="warning" />
                <sd-tag text="标签五" variant="plain" theme="danger" />
            </view>
        </demo-card>

        <demo-card title="带图标的标签">
            <sd-tag text="美丽的" icon="like" theme="primary" variant="light" />
            <sd-tag text="极好的" icon="like" theme="warning" variant="light" />
            <sd-tag text="太赞了" icon="like" theme="danger" variant="light" />
        </demo-card>

        <demo-card title="预设尺寸">
            <sd-tag text="标签一" theme="primary" variant="light" size="small" />
            <sd-tag text="标签二" theme="primary" variant="light" shape="round" size="small" />
            <sd-tag text="标签三" theme="primary" variant="light" shape="mark" size="small" />

            <view class="sd-mt-16">
                <sd-tag text="标签一" theme="primary" variant="light" size="normal" />
                <sd-tag text="标签二" theme="primary" variant="light" shape="round" size="normal" />
                <sd-tag text="标签三" theme="primary" variant="light" shape="mark" size="normal" />
            </view>

            <view class="sd-mt-16">
                <sd-tag text="标签一" theme="primary" variant="light" size="large" />
                <sd-tag text="标签二" theme="primary" variant="light" shape="round" size="large" />
                <sd-tag text="标签三" theme="primary" variant="light" shape="mark" size="large" />
            </view>
        </demo-card>

        <demo-card title="不同形状">
            <sd-tag text="标签一" theme="primary" shape="square" />
            <sd-tag text="标签二" theme="primary" shape="round" />
            <sd-tag text="标签三" theme="primary" shape="mark" />

            <view class="sd-mt-16">
                <sd-tag text="标签一" theme="primary" variant="light" shape="square" />
                <sd-tag text="标签二" theme="primary" variant="light" shape="round" />
                <sd-tag text="标签三" theme="primary" variant="light" shape="mark" />
            </view>

            <view class="sd-mt-16">
                <sd-tag text="标签一" theme="primary" variant="plain" shape="square" />
                <sd-tag text="标签二" theme="primary" variant="plain" shape="round" />
                <sd-tag text="标签三" theme="primary" variant="plain" shape="mark" />
            </view>
        </demo-card>

        <demo-card title="最大宽度">
            <sd-tag text="我是一段很大文本的标签" :max-width="200" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-tag text="我是一段很大文本的标签" :max-width="200" background="red" color="white" />
        </demo-card>

        <demo-card title="可关闭的标签">
            <sd-tag v-if="show_1" text="美丽的" theme="primary" closeable @close="show_1 = false" />
            <sd-tag v-if="show_2" text="美丽的" theme="primary" variant="light" closeable @close="show_2 = false" />
            <sd-tag v-if="show_3" text="美丽的" theme="primary" variant="plain" closeable @close="show_3 = false" />
        </demo-card>
    </sd-page>
</template>
