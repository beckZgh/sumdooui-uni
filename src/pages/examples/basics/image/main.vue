<script setup lang="ts">
import { ref } from 'vue'

const local_img  = ref('/static/images/trunk.jpeg')
const online_img = ref('https://img0.baidu.com/it/u=2900833435,993445529&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500')
const error_img  = ref('https://img0.baidu.com/error.png')
</script>

<template>
    <sd-page title="Image 图片">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-image :src="local_img" />
                <sd-image :src="local_img" shape="round" />
                <sd-image :src="local_img" shape="circle" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                网络图片
            </view>
            <view class="demo-card__body">
                <sd-image :src="online_img" />
                <sd-image :src="online_img" shape="round" />
                <sd-image :src="online_img" shape="circle" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义圆角
            </view>
            <view class="demo-card__body">
                <sd-image :src="online_img" :radius="0" />
                <sd-image :src="online_img" :radius="20" />
                <sd-image :src="online_img" :radius="40" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                图片比例展示
            </view>
            <view class="demo-card__body">
                <sd-image :src="online_img" width="100%" height="75%" />
                <view class="img-detail">
                    4 : 3
                </view>
                <sd-image :src="online_img" width="100%" height="50%" />
                <view class="img-detail">
                    4 : 2
                </view>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                图片展示模式
            </view>
            <view class="demo-card__body">
                <sd-image :src="local_img" />
                <sd-image :src="local_img" mode="aspectFit" />
                <sd-image :src="local_img" mode="aspectFill" />
                <sd-image :src="local_img" mode="widthFix" />
                <sd-image :src="local_img" mode="heightFix" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                图片占位展示
            </view>
            <view class="demo-card__body">
                <sd-image />
                <sd-image>
                    <template #placeholder>
                        <sd-icon name="image-fill" />
                    </template>
                </sd-image>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                图片错误展示
            </view>
            <view class="demo-card__body">
                <sd-image :src="error_img" />
                <sd-image :src="error_img">
                    <template #error>
                        <sd-icon name="close-circle" />
                    </template>
                </sd-image>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                点击图片预览
            </view>
            <view class="demo-card__body">
                <sd-image :src="online_img" width="100%" height="50%" preview-on-click />
            </view>
        </view>
    </sd-page>
</template>


<style lang="scss">
:deep(.sd-image) {
    margin-right: 16rpx;
}

.img-detail {
    line-height: 60rpx;
    text-align: center;
}
</style>
