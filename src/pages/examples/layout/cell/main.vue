<script lang="ts" setup>

</script>

<template>
    <sd-page title="Cell 单元格">
        <view class="demo-section__title">
            基础使用
        </view>
        <sd-cell title="我是标题" />
        <sd-cell title="我是标题" arrow />
        <sd-cell title="我是标题" value="我是值" arrow />
        <sd-cell title="我是标题" sub-title="我是副标题" arrow />
        <sd-cell title="我是标题" sub-title="我是副标题" value="我是值" arrow />

        <view class="demo-section__title">
            带图标的单元格
        </view>
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

        <view class="demo-section__title">
            带底部边框的单元格，可调整左右对齐位置
        </view>
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


        <view class="demo-section__title">
            带分组标题
        </view>
        <sd-cell-group title="我是分组标题">
            <sd-cell title="我是标题" bottom-border />
            <sd-cell title="我是标题" bottom-border />
            <sd-cell title="我是标题" bottom-border />
            <sd-cell title="我是标题" />
        </sd-cell-group>
    </sd-page>
</template>
