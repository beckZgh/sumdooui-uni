<script lang="ts">
import { defineComponent, reactive, computed, watch, inject } from 'vue'
import { FORM_KEY, FORM_ITEM_KEY, type FormProvide, type FormItemProvide } from '../common/tokens'
import { MpMixin } from '../common/mixins'
import { input_props } from './input'

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
    ],
    setup(props, { emit }) {
        const form      = inject<FormProvide>(FORM_KEY)
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)

        const state = reactive({
            focus        : false,
            show_password: false,
        })

        const show_border$ = computed(() => props.border)

        const disabled$ = computed(() => props.disabled || form?.props.disabled || false)

        // 显示、隐藏密码
        function handleTogglePassword() {
            if (props.type !== 'password') return
            state.show_password = !state.show_password
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

        watch(() => props.modelValue, () => {
            form_item?.validate('change')
        })

        function onConfirm(e: any) {
            emit('confirm', e.detail.value)
        }

        return {
            state,
            show_border$,
            disabled$,
            handleTogglePassword,
            handleClear,
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
        class="sd-input"
        :class="[
            customClass,
            {
                'sd-input--border': show_border$,
                'is-disabled'     : disabled$,
                'is-focus'        : !disabled$ && !readonly && state.focus,
            },
        ]"
        :style="{ ...customStyle, background }"
    >
        <view v-if="$slots.prefix" class="sd-input__prefix">
            <slot name="prefix" />
            <sd-icon v-if="prefixIcon" :name="prefixIcon" />
        </view>
        <input
            class="sd-input__content"
            placeholder-class="sd-input__placeholder"
            :style="inputAlign ? `text-align: ${ inputAlign }` : ''"
            :placeholder="placeholder"
            :value="modelValue"
            :type="type !== 'password' ? type : 'text'"
            :password="type === 'password' && !state.show_password"
            :disabled="disabled$ || readonly"
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
        >
        <view class="sd-input__suffix">
            <slot v-if="$slots.suffix" name="suffix" />

            <!-- 后置图标 -->
            <sd-icon v-if="suffixIcon" :name="suffixIcon" />

            <!-- 字数显示 -->
            <span v-if="maxlength && showWordLimit && type === 'text'" class="sd-input__limit">
                {{ modelValue.length }}/{{ maxlength }}
            </span>

            <!-- 显示、隐藏密码框 -->
            <sd-icon
                v-if="type === 'password' && showPassword && modelValue.length"
                :name="state.show_password ? 'eye' : 'no-eye'"
                @click="handleTogglePassword"
            />
            <!-- 一键清空 -->
            <sd-icon v-if="clearable && modelValue.length" name="close-circle" @click="handleClear" />
        </view>
    </view>
</template>
