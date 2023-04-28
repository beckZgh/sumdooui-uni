<script setup lang="ts">
function onClickLeft() {
    uni.showToast({ title: '点击了左侧' })
}

function onClickRight() {
    uni.showToast({ title: '点击了右侧' })
}
</script>

<template>
    <sd-page title="Navbar 顶部导航">
        <demo-card title="基本用法">
            <sd-navbar title="标题" />
        </demo-card>

        <demo-card title="带左侧箭头">
            <sd-navbar
                title="标题"
                left-arrow
                @click-left="onClickLeft"
            />
        </demo-card>

        <demo-card title="右侧内容">
            <sd-navbar
                title="标题"
                left-arrow
                right-icon="location"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </demo-card>

        <demo-card title="自定义背景颜色">
            <sd-navbar
                title="标题"
                left-arrow
                left-text="返回"
                right-icon="location"
                background="#465CFF"
                color="#fff"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </demo-card>

        <demo-card title="自定义高度">
            <sd-navbar
                title="标题"
                left-arrow
                left-text="返回"
                right-icon="location"
                background="#465CFF"
                color="#fff"
                :custom-style="{ height: '130rpx' }"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            />
        </demo-card>
    </sd-page>
</template>

