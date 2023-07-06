<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { loading_props             } from './loading'
import { MpMixin                   } from '../common/mixins'

export default defineComponent({
    ...MpMixin,

    name : 'SdLoading',
    props: loading_props,
    setup(props) {
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.background) style.backgroundColor = props.background
            return style
        })

        return { root_style$ }
    },
})
</script>

<template>
    <view
        class="sd-loading"
        :class="[customClass, {
            [`sd-loading--${ fullscreen ? 'column' : direction }`]: true,
            'is-fullscreen'                                       : fullscreen,
            [`sd-loading--${ type }`]                             : !!type,
        }]"
        :style="root_style$"
    >
        <view v-if="loadingType === 'spinner'" class="sd-loading__spinner" :style="{ color }">
            <view
                v-for="idx in 12" :key="idx"
                class="sd-loading__spinner-line"
                :class="{ [`sd-loading__spinner-line-${ idx }`]: true }"
            />
        </view>

        <view v-if="loadingType === 'line'" class="sd-loading__line" :style="{ color }">
            <template v-for="idx in 5" :key="idx">
                <view
                    class="sd-loading__line-rect"
                    :class="{ [`sd-loading__line-rect-${ idx }`]: true }"
                />
            </template>
        </view>

        <view v-if="loadingType === 'meet'" class="sd-loading__meet" :style="{ color }" />

        <text v-if="text" class="sd-loading__text" :style="{ color }">
            {{ text }}
        </text>
    </view>
</template>
