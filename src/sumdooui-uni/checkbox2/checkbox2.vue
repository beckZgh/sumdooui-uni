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

        // 是否选中
        const checked$ = computed(() => {
            if (checkboxGroup) {
                return checkboxGroup?.isChecked(props.activeValue)          // 多选框组模式
            } else {
                const { modelValue, activeValue, defaultChecked } = props // 单个使用模式
                if (modelValue !== null && modelValue !== undefined) {
                    return modelValue === activeValue
                } else {
                    return modelValue ?? !!defaultChecked
                }
            }
        })

        const shape$ = computed(() => checkboxGroup?.props.shape ?? props.shape) // 形状单独默认 Group 优先级更高，便于统一显示

        // 选中图标自定义
        const checked_icon$ = computed(() => props.activeIcon ?? checkboxGroup?.props.activeIcon)

        // 多选框图标颜色
        const checked_color$ = computed(() => props.activeColor ?? checkboxGroup?.props.activeColor)

        // 图标位置
        const icon_pos$ = computed(() => props.iconPosition ?? checkboxGroup?.props.iconPosition ?? 'left')

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
                ?? form?.props?.disabled
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

            ctx.emit('update:modelValue', value)
            ctx.emit('change', value)

            formItem?.validate('change')
        }

        return {
            checked$,
            shape$,
            checked_icon$,
            checked_color$,
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
                [`sd-checkbox2--${ shape$ }`]: !!shape$,
                'sd-checkbox2--block'        : !!block,
                'sd-checkbox2--reverse'      : icon_pos$ === 'right',
                'is-checked'                 : checked$,
                'is-disabled'                : disabled$,
                'is-readonly'                : readonly$,
            },
        ]"
        @tap="handleToggle"
    >
        <sd-icon
            v-if="checked$ && checked_icon$"
            :name="checked_icon$"
            :color="checked_color$"
            custom-class="sd-checkbox2__icon-custom"
        />

        <view
            v-else-if="['square', 'circle'].includes(shape$)"
            :class="`sd-checkbox2__icon sd-checkbox2__icon--${ shape$ }`"
            :style="{ background: checked_color$ }"
        >
            <sd-icon name="check" />
        </view>

        <view class="sd-checkbox2__label">
            <slot>
                {{ label  }}
            </slot>

            <sd-icon
                v-if="shape$ === 'button-check'"
                custom-class="sd-checkbox2__icon-button-check"
                name="check"
            />
        </view>
    </view>
</template>
