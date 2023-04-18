<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { overlay_props } from './overlay'

export default defineComponent({
    name : 'SdOverlay',
    props: overlay_props,
    emits: [
        'update:visible',
        'click',
        'touchstart',
        'touchmove',
        'touchend',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const root_style$ = computed(() => {
            const style: CSSProperties = {
                ...props.customStyle,
                transitionDuration: `${ props.duration }s`,
            }
            if (props.zIndex) style.zIndex = props.zIndex
            return style
        })

        function onClick(e: Event) {
            emit('click', e)

            if (props.closeOnClickOverlay) {
                emit('update:visible', false)
            }
        }

        function onTouchMove(e: TouchEvent) {
            emit('touchmove', e)
        }

        function stopEvent() {}

        return {
            root_style$,
            onClick,
            stopEvent,
            onTouchMove,
        }
    },
})
</script>

<template>
    <view
        class="sd-overlay"
        :class="[customClass, { 'is-show': visible }]"
        :style="root_style$"
        @touchstart="$emit('touchstart', $event)"
        @touchend="$emit('touchend', $event)"
        @touchmove.stop="onTouchMove"
        @tap="onClick"
    >
        <slot />
    </view>
</template>
