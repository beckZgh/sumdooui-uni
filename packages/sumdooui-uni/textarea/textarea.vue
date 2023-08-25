<script lang="ts">
import type { CSSProperties } from 'vue'
import type { FormItemProvide, FormProvide } from '../common/tokens'

import { defineComponent, ref, computed, inject, watch } from 'vue'
import { FORM_ITEM_KEY, FORM_KEY } from '../common/tokens'
import { MpMixin                 } from '../common/mixins'
import { textarea_props          } from './textarea'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdTextarea',
    props: textarea_props,
    emits: [
        'update:modelValue',
        'change',
        'focus',
        'blur',
        'confirm',
    ],
    setup(props, { emit }) {
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)
        const form      = inject<FormProvide>(FORM_KEY)
        const focus     = ref(false)

        // 是否禁用状态
        const disabled$ = computed(() => props.disabled || form?.props.disabled || false)
        // 是否只读状态
        const readonly$ = computed(() => props.readonly || form?.props.readonly || false)

        const textarea_style$ = computed(() => {
            const styles: CSSProperties = {}
            if (props.height    ) styles.height = Utils.toUnit(props.height)
            if (props.inputAlign) styles.textAlign = props.inputAlign
            return styles
        })

        watch(() => props.modelValue, () => {
            form_item?.validate('change')
        })

        function onInput(e: any) {
            const value = e.detail.value
            emit('update:modelValue', value)
            emit('change', value)
        }

        function onConfirm(e: any) {
            emit('confirm', e.detail.value)
        }

        function onFocus(e: any) {
            if (disabled$.value || readonly$.value) return
            focus.value = true
            emit('focus', e)
        }

        function onBlur(e: any) {
            if (disabled$.value || readonly$.value) return
            focus.value = false
            emit('blur', e)
            form_item?.validate('blur')
        }

        return {
            disabled$,
            readonly$,
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
        :class="[
            customClass,
            {
                [`sd-textarea--${ border }-border`]: border && border !== 'none',
                'is-disabled'                      : disabled$,
                'is-focus'                         : !disabled$ && !readonly$ && focus,
            },
        ]"
        :style="customStyle"
    >
        <textarea
            class="sd-textarea__content"
            placeholder-class="sd-textarea__placeholder"
            :value="modelValue"
            :style="textarea_style$"
            :placeholder="placeholder"
            :placeholder-style="placeholderStyle"
            :disabled="disabled$ || readonly$"
            :maxlength="maxlength"
            :auto-height="autoHeight"
            :focus="focus"
            :auto-focus="autoFocus"
            :cursor-spacing="cursorSpacing"
            :confirm-type="confirmType"
            :show-confirm-bar="false"
            disable-default-padding
            adjust-position
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
