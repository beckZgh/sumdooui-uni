<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { MpMixin   } from '../common/mixins'
import { tag_props } from './tag'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdTag',
    props: tag_props,
    emits: ['click', 'close'],
    setup(props) {
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.background) style.backgroundColor = props.background
            if (props.color     ) style.color = props.color
            if (props.maxWidth  ) style.maxWidth = Utils.toUnit(props.maxWidth)
            return style
        })

        return { root_style$ }
    },
})
</script>

<template>
    <view
        class="sd-tag"
        :class="[
            customClass,
            {
                [`sd-tag--${ theme }`]  : true,
                [`sd-tag--${ variant }`]: !!variant,
                [`sd-tag--${ shape }`]  : true,
                [`sd-tag--${ size }`]   : true,
            },
        ]"
        :style="root_style$"
        @tap="$emit('click', $event)"
    >
        <text v-if="maxWidth" class="sd-tag__text">
            <sd-icon v-if="icon" :name="icon" custom-class="sd-tag__icon" />
            <slot v-if="$slots.default" />
            <template v-else>
                {{ text }}
            </template>
            <sd-icon v-if="closeable" name="close" custom-class="sd-tag__close" @click="$emit('close', $event)" />
        </text>
        <template v-else>
            <sd-icon v-if="icon" :name="icon" custom-class="sd-tag__icon" />
            <slot v-if="$slots.default" />
            <template v-else>
                {{ text }}
            </template>
            <sd-icon v-if="closeable" name="close" custom-class="sd-tag__close" @click="$emit('close', $event)" />
        </template>
    </view>
</template>

