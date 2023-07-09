<script lang="ts">
import type { CSSProperties } from 'vue'
import type { CheckboxGroupProvide, FormItemProvide, FormProvide } from '../common/tokens'

import { defineComponent, computed, inject           } from 'vue'
import { CHECKBOX_GROUP_KEY, FORM_ITEM_KEY, FORM_KEY } from '../common/tokens'
import { MpMixin                                     } from '../common/mixins'
import { checkbox_props                              } from './checkbox'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdCheckbox',
    props: checkbox_props,
    emits: [
        'update:modelValue',
        'change',
    ],
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

        // 是否禁用
        const disabled$ = computed(() => {
            return form?.props.disabled || checkbox_group?.props.disabled || props.disabled || is_limit_disabled$.value
        })

        // 标题尺寸
        const label_size$ = computed(() => {
            return props.labelSize || checkbox_group?.props.labelSize
        })

        // 单选框位置
        const icon_position$ = computed(() => {
            return props.iconPosition || checkbox_group?.props.iconPosition || 'left'
        })

        // 单选框位置
        const icon_size$ = computed(() => {
            return props.iconSize || checkbox_group?.props.iconSize
        })

        // 未选中的颜色
        const inactive_color$ = computed(() => {
            return props.inactiveColor || checkbox_group?.props.inactiveColor
        })

        // 选中颜色
        const active_color$ = computed(() => {
            return props.activeColor || checkbox_group?.props.activeColor
        })

        // 未选中的图标
        const inactive_icon$ = computed(() => {
            return props.inactiveIcon || checkbox_group?.props.inactiveIcon
        })

        // 选中的图标
        const active_icon$ = computed(() => {
            return props.activeIcon || checkbox_group?.props.activeIcon
        })

        const label_style$ = computed(() => {
            const styles: CSSProperties = {}
            if (label_size$.value                    ) styles.fontSize = Utils.toUnit(label_size$.value)
            if (checked$.value && active_color$.value) styles.color    = active_color$.value
            return styles
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
            checked$,
            disabled$,
            icon_position$,
            icon_size$,
            inactive_color$,
            active_color$,
            inactive_icon$,
            active_icon$,
            label_style$,
            handleToggle,
        }
    },
})
</script>

<template>
    <label
        class="sd-checkbox"
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
        <checkbox :value="checked$" :disabled="disabled$" class="sd-checkbox__original" />

        <text
            v-if="icon_position$ === 'right'"
            class="sd-checkbox__label sd-checkbox__label-left"
            :style="label_style$"
        >
            {{ label }}
        </text>
        <sd-icon
            custom-class="sd-checkbox__icon"
            :size="icon_size$"
            :color="checked$ ? active_color$ : inactive_color$"
            :name="checked$ ? (active_icon$ || `check-square-fill`) : (inactive_icon$ || 'square')"
        />
        <text
            v-if="icon_position$ === 'left'"
            class="sd-checkbox__label sd-checkbox__label-right"
            :style="label_style$"
        >
            {{ label }}
        </text>
    </label>
</template>
