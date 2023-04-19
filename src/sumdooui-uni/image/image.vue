<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, reactive, watch, computed } from 'vue'
import { image_props } from './image'

import Utils from '../utils'

export default defineComponent({
    name : 'SdImage',
    props: image_props,
    emits: ['click', 'load', 'error'],
    setup(props, { emit }) {
        const state = reactive({
            show_loading  : false,
            show_error    : false,
            success_loaded: false, // 成功加载
        })

        const image_style$ = computed(()  => {
            const style: CSSProperties = { ...props.customStyle }

            const { radius, width, height } = props
            if (width ) style.width        = Utils.toUnit(width)
            if (height) {
                if (typeof height === 'string' && height.endsWith('%')) {
                    style.height = 0
                    style.paddingBottom = height
                } else {
                    style.height = Utils.toUnit(height)
                }
            }

            if (radius || radius === 0) style.borderRadius = Utils.toUnit(radius)

            return style
        })

        watch(() => props.src, (src) => {
            state.show_error     = false
            state.success_loaded = false
            state.show_loading   = !!src
        }, { immediate: true })

        // 图片载入完毕
        function onLoad(e: Event) {
            state.show_error     = false
            state.show_loading   = false
            state.success_loaded = true
            emit('load', e)
        }

        // 图片异常
        function onError(e: Event) {
            state.show_loading = false
            state.show_error   = true
            emit('error', e)
        }

        function onClick(e: Event) {
            emit('click')

            if (props.previewOnClick && props.src && state.success_loaded) {
                uni.previewImage({
                    urls     : [props.src],
                    indicator: 'none',
                })
            }
        }

        return {
            state,
            image_style$,
            onLoad,
            onError,
            onClick,
        }
    },
})
</script>

<template>
    <view
        class="sd-image"
        :class="[
            {
                [`sd-image--${ shape }`]: !!shape,
                'is-loading'            : showLoading && state.show_loading,
                'is-error'              : showError && state.show_error,
                'is-empty'              : !src,
            },
            customClass,
        ]"
        :style="image_style$"
        @tap="onClick"
    >
        <view class="sd-image__content">
            <image
                v-if="(src && showError && !state.show_error)"
                class="sd-image__img"
                :object-fit="fit"
                :object-position="position"
                :mode="mode"
                :src="src"
                @load="onLoad"
                @error="onError"
            />

            <view v-if="!src" class="sd-image__placeholder-icon">
                <slot v-if="$slots.placeholder" name="placeholder" />
                <sd-icon v-else name="image" class="sd-image__placeholder-icon" />
            </view>

            <sd-loading v-if="src && showLoading && state.show_loading" />

            <view v-if="showError && state.show_error" class="sd-image__error-icon">
                <slot v-if="$slots.error" name="error" />
                <sd-icon v-else name="image" />
            </view>
        </view>
    </view>
</template>

