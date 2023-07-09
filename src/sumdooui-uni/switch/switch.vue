<script lang="ts">
import type { CSSProperties } from 'vue'
import type { FormItemProvide, FormProvide } from '../common/tokens'

import { defineComponent, ref, inject, computed, watch } from 'vue'
import { FORM_ITEM_KEY, FORM_KEY } from '../common/tokens'
import { MpMixin                 } from '../common/mixins'
import { switch_props            } from './switch'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdSwitch',
    props: switch_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)
        const form      = inject<FormProvide>(FORM_KEY)
        const checked   = ref(props.modelValue === props.activeValue)

        // 监听异步变更
        watch(() => props.modelValue, (value) => {
            checked.value = value === props.activeValue
        })

        const is_disabled$ = computed(() => {
            return props.disabled || form?.props.disabled
        })

        const root_styles$ = computed(() => {
            const styles: CSSProperties = {
                ...props.customStyle,
                background: checked.value ? props.activeColor : props.inactiveColor,
            }
            if (props.size) styles.width = `calc(${ Utils.toUnit(props.size) } * 2)`
            return styles
        })

        const inner_styles$ = computed(() => {
            const styles: CSSProperties = {}
            if (props.size) {
                styles.width  = Utils.toUnit(props.size)
                styles.height = Utils.toUnit(props.size)
            }
            return styles
        })

        async function handleToggle() {
            if (props.disabled) return

            const new_value = !checked.value
            if (typeof props.beforeChange === 'function') {
                const result = await props.beforeChange(new_value)
                if ( !result ) return
            }

            checked.value = new_value
            emit('update:modelValue', new_value ? props.activeValue : props.inactiveValue)
            emit('change', new_value)
            form_item?.validate('change')
        }

        return {
            checked,
            is_disabled$,
            root_styles$,
            inner_styles$,
            handleToggle,
        }
    },
})
</script>

<template>
    <view
        class="sd-switch"
        :class="[customClass, {
            [`sd-switch--${ type }`]: !!type,
            'is-checked'            : checked,
            'is-disabled'           : is_disabled$,
        }]"
        :style="root_styles$"
        @tap="handleToggle"
    >
        <view class="sd-switch__inner" :style="inner_styles$">
            <slot />
        </view>
    </view>
</template>
