<script lang="ts">
import { defineComponent, ref } from 'vue'
import { backtop_props        } from './backtop'
import { MpMixin              } from '../common/mixins'

export default defineComponent({
    ...MpMixin,

    name : 'SdBacktop',
    props: backtop_props,
    emits: ['backtop'],
    setup(props, { emit }) {
        const visible = ref(false)

        // 设置当前滚动值
        function setBackTop(scroll_top = 0) {
            visible.value = scroll_top > props.offsetTop
        }

        /** 回到顶部 */
        function handleBackTop() {
            if (props.scene === 'page') {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration : 200,
                })
            } else {
                emit('backtop')
            }
        }

        return {
            visible,
            setBackTop,
            handleBackTop,
        }
    },
})
</script>

<template>
    <view
        v-if="visible"
        class="sd-backtop"
        :class="[customClass, { [`sd-backtop-${ type }`]: !!type }]"
        :style="{ ...customStyle, right: `${ right }rpx`, bottom: `${ bottom }rpx` }"
        @tap="handleBackTop"
    >
        <slot v-if="$slots.default" />
        <sd-icon v-else name="up" custom-class="sd-backtop__icon" />
    </view>
</template>

