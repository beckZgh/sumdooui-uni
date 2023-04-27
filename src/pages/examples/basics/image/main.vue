<script setup lang="ts">
import { ref } from 'vue'

const local_img  = ref('/static/images/trunk.jpeg')
const online_img = ref('https://img0.baidu.com/it/u=2900833435,993445529&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500')
const error_img  = ref('https://img0.baidu.com/error.png')
</script>

<template>
    <sd-page title="Image 图片">
        <demo-card title="本地图片">
            <sd-image :src="local_img" />
            <sd-image :src="local_img" shape="round" />
            <sd-image :src="local_img" shape="circle" />
        </demo-card>

        <demo-card title="网络图片">
            <sd-image :src="online_img" />
            <sd-image :src="online_img" shape="round" />
            <sd-image :src="online_img" shape="circle" />
        </demo-card>

        <demo-card title="自定义圆角值">
            <sd-image :src="online_img" :radius="20" />
            <sd-image :src="online_img" :radius="30" />
            <sd-image :src="online_img" :radius="40" />
        </demo-card>

        <demo-card title="图片展示模式">
            <sd-grid :column="3" :clickable="false">
                <sd-grid-item :image="local_img" :image-props="{ mode: 'scaleToFill' }" text="scaleToFill" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'aspectFit' }" text="aspectFit" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'aspectFill' }" text="aspectFill" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'widthFix' }" text="widthFix" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'heightFix' }" text="heightFix" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'top' }" text="top" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'bottom' }" text="bottom" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'center' }" text="center" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'left' }" text="left" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'right' }" text="right" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'top left' }" text="top left" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'top right' }" text="top right" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'bottom left' }" text="bottom left" />
                <sd-grid-item :image="local_img" :image-props="{ mode: 'bottom right' }" text="bottom right" />
            </sd-grid>
        </demo-card>

        <demo-card title="图片高度按比例展示">
            <sd-image :src="online_img" width="100%" height="75%" />
            <view class="img-detail">
                4 : 3
            </view>
            <sd-image :src="online_img" width="100%" height="50%" />
            <view class="img-detail">
                4 : 2
            </view>
        </demo-card>

        <demo-card title="未给定图片地址占位展示">
            <sd-image />
            <sd-image>
                <template #placeholder>
                    <sd-icon name="image-fill" />
                </template>
            </sd-image>
        </demo-card>

        <demo-card title="加载图片错误展示">
            <sd-image :src="error_img" />
            <sd-image :src="error_img">
                <template #error>
                    <sd-icon name="close-circle" />
                </template>
            </sd-image>
        </demo-card>

        <demo-card title="点击图片预览">
            <sd-image :src="online_img" width="100%" height="50%" preview-on-click />
        </demo-card>
    </sd-page>
</template>


<style lang="scss">
:deep(.sd-image) {
    margin-right: 16rpx;
}

.img-box {
    display: inline-block;
}

.img-detail {
    line-height: 60rpx;
    text-align: center;
}
</style>
