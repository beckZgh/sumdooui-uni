<script lang="ts">
import type { FormProvide } from '../common/tokens'

import { defineComponent, computed, inject } from 'vue'
import { MpMixin    } from '../common/mixins'
import { FORM_KEY   } from '../common/tokens'
import { rate_props } from './rate'

export default defineComponent({
    ...MpMixin,

    name : 'SdRate',
    props: rate_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const form = inject<FormProvide>(FORM_KEY)

        const value$ = computed({
            get() { return props.modelValue },
            set(value) {
                emit('update:modelValue', value)
                emit('change', value)
            },
        })

        const disabled$ = computed(() => {
            return props.disabled || form?.props.disabled
        })

        function onClick(index: number) {
            if (disabled$.value || props.readonly) return
            value$.value = index
        }

        return {
            value$,
            disabled$,
            onClick,
        }
    },
})
</script>

<template>
    <view
        class="sd-rate"
        :class="customClass"
        :style="customStyle"
    >
        <view
            v-for="(_, index) in count" :key="index"
            class="sd-rate__item"
            :style="{ paddingRight: index + 1 < count ? `${ gutter }px` : 0 }"
        >
            <sd-icon
                :name="index + 1 <= value$ ? activeIcon : inactiveIcon"
                :color="disabled$ ? disabledColor : (index + 1 <= value$ ? activeColor : inactiveColor)"
                :size="size"
                :custom-class="{
                    'sd-rate__icon': true,
                    'is-active'    : index + 1 <= value$,
                    'is-disabled'  : disabled$,
                }"
                :data-score="index + 1"
                @click="onClick(index + 1)"
            />

            <sd-icon
                v-if="allowHalf"
                :name="index + 0.5 <= value$ ? activeIcon : inactiveIcon"
                :color="disabled$ ? disabledColor : (index + 0.5 <= value$ ? activeColor : inactiveColor)"
                :size="size"
                :custom-class="{
                    'sd-rate__icon'      : true,
                    'sd-rate__icon--half': true,
                    'is-active'          : index + 0.5 <= value$,
                    'is-disabled'        : disabled$,
                }"
                :data-score="index + 1 - 0.5"
                @click="onClick(index + 1)"
            />
        </view>
    </view>
</template>

