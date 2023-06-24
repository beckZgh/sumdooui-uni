<script setup lang="ts">
function toPage(name: string) {
    uni.navigateTo({ url: name })
}
</script>

<template>
    <sd-page title="Page 页面组件">
        <demo-card title="页面加载成功" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-visible')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="页面加载中" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-loading')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="页面加载失败" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-error')">
                应用
            </sd-button>
        </demo-card>
    </sd-page>
</template>

