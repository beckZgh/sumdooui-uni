<script lang="ts" setup>
import { ref } from 'vue'

// import { TinyColor } from '@ctrl/tinycolor'

// function genColors(color: string) {
//     const _color  = new TinyColor(color)
//     return {
//         colors: [
//             _color.mix('#fff', 10).toHexString(), // 0
//             _color.mix('#fff', 20).toHexString(), // 1
//             _color.mix('#fff', 30).toHexString(), // 2
//             _color.mix('#fff', 40).toHexString(), // 3
//             _color.mix('#fff', 50).toHexString(), // 4
//             _color.mix('#fff', 60).toHexString(), // 5
//             _color.mix('#fff', 70).toHexString(), // 6
//             _color.mix('#fff', 80).toHexString(), // 7
//             _color.mix('#fff', 90).toHexString(), // 8
//         ],
//     }
// }

const theme_colors = ref([
    { label: '品牌色', value: 'var(--sd-primary-color)', color: '#465CFF' },
    // { label: '品牌色-阶色-1', value: 'var(--sd-primary-color-1)' },
    // { label: '品牌色-阶色-2', value: 'var(--sd-primary-color-2)' },
    // { label: '品牌色-阶色-3', value: 'var(--sd-primary-color-3)' },
    // { label: '品牌色-阶色-4', value: 'var(--sd-primary-color-4)' },
    // { label: '品牌色-阶色-5', value: 'var(--sd-primary-color-5)' },
    // { label: '品牌色-阶色-6', value: 'var(--sd-primary-color-6)' },
    // { label: '品牌色-阶色-7', value: 'var(--sd-primary-color-7)' },
    // { label: '品牌色-阶色-8', value: 'var(--sd-primary-color-8)' },
    // { label: '品牌色-阶色-9', value: 'var(--sd-primary-color-9)' },

    { label: '成功色', value: 'var(--sd-success-color)', color: '#09BE4F' },
    // { label: '成功色-阶色-1', value: 'var(--sd-success-color-1)' },
    // { label: '成功色-阶色-2', value: 'var(--sd-success-color-2)' },
    // { label: '成功色-阶色-3', value: 'var(--sd-success-color-3)' },
    // { label: '成功色-阶色-4', value: 'var(--sd-success-color-4)' },
    // { label: '成功色-阶色-5', value: 'var(--sd-success-color-5)' },
    // { label: '成功色-阶色-6', value: 'var(--sd-success-color-6)' },
    // { label: '成功色-阶色-7', value: 'var(--sd-success-color-7)' },
    // { label: '成功色-阶色-8', value: 'var(--sd-success-color-8)' },
    // { label: '成功色-阶色-9', value: 'var(--sd-success-color-9)' },

    { label: '提醒色', value: 'var(--sd-warning-color)', color: '#FFB703' },
    // { label: '提醒色-阶色-1', value: 'var(--sd-warning-color-1)' },
    // { label: '提醒色-阶色-2', value: 'var(--sd-warning-color-2)' },
    // { label: '提醒色-阶色-3', value: 'var(--sd-warning-color-3)' },
    // { label: '提醒色-阶色-4', value: 'var(--sd-warning-color-4)' },
    // { label: '提醒色-阶色-5', value: 'var(--sd-warning-color-5)' },
    // { label: '提醒色-阶色-6', value: 'var(--sd-warning-color-6)' },
    // { label: '提醒色-阶色-7', value: 'var(--sd-warning-color-7)' },
    // { label: '提醒色-阶色-8', value: 'var(--sd-warning-color-8)' },
    // { label: '提醒色-阶色-9', value: 'var(--sd-warning-color-9)' },

    { label: '危险色', value: 'var(--sd-danger-color)', color: '#FF2B2B' },
    // { label: '提醒色-阶色-1', value: 'var(--sd-danger-color-1)' },
    // { label: '提醒色-阶色-2', value: 'var(--sd-danger-color-2)' },
    // { label: '提醒色-阶色-3', value: 'var(--sd-danger-color-3)' },
    // { label: '提醒色-阶色-4', value: 'var(--sd-danger-color-4)' },
    // { label: '提醒色-阶色-5', value: 'var(--sd-danger-color-5)' },
    // { label: '提醒色-阶色-6', value: 'var(--sd-danger-color-6)' },
    // { label: '提醒色-阶色-7', value: 'var(--sd-danger-color-7)' },
    // { label: '提醒色-阶色-8', value: 'var(--sd-danger-color-8)' },
    // { label: '提醒色-阶色-9', value: 'var(--sd-danger-color-9)' },

    // { label: '信息色', value: 'var(--sd-info-color)' },
    // { label: '提醒色-阶色-1', value: 'var(--sd-info-color-1)' },
    // { label: '提醒色-阶色-2', value: 'var(--sd-info-color-2)' },
    // { label: '提醒色-阶色-3', value: 'var(--sd-info-color-3)' },
    // { label: '提醒色-阶色-4', value: 'var(--sd-info-color-4)' },
    // { label: '提醒色-阶色-5', value: 'var(--sd-info-color-5)' },
    // { label: '提醒色-阶色-6', value: 'var(--sd-info-color-6)' },
    // { label: '提醒色-阶色-7', value: 'var(--sd-info-color-7)' },
    // { label: '提醒色-阶色-8', value: 'var(--sd-info-color-8)' },
    // { label: '提醒色-阶色-9', value: 'var(--sd-info-color-9)' },
])

