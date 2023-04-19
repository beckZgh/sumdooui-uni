<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { divider_props   } from './divider'

import Utils from '../utils'
export default defineComponent({
    name : 'SdDivider',
    props: divider_props,
    setup(props) {
        const content_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.textSize) style.fontSize = Utils.toUnit(props.textSize)
            if (props.color   ) style.color    = props.color
            return style
        })

        return {
            content_style$,
        }
    },
})
</script>

<template>
    <view
        class="sd-divider"
        :class="{ [`sd-divider--${ type }`]: true, [`sd-divider--sence-${ typeSence }`]: true }"
        :style="{ padding: `${ columnGap }rpx ${ rowGap }rpx` }"
    >
        <view
            class="sd-divider__line"
            :class="{ [`sd-divider__line--${ lineType }`]: true }"
            :style="lineColor ? `border-color: ${ lineColor }` : ''"
        />
        <view
            class="sd-divider__content"
            :style="content_style$"
        >
            <slot v-if="$slots.default" />
            <template v-else>
                {{ text }}
            </template>
        </view>
        <view
            class="sd-divider__line"
            :class="{ [`sd-divider__line--${ lineType }`]: true }"
            :style="lineColor ? `border-color: ${ lineColor }` : ''"
        />
    </view>
</template>
