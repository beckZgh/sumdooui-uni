<script setup lang="ts">
import { ref } from 'vue'
const sd_toast = ref()!
const long_text = 'SumdooUI, MEET YUO! 做一个对业务有帮助的的组件库'

function handleCloseWithToast() {
    sd_toast.value.show({
        message : '3秒后消失; 执行回调...',
        duration: 3000,
        onClose : () => {
            sd_toast.value.show({
                type   : 'success',
                message: '回调成功',
            })
        },
    })
}
</script>

<template>
    <sd-page title="Toast 轻提示">
        <view class="demo-card">
            <view class="demo-card__title">
                文本提示
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="sd_toast.show('提示信息')">
                    短文本提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show(long_text)">
                    长文本提示应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                纵向内容提示
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ type: 'success', message: '成功信息' })">
                    成功提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ type: 'warning', message: '提醒信息' })">
                    提醒提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ type: 'error', message: '错误信息' })">
                    错误提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ type: 'loading' })">
                    加载中
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                横向内容提示
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ direction: 'row', type: 'success', message: '成功信息' })">
                    成功提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ direction: 'row', type: 'warning', message: '提醒信息' })">
                    提醒提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ direction: 'row', type: 'error', message: '错误信息' })">
                    错误提示应用
                </sd-button>
                <sd-button width="75%" variant="plain" @click="sd_toast.show({ direction: 'row', type: 'loading' })">
                    加载中
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                关闭提示后执行回调
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="handleCloseWithToast">
                    应用
                </sd-button>
            </view>
        </view>

        <sd-toast ref="sd_toast" />
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-button:not(:first-child)) {
    margin-top: 30rpx;
}
</style>
