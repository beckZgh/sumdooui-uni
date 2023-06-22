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
        <demo-card title="基本用法" body-class="sd-flex-x-center">
            <sd-button width="75%" @click="showOverlay(false)">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="点击遮罩层可关闭" body-class="sd-flex-x-center">
            <sd-button width="75%" @click="showOverlay(true)">
                应用
            </sd-button>
        </demo-card>

        <sd-overlay v-model:visible="m.visible_1" :close-on-click-overlay="m.close_on_click_overlay">
            <sd-button width="50%" @click="m.visible_1 = false;">
                关闭
            </sd-button>
        </sd-overlay>
    </sd-page>
</template>
