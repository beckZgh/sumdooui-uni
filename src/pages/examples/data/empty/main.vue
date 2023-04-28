<script setup lang="ts">
import img_search from './images/search.png'

function onClickButton() {
    uni.showToast({ title: '您点击按钮' })
}

function toPage(name: string) {
    uni.navigateTo({ url: name })
}
</script>

<template>
    <sd-page title="Empty 缺省页">
        <demo-card title="基本用法">
            <sd-empty />
        </demo-card>

        <demo-card title="自定义缺省图片与文本">
            <sd-empty
                :image="img_search"
                :image-props="{ width: '230rpx', height: '230rpx' }"
                text="没有找到对应的内容～"
            />
        </demo-card>

        <demo-card title="使用扩展按钮">
            <sd-empty button-text="返回" @click-button="onClickButton" />
        </demo-card>

        <demo-card title="页面内容为空" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-empty-data')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="所有缺省预设" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-empty-parse')">
                应用
            </sd-button>
        </demo-card>
    </sd-page>
</template>
