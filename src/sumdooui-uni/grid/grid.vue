<script lang="ts">
import { defineComponent } from 'vue'
import { grid_props      } from './grid'

import { GRID_KEY   } from '../common/tokens'
import { useProvide } from '../common/hooks'

export default defineComponent({
    name : 'SdGrid',
    props: grid_props,
    setup(props) {
        useProvide(GRID_KEY)({ props })
    },
})
</script>

<template>
    <view class="sd-grid" :class="{ 'sd-grid--border': border }">
        <slot />
    </view>
</template>
