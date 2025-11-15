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

import { defineComponent, watch, computed, getCurrentInstance, onMounted } from 'vue'


import QR from './qrcode'

export default defineComponent({
    name   : 'SdQrcode',
    options: { virtualHost: true },
    props  : {
        code      : { type: String, required: true  }, // 编码
        width     : { type: Number, required: true  }, // 宽度
        height    : { type: Number, required: true  }, // 高度
        erect     : { type: Boolean, default: false }, // 竖立
        background: { type: String },
    },
    emits: ['created', 'fail', 'change'],
    setup(props, ctx) {
        // 当前实例
        const proxy = getCurrentInstance()?.proxy

        // 二维码宽高
        const style$ = computed(() => `width:${ props.width }px; height:${ props.height }px`)

        // 监听以创建二维码
        watch(() => props.code, async (code) => {
            if (code) {
                const res = await makeCode(code)
                if (res.ok) ctx.emit('change')
            }
        })

        // 创建二维码
        onMounted(async () => {
            const res = await makeCode(props.code)
            if (res.ok) {
                ctx.emit('created')
            } else {
                ctx.emit('fail', res.err)
            }
        })
        async function makeCode(code?: string) {
            if (!code) return { ok: false, err: 'code is empty' }

            const width  = props.width
            const height = props.height

            const options = { background: props.background }
            return QR.api.draw(code, 'qrcode', width, height, proxy, props.erect, options)
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
