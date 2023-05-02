<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, onMounted, ref, watch, computed } from 'vue'
import { MpMixin          } from '../common/mixins'
import { transition_props } from './transition'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdTransition',
    props: transition_props,
    emits: [
        'click',
        'touchstart',
        'touchmove',
        'touchend',
        'open',
        'close',
        'opened',
        'closed',
    ],
    setup(props, { emit }) {
        const status = ref<'show' | 'hide' | ''>('')

        watch(() => props.visible, (visible) => {
            if (visible) {
                status.value = 'show'
                emit('open')
            } else {
                status.value = 'hide'
                emit('close')
            }
        })

        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (status.value && props.duration) style['animation-duration'] = `${ props.duration }s`
            if (props.zIndex) style.zIndex = props.zIndex
            if (props.width ) style.width = Utils.toUnit(props.width)
            return style
        })

        onMounted(() => {
            if (props.visible) {
                status.value = 'show'
                emit('open')
            }
        })

        function onAnimationEnd() {
            if (props.visible) {
                emit('opened')
            } else {
                status.value = ''
                emit('closed')
            }
        }

        return {
            status,
            root_style$,
            onAnimationEnd,
        }
    },
})
</script>

<template>
    <view
        class="sd-transition"
        :class="[
            {
                [`sd-transition--${ mode }`]: true,
                [`is-${ status }`]          : !!status,
            },
            customClass,
        ]"
        :style="root_style$"
        @animationend="onAnimationEnd"
        @touchstart="$emit('touchstart', $event)"
        @touchend="$emit('touchend', $event)"
        @touchmove.stop="$emit('touchmove', $event)"
        @tap="$emit('click', $event)"
    >
        <slot />
    </view>
</template>

