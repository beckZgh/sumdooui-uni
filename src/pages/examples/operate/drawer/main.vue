<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    left_popup_1 : false,
    left_popup_2 : false,
    right_popup_1: false,
    right_popup_2: false,
})
</script>

<template>
    <sd-page title="Drawer 抽屉">
        <view class="demo-card">
            <view class="demo-card__title">
                左抽屉
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.left_popup_1 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                左抽屉 (支持手势关闭、内容滚动)
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.left_popup_2 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                右抽屉
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.right_popup_1 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                右抽屉 (支持手势关闭、内容滚动)
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.right_popup_2 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <!-- 左抽屉 -->
        <sd-popup v-model:visible="m.left_popup_1" position="left">
            <sd-image width="100%" height="50%" />
            <template v-for="idx in 5" :key="idx">
                <sd-cell title="标题" arrow />
            </template>
        </sd-popup>

        <!-- 左抽屉 (支持手势关闭、内容滚动) -->
        <sd-popup v-model:visible="m.left_popup_2" position="left">
            <sd-image width="100%" height="50%" />
            <template v-for="idx in 30" :key="idx">
                <sd-cell title="标题" arrow />
            </template>
        </sd-popup>

        <!-- 右抽屉 -->
        <sd-popup v-model:visible="m.right_popup_1" position="right">
            <sd-image width="100%" height="50%" />
            <template v-for="idx in 5" :key="idx">
                <sd-cell title="标题" arrow />
            </template>
        </sd-popup>

        <!-- 右抽屉 (支持手势关闭、内容滚动) -->
        <sd-popup v-model:visible="m.right_popup_2" position="right">
            <sd-image width="100%" height="50%" />
            <template v-for="idx in 30" :key="idx">
                <sd-cell title="标题" arrow />
            </template>
        </sd-popup>
    </sd-page>
</template>
