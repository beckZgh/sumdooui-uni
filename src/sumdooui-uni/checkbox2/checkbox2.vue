<script lang="ts">
/**
 * SdCheckbox2 多选框
 * v25.11.24
 *
 * -webkit-line-clamp：处理字体可显示行数，参考如下
 * https://tdesign.tencent.com/miniprogram/components/checkbox?tab=api
 */

import type { FormItemProvide , FormProvide } from '../common/tokens'

import { defineComponent, computed } from 'vue'
import { MpMixin                   } from '../common/mixins'
import { useInject                 } from '../common/hooks'
import { FORM_KEY, FORM_ITEM_KEY } from '../common/tokens'
import { checkbox2_props           } from './checkbox2'
import { checkboxGroupKey          } from '../checkbox-group2/token'

export default defineComponent({
    ...MpMixin,

    name : 'SdCheckbox2',
    props: checkbox2_props,
    emits: ['update:modelValue', 'change'],
    setup(props, ctx) {
        const checkboxGroup = useInject(checkboxGroupKey)?.parent               // sd-checkbox-group 组件
        const formItem      = useInject<FormItemProvide>(FORM_ITEM_KEY)?.parent // sd-form-item 组件
        const form          = useInject<FormProvide>(FORM_KEY)?.parent          // sd-form 组件

        const checked$ = computed({
            get: () => {
                if (checkboxGroup) {
                    return checkboxGroup?.isChecked(props.activeValue)          // 多选框组模式
                } else {
                    const { modelValue, activeValue, defaultChecked } = props // 单个使用模式
                    if (modelValue !== null && modelValue !== undefined) {
                        return modelValue === activeValue
                    } else {
                        return modelValue ?? defaultChecked
                    }
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
                ? (props.activeIcon   || checkboxGroup?.props.activeIcon   || 'check-square-fill')
                : (props.inactiveIcon || checkboxGroup?.props.inactiveIcon || 'square')
        })

        // 多选框图标颜色
        const icon_color$ = computed(() => {
            if (props.border) return '#fff' // 边框模式，不支持自定义

            return checked$.value
                ? props.activeColor   || checkboxGroup?.props.activeColor
                : props.inactiveColor || checkboxGroup?.props.inactiveColor
        })

        // 图标位置
        const icon_pos$ = computed(() => {
            return props.iconPosition ?? checkboxGroup?.props.iconPosition ?? 'left'
        })

        // 超出可添加的数量限制，剩余未选中需要禁用
        const is_limit$ = computed(() => {
            if (checkboxGroup) {
                const { max, modelValue } = checkboxGroup.props
                if (max && Array.isArray(modelValue) && modelValue.length >= max && !checked$.value) return true
            }
            return undefined
        })

        // 禁用
        const disabled$ = computed(() => {
            return props.disabled
                ?? checkboxGroup?.props.disabled
                ?? is_limit$.value
                ?? form?.props
                ?? false
        })

        // 只读模式
        const readonly$ = computed(() => {
            return props.readonly
                ?? checkboxGroup?.props.readonly
                ?? form?.props.readonly
                ?? false
        })

        function handleToggle() {
            // 禁用、只读状态不处理
            if (disabled$.value || readonly$.value) return

            const checked = !checked$.value

            // 结合 checkboxGroup 使用
            if (checkboxGroup) {
                checkboxGroup.updateValue(checked, props.activeValue)
                return
            }

            // 单个控件使用赋值
            const value = checked ? props.activeValue : props.inactiveValue

            checked$.value = value

            ctx.emit('update:modelValue', value)
            ctx.emit('change', value)

            formItem?.validate('change')
        }

        return {
            checked$,
            icon$,
            icon_color$,
            icon_pos$,
            disabled$,
            readonly$,
            handleToggle,
        }
    },
})
</script>

<template>
    <view
        class="sd-checkbox2"
        :class="[
            customClass,
            {
                'sd-checkbox2--border' : border,
                'sd-checkbox2--reverse': icon_pos$ === 'right',
                'is-checked'           : checked$,
                'is-disabled'          : disabled$,
                'is-readonly'          : readonly$,
            },
        ]"
        :style="customStyle"
        @tap="handleToggle"
    >
        <sd-icon :name="icon$" :color="icon_color$" custom-class="sd-checkbox2__icon" />

        <view class="sd-checkbox2__content">
            <view class="sd-checkbox2__content-label">
                <template v-if="label">{{ label }}</template>
                <slot />
                <slot name="label" />
            </view>
            <view v-if="content || $slots.content" class="sd-checkbox2__content-desc">
                <template v-if="content">{{ content }}</template>
                <slot name="content" />
            </view>
        </view>
    </view>
</template>
