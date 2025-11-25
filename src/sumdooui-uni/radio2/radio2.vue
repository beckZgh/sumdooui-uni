<script lang="ts">
/**
 * SdRadio2 单选框
 * v25.11.24
 */

import type { FormItemProvide , FormProvide } from '../common/tokens'

import { defineComponent, computed } from 'vue'
import { MpMixin                   } from '../common/mixins'
import { useInject                 } from '../common/hooks'
import { FORM_KEY, FORM_ITEM_KEY   } from '../common/tokens'
import { radio2_props              } from './radio2'
import { radioGroupKey             } from '../radio-group2/token'

export default defineComponent({
    ...MpMixin,

    name : 'SdRadio2',
    props: radio2_props,
    emits: ['update:modelValue', 'change'],
    setup(props, ctx) {
        const radioGroup = useInject(radioGroupKey)?.parent                   // sd-radio-group 组件
        const formItem   = useInject<FormItemProvide>(FORM_ITEM_KEY)?.parent  // sd-form-item 组件
        const form       = useInject<FormProvide>(FORM_KEY)?.parent           // sd-form 组件

        const checked$ = computed({
            get: () => {
                if (radioGroup) {
                    return props.name && radioGroup?.props.modelValue === props.name  // Group 模式必须声明 name
                } else {
                    return props.modelValue ?? props.defaultChecked ?? false
                }
            },
            set: (val: string | number | boolean) => {
                ctx.emit('update:modelValue', val)
            },
        })

        // 多选框图标
        const icon$ = computed(() => {
            if (props.border) return 'check' // 边框模式，不支持自定义

            return checked$.value
                ? (props.activeIcon   || radioGroup?.props.activeIcon   || 'check-circle-fill')
                : (props.inactiveIcon || radioGroup?.props.inactiveIcon || 'circle')
        })

        // 多选框图标颜色
        const icon_color$ = computed(() => {
            if (props.border) return '#fff' // 边框模式，不支持自定义

            return checked$.value
                ? props.activeColor   || radioGroup?.props.activeColor
                : props.inactiveColor || radioGroup?.props.inactiveColor
        })

        // 图标位置
        const icon_pos$ = computed(() => {
            return props.iconPosition ?? radioGroup?.props.iconPosition ?? 'left'
        })

        // 显示分割线
        const divider$ = computed(() => {
            return props.divider ?? radioGroup?.props.divider ?? false
        })

        // 禁用
        const disabled$ = computed(() => {
            return props.disabled
                ?? radioGroup?.props.disabled
                ?? form?.props.disabled
                ?? false
        })

        // 只读模式
        const readonly$ = computed(() => {
            return props.readonly
                ?? radioGroup?.props.readonly
                ?? form?.props.readonly
                ?? false
        })

        // 允许取消选中
        const allowUncheck$ = computed(() => {
            return props.allowUncheck
                ?? radioGroup?.props.allowUncheck
                ?? false
        })

        function handleToggle() {
            // 禁用、只读状态不处理
            if (disabled$.value || readonly$.value) return

            // 不允许取消选中
            if (checked$.value && !allowUncheck$.value) return

            const checked = !checked$.value

            // 结合 radioGroup 使用
            if (radioGroup) {
                radioGroup.updateValue(props.name ?? checked)
                return
            }

            ctx.emit('update:modelValue', checked)
            ctx.emit('change', checked)

            formItem?.validate('change')
        }

        return {
            checked$,
            icon$,
            icon_color$,
            icon_pos$,
            divider$,
            disabled$,
            readonly$,
            handleToggle,
        }
    },
})
</script>

<template>
    <view
        class="sd-radio2"
        :class="[
            customClass,
            {
                'sd-radio2--border'    : border,
                'sd-checkbox2--divider': divider$,
                'sd-radio2--reverse'   : icon_pos$ === 'right',
                'is-checked'           : checked$,
                'is-disabled'          : disabled$,
                'is-readonly'          : readonly$,
            },
        ]"
        :styke="customStyle"
        @tap="handleToggle"
    >
        <sd-icon :name="icon$" :color="icon_color$" custom-class="sd-radio2__icon" />

        <view class="sd-radio2__content">
            <view class="sd-radio2__content-label">
                <template v-if="label">{{ label }}</template>
                <slot />
                <slot name="label" />
            </view>
            <view v-if="content || $slots.content" class="sd-radio2__content-desc">
                <template v-if="content">{{ content }}</template>
                <slot name="content" />
            </view>
        </view>
    </view>
</template>