const bg_light_colors = ref([
    { label: '页面背景色', value: '#eeeeee', color: 'rgba(0, 0, 0, 0.6)' },
    { label: '内容背景色', value: '#F8F8F8', color: 'rgba(0, 0, 0, 0.6)' },
    { label: '遮罩背景色', value: 'rgba(0,0,0,0.6)' },
])

const bg_dark_colors = ref([
    { label: '页面背景色', value: '#FFFFFF', color: '#A3A3A3' },
    { label: '内容背景色', value: '#F8F8F8', color: '#A3A3A3' },
    { label: '遮罩背景色', value: 'rgba(0,0,0,0.6)' },
])

const text_light_colors = ref([
    { label: '重要文本'      , value: 'rgba(0, 0, 0, 0.9)' },
    { label: '正文、段落文本', value: 'rgba(0, 0, 0, 0.6)' },
    { label: '描述文本'      , value: 'rgba(0, 0, 0, 0.4)' },
    { label: '占位文本'      , value: 'rgba(0, 0, 0, 0.26)' },
    { label: '链接文本'      , value: '#1989fa' },
    { label: '品牌文本'      , value: '#465CFF' },
    { label: '成功文本'      , value: '#09BE4F' },
    { label: '提醒文本'      , value: '#FFB703' },
    { label: '危险文本'      , value: '#FF2B2B' },
])

const text_dark_colors = ref([
    { label: '重要文本'      , value: '#D1D1D1' },
    { label: '正文、段落文本', value: '#A3A3A3' },
    { label: '描述文本'      , value: '#8D8D8D' },
    { label: '占位文本'      , value: '#5E5E5E' },
    { label: '链接文本'      , value: '#1989fa' },
    { label: '品牌文本'      , value: '#465CFF' },
    { label: '成功文本'      , value: '#09BE4F' },
    { label: '提醒文本'      , value: '#FFB703' },
    { label: '危险文本'      , value: '#FF2B2B' },
])

const border_light_colors = ref([
    { label: '默认边框', value: '#dcdfe6' },
    { label: '品牌边框'      , value: '#465CFF' },
    { label: '成功边框'      , value: '#09BE4F' },
    { label: '提醒边框'      , value: '#FFB703' },
    { label: '危险边框'      , value: '#FF2B2B' },
])

