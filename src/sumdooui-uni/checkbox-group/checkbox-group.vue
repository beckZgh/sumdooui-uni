<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { checkbox_group_props } from './checkbox-group'
import { useProvide } from '../common/hooks'
import { CHECKBOX_GROUP_KEY, FORM_ITEM_KEY, type FormItemProvide } from '../common/tokens'

export default defineComponent({
    name : 'SdCheckboxGroup',
    props: checkbox_group_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)

        const values$ = computed({
            get() {
                return Array.isArray(props.modelValue) ? props.modelValue : []
            },
            set(values) {
                emit('update:modelValue', values)
            },
        })

        useProvide(CHECKBOX_GROUP_KEY)({ props, onChange })

        function onChange(checked: boolean, value: string | number | boolean) {
            if (checked) {
                if (props.max && values$.value.length >= props.max) return
                values$.value.push(value)
            } else {
                values$.value.splice(values$.value.indexOf(value), 1)
            }

            emit('change', [...values$.value])
            form_item?.validate('change')
        }

        return {
            values$,
        }
    },
})
</script>

<template>
    <view class="sd-checkbox-group" :class="{ 'is-wrap': wrap, 'is-multi-column': column > 1 }">
        <slot v-if="$slots.default" />
        <template v-else>
            <template v-for="(opt, index) in options" :key="index">
                <sd-checkbox v-bind="opt" :active-value="opt.value" />
            </template>
        </template>
    </view>
</template>
