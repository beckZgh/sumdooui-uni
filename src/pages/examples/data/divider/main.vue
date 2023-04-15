<script setup lang="ts">

</script>

<template>
    <sd-page title="Divider 分割线">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body">
                <sd-divider />
                <sd-divider line-type="dashed" />
                <sd-divider line-type="dotted" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义内容
            </view>
            <view class="demo-card__body">
                <sd-divider text="属性定义的内容" />
                <sd-divider>插槽定义的内容</sd-divider>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义线条颜色
            </view>
            <view class="demo-card__body">
                <sd-divider text="提示信息" line-color="#07c16c" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义文本颜色
            </view>
            <view class="demo-card__body">
                <sd-divider text="全部评论 (99)" color="#07c16c" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义左右间隔
            </view>
            <view class="demo-card__body">
                <sd-divider text="提示信息" :row-gap="80" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义上下间隔
            </view>
            <view class="demo-card__body">
                <sd-divider text="提示信息" :column-gap="120" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                预设主题
            </view>
            <view class="demo-card__body">
                <sd-divider text="提示信息" type="primary" />
                <sd-divider text="提示信息" type="success" />
                <sd-divider text="提示信息" type="warning" />
                <sd-divider text="提示信息" type="danger" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                预设主题 - 线条
            </view>
            <view class="demo-card__body">
                <sd-divider text="提示信息" type-sence="line" type="primary" />
                <sd-divider text="提示信息" type-sence="line" type="success" />
                <sd-divider text="提示信息" type-sence="line" type="warning" />
                <sd-divider text="提示信息" type-sence="line" type="danger" />
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                预设主题 - 文本
            </view>
            <view class="demo-card__body">
                <sd-divider text="提示信息" type-sence="text" type="primary" />
                <sd-divider text="提示信息" type-sence="text" type="success" />
                <sd-divider text="提示信息" type-sence="text" type="warning" />
                <sd-divider text="提示信息" type-sence="text" type="danger" />
            </view>
        </view>
    </sd-page>
</template>
