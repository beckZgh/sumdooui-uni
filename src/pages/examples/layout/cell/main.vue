<script lang="ts" setup>

</script>

<template>
    <sd-page title="Cell 单元格">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-cell title="我是标题" />
                <sd-cell title="我是标题" arrow />
                <sd-cell title="我是标题" value="我是值" arrow />
                <sd-cell title="我是标题" sub-title="我是副标题" arrow />
                <sd-cell title="我是标题" sub-title="我是副标题" value="我是值" arrow />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带图标的单元格
            </view>
            <view class="demo-card__body">
                <sd-cell title="我是标题">
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" value="我是值" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" sub-title="我是副标题" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" sub-title="我是副标题" value="我是值" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带底部边框的单元格，可调整左右对齐位置
            </view>
            <view class="demo-card__body">
                <sd-cell title="我是标题" bottom-border arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" bottom-border :bottom-border-style="{ left: '112rpx' }" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" bottom-border :bottom-border-style="{ left: '112rpx', right: '32rpx' }" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
                <sd-cell title="我是标题" arrow>
                    <template #icon>
                        <image src="/static/index/light/icon_button_3x.png" style="width:48rpx; height: 48rpx;" />
                    </template>
                </sd-cell>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带分组标题
            </view>
            <view class="demo-card__body">
                <sd-cell title="我是标题" bottom-border />
                <sd-cell title="我是标题" bottom-border />
                <sd-cell title="我是标题" bottom-border />
                <sd-cell title="我是标题" />
            </view>
        </view>
    </sd-page>
</template>
