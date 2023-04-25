<script lang="ts">
import { defineComponent, reactive, computed, inject, watch } from 'vue'
import { textarea_props } from './textarea'
import { FORM_ITEM_KEY, type FormItemProvide } from '../common/tokens'

import Utils from '../utils'
export default defineComponent({
    name : 'SdTextarea',
    props: textarea_props,
    emits: [
        'update:modelValue',
        'change',
        'focus',
        'blur',
        'confirm',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)

        const state = reactive({
            focus: false,
        })

        const textarea_style$ = computed(() => {
            return { height: Utils.toUnit(props.height) }
        })

        function onInput(e: any) {
            const value = e.detail.value
            emit('update:modelValue', value)
            emit('change', value)
        }

        function onFocus(e: any) {
            if (props.disabled || props.readonly) return
            state.focus = true
            emit('focus', e)
        }

        function onBlur(e: any) {
            if (props.disabled || props.readonly) return
            state.focus = false
            emit('blur', e)
            form_item?.validate('blur')
        }

        function onConfirm(e: any) {
            emit('confirm', e.detail.value)
        }

        watch(() => props.modelValue, () => {
            form_item?.validate('change')
        })

        return {
            state,
            textarea_style$,
            onInput,
            onFocus,
            onBlur,
            onConfirm,
        }
    },
})
</script>

<template>
    <view
        class="sd-textarea"
        :class="{
            'sd-textarea--border': border,
            'is-disabled'        : disabled,
            'is-focus'           : !disabled && !readonly && state.focus,
        }"
        :style="{ background }"
    >
        <textarea
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled || readonly"
            :maxlength="maxlength"
            :auto-height="autoHeight"
            :focus="focus"
            :auto-focus="autoFocus"
            :cursor-spacing="cursorSpacing"
            :style="textarea_style$"
            :confirm-type="confirmType"
            placeholder-class="sd-textarea__placeholder"
            class="sd-textarea__content"
            disable-default-padding
            adjust-position
            :show-confirm-bar="false"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @confirm="onConfirm"
        />

        <view v-if="showWordLimit" class="sd-textarea__limit">
            {{ modelValue.length }}/{{ maxlength }}
        </view>
    </view>
</template>
