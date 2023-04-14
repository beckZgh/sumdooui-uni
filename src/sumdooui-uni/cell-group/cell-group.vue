<script lang="ts">
import { defineComponent } from 'vue'
import { cell_group_props } from './cell-group'

export default defineComponent({
    name : 'SdCellGroup',
    props: cell_group_props,
})
</script>

<template>
    <view class="sd-cell-group" :class="[customClass]" :style="customStyle">
        <slot v-if="$slots.title" name="title" />
        <view v-else-if="title" class="sd-cell-group__title" :style="titleStyle">
            {{ title }}
        </view>
        <view class="sd-cell-group">
            <slot />
        </view>
    </view>
</template>
