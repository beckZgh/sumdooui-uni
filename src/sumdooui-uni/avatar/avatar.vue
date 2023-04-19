<script lang="ts">
import { defineComponent, ref } from 'vue'
import { avatar_props   } from './avatar'

export default defineComponent({
    name   : 'SdAvatar',
    props  : avatar_props,
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const visible = ref(false)
        return {
            visible,
        }
    },
})
</script>

<template>
    <view
        class="sd-avatar"
        :class="{
            [`sd-avatar--${ shape }`]: true,
            [`sd-avatar--${ size }`] : ['small', 'medium', 'large'].includes(size || ''),
        }"
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
