<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    bottom_popup       : false,
    bottom_popup_2     : false,
    top_popup          : false,
    top_popup_2        : false,
    center_popup       : false,
    center_popup_2     : false,
    custom_bottom_popup: false,
})
</script>

<template>
    <sd-page title="Popup 弹出层">
        <view class="demo-card">
            <view class="demo-card__title">
                底部弹层
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.bottom_popup = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                底部弹层 (支持手势关闭)
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.bottom_popup_2 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                顶部弹层
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.top_popup = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                顶部弹层 (支持手势关闭)
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.top_popup_2 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                居中弹层
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.center_popup = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                幕帘效果
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.center_popup_2 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                自定义底部
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.custom_bottom_popup = true">
                    应用
                </sd-button>
            </view>
        </view>

        <!-- 底部弹窗 -->
        <sd-popup v-model:visible="m.bottom_popup" title="标题">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup>

        <!-- 底部弹窗 (支持手势关闭) -->
        <sd-popup v-model:visible="m.bottom_popup_2" gesture-closeable title="标题">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup>

        <!-- 顶部弹窗 -->
        <sd-popup v-model:visible="m.top_popup" position="top">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
            </template>
        </sd-popup>

        <!-- 顶部弹窗 (支持手势关闭) -->
        <sd-popup v-model:visible="m.top_popup_2" position="top" gesture-closeable title="标题">
            <template v-for="idx in 30" :key="idx">
                <sd-cell :title="`标题 - ${ idx }`" />
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
            :show-top-close="false"
            :round="false"
            show-bottom-close
        >
            <sd-image src="/static/images/trunk.jpeg" width="100%" height="75%" />
        </sd-popup>

        <!-- 自定义底部 -->
        <sd-popup
            v-model:visible="m.custom_bottom_popup"
            position="center"
            :show-top-close="false"
            :round="false"
            show-bottom-close
        >
            <sd-image src="/static/images/trunk.jpeg" width="100%" height="75%" />
            <template #bottom>
                <view class="popup-bootom">
                    我是自定义底部
                </view>
            </template>
        </sd-popup>
    </sd-page>
</template>

<style lang="scss" scoped>
.popup-bootom {
    line-height: 100rpx;
    text-align: center;
}
</style>
