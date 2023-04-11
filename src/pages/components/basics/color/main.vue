<script lang="ts" setup>
import { ref } from 'vue'

const color_groups = ref([
    {
        title : '主题色',
        colors: [
            { label: '品牌色', value: '#465CFF' },
            { label: '成功色', value: '#67c23a' },
            { label: '提醒色', value: '#e6a23c' },
            { label: '危险色', value: '#f56c6c' },
            { label: '信息色', value: '#909399' },
        ],
    },
    {
        title : '文本颜色',
        colors: [
            { label: '重要文字、标题', value: '#181818' },
            { label: '普通文字', value: '#333333' },
            { label: '次要标题', value: '#7F7F7F' },
            { label: '禁用文字', value: '#CCCCCC' },
            { label: '占位文字', value: '#CCCCCC' },
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
    <page-meta>
        <navigation-bar title="Color 色彩" />

        <view class="demo-page-head">
            <view class="demo-page__title">
                Color
            </view>
            <view class="demo-page__desc">
                Color 色彩
            </view>
        </view>
        <view class="demo-page-body">
            <template v-for="(group, group_idx) in color_groups" :key="group_idx">
                <view class="demo-section__title">
                    {{ group.title }}
                </view>
                <template v-for="item in group.colors" :key="item.value">
                    <view class="color-box" :class="{ 'is-black-text': isBlackText(item.value) }"  :style="{ background: item.value }">
                        <text>{{ item.label }}</text>
                        <text>{{ item.value }}</text>
                    </view>
                </template>
            </template>
        </view>
    </page-meta>
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
