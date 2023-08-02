<script lang="ts">
/**
 * 二维码组件
 * v23.07.30
 */

// 小程序条形码插件wxbarcode的使用及改进
// https://www.cnblogs.com/xyyt/p/12512687.html

// 微信小程序生成条码和二维码模块
// https://github.com/alsey/wxbarcode

// 微信小程序使用wxbarcode插件生成条形码
// https://developers.weixin.qq.com/community/develop/doc/000ac6667341508404b87aa8b56c00

import { defineComponent, watch, computed, getCurrentInstance } from 'vue'


import QR from './qrcode'

export default defineComponent({
    name   : 'SdQrcode',
    options: { virtualHost: true },
    props  : {
        code  : { type: String, required: true }, // 编码
        width : { type: Number, required: true }, // 宽度
        height: { type: Number, required: true }, // 高度
        erect : { type: Boolean                }, // 竖立
    },
    setup(props) {
        // 当前实例
        const proxy = getCurrentInstance()?.proxy

        // 二维码宽高
        const style$ = computed(() => `width:${ props.width }px; height:${ props.height }px`)

        // 监听以创建二维码
        watch(() => props.code, createCode)

        // 创建二维码
        createCode()
        function createCode(code?: string) {
            code = code || props.code
            if (!code) return

            const width  = props.width
            const height = props.height

            QR.api.draw(code, 'qrcode', width, height, proxy)
        }

        async function getFilePath() {
            return new Promise((resolve) => {
                uni.canvasToTempFilePath({
                    x         : 0,
                    y         : 0,
                    width     : props.width,
                    height    : props.height,
                    destWidth : props.width,
                    destHeight: props.height,
                    canvasId  : 'qrcode',
                    success(res) {
                        resolve(res.tempFilePath)
                    },
                    fail() {
                        resolve('')
                    },
                }, proxy as any)
            })
        }

        return { style$, getFilePath }
    },
})
</script>

<template>
    <canvas class="sd-qrcode" canvas-id="qrcode" :style="style$" />
</template>
