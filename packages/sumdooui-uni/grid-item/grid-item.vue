<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { MpMixin         } from '../common/mixins'
import { grid_item_props } from './grid-item'

import { GRID_KEY, type GridProvide } from '../common/tokens'
import { useInject } from '../common/hooks'

export default defineComponent({
    ...MpMixin,

    name : 'SdGridItem',
    props: grid_item_props,
    emits: [
        'click',
        'getuserinfo',
        'contact',
        'getphonenumber',
        'opensetting',
        'launchapp',
        'chooseavatar',
    ],
    setup(props, { emit }) {
        const { parent: grid } = useInject<GridProvide>(GRID_KEY)

        const root_class$ = computed(() => {
            const { direction, border, square, clickable } = grid?.props || {}
            return {
                [`sd-grid-item--border`]        : border,
                [`sd-grid-item--square`]        : square,
                [`sd-grid-item--clickable`]     : clickable,
                [`sd-grid-item--${ direction }`]: !!direction,
            }
        })

        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }

            if (grid) {
                const { column, square } = grid.props
                style.flexBasis = `${ 100 / column }%`
                // 正方体格子
                if (square) style.paddingTop = `${ 100 / column }%`
            }

            return style
        })

        function handleOpenTypeEmit(type: string, e: Event) {
            emit(type as any, e)
            grid?.emit(type, e)
        }

        return {
            root_class$,
            root_style$,
            handleOpenTypeEmit,
        }
    },
})
</script>

<template>
    <view
        class="sd-grid-item"
        :class="[customClass, root_class$]"
        :style="root_style$"
        @tap="$emit('click', $event)"
    >
        <view class="sd-grid-item__content" :style="contentStyle">
            <slot v-if="$slots.default" />
            <template v-else-if="openType">
                <button
                    class="sd-grid-item__button-box"
                    :open-type="openType"
                    @getuserinfo="handleOpenTypeEmit('getuserinfo', $event)"
                    @contact="handleOpenTypeEmit('contact', $event)"
                    @getphonenumber="handleOpenTypeEmit('getphonenumber', $event)"
                    @opensetting="handleOpenTypeEmit('opensetting', $event)"
                    @launchapp="handleOpenTypeEmit('launchapp', $event)"
                    @chooseavatar="handleOpenTypeEmit('chooseavatar', $event)"
                >
                    <template v-if="badge || dot">
                        <sd-badge v-bind="{ ...badgeProps }" :content="badge" :dot="dot">
                            <sd-image v-if="image" v-bind="imageProps" :src="image" />
                            <sd-icon v-else-if="icon" v-bind="iconProps" :name="icon" :size="iconSize" :color="iconColor" />
                        </sd-badge>
                    </template>
                    <template v-else>
                        <sd-image v-if="image" v-bind="imageProps" :src="image" />
                        <sd-icon v-else-if="icon" v-bind="iconProps" :name="icon" :size="iconSize" :color="iconColor" />
                    </template>
                    <view class="sd-grid-item__text" :style="textStyle">
                        {{ text }}
                    </view>
                </button>
            </template>
            <template v-else>
                <template v-if="badge || dot">
                    <sd-badge v-bind="{ ...badgeProps }" :content="badge" :dot="dot">
                        <sd-image v-if="image" v-bind="imageProps" :src="image" />
                        <sd-icon v-else-if="icon" v-bind="iconProps" :name="icon" :size="iconSize" :color="iconColor" />
                    </sd-badge>
                </template>
                <template v-else>
                    <sd-image v-if="image" v-bind="imageProps" :src="image" />
                    <sd-icon v-else-if="icon" v-bind="iconProps" :name="icon" :size="iconSize" :color="iconColor" />
                </template>
                <view class="sd-grid-item__text" :style="textStyle">
                    {{ text }}
                </view>
            </template>
        </view>
    </view>
</template>