const border_dark_colors = ref([
    { label: '默认边框', value: '#777777' },
    { label: '品牌边框', value: '#465CFF' },
    { label: '成功边框', value: '#09BE4F' },
    { label: '提醒边框', value: '#FFB703' },
    { label: '危险边框', value: '#FF2B2B' },
])

const isBlackText = (color: string) => {
    return ['#F8F8F8', '#FFFFFF'].includes(color)
}
</script>

<template>
    <sd-page title="Color 色彩">
        <view class="demo-card">
            <view class="demo-card__title">
                主题色 - 浅色模式
            </view>
            <view class="demo-card__body">
                <template v-for="item in theme_colors" :key="item.value">
                    <view
                        class="color-box"
                        :class="{ 'is-black-text': isBlackText(item.value) }"
                        :style="{ background: (item.color || item.value) }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.color || item.value }}</text>
                    </view>
                </template>
            </view>
        </view>

        <view class="demo-card is-dark">
            <view class="demo-card__title">
                主题色 - 深色模式
            </view>
            <view class="demo-card__body">
                <template v-for="item in theme_colors" :key="item.value">
                    <view
                        class="color-box"
                        :class="{ 'is-black-text': isBlackText(item.value) }"
                        :style="{ background: (item.color || item.value) }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.color || item.value }}</text>
                    </view>
                </template>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                背景颜色 - 浅色模式
            </view>
            <view class="demo-card__body">
                <template v-for="item in bg_light_colors" :key="item.value">
                    <view
                        class="color-box"
                        :style="{ background: item.value, color: item.color }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.value }}</text>
                    </view>
                </template>
            </view>
        </view>

        <view class="demo-card is-dark">
            <view class="demo-card__title">
                背景颜色 - 深色模式
            </view>
            <view class="demo-card__body">
                <template v-for="item in bg_dark_colors" :key="item.value">
                    <view
                        class="color-box"
                        :style="{ background: item.value, color: item.color }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.value }}</text>
                    </view>
                </template>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                文本颜色 - 浅色模式
            </view>
            <view class="demo-card__body">
                <view v-for="(item, idx) in text_light_colors" :key="idx" :style="{ color: item.value }" class="text-box">
                    {{ item.label }}
                </view>
            </view>
        </view>

        <view class="demo-card is-dark">
            <view class="demo-card__title">
                文本颜色 - 深色模式
            </view>
            <view class="demo-card__body">
                <view v-for="(item, idx) in text_dark_colors" :key="idx" :style="{ color: item.value }" class="text-box">
                    {{ item.label }}
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                边框颜色 - 浅色模式
            </view>
            <view class="demo-card__body">
                <view v-for="(item, idx) in border_light_colors" :key="idx" class="border-box">
                    <view class="border-box__title">
                        {{ item.label }}
                    </view>
                    <view class="border-box__border" :style="{ 'border-color': item.value }" />
                </view>
            </view>
        </view>

        <view class="demo-card is-dark">
            <view class="demo-card__title">
                边框颜色 - 深色模式
            </view>
            <view class="demo-card__body">
                <view v-for="(item, idx) in border_dark_colors" :key="idx" class="border-box">
                    <view class="border-box__title">
                        {{ item.label }}
                    </view>
                    <view class="border-box__border" :style="{ 'border-color': item.value }" />
                </view>
            </view>
        </view>
    </sd-page>
</template>

<style lang="scss" scoped>
.color-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 40rpx;
    color: #fff;
    padding: 0 32rpx;
    box-sizing: border-box;
    height: 80rpx;
    font-size: 28rpx;

    &.is-black-text {
        color: #333;
    }
}

.color-box + .color-box {
    margin-top: 24rpx;
}

.text-box {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    text-align: center;
}

.text-box:not(:first-child) {
    margin-top: 16rpx;
}

.border-box {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    text-align: center;

    &__title {
        margin-right: 40rpx;
    }

    &__border {
        border: 1px solid;
        height: 60rpx;
        flex: 1;
        transform: scale(0.5);
    }
}
</style>
