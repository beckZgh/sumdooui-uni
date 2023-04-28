<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { badge_props } from './badge'
import { MpMixin     } from '../common/mixins'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdBadge',
    props: badge_props,
    setup(props) {
        // 徽标背景色、文本色
        const badge_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.background) style.backgroundColor = props.background
            if (props.color) style.color = props.color
            if (props.size ) style.fontSize = Utils.toUnit(props.size)
            if (props.offset) {
                switch (props.position) {
                    case 'top-right': {
                        const [top, right] = props.offset
                        if (top   !== undefined) style.top   = Utils.toUnit(top)
                        if (right !== undefined) style.right = Utils.toUnit(right)
                        break
                    }
                    case 'top-left': {
                        const [top, left] = props.offset
                        if (top  !== undefined) style.top  = Utils.toUnit(top)
                        if (left !== undefined) style.right = Utils.toUnit(left)
                        break
                    }
                    case 'bottom-right': {
                        const [bottom, right] = props.offset
                        if (bottom !== undefined) style.top   = Utils.toUnit(bottom)
                        if (right  !== undefined) style.right = Utils.toUnit(right)
                        break
                    }
                    case 'bottom-left': {
                        const [bottom, left] = props.offset
                        if (bottom !== undefined) style.top   = Utils.toUnit(bottom)
                        if (left   !== undefined) style.right = Utils.toUnit(left)
                        break
                    }
                }
            }
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
        :class="[
            customClass,
            {
                [`sd-badge--${ theme }`]: !!theme,
                [`sd-badge--${ shape }`]: !!shape,
                [`is-${ position }`]    : true,
                'is-absolute'           : !!$slots.default,
            },
        ]"
        :style="customStyle"
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
