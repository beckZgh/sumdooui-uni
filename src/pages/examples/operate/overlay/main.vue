<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    visible_1             : false,
    close_on_click_overlay: false,
})

function showOverlay(close_on_click_overlay = false) {
    m.visible_1 = true
    m.close_on_click_overlay = close_on_click_overlay
}
</script>

<template>
    <sd-page title="Overlay 遮罩层">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="showOverlay(false)">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                点击遮罩层可关闭
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="showOverlay(true)">
                    应用
                </sd-button>
            </view>
        </view>

        <sd-overlay v-model:visible="m.visible_1" :close-on-click-overlay="m.close_on_click_overlay">
            <sd-button width="50%" @click="m.visible_1 = false;">
                关闭
            </sd-button>
        </sd-overlay>
    </sd-page>
</template>
