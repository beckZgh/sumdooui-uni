<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    curr_tab  : 1,
    offset_top: 0,
    items     : [
        '推荐',
        '新闻',
        '八卦',
    ],
    name_items: [
        { title: '热门推荐', name: 'tab_1' },
        { title: '实时新闻', name: 'tab_2' },
        { title: '明星八卦', name: 'tab_3' },
    ],
    disabled_items: [
        { title: '热门推荐', name: 'tab_1' },
        { title: '实时新闻', name: 'tab_2', disabled: true },
        { title: '明星八卦', name: 'tab_3' },
    ],
    badge_items: [
        { title: '热门推荐', name: 'tab_1', dot: true },
        { title: '实时新闻', name: 'tab_2', badge: 10 },
        { title: '明星八卦', name: 'tab_3', badge: 'New' },
    ],
    over_items: [
        '标签一',
        '标签二',
        '标签三',
        '标签四',
        '标签五',
        '标签六',
        '标签七',
        '标签八',
        '标签九',
        '标签十',
    ],
})

function onChange(name: string, item: any) {
    console.log('--opt', name, item)
}

const toPage = (name: string) => {
    uni.navigateTo({ url: `./${ name }` })
}

function onBeforeChange(name: number, tab: { title: string }) {
    if (name !== 1) return true
    uni.showToast({ title: `${ tab.title }: 暂不允许更改` })
    return false
}
</script>

<template>
    <sd-page title="Tabs 标签页" @navbar-ready="(height: number) => m.offset_top = height">
        <demo-card title="基本用法" :card="false">
            <sd-tabs :items="m.items" @change="onChange" />
        </demo-card>

        <demo-card title="通过名称匹配" :card="false">
            <sd-tabs :items="m.name_items" @change="onChange" />
        </demo-card>

        <demo-card title="默认选中" :card="false">
            <sd-tabs v-model="m.curr_tab" :items="m.items" @change="onChange" />
        </demo-card>

        <demo-card title="禁用标签" :card="false">
            <sd-tabs :items="m.disabled_items" @change="onChange" />
        </demo-card>

        <demo-card title="自定义选项高度" :card="false">
            <sd-tabs :height="120" :items="m.items" @change="onChange" />
        </demo-card>

        <demo-card title="自定义背景色、初始颜色、激活颜色" :card="false">
            <sd-tabs background="#d1edc4" color="#fff" active-color="#09BE4F" :items="m.items" @change="onChange" />
        </demo-card>

        <demo-card title="设置底部线条宽度和高度" :card="false">
            <sd-tabs line-width="40rpx" line-height="10rpx" :items="m.items" @change="onChange" />
        </demo-card>

        <demo-card title="切换前校验" :card="false">
            <sd-tabs :items="m.items" :before-change="onBeforeChange" @change="onChange" />
        </demo-card>

        <demo-card title="含徽标的选项卡" :card="false">
            <sd-tabs :items="m.badge_items" @change="onChange" />
        </demo-card>

        <demo-card title="粘性布局" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('tabs-sticky')">
                应用
            </sd-button>
        </demo-card>
    </sd-page>
</template>

