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
            <sd-tag text="标签二" type="primary" />
            <sd-tag text="标签三" type="success" />
            <sd-tag text="标签四" type="warning" />
            <sd-tag text="标签五" type="danger" />

            <view class="sd-mt-16">
                <sd-tag text="标签一" />
                <sd-tag text="标签二" light type="primary" />
                <sd-tag text="标签三" light type="success" />
                <sd-tag text="标签四" light type="warning" />
                <sd-tag text="标签五" light type="danger" />
            </view>

            <view class="sd-mt-16">
                <sd-tag text="标签一" plain />
                <sd-tag text="标签二" plain type="primary" />
                <sd-tag text="标签三" plain type="success" />
                <sd-tag text="标签四" plain type="warning" />
                <sd-tag text="标签五" plain type="danger" />
            </view>
        </demo-card>

        <demo-card title="带图标的标签">
            <sd-tag text="美丽的" icon="like" type="primary" light />
            <sd-tag text="极好的" icon="like" type="warning" light />
            <sd-tag text="太赞了" icon="like" type="danger" light />
        </demo-card>

        <demo-card title="预设尺寸">
            <sd-tag text="标签一" type="primary" light size="small" />
            <sd-tag text="标签二" type="primary" light shape="round" size="small" />
            <sd-tag text="标签三" type="primary" light shape="mark" size="small" />

            <view class="sd-mt-16">
                <sd-tag text="标签一" type="primary" light size="normal" />
                <sd-tag text="标签二" type="primary" light shape="round" size="normal" />
                <sd-tag text="标签三" type="primary" light shape="mark" size="normal" />
            </view>

            <view class="sd-mt-16">
                <sd-tag text="标签一" type="primary" light size="large" />
                <sd-tag text="标签二" type="primary" light shape="round" size="large" />
                <sd-tag text="标签三" type="primary" light shape="mark" size="large" />
            </view>
        </demo-card>

        <demo-card title="不同形状">
            <sd-tag text="标签一" type="primary" shape="square" />
            <sd-tag text="标签二" type="primary" shape="round" />
            <sd-tag text="标签三" type="primary" shape="mark" />

            <view class="sd-mt-16">
                <sd-tag text="标签一" type="primary" light shape="square" />
                <sd-tag text="标签二" type="primary" light shape="round" />
                <sd-tag text="标签三" type="primary" light shape="mark" />
            </view>

            <view class="sd-mt-16">
                <sd-tag text="标签一" type="primary" plain shape="square" />
                <sd-tag text="标签二" type="primary" plain shape="round" />
                <sd-tag text="标签三" type="primary" plain shape="mark" />
            </view>
        </demo-card>

        <demo-card title="最大宽度">
            <sd-tag text="我是一段很大文本的标签" :max-width="200" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-tag text="我是一段很大文本的标签" :max-width="200" background="red" color="white" />
        </demo-card>

        <demo-card title="可关闭的标签">
            <sd-tag v-if="show_1" text="美丽的" type="primary" closeable @close="show_1 = false" />
            <sd-tag v-if="show_2" text="美丽的" type="primary" light closeable @close="show_2 = false" />
            <sd-tag v-if="show_3" text="美丽的" type="primary" plain closeable @close="show_3 = false" />
        </demo-card>
    </sd-page>
</template>
