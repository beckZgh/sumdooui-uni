<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed } from 'vue'
import { badge_props } from './badge'

export default defineComponent({
    name : 'SdBadge',
    props: badge_props,
    setup(props) {
        // 徽标背景色、文本色
        const badge_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.background) style.backgroundColor = props.background
            if (props.color) style.color = props.color
            return style
        })

        // 徽标内容
        const content$ = computed(() => {
            if (!props.content) return ''

            // 文本展示
            if (typeof props.content === 'string') return props.content

            // 数字展示
            if (props.max && props.content > props.max) {
                return `${ props.max }+`
            }

            return props.content
        })

        return {
            content$,
            badge_style$,
        }
    },
})
</script>

<template>
    <view
        class="sd-badge"
        :class="{
            [`sd-badge--${ type }`]: !!type,
            'is-absolute'          : !!$slots.default,
        }"
    >
        <slot />
        <view v-if="dot" class="sd-badge__dot" :style="badge_style$" />
        <view
            v-else
            class="sd-badge__content"
            :style="badge_style$"
        >
            {{ content$ }}
        </view>
    </view>
</template>
