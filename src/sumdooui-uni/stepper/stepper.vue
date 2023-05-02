<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, reactive, toRefs, computed, watch, inject } from 'vue'
import { MpMixin         } from '../common/mixins'
import { FORM_KEY, type FormProvide } from '../common/tokens'
import { stepper_props   } from './stepper'
import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdStepper',
    props: stepper_props,
    emits: [
        'update:modelValue',
        'minus',
        'plus',
        'click-input',
        'change',
    ],
    setup(props, { emit }) {
        const form = inject<FormProvide>(FORM_KEY)

        const state = reactive({
            current_value: props.modelValue || 0,
        })

        watch(() => state.current_value, (value) => {
            emit('update:modelValue', value)
            emit('change', value)
        })

        watch(() => props.modelValue, (value) => {
            state.current_value = value
        })

        const step$ = computed(() => props.step || 1)

        const disabled_minus$ = computed(() => {
            if (!Utils.isNullOrUnDef(props.min) && state.current_value - step$.value < props.min) {
                return true
            } else {
                return props.disabledMinus || props.disabled || form?.props.disabled
            }
        })

        const disabled_plus$ = computed(() => {
            if (!Utils.isNullOrUnDef(props.max) && state.current_value + step$.value > props.max) {
                return true
            } else {
                return props.disabledPlus || props.disabled || form?.props.disabled
            }
        })

        const button_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.buttonSize) {
                style.width = Utils.toUnit(props.buttonSize)
                style.height = Utils.toUnit(props.buttonSize)
            }
            return style
        })

        const input_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.inputWidth) style.width  = Utils.toUnit(props.inputWidth)
            if (props.buttonSize) style.height = Utils.toUnit(props.buttonSize)
            return style
        })

        init()
        function init() {
            if (!Utils.isNullOrUnDef(props.min) && state.current_value < props.min) {
                state.current_value = props.min
            }
        }

        function onPlus() {
            if (disabled_plus$.value) return
            if (!props.asyncChange) {
                state.current_value += (props.step || 1)
            }
            emit('plus')
        }

        function onMinus() {
            if (disabled_minus$.value) return
            if (!props.asyncChange) {
                state.current_value -= (props.step || 1)
            }
            emit('minus')
        }

        function onClickInput() {
            if (props.disabledInput) return
            emit('click-input')
        }

        return {
            ...toRefs(state),
            disabled_minus$,
            disabled_plus$,
            button_style$,
            input_style$,
            onPlus,
            onMinus,
            onClickInput,
        }
    },
})
</script>

<template>
    <view class="sd-stepper" :class="customClass" :style="customStyle">
        <view
            v-if="showMinus"
            class="sd-stepper__minus"
            :class="{ 'is-disabled': disabled_minus$ }"
            :style="button_style$"
            @tap="onMinus"
        />
        <view
            class="sd-stepper__input"
            :class="{ 'is-disabled': disabledInput || disabled }"
            :style="input_style$"
            @tap="onClickInput"
        >
            {{ current_value }}
        </view>
        <view
            v-if="showPlus"
            class="sd-stepper__plus"
            :class="{ 'is-disabled': disabled_plus$ }"
            :style="button_style$"
            @tap="onPlus"
        />
    </view>
</template>

