<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    bottom_popup       : false,
    bottom_popup_2     : false,
    top_popup          : false,
    top_popup_2        : false,
    center_popup       : false,
    center_popup_2     : false,
    left_popup         : false,
    right_popup        : false,
    custom_bottom_popup: false,
})

async function onBeforeClose() {
    return new Promise((resolve) => {
        $utils.showLoading()
        setTimeout(() => {
            $utils.hideLoading()
            resolve(true)
        }, 1000)
    })
}
</script>

<template>
    <sd-page title="Popup 弹出层">
        <demo-card title="底部弹层" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.bottom_popup = true">
                应用
            </sd-button>
        </demo-card>

        <!-- <demo-card title="底部弹层 (支持手势关闭)" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.bottom_popup_2 = true">
                应用
            </sd-button>
        </demo-card> -->

        <demo-card title="顶部弹层" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.top_popup = true">
                应用
            </sd-button>
        </demo-card>

        <!-- <demo-card title="顶部弹层 (支持手势关闭)" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.top_popup_2 = true">
                应用
            </sd-button>
        </demo-card> -->

        <demo-card title="左侧弹层" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.left_popup = true">
                应用
            </sd-button>
        </demo-card>


        <demo-card title="右侧弹层" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.right_popup = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="居中弹层" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.center_popup = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="幕帘效果" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.center_popup_2 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="自定义底部" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.custom_bottom_popup = true">
                应用
            </sd-button>
        </demo-card>

        <!-- 底部弹窗 -->
        <sd-popup v-model:visible="m.bottom_popup" title="标题" :before-close="onBeforeClose" show-top-close>
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup>

        <!-- 底部弹窗 (支持手势关闭) -->
        <!-- <sd-popup v-model:visible="m.bottom_popup_2" gesture-closeable title="标题">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup> -->

        <!-- 顶部弹窗 -->
        <sd-popup v-model:visible="m.top_popup" position="top">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup>

        <!-- 顶部弹窗 (支持手势关闭) -->
        <!-- <sd-popup v-model:visible="m.top_popup_2" position="top" gesture-closeable title="标题">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup> -->

        <!-- 左抽屉 -->
        <sd-popup v-model:visible="m.left_popup" position="left">
            <sd-image width="100%" height="50%" />
            <template v-for="idx in 5" :key="idx">
                <sd-cell title="标题" arrow />
            </template>
        </sd-popup>

        <!-- 右抽屉 -->
        <sd-popup v-model:visible="m.right_popup" position="right">
            <sd-image width="100%" height="50%" />
            <template v-for="idx in 5" :key="idx">
                <sd-cell title="标题" arrow />
            </template>
        </sd-popup>

        <!-- 居中弹窗 -->
        <sd-popup
            v-model:visible="m.center_popup"
            :scrollable="false"
            position="center"
            title="居中弹窗"
        >
            <template v-for="idx in 5" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup>

        <!-- 幕帘效果 -->
        <sd-popup
            v-model:visible="m.center_popup_2"
            position="center"
            title="我是标题"
            :round="false"
            show-bottom-close
        >
            <sd-image src="/static/images/trunk.jpeg" :radius="0" width="100%" height="75%" />
        </sd-popup>

        <!-- 自定义底部 -->
        <sd-popup
            v-model:visible="m.custom_bottom_popup"
            position="center"
            :round="false"
            show-bottom-close
        >
            <sd-image src="/static/images/trunk.jpeg" :radius="0" width="100%" height="75%" />
            <template #footer>
                <view class="popup-footer">
                    我是自定义底部
                </view>
            </template>
        </sd-popup>
    </sd-page>
</template>

<style lang="scss" scoped>
.popup-footer {
    line-height: 100rpx;
    text-align: center;
}
</style>
