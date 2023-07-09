<script lang="ts">
import type { CSSProperties } from 'vue'
import type { FormItemProvide, FormProvide, RadioGroupProvide } from '../common/tokens'

import { defineComponent, computed, inject        } from 'vue'
import { RADIO_GROUP_KEY, FORM_ITEM_KEY, FORM_KEY } from '../common/tokens'

import { MpMixin     } from '../common/mixins'
import { radio_props } from './radio'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdRadio',
    props: radio_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    setup(props, { emit }) {
        const radio_group = inject<RadioGroupProvide>(RADIO_GROUP_KEY)
        const form_item   = inject<FormItemProvide>(FORM_ITEM_KEY)
        const form        = inject<FormProvide>(FORM_KEY)

        // 是否选中
        const checked$ = computed<string | boolean | number>({
            get() {
                if (radio_group) {
                    return props.name !== undefined ? (radio_group.props.modelValue === props.name) : !!radio_group.props.modelValue
                } else {
                    return props.name !== undefined ? (props.modelValue === props.name) : !!props.modelValue
                }
            },
            set(value) {
                emit('update:modelValue', value)
            },
        })

        // 是否禁用
        const disabled$ = computed(() => {
            return form?.props.disabled || radio_group?.props.disabled || props.disabled
        })

        // 标题尺寸
        const label_size$ = computed(() => {
            return props.labelSize || radio_group?.props.labelSize
        })

        // 单选框位置
        const icon_position$ = computed(() => {
            return props.iconPosition || radio_group?.props.iconPosition || 'left'
        })

        // 单选框位置
        const icon_size$ = computed(() => {
            return props.iconSize || radio_group?.props.iconSize
        })

        // 未选中的颜色
        const inactive_color$ = computed(() => {
            return props.inactiveColor || radio_group?.props.inactiveColor
        })

        // 选中颜色
        const active_color$ = computed(() => {
            return props.activeColor || radio_group?.props.activeColor
        })

        // 未选中的图标
        const inactive_icon$ = computed(() => {
            return props.inactiveIcon || radio_group?.props.inactiveIcon
        })

        // 选中的图标
        const active_icon$ = computed(() => {
            return props.activeIcon || radio_group?.props.activeIcon
        })

        const label_style$ = computed(() => {
            const style: CSSProperties = {}
            if (label_size$.value                    ) style.fontSize = Utils.toUnit(label_size$.value)
            if (checked$.value && active_color$.value) style.color    = active_color$.value
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
            label_style$,
            icon_position$,
            icon_size$,
            checked$,
            disabled$,
            inactive_color$,
            active_color$,
            inactive_icon$,
            active_icon$,
            handleToggle,
        }
    },
})
</script>

<template>
    <label
        class="sd-radio"
        :class="[
            customClass,
            {
                'is-checked' : checked$,
                'is-disabled': disabled$,
            },
        ]"
        :style="customStyle"
        @tap="handleToggle"
    >
        <!-- 原始组件 -->
        <radio :checked="checked$" :disabled="disabled$" class="sd-radio__original" />

        <text
            v-if="icon_position$ === 'right'"
            class="sd-radio__label sd-radio__label-left"
            :style="label_style$"
        >
            {{ label }}
        </text>
        <sd-icon
            custom-class="sd-radio__icon"
            :size="icon_size$"
            :color="checked$ ? active_color$ : inactive_color$"
            :name="checked$ ? (active_icon$ || `check-circle-fill`) : (inactive_icon$ || 'circle')"
        />
        <text
            v-if="icon_position$ === 'left'"
            class="sd-radio__label"
            :style="label_style$"
        >
            {{ label }}
        </text>
    </label>
</template>
