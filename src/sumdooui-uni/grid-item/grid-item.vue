<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { grid_item_props } from './grid-item'

import { GRID_KEY, type GridProvide } from '../common/tokens'
import { useInject } from '../common/hooks'


export default defineComponent({
    name   : 'SdGridItem',
    props  : grid_item_props,
    options: {
        virtualHost: true,
    },
    setup(props) {
        const { parnet } = useInject<GridProvide>(GRID_KEY)

        const root_class$ = computed(() => {
            return {
                [`sd-grid-item--border`]                      : parnet?.props.border,
                [`sd-grid-item--square`]                      : parnet?.props.square,
                [`sd-grid-item--clickable`]                   : parnet?.props.clickable,
                [`sd-grid-item--${ parnet?.props.direction }`]: true,
            }
        })

        const root_style$ = computed(() => {
            if (!parnet) return {}

            const width = `${ 100 / parnet.props.column }%`
            const style: CSSProperties = {}
            style['flexBasis'] = width

            // 正方体格子
            if (parnet.props.square) {
                style.paddingTop = width
            }

            return style
        })

        return {
            root_class$,
            root_style$,
        }
    },
})
</script>

<template>
    <view
        class="sd-grid-item"
        :class="root_class$"
        :style="root_style$"
    >
        <view class="sd-grid-item__content" :style="contentStyle">
            <slot v-if="$slots.default" />
            <template v-else>
                <template v-if="badge || dot">
                    <sd-badge v-bind="{ ...badgeProps }" :content="badge" :dot="dot">
                        <sd-image v-if="image" :src="image" :width="imageWidth" :height="imageHeight" />
                        <sd-icon v-else-if="icon" :name="icon" :size="iconSize" :color="iconColor" />
                    </sd-badge>
                </template>
                <template v-else>
                    <sd-image v-if="image" :src="image" :width="imageWidth" :height="imageHeight" />
                    <sd-icon v-else-if="icon" :name="icon" :size="iconSize" :color="iconColor" />
                </template>
                <view class="sd-grid-item__text" :style="textStyle">
                    {{ text }}
                </view>
            </template>
        </view>
    </view>
</template>
