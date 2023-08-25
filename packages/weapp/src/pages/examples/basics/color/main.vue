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
const text_light_colors = ref([
    { label: '主要文本', value: '#303133' },
    { label: '正文文本', value: '#606266' },
    { label: '描述文本', value: '#909399' },
    { label: '占位文本', value: '#A8ABB2' },
    { label: '禁用文本', value: '#C0C4CC' },
    { label: '链接文本', value: '#1D6FE9' },
    { label: '品牌文本', value: '#465CFF' },
    { label: '成功文本', value: '#09BE4F' },
    { label: '提醒文本', value: '#FFB703' },
    { label: '危险文本', value: '#FF2B2B' },
])

const text_dark_colors = ref([
    { label: '主要文本', value: '#E5EAF3' },
    { label: '正文文本', value: '#CFD3DC' },
    { label: '描述文本', value: '#A3A6AD' },
    { label: '占位文本', value: '#8D9095' },
    { label: '禁用文本', value: '#6C6E72' },
    { label: '链接文本', value: '#1D6FE9' },
    { label: '品牌文本', value: '#465CFF' },
    { label: '成功文本', value: '#09BE4F' },
    { label: '提醒文本', value: '#FFB703' },
    { label: '危险文本', value: '#FF2B2B' },
])

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

    { label: '提醒色', value: 'var(--sd-warning-color)', color: '#E6A23C' },
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

const fill_light_colors = ref([
    { label: '填充色', value: '#F0F2F5', color: '#303133' },
    { label: '填充色', value: '#FAFAFA', color: '#303133' },
    { label: '填充色', value: '#FAFCFF', color: '#303133' },
])

const fill_dark_colors = ref([
    { label: '填充色', value: '#4b4b4b', color: '#E5EAF3' },
    { label: '填充色', value: '#393939', color: '#E5EAF3' },
    { label: '填充色', value: '#2c2c2c', color: '#E5EAF3' },
])

const border_light_colors = ref([
    { label: '边框色', value: '#dddddd' }, // $sd-gray-color-4
    { label: '边框色', value: '#e8e8e8' }, // $sd-gray-color-3
    { label: '边框色', value: '#eeeeee' }, // $sd-gray-color-2
])

const border_dark_colors = ref([
    { label: '边框色', value: '#777777' }, // $sd-gray-color-8
    { label: '边框色', value: '#5e5e5e' }, // $sd-gray-color-9
    { label: '边框色', value: '#4b4b4b' }, // $sd-gray-color-10
])

const isBlackText = (color: string) => {
    return ['#F8F8F8', '#FFFFFF'].includes(color)
}
</script>

<template>
    <sd-page title="Color 色彩">
        <demo-card title="文本颜色" body-style="display: flex;">
            <view style="flex: 1; padding: 10px 0;">
                <view v-for="(item, idx) in text_light_colors" :key="idx" :style="{ color: item.value }" class="text-box">
                    {{ item.label }}
                </view>
            </view>
            <view style="flex: 1; padding: 10px 0;" class="is-dark">
                <view v-for="(item, idx) in text_dark_colors" :key="idx" :style="{ color: item.value }" class="text-box">
                    {{ item.label }}
                </view>
            </view>
        </demo-card>

        <demo-card title="主题色" body-style="display: flex;">
            <view style="flex: 1; padding: 10px;">
                <template v-for="item in theme_colors" :key="item.value">
                    <view
                        class="color-box"
                        :style="{ background: (item.color || item.value) }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.color || item.value }}</text>
                    </view>
                </template>
            </view>
            <view style="flex: 1; padding: 10px;" class="is-dark">
                <template v-for="item in theme_colors" :key="item.value">
                    <view
                        class="color-box"
                        :style="{ background: (item.color || item.value) }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.color || item.value }}</text>
                    </view>
                </template>
            </view>
        </demo-card>

        <demo-card title="填充色" body-style="display: flex;">
            <view style="flex: 1; padding: 10px;">
                <template v-for="item in fill_light_colors" :key="item.value">
                    <view
                        class="color-box"
                        :style="{ background: item.value, color: item.color }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.value }}</text>
                    </view>
                </template>
            </view>
            <view style="flex: 1; padding: 10px;" class="is-dark">
                <template v-for="item in fill_dark_colors" :key="item.value">
                    <view
                        class="color-box"
                        :style="{ background: item.value, color: item.color }"
                    >
                        <text>{{ item.label }}</text>
                        <text>{{ item.value }}</text>
                    </view>
                </template>
            </view>
        </demo-card>

        <demo-card title="边框颜色" body-style="display: flex;">
            <view style="flex: 1; padding: 10px;">
                <view v-for="(item, idx) in border_light_colors" :key="idx" class="border-box">
                    <view class="border-box__border" :style="{ 'border-color': item.value }" />
                </view>
            </view>
            <view style="flex: 1; padding: 10px;" class="is-dark">
                <view v-for="(item, idx) in border_dark_colors" :key="idx" class="border-box">
                    <view class="border-box__border" :style="{ 'border-color': item.value }" />
                </view>
            </view>
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
view.is-dark {
    background-color: $sd-bg-color;
}

.color-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 40rpx;
    color: $sd-white;
    padding: 0 32rpx;
    box-sizing: border-box;
    height: 80rpx;
    font-size: 28rpx;
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
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    text-align: center;

    &__border {
        border: 1px solid;
        height: 60rpx;
        flex: 1;
        border-radius: $sd-radius-sm;
    }
}
</style>
