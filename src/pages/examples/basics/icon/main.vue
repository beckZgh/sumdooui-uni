<script lang="ts" setup>
import ICONS from '@/sumdooui-uni/icon/icons'
</script>

<template>
    <sd-page tilte="Icon 图标">
        <demo-card title="预设主题">
            <sd-icon name="sound" :size="40" />
            <sd-icon name="sound" :size="40" type="primary" />
            <sd-icon name="sound" :size="40" type="success" />
            <sd-icon name="sound" :size="40" type="warning" />
            <sd-icon name="sound" :size="40" type="danger" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-icon name="sound" :size="40" color="#626aef" />
            <sd-icon name="link" :size="40" color="#626aef" />
            <sd-icon name="like" :size="40" color="#626aef" />
            <sd-icon name="unlike" :size="40" color="#626aef" />
        </demo-card>

        <demo-card title="自定义大小">
            <sd-icon name="sound" :size="40" />
            <sd-icon name="sound" :size="50" />
            <sd-icon name="sound" :size="60" />
        </demo-card>

        <demo-card title="所有图标" :card="false">
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
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
.icons-box {
    display: flex;
    flex-wrap: wrap;

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-basis: 33.33333%;
        overflow: hidden;
        height: 160rpx;
        background-color: $sd-white;
        box-sizing: border-box;
        border-bottom: 1px solid $sd-border-color;
        border-right: 1px solid $sd-border-color;

        &__text {
            width: 100%;
            text-align: center;
            margin-top: 16rpx;
            font-size: 24rpx;
        }
    }
}
</style>
