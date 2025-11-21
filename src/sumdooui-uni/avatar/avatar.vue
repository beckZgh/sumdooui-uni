<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { MpMixin         } from '../common/mixins'
import { avatar_props    } from './avatar'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdAvatar',
    props: avatar_props,
    setup(props) {
        const root_style$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }
            if (typeof props.size === 'number' && props.size) {
                styles.width  = `${ props.size }rpx`
                styles.height = `${ props.size }rpx`
            }
            if (props.background) {
                styles.background = props.background
                styles.color      = '#fff'
            }
            if (props.color) {
                styles.color = props.color
            }
            return styles
        })

        const text_style$ = computed(() => {
            const styles: CSSProperties = { ...props.textStyle }
            if (props.fontSize) {
                styles.fontSize = Utils.toUnit(props.fontSize)
            }
            return styles
        })
        return { root_style$, text_style$ }
    },
})
</script>

<template>
    <view
        class="sd-avatar"
        :class="[
            customClass,
            {
                [`sd-avatar--${ shape }`]: true,
                [`sd-avatar--${ size }`] : typeof size === 'string',
            },
        ]"
        :style="root_style$"
    >
        <slot v-if="$slots.default" />
        <template v-else>
            <sd-image v-if="src" :src="src" width="100%" height="100%" />
            <sd-icon v-else-if="icon" :name="icon" :size="fontSize" :color="color" />
            <text v-else-if="text" :style="text_style$" class="sd-avatar__text">
                {{ text }}
            </text>
        </template>
    </view>
</template>
