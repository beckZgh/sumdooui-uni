<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { MpMixin         } from '../common/mixins'
import { popup_props     } from './popup'
import { useGestureSlide } from './use-gesture-slide'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdPopup',
    props: popup_props,
    emits: [
        'update:visible',
        'click-overlay',
        'click-close',
        'loadmore',
        'open',
        'opened',
        'close',
        'closed',
    ],
    setup(props, { emit }) {
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

        // 底部弹窗 & 居中弹窗默认显示顶部关闭按钮
        const show_top_close$ = computed(() => {
            if (Utils.isBoolean(props.showTopClose)) return props.showTopClose
            return !!['bottom', 'center'].includes(props.position)
        })

        // 监听遮罩层点击
        function onMaskClick() {
            if (props.maskCloseable) {
                close()
                emit('click-overlay')
            }
        }

        // 监听关闭按钮点击
        function onCloseClick() {
            emit('click-close')
            close()
        }

        function close() {
            emit('update:visible', false)
        }

        const is_closed = ref(true)
        watch(() => props.visible, (visible) => {
            if (visible) is_closed.value = false
        }, { immediate: true })

        function onClosed() {
            is_closed.value = true
            emit('closed')
        }

        return {
            slide_style,
            is_darwer$,
            show_top_close$,
            onMaskClick,
            onCloseClick,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onScrollTop,
            is_closed,
            onClosed,
        }
    },
})
</script>

<template>
    <sd-overlay
        :visible="mask && visible"
        :duration="duration"
        :z-index="zIndex"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @touchmove.stop="onTouchMove"
        @click="onMaskClick"
    />
    <sd-transition
        :visible="visible"
        :mode="position"
        :duration="duration"
        :width="width"
        :z-index="zIndex"
        :custom-style="slide_style"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
        @touchmove.stop="onTouchMove"
        @open="$emit('open')"
        @opened="$emit('opened')"
        @close="$emit('close')"
        @closed="onClosed"
    >
        <view
            v-if="!is_closed"
            class="sd-popup"
            :class="[customClass, { [`sd-popup--round`]: round, [`sd-popup--${ position }`]: true }]"
            :style="customStyle"
        >
            <!-- 顶部区域 -->
            <view v-if="title || show_top_close$" class="sd-popup__header">
                <slot v-if="$slots.header" name="header" />
                <view v-else class="sd-popup__title">
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
    </sd-transition>
</template>
