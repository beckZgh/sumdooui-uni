<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { MpMixin                   } from '../common/mixins'
import { pull_refresh_props        } from './pull-refresh'

export default defineComponent({
    ...MpMixin,

    name : 'SdPullRefresh',
    props: pull_refresh_props,
    emits: ['scroll'],
    setup(props, { emit }) {
        const triggered  = ref<'' | 'pulling' | 'loosing' | 'refreshing' | 'success'>('')
        const refreshing = ref(false)

        // 滚动位置
        function handleScroll(e: any) {
            emit('scroll', e.detail.scrollTop)
        }

        // 处理下拉中
        function handlePulling(e: any) {
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
            await props.onRefresh()
            if (props.showSuccessText && props.successText) {
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

        return {
            triggered,
            refreshing,
            handleScroll,
            handlePulling,
            handleRestore,
            handleAbort,
            handleRefresh,
        }
    },
})
</script>

<template>
    <scroll-view
        class="sd-pull-refresh"
        :class="customClass"
        :style="customStyle"
        scroll-y
        :refresher-enabled="disabled ? false : true"
        :refresher-triggered="refreshing"
        :refresher-threshold="pullDistance"
        refresher-default-style="none"
        @refresherabort="handleAbort"
        @refresherpulling="handlePulling"
        @refresherrestore="handleRestore"
        @refresherrefresh="handleRefresh"
    >
        <view style="text-align: center;">
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
