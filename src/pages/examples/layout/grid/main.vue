<script setup lang="ts">
const local_img = '/static/images/trunk.jpeg'
</script>

<template>
    <sd-page title="Grid 网格布局">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-grid>
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                </sd-grid>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                横向内容排版
            </view>
            <view class="demo-card__body">
                <sd-grid :column="3" direction="row">
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                    <sd-grid-item icon="rocket" text="文字" />
                </sd-grid>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                图片展示
            </view>
            <view class="demo-card__body">
                <sd-grid :column="3">
                    <sd-grid-item :image="local_img" />
                    <sd-grid-item :image="local_img" />
                    <sd-grid-item :image="local_img" />
                    <sd-grid-item :image="local_img" />
                    <sd-grid-item :image="local_img" />
                    <sd-grid-item :image="local_img" />
                </sd-grid>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                徽标展示
            </view>
            <view class="demo-card__body">
                <sd-grid :column="3">
                    <sd-grid-item :image="local_img" text="文字" image-width="100rpx" image-height="100rpx" />
                    <sd-grid-item :image="local_img" text="文字" image-width="100rpx" image-height="100rpx" dot />
                    <sd-grid-item :image="local_img" text="文字" image-width="100rpx" image-height="100rpx" dot />
                    <sd-grid-item :image="local_img" text="文字" image-width="100rpx" image-height="100rpx" badge="8" />
                    <sd-grid-item :image="local_img" text="文字" image-width="100rpx" image-height="100rpx" :badge="999" :badge-props="{ max: 99 }" />
                    <sd-grid-item :image="local_img" text="文字" image-width="100rpx" image-height="100rpx" badge="New" />
                </sd-grid>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                正方体格子
            </view>
            <view class="demo-card__body">
                <sd-grid border :column="4" square>
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                    <sd-grid-item text="文字" />
                </sd-grid>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义展示
            </view>
            <view class="demo-card__body">
                <sd-grid border :column="4" square>
                    <sd-grid-item>
                        自定义
                    </sd-grid-item>
                    <sd-grid-item>
                        自定义
                    </sd-grid-item>
                    <sd-grid-item>
                        自定义
                    </sd-grid-item>
                    <sd-grid-item>
                        自定义
                    </sd-grid-item>
                </sd-grid>
            </view>
        </view>
    </sd-page>
</template>
