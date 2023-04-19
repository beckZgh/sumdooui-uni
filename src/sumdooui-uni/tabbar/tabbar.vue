<script lang="ts">
import { defineComponent } from 'vue'

import { tabbar_props } from './tabbar'

export default defineComponent({
    name : 'SdTabbar',
    props: tabbar_props,
    emits: ['update:modelValue'],
    setup(props) {
        const getColor = (index: number) => {
            if (Number(props.modelValue) === index) {
                return props.activeColor || undefined
            } else {
                return props.inactiveColor || undefined
            }
        }

        return { getColor }
    },
})
</script>

<template>
    <view
        class="sd-tabbar"
        :class="{
            'is-fixed'         : fixed,
            'sd-tabbar--border': showTopBorder,
        }"
        :style="zIndex ? `z-index: ${ zIndex }` : ''"
    >
        <template v-for="(tab, _idx) in items" :key="_idx">
            <view
                class="sd-tabbar__item"
                :class="{ 'is-active': Number(modelValue) === _idx }"
                :style="{ color: getColor(_idx) }"
                @tap="$emit('update:modelValue', _idx)"
            >
                <sd-icon v-if="tab.icon" :name="tab.icon" />
                <text v-if="tab.name" class="sd-tabbar__item-text">
                    {{ tab.name }}
                </text>
            </view>
        </template>
    </view>
</template>
