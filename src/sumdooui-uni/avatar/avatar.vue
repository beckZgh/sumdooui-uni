<script lang="ts">
import { defineComponent } from 'vue'
import { MpMixin         } from '../common/mixins'
import { avatar_props    } from './avatar'

export default defineComponent({
    ...MpMixin,

    name : 'SdAvatar',
    props: avatar_props,
})
</script>

<template>
    <view
        class="sd-avatar"
        :class="[
            customClass,
            {
                [`sd-avatar--${ shape }`]: true,
                [`sd-avatar--${ size }`] : true,
            },
        ]"
        :style="customStyle"
    >
        <slot v-if="$slots.default" />
        <template v-else>
            <sd-image v-if="src" :src="src" width="100%" height="100%" />
            <sd-icon v-else-if="icon" :name="icon" :size="iconSize" :color="iconColor" />
            <text v-else-if="text" :style="textStyle" class="sd-avatar__text">
                {{ text }}
            </text>
        </template>
    </view>
</template>
