<script lang="ts">
import type { PropType, CSSProperties } from 'vue'
import { defineComponent, reactive, computed, watch, nextTick } from 'vue'

const ANIMATION_TYPES = [
    'fade',
    'slide-top',
    'slide-bottom',
    'slide-left',
    'slide-right',
    'zoom-in',
    'zoom-out',
] as const
export default defineComponent({
    name : 'SdAnimation',
    props: {
        types      : { type: Array as PropType<(typeof ANIMATION_TYPES[number])[]>, default: () => [] },
        customStyle: { type: Object as PropType<CSSProperties> },
        show       : { type: Boolean, default: false },
        duration   : { type: Number },
    },
    emits: ['click'],
    setup(props) {
        const m = reactive({
            show     : false,
            transform: '',
            opacity  : 1,
        })

        // 动画容器样式
        const animation_styles$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }
            // 过渡时间
            if (typeof props.duration === 'number') {
                styles.transitionDuration = `${ props.duration / 1000 }s`
            }
            return styles
        })

        watch(() => props.show, (show) => {
            show ? open() : close()
        },{ immediate: true })

        let timer: ReturnType<typeof setTimeout>
        function open() {
            clearTimeout(timer)
            m.show = true
            m.transform = getTransform(false)
            m.opacity = 0
            nextTick(() => {
                setTimeout(() => {
                    _animation(true)
                }, 50)
            })
        }

        function close() {
            clearTimeout(timer)
            _animation(false)
        }

        function _animation(show: boolean) {
            m.opacity   = getOpcity(show)
            m.transform = getTransform(show)
            timer = setTimeout(() => {
                if (!show) {
                    m.show = false
                }
            }, props.duration)
        }

        // 取得透明度值
        function getOpcity(show: boolean) {
            const item = props.types.find(type => type === 'fade')
            return item ? (show ? 1 : 0) : 1
        }

        // 取得显示、隐藏对应的过渡动画
        function getTransform(show: boolean) {
            let transform = ''
            props.types.forEach((type) => {
                switch (type) {
                    case 'slide-top':
                        transform += `translateY(${ show ? '0' : '-100%' })`
                        break
                    case 'slide-bottom':
                        transform += `translateY(${ show ? '0' : '100%' })`
                        break
                    case 'slide-left':
                        transform += `translateX(${ show ? '0' : '-100%' })`
                        break
                    case 'slide-right':
                        transform += `translateX(${ show ? '0' : '100%' })`
                        break
                    case 'zoom-in':
                        transform += `scale(${ show ? 1 : 0.8 })`
                        break
                    case 'zoom-out':
                        transform += `scale(${ show ? 1 : 1.2 })`
                        break
                }
            })
            return transform
        }

        return {
            m,
            animation_styles$,
        }
    },
})
</script>

<template>
    <view
        v-if="m.show"
        class="sd-animation"
        :style="{ ...animation_styles$, transform: m.transform, opacity: m.opacity }"
        @tap="$emit('click', $event)"
    >
        <slot />
    </view>
</template>
