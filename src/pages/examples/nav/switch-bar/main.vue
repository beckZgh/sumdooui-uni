<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    active_tab : 1,
    items      : ['最新', '热门'],
    three_items: ['最新', '热门', '关注'],
})
</script>

<template>
    <sd-page title="SwitchBar 条件切换栏">
        <demo-card title="基本用法">
            <view class="bar-item">
                <text>全部</text>
                <sd-switch-bar :items="m.items" />
            </view>
        </demo-card>

        <demo-card title="圆形风格">
            <view class="bar-item">
                <text>全部</text>
                <sd-switch-bar round :items="m.items" />
            </view>
        </demo-card>

        <demo-card title="三项选项">
            <view class="bar-item">
                <text>全部</text>
                <sd-switch-bar round :items="m.three_items" />
            </view>
        </demo-card>

        <demo-card title="默认选中">
            <view class="bar-item">
                <text>全部</text>
                <sd-switch-bar v-model="m.active_tab" round :items="m.three_items" />
            </view>
        </demo-card>

        <demo-card title="自定义背景色">
            <view class="bar-item">
                <text>全部</text>
                <sd-switch-bar backgrond="#b5beff" round :items="m.three_items" />
            </view>
        </demo-card>
    </sd-page>
</template>

<style lang="scss">
.bar-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
