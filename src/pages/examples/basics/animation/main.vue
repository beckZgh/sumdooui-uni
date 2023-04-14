<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { reactive } from 'vue'

const m = reactive({
    show  : false,
    mode  : ['fade'],
    styles: {} as CSSProperties,
})

function ani(mode: string[], mask: boolean) {
    if (mask) {
        m.styles.backgroundColor = 'rgba(0,0,0,0.6)'
    } else {
        m.styles.backgroundColor = 'rgba(0,0,0,0)'
    }
    m.mode = mode
    m.show = !m.show
}

function handleClose() {
    m.show = false
}
</script>

<template>
    <sd-page title="Animation 动画">
        <view class="demo-section__title">
            基本用法
        </view>
        <view class="demo-page__spacing">
            <sd-button type="primary" block @click="ani(['fade'], true)">
                Fade
            </sd-button>
            <sd-button type="primary" block @click="ani(['slide-top'], false)">
                Slide Top
            </sd-button>
            <sd-button type="primary" block @click="ani(['slide-bottom'], false)">
                Slide Bottom
            </sd-button>
            <sd-button type="primary" block @click="ani(['slide-left'], false)">
                Slide Left
            </sd-button>
            <sd-button type="primary" block @click="ani(['slide-right'], false)">
                Slide Right
            </sd-button>
            <sd-button type="primary" block @click="ani(['zoom-in', 'fade'], false)">
                Zoom In
            </sd-button>
            <sd-button type="primary" block @click="ani(['zoom-out', 'fade'], false)">
                Zoom Out
            </sd-button>
            <sd-button type="primary" block @click="ani(['slide-left', 'slide-top', 'fade'], false)">
                Custom
            </sd-button>
        </view>

        <sd-animation :duration="500" :custom-style="m.styles" :types="m.mode" :show="m.show" @click="handleClose">
            <view class="ani-box">
                transition
            </view>
        </sd-animation>
    </sd-page>
</template>

<style lang='scss' scoped>
:deep(.sd-button) {
    margin-bottom: 32rpx;
}

.ani-box {
    width: 400rpx;
    height: 400rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sd-text-color);
    background-color: var(--sd-white);
    box-shadow: var(--sd-box-shadow);
    border-radius: 32rpx;
}
</style>
