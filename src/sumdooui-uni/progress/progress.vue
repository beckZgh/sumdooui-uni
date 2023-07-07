<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { MpMixin        } from '../common/mixins'
import { progress_props } from './progress'

export default defineComponent({
    ...MpMixin,

    name : 'SdProgress',
    props: progress_props,
    setup(props) {
        const inner_style$ = computed(() => {
            const style: CSSProperties = {
                width          : `${ props.value }%`,
                backgroundColor: props.trackColor,
            }
            return style
        })

        return { inner_style$ }
    },
})
</script>

<template>
    <view class="sd-progress" :class="customClass" :style="customStyle">
        <view
            class="sd-progress-outer"
            :style="{ height: stokeWidth ? `${ stokeWidth }px` : undefined, background }"
        >
            <view class="sd-progress__track" :style="inner_style$" />

            <!-- 内显进度值 -->
            <view
                v-if="showText && textInside" class="sd-progress__text"
                :style="{
                    left           : `${ +value }%`,
                    transform      : `translate(-${ +value }%, -50%)`,
                    minHeight      : `${ stokeWidth }px`,
                    backgroundColor: trackColor,
                }"
            >
                {{ text || `${ value }%` }}
            </view>
        </view>

        <!-- 外显进度值 -->
        <view v-if="showText && !textInside" class="sd-progress__text is-outer">
            {{ text || `${ value }%` }}
        </view>
    </view>
</template>

