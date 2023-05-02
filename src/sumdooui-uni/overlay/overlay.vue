<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
import { MpMixin       } from '../common/mixins'
import { overlay_props } from './overlay'

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
        const status = ref<'show' | 'hide' | ''>('')

        watch(() => props.visible, (visible) => {
            status.value = visible ? 'show' : 'hide'
        })

        onMounted(() => {
            if (props.visible) status.value = 'show'
        })

        function onTransitionEnd() {
            if (!props.visible) status.value = ''
        }

        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (status.value && props.duration) {
                style.transitionDuration = `${ props.duration }s`
            }
            if (props.background) style.backgroundColor = props.background
            if (props.zIndex    ) style.zIndex = props.zIndex
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

        return {
            status,
            root_style$,
            onClick,
            onTouchMove,
            onTransitionEnd,
        }
    },
})
</script>

<template>
    <view
        class="sd-overlay"
        :class="[customClass, { [`is-${ status }`]: !!status }]"
        :style="root_style$"
        @transitionend="onTransitionEnd"
        @touchstart="$emit('touchstart', $event)"
        @touchend="$emit('touchend', $event)"
        @touchmove.stop="onTouchMove"
        @tap="onClick"
    >
        <slot />
    </view>
</template>
