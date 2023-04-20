<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    active_tab: 0,
    items     : [
        { name: '首页', icon: 'home'  },
        { name: '点餐', icon: 'cart', dot: true  },
        { name: '订单', icon: 'order', badge: 8 },
        { name: '我的', icon: 'user'  },
    ],
    image_items: [
        {
            pagePath   : "pages/tabbar/home/main",
            name       : "组件",
            image      : "/static/tabbar/assembly_default_3x.png",
            activeImage: "/static/tabbar/assembly_selected_3x.png",
            badge      : 84,
        },
        {
            pagePath   : "pages/tabbar/tools/main",
            name       : "工具",
            image      : "/static/tabbar/layout_default_3x.png",
            activeImage: "/static/tabbar/layout_selected_3x.png",
        },
        {
            pagePath   : "pages/tabbar/template/main",
            name       : "模板",
            dot        : true,
            image      : "/static/tabbar/mod_default_3x.png",
            activeImage: "/static/tabbar/mod_selected_3x.png",
        },
        {
            pagePath   : "pages/tabbar/my/main",
            name       : "我的",
            image      : "/static/tabbar/my_default_3x.png",
            activeImage: "/static/tabbar/my_selected_3x.png",
        },
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

        <view class="demo-card is-custom">
            <view class="demo-card__title">
                使用图片展示图标
            </view>
            <view class="demo-card__body">
                <sd-tabbar
                    v-model="m.active_tab"
                    type="image"
                    :items="m.image_items"
                />
            </view>
        </view>

        <view class="demo-card is-custom">
            <view class="demo-card__title">
                显示上边框
            </view>
            <view class="demo-card__body">
                <sd-tabbar
                    v-model="m.active_tab"
                    type="image"
                    show-top-border
                    :items="m.image_items"
                />
            </view>
        </view>
    </sd-page>
</template>

