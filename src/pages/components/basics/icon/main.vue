<script lang="ts" setup>
import ICONS from '@/sumdooui-uni/icon/icons'
</script>

<template>
    <page-meta>
        <navigation-bar title="Icon 图标" />
        <view class="demo-page--white">
            <view class="demo-page-head">
                <view class="demo-page__title">
                    Icon
                </view>
                <view class="demo-page__desc">
                    Icon 图标，预设常用的图标集，也可自行扩展。
                </view>
            </view>

            <view class="demo-page-body demo-page__spacing">
                <view class="icons-box">
                    <template v-for="(_, name) in ICONS" :key="name">
                        <view class="icons-box-item">
                            <sd-icon v-if="name" :name="name" :size="60" />
                            <view class="icons-box-item__text ellipsis">
                                {{ name }}
                            </view>
                        </view>
                    </template>
                </view>
            </view>
        </view>
    </page-meta>
</template>

<style lang="scss" scoped>
.icons-box {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-basis: 33.33333%;
        overflow: hidden;
        height: 160rpx;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;

        &__text {
            width: 100%;
            text-align: center;
            margin-top: 16rpx;
            font-size: 24rpx;
        }
    }
}
</style>
