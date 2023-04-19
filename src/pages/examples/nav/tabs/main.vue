<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    items: [
        { name: '热门推荐' },
        { name: '实时新闻' },
        { name: '明星八卦' },
    ],
    over_items: [
        '标签一',
        '标签二',
        '标签三',
        '标签四',
        '标签五',
        '标签六',
    ],
})
</script>

<template>
    <sd-page title="Navbar 顶部导航">
        <view class="demo-card is-custom">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-tabs :items="m.items" />
            </view>
        </view>

        <view class="demo-card is-custom">
            <view class="demo-card__title">
                超出一屏
            </view>
            <view class="demo-card__body">
                <sd-tabs :items="m.over_items" left-align />
            </view>
        </view>
    </sd-page>
</template>

