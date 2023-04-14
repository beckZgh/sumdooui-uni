<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue'

const m = reactive({
    title: '',
})

onLoad((query) => {
    if (query && query.title) m.title = query.title as string
})
</script>

<template>
    <sd-page>
        <view class="content__box">
            <view class="img__box">
                <image src="/static/common/img_coding_3x.png" class="img" mode="widthFix" />
            </view>
            <view class="title">
                开发中
            </view>
            <view class="sub__title">
                功能开发中，敬请期待！
            </view>
        </view>
    </sd-page>
</template>

<style scoped>
.content__box{
    padding-top: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.img__box{
    width: 100%;
    padding: 0 87rpx;
    box-sizing: border-box;
}
.img{
    width: 100%;
    height: 318rpx;
}
.title{
    text-align: center;
    font-weight: 500;
    color: #333333;
    padding-top: 48rpx;
}
.sub__title{
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    color: #B2B2B2;
    padding-top: 8rpx;
}
</style>
