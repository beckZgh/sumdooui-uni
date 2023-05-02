<script setup lang="ts">
const toPage = (name: string) => {
    uni.navigateTo({ url: `./${ name }` })
}
</script>

<template>
    <sd-page title="Loading 加载动画">
        <demo-card title="基本用法">
            <sd-loading />
        </demo-card>

        <demo-card title="显示横向文本">
            <sd-loading text="正在加载中" />
        </demo-card>

        <demo-card title="显示纵向文本">
            <sd-loading text="正在加载中" direction="column" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-loading color="#09BE4F" />
        </demo-card>

        <demo-card title="音符动画">
            <sd-loading type="line" color="#09BE4F" />
        </demo-card>

        <demo-card title="相遇动画">
            <sd-loading type="meet" color="#09BE4F" />
        </demo-card>

        <demo-card title="页面 Loading (一)" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-circle')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="页面 Loading (二)" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-line')">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="页面 Loading (三)" body-class="sd-flex-x-center">
            <sd-button width="70%" variant="plain" @click="toPage('page-meet')">
                应用
            </sd-button>
        </demo-card>
    </sd-page>
</template>
