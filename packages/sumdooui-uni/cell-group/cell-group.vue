<script lang="ts">
import { defineComponent  } from 'vue'
import { cell_group_props } from './cell-group'
import { MpMixin          } from '../common/mixins'
import { CELL_GROUP_KEY   } from '../common/tokens'
import { useProvide       } from '../common/hooks'

export default defineComponent({
    ...MpMixin,

    name : 'SdCellGroup',
    props: cell_group_props,
    setup(props) {
        useProvide(CELL_GROUP_KEY)({ props })
    },
})
</script>

<template>
    <view class="sd-cell-group" :class="[customClass]" :style="customStyle">
        <slot v-if="$slots.title" name="title" />
        <view v-else-if="title" class="sd-cell-group__title" :style="titleStyle">
            {{ title }}
        </view>
        <view class="sd-cell__body" :style="bodyStyle">
            <slot />
        </view>
    </view>
</template>
