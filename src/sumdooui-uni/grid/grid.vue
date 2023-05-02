<script lang="ts">
import { defineComponent } from 'vue'
import { MpMixin         } from '../common/mixins'
import { grid_props      } from './grid'

import { GRID_KEY   } from '../common/tokens'
import { useProvide } from '../common/hooks'

export default defineComponent({
    ...MpMixin,

    name : 'SdGrid',
    props: grid_props,
    emits: [
        'getuserinfo',
        'contact',
        'getphonenumber',
        'opensetting',
        'launchapp',
        'chooseavatar',
    ],
    setup(props, { emit }) {
        useProvide(GRID_KEY)({ props, emit })
    },
})
</script>

<template>
    <view class="sd-grid" :class="[customClass, { 'sd-grid--border': border }]" :style="customStyle">
        <slot />
    </view>
</template>
