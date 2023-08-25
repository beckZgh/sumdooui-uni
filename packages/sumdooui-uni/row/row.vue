<script lang="ts">
import { defineComponent } from 'vue'
import { row_props } from './row'
import { MpMixin } from '../common/mixins'

import { ROW_KEY    } from '../common/tokens'
import { useProvide } from '../common/hooks'

export default defineComponent({
    ...MpMixin,

    name : 'SdRow',
    props: row_props,
    setup(props) {
        useProvide(ROW_KEY)({ props })
        return {}
    },
})
</script>

<template>
    <view
        class="sd-row"
        :class="[
            customClass,
            { 'sd-row--flex': flex },
        ]"
        :style="customStyle"
    >
        <slot />
    </view>
</template>

