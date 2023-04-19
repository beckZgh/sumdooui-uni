<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed, reactive, watch, onMounted  } from 'vue'
import { popup_props     } from './popup'
import { useGestureSlide } from './use-gesture-slide'

import Utils from '../utils'

export default defineComponent({
    name : 'SdPopup',
    props: popup_props,
    emits: [
        'update:visible',
        'click-overlay',
        'click-close',
        'loadmore',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const state = reactive({
            toggle_animation: 'hidden' as 'show' | 'hidden',
        })

        // 手势滑动
        const {
            slide_style,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onScrollTop,
        } = useGestureSlide(props, close)

        // 抽屉模式
        const is_darwer$ = computed(() => ['left', 'right'].includes(props.position))

        // 弹窗自定义样式
        const popup_style$ = computed(() => {
            const style: CSSProperties = {
                animationDuration: `${ props.duration }s`,
                height           : props.height,
                ...slide_style.value,
            }

            if (is_darwer$.value) {
                style.height    = 'calc(100% - var(--sd-page-navbar-height, 0))'
                style.maxHeight = 'none'
            }

            if (props.width) style.width = Utils.toUnit(props.width)

            return style
        })

        // 底部弹窗 & 居中弹窗默认显示顶部关闭按钮
        const show_top_close$ = computed(() => {
            if (Utils.isBoolean(props.showTopClose)) return props.showTopClose
            return !!['bottom', 'center'].includes(props.position)
        })

        onMounted(() => {
            // 默认打开
            if (props.visible) {
                state.toggle_animation = 'show'
            }
        })

        watch(() => props.visible, (visible) => {
            visible ? open() : close()
        })

        function open() {
            state.toggle_animation = 'show'
            emit('update:visible', true)
        }

        function close() {
            state.toggle_animation = 'hidden'
            if (!props.visible) return
            setTimeout(() => {
                emit('update:visible', false)
            }, props.duration * 1000)
        }

        function onMaskClick() {
            if (props.maskCloseable) {
                emit('click-overlay')
                close()
            }
        }

        function onCloseClick() {
            emit('click-close')
            close()
        }

        function stopEvent() {}

        return {
            state,
            is_darwer$,
            popup_style$,
            show_top_close$,
            onMaskClick,
            onCloseClick,
            stopEvent,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onScrollTop,
        }
    },
})
</script>

<template>
    <sd-overlay
        v-if="mask && visible"
        :visible="state.toggle_animation === 'show'"
        :duration="duration"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @touchmove.stop="onTouchMove"
        @click="onMaskClick"
    />
    <view
        v-if="visible"
        class="sd-popup"
        :class="{
            [`sd-popup--${ position }`]       : true,
            [`sd-popup--round`]               : round,
            [`is-${ state.toggle_animation }`]: true,
        }"
        :style="popup_style$"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @touchmove.stop="onTouchMove"
    >
        <!-- 顶部区域 -->
        <view v-if="title || show_top_close$" class="sd-popup__header">
            <view class="sd-popup__title">
                {{ title }}
            </view>

            <!-- 顶部区域关闭按钮 -->
            <view v-if="show_top_close$" class="sd-popup__header-close" @tap="onCloseClick">
                <sd-icon name="close" />
            </view>
        </view>

        <!-- 可滚动内容区域 -->
        <scroll-view
            v-if="scrollable"
            scroll-y
            class="sd-popup__body"
            style="width: 100%;"
            :style="{
                height   : is_darwer$ ? '100%' : 'auto',
                maxHeight: is_darwer$ ? 'none' : maxHeight,
            }"
            @scroll="onScrollTop"
            @scrolltolower="$emit('loadmore')"
        >
            <slot />
        </scroll-view>

        <!-- 不可滚动内容区域 -->
        <view v-else class="sd-popup__body">
            <slot />
        </view>

        <!-- 底部插槽 -->
        <slot v-if="$slots.bottom" name="bottom" />

        <!-- 底部关闭按钮 -->
        <view v-if="showBottomClose" class="sd-popup__footer-close" @tap="onCloseClick">
            <sd-icon name="close-circle" />
        </view>
    </view>
</template>
