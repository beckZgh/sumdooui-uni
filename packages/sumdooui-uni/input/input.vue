<script lang="ts">
import type { FormProvide, FormItemProvide } from '../common/tokens'

import { defineComponent, ref, computed, watch, inject } from 'vue'
import { FORM_KEY, FORM_ITEM_KEY                       } from '../common/tokens'
import { MpMixin                                       } from '../common/mixins'
import { input_props                                   } from './input'

export default defineComponent({
    ...MpMixin,

    name : 'SdInput',
    props: input_props,
    emits: [
        'update:modelValue',
        'change',
        'focus',
        'blur',
        'clear',
        'confirm',
        'click',
    ],
    setup(props, { emit }) {
        const form_item      = inject<FormItemProvide>(FORM_ITEM_KEY)
        const form           = inject<FormProvide>(FORM_KEY)
        const internal_focus = ref(false)
        const show_password  = ref(false)

        // 是否禁用状态
        const disabled$ = computed(() => props.disabled || form?.props.disabled || false)
        // 是否只读状态
        const readonly$ = computed(() => props.readonly || form?.props.readonly || false)

        watch(() => props.modelValue, () => {
            form_item?.validate('change')
        })

        watch(() => props.focus, (value) => {
            internal_focus.value = value
        })

        // 显示、隐藏密码
        function handleTogglePassword() {
            if (props.type !== 'password') return
            show_password.value = !show_password.value
        }

        // 一键清空
        function handleClear(e: Event) {
            emit('clear', e)
            emit('update:modelValue', '')
        }

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
            internal_focus.value = true
            emit('focus', e)
        }

        function onBlur(e: any) {
            if (disabled$.value || readonly$.value) return
            internal_focus.value = false
            emit('blur', e)

            form_item?.validate('blur')
        }

        function onClick(e: any) {
            if (disabled$.value || readonly$.value) return
            emit('click', e)
        }

        return {
            internal_focus,
            show_password,
            disabled$,
            readonly$,
            handleTogglePassword,
            handleClear,
            onInput,
            onFocus,
            onBlur,
            onConfirm,
            onClick,
            // -------------------------
            focus: onFocus,
            blur : onBlur,
            clear: handleClear,
        }
    },
})
</script>

<template>
    <view
        class="sd-input"
        :class="[
            customClass,
            {
                [`sd-input--${ border }-border`]: border && border !== 'none',
                'is-disabled'                   : disabled$,
                'is-focus'                      : !disabled$ && !readonly$ && internal_focus,
            },
        ]"
        :style="customStyle"
        @tap.stop="onClick"
    >
        <!-- 前置图标 -->
        <sd-icon
            v-if="prefixIcon"
            :name="prefixIcon"
            custom-class="sd-input__prefix-icon"
            v-bind="prefixIconProps"
        />

        <!-- 前置插槽 -->
        <view v-if="$slots.prefix" class="sd-input__prefix">
            <slot name="prefix" />
        </view>

        <!-- 录入控件 -->
        <input
            class="sd-input__content"
            placeholder-class="sd-input__placeholder"
            :style="[inputStyle || '', inputAlign ? `text-align: ${ inputAlign }` : '']"
            :placeholder="placeholder"
            :placeholder-style="placeholderStyle"
            :value="modelValue"
            :type="type !== 'password' ? type : 'text'"
            :password="type === 'password' && !show_password"
            :disabled="type === 'select' || disabled$ || readonly$"
            :maxlength="maxlength"
            :auto-height="autoHeight"
            :focus="internal_focus"
            :auto-focus="autoFocus"
            :cursor-spacing="cursorSpacing"
            :confirm-type="confirmType"
            :show-confirm-bar="false"
            :hold-keyboard="holdKeyboard"
            disable-default-padding
            adjust-position
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @confirm="onConfirm"
        >
        <!-- 后置插槽 -->
        <view v-if="$slots.suffix" class="sd-input__suffix">
            <slot name="suffix" />
        </view>

        <!-- 后置图标 -->
        <sd-icon
            v-if="suffixIcon"
            :name="suffixIcon"
            custom-class="sd-input__suffix-icon"
            v-bind="suffixIconProps"
        />

        <!-- 字数显示 -->
        <span v-if="maxlength && showWordLimit && type === 'text'" class="sd-input__limit">
            {{ modelValue.length }}/{{ maxlength }}
        </span>

        <!-- 显示、隐藏密码框 -->
        <sd-icon
            v-if="type === 'password' && showPassword && modelValue.length"
            :name="show_password ? 'eye' : 'no-eye'"
            custom-class="sd-input__password-icon"
            @click="handleTogglePassword"
        />

        <!-- 一键清空 -->
        <sd-icon
            v-if="clearable && modelValue.length"
            name="close-circle"
            custom-class="sd-input__clear-icon"
            @click="handleClear"
        />

        <!-- 作为选择模式图标标识 -->
        <sd-icon
            v-if="type === 'select'"
            name="caret-down"
            :custom-class="{
                'sd-input__select-icon': true,
                'is-open'              : selectOpen,
            }"
        />
    </view>
</template>
