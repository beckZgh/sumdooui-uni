<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { MpMixin     } from '../common/mixins'
import { popup_props  } from './popup'
// import { useGestureSlide } from './use-gesture-slide'

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
        'close',
    ],
    setup(props, { emit }) {
        const visible = ref(false)

        watch(() => props.visible, (status) => {
            status ? open() : close(false)
        })

        onMounted(() => {
            props.visible && open()
        })

        // 外部使用 v-if 时，props.visible 无法被改变
        onUnmounted(() => {
            close(true)
        })

        function open() {
            visible.value = true
            emit('update:visible', true)
            emit('open')
        }

        async function close(force = false) {
            // 关闭弹窗前回调
            if (!force && props.beforeClose && typeof props.beforeClose === 'function') {
                const can_close = await props.beforeClose()
                if ( !can_close ) return
            }

            visible.value = false
            emit('update:visible', false)
            emit('close')
        }

        // 遮罩层样式
        const overlay_style$ = computed(() => {
            const style: CSSProperties = { ...props.overlayStyle }
            if (props.duration) style.transitionDuration = `${ props.duration }s`
            if (props.zIndex  ) style.zIndex = props.zIndex
            return style
        })

        // 弹层样式
        const popup_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.duration) style.transitionDuration = `${ props.duration }s`
            if (props.width   ) style.width = Utils.toUnit(props.width)
            return style
        })

        // 抽屉模式
        const is_darwer$ = computed(() => ['left', 'right'].includes(props.position))

        // 监听遮罩层点击
        function onClickOverlay() {
            if (props.closeOnClickOverlay) {
                emit('click-overlay')
                close(false)
            }
        }

        // 监听关闭按钮点击
        function onClickClose() {
            emit('click-close')
            close(false)
        }

        function onTouchMove() {}

        return {
            visible,
            overlay_style$,
            popup_style$,
            is_darwer$,
            onClickOverlay,
            onClickClose,
            onTouchMove,
        }
    },
})
</script>

<template>
    <view
        class="sd-popup-wrap"
        :class="[
            overlayClass,
            { [`sd-popup-wrap--${ position }`]: true, 'is-show': visible, 'has-overlay': overlay },
        ]"
        :style="overlay_style$"
        @tap="onClickOverlay"
        @touchmove.stop="onTouchMove"
    >
        <view
            class="sd-popup"
            :class="[
                customClass,
                { [`sd-popup--round`]: round, [`sd-popup--${ position }`]: true, 'is-show': visible },
            ]"
            :style="popup_style$"
            @tap.stop
            @touchmove.stop="onTouchMove"
        >
            <!-- 顶部区域 -->
            <view v-if="title || showTopClose" class="sd-popup__header">
                <slot v-if="$slots.header" name="header" />
                <view v-else class="sd-popup__title" :style="titleStyle">
                    {{ title }}
                </view>

                <!-- 顶部区域关闭按钮 -->
                <view v-if="showTopClose" class="sd-popup__header-close" @tap="onClickClose">
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
                @scrolltolower="$emit('loadmore')"
            >
                <slot />
            </scroll-view>

            <!-- 不可滚动内容区域 -->
            <view v-else class="sd-popup__body">
                <slot />
            </view>

            <!-- 底部插槽 -->
            <slot v-if="$slots.footer" name="footer" />

            <!-- 底部关闭按钮 -->
            <view v-if="showBottomClose" class="sd-popup__footer-close" @tap="onClickClose">
                <sd-icon name="close-circle" />
            </view>
        </view>
    </view>
</template>
