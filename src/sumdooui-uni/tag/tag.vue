<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { tag_props } from './tag'

import Utils from '../utils'

export default defineComponent({
    name : 'SdTag',
    props: tag_props,
    setup(props) {
        const tag_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.background) style.backgroundColor = props.background
            if (props.color     ) style.color = props.color
            if (props.maxWidth  ) style.maxWidth = Utils.toUnit(props.maxWidth)
            return style
        })

        return {
            tag_style$,
        }
    },
})
</script>

<template>
    <view
        class="sd-tag"
        :class="[
            {
                [`sd-tag--${ type }`]   : true,
                [`sd-tag--${ variant }`]: !!variant,
                'sd-tag--round'         : round,
            },
            customClass,
        ]"
        :style="tag_style$"
    >
        <text v-if="maxWidth" class="sd-tag__text">
            <slot v-if="$slots.default" />
            <template v-else>
                {{ text }}
            </template>
        </text>
        <template v-else>
            <slot v-if="$slots.default" />
            <template v-else>
                {{ text }}
            </template>
        </template>
    </view>
</template>

