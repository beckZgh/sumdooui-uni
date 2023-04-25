<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed, inject } from 'vue'
import { checkbox_props } from './checkbox'
import {
    CHECKBOX_GROUP_KEY, type CheckboxGroupProvide,
    FORM_ITEM_KEY, type FormItemProvide,
    FORM_KEY, type FormProvide,
} from '../common/tokens'

export default defineComponent({
    name : 'SdCheckbox',
    props: checkbox_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const checkbox_group = inject<CheckboxGroupProvide>(CHECKBOX_GROUP_KEY)
        const form_item      = inject<FormItemProvide>(FORM_ITEM_KEY)
        const form           = inject<FormProvide>(FORM_KEY)

        const checked$ = computed<string | boolean | number>({
            get() {
                if (checkbox_group) {
                    return checkbox_group.props.modelValue.includes(props.activeValue)
                } else {
                    if (props.modelValue !== null && props.modelValue !== undefined) {
                        return props.modelValue === props.activeValue
                    } else {
                        return !!props.modelValue
                    }
                }
            },
            set(value) {
                emit('update:modelValue', value)
            },
        })

        /** 超出最多选择，未选中的禁用 */
        const is_limit_disabled$ = computed(() => {
            if (checkbox_group) {
                const { max, modelValue } = checkbox_group.props
                if (max && modelValue.length >= max && !checked$.value) return true
            }
            return false
        })

        const disabled$ = computed(() => {
            const disabled = props.disabled || form?.props.disabled
            return (
                checkbox_group
                    ? checkbox_group?.props.disabled || disabled || is_limit_disabled$.value
                    : disabled
            ) ?? false
        })

        const root_style$ = computed(() => {
            const style: CSSProperties = {}
            if (checkbox_group?.props.column && checkbox_group?.props.column > 1) {
                style.width     = `${ 100 / checkbox_group.props.column }%`
                style.flexBasis = style.width
            }
            return style
        })

        const active_color$ = computed(() => checkbox_group?.props.activeColor)

        const label_style$ = computed(() => {
            const style: CSSProperties = {}
            if (active_color$.value) {
                style.color = checked$.value ? active_color$.value : undefined
            }
            return style
        })

        function handleToggle() {
            if (disabled$.value) return

            if (checkbox_group) {
                checkbox_group.onChange(!checked$.value, props.activeValue)
                return
            }

            if (!checked$.value) {
                checked$.value = props.activeValue
            } else {
                checked$.value = props.inactiveValue
            }

            form_item?.validate('change')
            emit('change', checked$.value)
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
        class="sd-checkbox"
        :class="{
            [`sd-checkbox--${ size }`]: true,
            'is-checked'              : checked$,
            'is-disabled'             : disabled$,
        }"
        :style="root_style$"
        @tap="handleToggle"
    >
        <checkbox :value="checked$" :disabled="disabled$" class="sd-checkbox__original" />

        <text
            v-if="iconPosition === 'right'"
            class="sd-checkbox__label sd-checkbox__label-left"
            :style="label_style$"
        >
            {{ label }}
        </text>
        <sd-icon
            custom-class="sd-checkbox__icon"
            :size="iconSize"
            :color="checked$ ? active_color$ : undefined"
            :name="checked$ ? `${ shape }-check-fill` : shape"
        />
        <text
            v-if="iconPosition === 'left'"
            class="sd-checkbox__label sd-checkbox__label-right"
            :style="label_style$"
        >
            {{ label }}
        </text>
    </label>
</template>
