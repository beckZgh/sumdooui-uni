<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed, inject } from 'vue'
import { radio_props } from './radio'
import {
    RADIO_GROUP_KEY, type RadioGroupProvide,
    FORM_ITEM_KEY, type FormItemProvide,
} from '../common/tokens'
import Utils from '../utils'

export default defineComponent({
    name : 'SdRadio',
    props: radio_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const radio_group = inject<RadioGroupProvide>(RADIO_GROUP_KEY)
        const form_item   = inject<FormItemProvide>(FORM_ITEM_KEY)

        const checked$ = computed<string | boolean | number>({
            get() {
                if (radio_group) {
                    return props.name !== undefined ? (radio_group.props.modelValue === props.name) : radio_group.props.modelValue
                } else {
                    return props.name !== undefined ? (props.modelValue === props.name) : props.modelValue
                }
            },
            set(value) {
                emit('update:modelValue', value)
            },
        })

        const disabled$ = computed(() => {
            return (
                radio_group
                    ? radio_group?.props.disabled || props.disabled
                    : props.disabled
            ) ?? false
        })

        const root_style$ = computed(() => {
            const style: CSSProperties = {}
            if (radio_group?.props.column && radio_group?.props.column > 1) {
                style.flexBasis = `${ 100 / radio_group?.props.column }%`
            }
            return style
        })

        const active_color$ = computed(() => radio_group?.props.activeColor)

        const label_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.labelSize) style.fontSize = Utils.toUnit(props.labelSize)
            if (active_color$.value && checked$.value) style.color = active_color$.value
            return style
        })

        function handleToggle() {
            if (disabled$.value) return

            if (radio_group) {
                radio_group.onChange(props.name !== undefined ? props.name : props.modelValue)
            } else {
                emit('update:modelValue', props.name !== undefined ? props.name : props.modelValue)
                emit('change')
                form_item?.validate('change')
            }
        }

        return {
            root_style$,
            label_style$,
            active_color$,
            checked$,
            disabled$,
            handleToggle,
        }
    },
})
</script>

<template>
    <label
        class="sd-radio"
        :class="{
            [`sd-radio--${ size }`]: true,
            'is-checked'           : checked$,
            'is-disabled'          : disabled$,
        }"
        :style="root_style$"
        @tap="handleToggle"
    >
        <!-- 原始组件 -->
        <radio :checked="checked$" :disabled="disabled$" class="sd-radio__original" />

        <text
            v-if="iconPosition === 'right'"
            class="sd-radio__label sd-radio__label-left"
            :style="label_style$"
        >
            {{ label }}
        </text>
        <sd-icon
            custom-class="sd-radio__icon"
            :size="iconSize"
            :color="checked$ ? active_color$ : undefined"
            :name="checked$ ? `${ shape }-check-fill` : shape"
        />
        <text
            v-if="iconPosition === 'left'"
            class="sd-radio__label"
            :style="label_style$"
        >
            {{ label }}
        </text>
    </label>
</template>
