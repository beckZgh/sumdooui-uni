<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    active_tab  : 0,
    active_tab_1: 0,
    items       : [
        { text: '首页', icon: 'home'  },
        { text: '点餐', icon: 'cart', dot: true  },
        { text: '订单', icon: 'order', badge: 8 },
        { text: '我的', icon: 'user'  },
    ],
    text_items: [
        { text: '首页' },
        { text: '点餐' },
        { text: '订单' },
        { text: '我的' },
    ],
    image_items: [
        {
            pagePath   : "pages/tabbar/home/main",
            text       : "组件",
            image      : "/static/tabbar/assembly_default_3x.png",
            activeImage: "/static/tabbar/assembly_selected_3x.png",
            badge      : 84,
        },
        {
            pagePath   : "pages/tabbar/tools/main",
            text       : "工具",
            image      : "/static/tabbar/layout_default_3x.png",
            activeImage: "/static/tabbar/layout_selected_3x.png",
        },
        {
            pagePath   : "pages/tabbar/template/main",
            text       : "模板",
            dot        : true,
            image      : "/static/tabbar/mod_default_3x.png",
            activeImage: "/static/tabbar/mod_selected_3x.png",
        },
        {
            pagePath   : "pages/tabbar/my/main",
            text       : "我的",
            image      : "/static/tabbar/my_default_3x.png",
            activeImage: "/static/tabbar/my_selected_3x.png",
        },
    ],
})
</script>

<template>
    <sd-page title="Tabbar 标签栏">
        <demo-card title="基本用法" :card="false" transparent>
            <sd-tabbar v-model="m.active_tab" :items="m.items" />
        </demo-card>

        <demo-card title="仅只有文本" :card="false" transparent>
            <sd-tabbar v-model="m.active_tab" :items="m.text_items" text />
        </demo-card>

        <demo-card title="自定义颜色" :card="false" transparent>
            <sd-tabbar
                v-model="m.active_tab"
                :items="m.items"
                inactive-color="#333"
                active-color="#FFB703"
            />
        </demo-card>

        <demo-card title="使用图片展示图标" :card="false" transparent>
            <sd-tabbar v-model="m.active_tab" :items="m.image_items" />
        </demo-card>

        <demo-card title="显示上边框" :card="false" transparent>
            <sd-tabbar v-model="m.active_tab" :items="m.image_items" show-top-border />
        </demo-card>


        <demo-card title="胶囊形式" :card="false" transparent>
            <sd-tabbar v-model="m.active_tab" :items="m.image_items" round />
        </demo-card>

        <demo-card title="特殊标签项" :card="false" transparent>
            <sd-tabbar v-model="m.active_tab_1">
                <sd-tabbar-item
                    image="/static/tabbar/assembly_default_3x.png"
                    active-image="/static/tabbar/assembly_selected_3x.png"
                    text="组件"
                    :name="0"
                />
                <sd-tabbar-item
                    image="/static/tabbar/layout_default_3x.png"
                    active-image="/static/tabbar/layout_selected_3x.png"
                    text="工具"
                    :name="1"
                />
                <sd-tabbar-item :name="2">
                    <view class="spec-tabbar-item">
                        <sd-icon name="scan" :size="50" />
                    </view>
                </sd-tabbar-item>
                <sd-tabbar-item
                    image="/static/tabbar/mod_default_3x.png"
                    active-image="/static/tabbar/mod_selected_3x.png"
                    text="模板"
                    :name="3"
                />
                <sd-tabbar-item
                    image="/static/tabbar/my_default_3x.png"
                    active-image="/static/tabbar/my_selected_3x.png"
                    text="我的"
                    :name="4"
                />
            </sd-tabbar>
        </demo-card>
    </sd-page>
</template>

<style lang="scss">
.spec-tabbar-item {
    background-color: $sd-primary-color;
    color: $sd-white;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 50%;
    transform: translateY(-20rpx);
}
</style>
