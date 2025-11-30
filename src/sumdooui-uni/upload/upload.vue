<script lang="ts">
import type { UploadTypes } from './types'

import { defineComponent, reactive, watch } from 'vue'
import { MpMixin      } from '../common/mixins'
import { upload_props } from './upload'

import $utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdUpload',
    props: upload_props,
    emits: [
        'update:modelValue',
    ],
    setup(props, ctx) {
        const state = reactive({
            files: props.modelValue || [],
        })

        watch(() => props.modelValue, (files) => {
            state.files = files
        })

        watch(() => state.files, (files) => {
            ctx.emit('update:modelValue', files)
        }, { deep: true })

        // 点击预览
        function handleClickPreview(file: UploadTypes.UploadFile) {
            const url = file.tempFilePath || file.src
            if ( !url ) return // 无图片路径不处理

            // 上传中或上传失败不处理
            if (file.status && ['uploading', 'fail'].includes(file.status)) return

            uni.previewImage({
                urls: [url],
            })
        }

        // 点击上传按钮
        async function handleAdd() {
            const choose_res = await chooseImage()
            if ( !choose_res.ok ) return

            choose_res.data.forEach(uploadImage)
        }

        // 点击删除按钮
        function handleRemove() {

        }

        // 上传图片
        async function uploadImage(file: { tempFilePath: string; size: number }) {
            const requestMethod = props.requestMethod
            const item: UploadTypes.UploadFile = {
                tempFilePath: file.tempFilePath,
                src         : '',
                size        : file.size,
                status      : requestMethod ? 'uploading' : 'fail',
            }

            state.files.push(item)

            if (!requestMethod) return

            const res = await requestMethod(item)
            if ( !res || !$utils.isObject(res)) return

            item.status = res.ok ? 'success' : 'fail'
            item.src    = res.data?.url || ''
        }

        // 选择图片
        function chooseImage(): Promise<{ ok: boolean; data: { tempFilePath: string; size: number }[]; err: string }> {
            return new Promise((resolve) => {
                uni.chooseMedia({
                    count     : props.max,
                    mediaType : ['image'],
                    sourceType: ['album', 'camera'],
                    sizeType  : ['original', 'compressed'],
                    success   : (res) => {
                        resolve({ ok: true, data: res.tempFiles, err: '' })
                    },
                    fail: (err) => {
                        resolve({ ok: false, data: [], err: err.errMsg })
                    },
                })
            })
        }

        return {
            state,
            handleAdd,
            handleRemove,
            handleClickPreview,
        }
    },
})
</script>

<template>
    <view class="sd-upload">
        <view
            v-for="(file, idx) in state.files" :key="idx" class="sd-upload__preview"
            @tap="handleClickPreview(file)"
        >
            <!-- 优先使用 tempFilePath，避免上传后更新 src 导致闪烁 -->
            <sd-image
                v-if="file.tempFilePath || file.src"
                :src="file.tempFilePath || file.src"
                width="100%"
                height="100%"
                mode="widthFix"
            />
            <view v-if="file.status === 'uploading'" class="sd-upload__mask">
                <sd-icon name="loading" loading />
                <view>上传中...</view>
            </view>
            <view v-else-if="file.status === 'fail'" class="sd-upload__mask">
                <view>上传失败</view>
            </view>

            <view class="sd-upload__preview-close-btn" @tap="handleRemove">
                <sd-icon name="close" />
            </view>
        </view>
        <view class="sd-upload__add-btn" @tap="handleAdd">
            <sd-icon name="plus" />
        </view>
    </view>
</template>
