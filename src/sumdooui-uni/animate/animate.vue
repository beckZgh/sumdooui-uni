<script lang="ts">
/**
 * NUTUI
 * https://nutui.jd.com/h5/vue/4x/#/zh-CN/component/animate
 */
import { defineComponent, computed, ref } from 'vue'
import { MpMixin } from '../common/mixins'
import { animate_props } from './animate'

export default defineComponent({
    ...MpMixin,

    name : 'SdAnimate',
    props: animate_props,
    emits: ['click'],
    setup(props, { emit }) {
        const clicked = ref(false)

        const animate_box_class$ = computed(() => {
            return {
                'sd-ani-container'              : true,
                [`sd-animation-${ props.type }`]: props.trigger === 'initial' || (clicked.value ? props.type : false),
                'loop'                          : props.loop,
            }
        })

        function onClick(event: Event) {
            clicked.value = true
            if (!props.loop) {
                setTimeout(() => {
                    clicked.value = false
                }, 1000)
            }

            emit('click', event)
        }

        return {
            animate_box_class$,
            onClick,
        }
    },
})
</script>

<template>
    <view class="sd-animate" :class="[customClass]" :style="customStyle">
        <view :class="animate_box_class$" @tap="onClick">
            <slot />
        </view>
    </view>
</template>
