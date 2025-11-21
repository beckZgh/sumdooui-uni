<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { MpMixin                        } from '../common/mixins'
import { pull_refresh_props             } from './pull-refresh'

export default defineComponent({
    ...MpMixin,

    name : 'SdPullRefresh',
    props: pull_refresh_props,
    emits: ['scroll', 'scrolltolower'],
    setup(props, { emit }) {
        const triggered     = ref<'' | 'pulling' | 'loosing' | 'refreshing' | 'success'>('')
        const refreshing    = ref(false)
        const scroll_top    = ref(0) // 指定滚动位置
        const scrolling_top = ref(0) // 实时滚动距离

        // 处理下拉中
        function handlePulling(e: any) {
            if (scroll_top.value > 0) return

            if (e.detail.dy >= props.pullDistance) {
                triggered.value = 'loosing'
            } else {
                triggered.value = 'pulling'
            }
        }

        // 下拉被复位
        function handleRestore() {
            refreshing.value = false
            triggered.value = ''
        }

        // 下拉被中止
        function handleAbort() {
            refreshing.value = false
            triggered.value  = ''
        }

        // 下拉刷新中
        async function handleRefresh() {
            triggered.value = 'refreshing'
            if (typeof props.onRefresh !== 'function') return

            refreshing.value = true
            const res = await props.onRefresh()
            if (res.ok && props.showSuccessText && props.successText) {
                triggered.value = 'success'
                await sleep()
            }
            refreshing.value = false
        }

        function sleep() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true)
                }, props.successDuration)
            })
        }

        // ------------------------------

        function onScroll(e: any) {
            scrolling_top.value = e.detail.scrollTop
            emit('scroll', e)
        }

        function scrollToTop() {
            if (scroll_top.value === 0) scroll_top.value = -1
            nextTick(() => {
                scroll_top.value = 0
            })
        }

        return {
            scroll_top,
            triggered,
            refreshing,
            handlePulling,
            handleRestore,
            handleAbort,
            handleRefresh,
            onScroll,
            scrollToTop,
        }
    },
})
</script>

<template>
    <scroll-view
        class="sd-pull-refresh"
        :class="customClass"
        :style="customStyle"
        :refresher-enabled="disabled ? false : true"
        :refresher-triggered="refreshing"
        :refresher-threshold="pullDistance"
        :lower-threshold="lowerThreshold"
        :scroll-with-animation="scrollWithAnimation"
        :scroll-top="scroll_top"
        scroll-y
        refresher-default-style="none"
        @scroll="onScroll"
        @scrolltolower="$emit('scrolltolower', $event)"
        @refresherabort="handleAbort"
        @refresherpulling="handlePulling"
        @refresherrestore="handleRestore"
        @refresherrefresh="handleRefresh"
    >
        <view v-if="triggered" class="sd-pull-refresh__content" :style="contentStyle">
            <view v-if="triggered === 'pulling' || triggered === 'loosing'">
                <sd-icon
                    name="pull"
                    :custom-class="{
                        'sd-pull-refresh__icon': true,
                        'is-loosing'           : triggered === 'loosing',
                    }"
                />
                <text style="margin-left: 5px;">
                    {{ triggered === 'pulling' ? pullingText : loosingText }}
                </text>
            </view>
            <view v-if="triggered === 'success' && showSuccessText && successText">
                <sd-icon name="check" />
                <text style="margin-left: 5px;">
                    {{ successText }}
                </text>
            </view>
            <sd-loading
                v-if="triggered === 'refreshing'"
                type="primary"
                loading-type="line"
                direction="column"
                :text="loadingText"
            />
        </view>
        <slot />
    </scroll-view>
</template>
