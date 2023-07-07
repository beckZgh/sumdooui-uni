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
            <sd-collapse-item title="标题一" content="代码是写出来给人看的，附带能在机器上运行。" />
            <sd-collapse-item title="标题二" content="技术无非就是那些开发它的人的共同灵魂。" />
            <sd-collapse-item title="标题三" content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        </demo-card>

        <demo-card title="手风琴效果" :card="false">
            <sd-collapse accordion @change="onChange">
                <sd-collapse-item title="标题一" content="代码是写出来给人看的，附带能在机器上运行。" />
                <sd-collapse-item title="标题二" content="技术无非就是那些开发它的人的共同灵魂。" />
                <sd-collapse-item title="标题三" content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
            </sd-collapse>
        </demo-card>

        <demo-card title="自定义样式" :card="false">
            <sd-collapse-item title="标题一" :content-style="{ padding: 0 }">
                <view class="content-wrap">
                    代码是写出来给人看的，附带能在机器上运行。
                </view>
            </sd-collapse-item>
            <sd-collapse-item title="标题二" :content-style="{ padding: 0 }">
                <view class="content-wrap">
                    技术无非就是那些开发它的人的共同灵魂。
                </view>
            </sd-collapse-item>
            <sd-collapse-item title="标题三" :content-style="{ padding: 0 }">
                <view class="content-wrap">
                    在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
                </view>
            </sd-collapse-item>
        </demo-card>

        <demo-card title="定义默认展开选项" :card="false">
            <sd-collapse-item title="标题一" content="代码是写出来给人看的，附带能在机器上运行。" />
            <sd-collapse-item title="标题二" content="技术无非就是那些开发它的人的共同灵魂。" />
            <sd-collapse-item open title="标题三" content="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        </demo-card>
    </sd-page>
</template>

<style lang="scss">
.content-wrap {
    background-color: $sd-primary-color-9;
    color: $sd-primary-color-3;
    padding: 30rpx;
    box-sizing: border-box;
}
</style>
