<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    active_tab: 0,
    items     : [
        { name: '首页', icon: 'home'  },
        { name: '点餐', icon: 'cart'  },
        { name: '订单', icon: 'order' },
        { name: '我的', icon: 'user'  },
    ],
})
</script>

<template>
    <sd-page title="Tabbar 标签栏">
        <view class="demo-card is-custom">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-tabbar v-model="m.active_tab" :items="m.items" />
            </view>
        </view>

        <view class="demo-card is-custom">
            <view class="demo-card__title">
                自定义颜色
            </view>
            <view class="demo-card__body">
                <sd-tabbar
                    v-model="m.active_tab"
                    :items="m.items"
                    inactive-color="#333"
                    active-color="#FFB703"
                />
            </view>
        </view>
    </sd-page>
</template>

