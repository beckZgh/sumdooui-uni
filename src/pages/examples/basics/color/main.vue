<script lang="ts" setup>
import { ref } from 'vue'
import type { CSSProperties  } from 'vue'


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
type ColorGroupItem = { title: string; style?: CSSProperties; colors: { label: string; value: string; color?: string }[] }
const color_groups = ref<ColorGroupItem[]>([
    {
        title : '主题色',
        colors: [
            { label: '成功色', value: 'var(--sd-primary-color)', color: '#465CFF' },
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
        ],
    },
    {
        title : '灰色',
        colors: [
            { label: 'gray-color-1', value: 'var(--sd-gray-color-1)'  , color: '#f3f3f3' },
            { label: 'gray-color-2', value: 'var(--sd-gray-color-2)'  , color: '#eeeeee' },
            { label: 'gray-color-3', value: 'var(--sd-gray-color-3)'  , color: '#e7e7e7' },
            { label: 'gray-color-4', value: 'var(--sd-gray-color-4)'  , color: '#dcdcdc' },
            { label: 'gray-color-5', value: 'var(--sd-gray-color-5)'  , color: '#c5c5c5' },
            { label: 'gray-color-6', value: 'var(--sd-gray-color-6)'  , color: '#a6a6a6' },
            { label: 'gray-color-7', value: 'var(--sd-gray-color-7)'  , color: '#8b8b8b' },
            { label: 'gray-color-8', value: 'var(--sd-gray-color-8)'  , color: '#777777' },
            { label: 'gray-color-9', value: 'var(--sd-gray-color-9)'  , color: '#5e5e5e' },
            { label: 'gray-color-10', value: 'var(--sd-gray-color-10)', color: '#4b4b4b' },
            { label: 'gray-color-11', value: 'var(--sd-gray-color-11)', color: '#383838' },
            { label: 'gray-color-12', value: 'var(--sd-gray-color-12)', color: '#2c2c2c' },
            { label: 'gray-color-13', value: 'var(--sd-gray-color-13)', color: '#242424' },
            { label: 'gray-color-14', value: 'var(--sd-gray-color-14)', color: '#181818' },
        ],
    },
    {
        title : '文本颜色',
        colors: [
            { label: '重要文字、标题', value: '#181818' },
            { label: '普通文字'      , value: '#333333' },
            { label: '次要标题'      , value: '#7F7F7F' },
            { label: '禁用文字'      , value: '#CCCCCC' },
            { label: '占位文字'      , value: '#CCCCCC' },
        ],
    },
    {
        title : '背景色',
        colors: [
            { label: '页面背景色', value: '#FFFFFF' },
            { label: '内容背景色', value: '#F8F8F8' },
            { label: '遮罩背景色', value: 'rgba(0,0,0,0.6)' },
            { label: '点击态背景色', value: 'rgba(0,0,0,0.2)' },
        ],
    },
    {
        title : '边框颜色',
        colors: [
            { label: '默认边框颜色', value: '#DCDFE6' },
        ],
    },
])

const isBlackText = (color: string) => {
    return ['#F8F8F8', '#FFFFFF'].includes(color)
}
</script>

<template>
    <sd-page title="Color 色彩">
        <view class="demo-page-body">
            <template v-for="(group, group_idx) in color_groups" :key="group_idx">
                <view class="demo-section__title">
                    {{ group.title }}
                </view>
                <view :style="group.style">
                    <template v-for="item in group.colors" :key="item.value">
                        <view
                            class="color-box"
                            :class="{ 'is-black-text': isBlackText(item.value) }"
                            :style="{ background: item.color || item.value }"
                        >
                            <text>{{ item.label }}</text>
                            <text>{{ item.value }}</text>
                        </view>
                    </template>
                </view>
            </template>
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
    margin: 0 32rpx;
    font-size: 28rpx;

    &.is-black-text {
        color: #333;
    }
}

.color-box + .color-box {
    margin-top: 24rpx;
}
</style>
