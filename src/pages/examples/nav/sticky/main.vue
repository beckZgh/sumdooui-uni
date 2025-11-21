<script setup lang="ts">
const toPage = (name: string) => {
    uni.navigateTo({ url: `./${ name }` })
}
</script>

<template>
    <sd-page title="Sticky 吸顶组件">
        <demo-card title="基本用法 - 非自定义页面" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-base')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="定义吸附距离- 非自定义页面" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-offset')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="自定义页面吸附" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-custom-page')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="指定容器范围" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-container')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="在 scroll-view 中使用" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-scroll-view')">
                应用
            </sd-button>
        </demo-card>
    </sd-page>
</template>
