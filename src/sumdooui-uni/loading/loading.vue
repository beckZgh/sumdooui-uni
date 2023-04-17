<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { loading_props } from './loading'
import Utils from '../common/utils'

export default defineComponent({
    name   : 'SdLoading',
    props  : loading_props,
    options: {
        virtualHost: true,
    },
    setup(props) {
        const loading_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.height    ) style.height = Utils.toUnit(props.height)
            if (props.background) style.backgroundColor = props.background
            if (props.color     ) style['--sd-loading-color'] = props.color
            return style
        })

        return {
            loading_style$,
        }
    },
})
</script>

<template>
    <view
        class="sd-loading"
        :class="{
            [`sd-loading--${ scene }`]                                  : true,
            [`sd-loading--${ scene === 'page' ? 'column' : direction }`]: true,
        }"
        :style="loading_style$"
    >
        <view
            v-if="type === 'circle'"
            class="sd-loading__circle"
        />

        <view v-if="type === 'line'" class="sd-loading__line">
            <template v-for="idx in 5" :key="idx">
                <view
                    class="sd-loading__line-rect"
                    :class="{ [`sd-loading__line-rect-${ idx + 1 }`]: true }"
                />
            </template>
        </view>

        <view
            v-if="type === 'meet'"
            class="sd-loading__meet"
        />

        <text v-if="text" class="sd-loading__text">
            {{ text }}
        </text>
        <text v-else>
            <slot />
        </text>
    </view>
</template>
