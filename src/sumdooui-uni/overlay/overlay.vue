<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { MpMixin                   } from '../common/mixins'
import { overlay_props             } from './overlay'

export default defineComponent({
    ...MpMixin,

    name : 'SdOverlay',
    props: overlay_props,
    emits: [
        'update:visible',
        'click',
        'touchstart',
        'touchmove',
        'touchend',
    ],
    setup(props, { emit }) {
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.duration) {
                style.transitionDuration = `${ props.duration }s`
            }
            if (props.background) style.backgroundColor = props.background
            if (props.zIndex    ) style.zIndex = props.zIndex
            return style
        })

        function onClick(e: Event) {
            emit('click', e)
            if (props.closeOnClick) {
                emit('update:visible', false)
            }
        }

        function onTouchMove(e: TouchEvent) {
            if (props.lockScroll) {
                e.stopPropagation()
            } else {
                emit('touchmove', e)
            }
        }

        return {
            root_style$,
            onClick,
            onTouchMove,
        }
    },
})
</script>

<template>
    <view
        class="sd-overlay"
        :class="[customClass, { [`is-show`]: visible }]"
        :style="root_style$"
        @touchstart="$emit('touchstart', $event)"
        @touchend="$emit('touchend', $event)"
        @touchmove.stop="onTouchMove"
        @tap="onClick"
    >
        <slot />
    </view>
</template>
