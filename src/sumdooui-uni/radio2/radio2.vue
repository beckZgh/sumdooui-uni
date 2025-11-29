<script lang="ts">
/**
 * SdCheckbox2 多选框
 * v25.11.24
 *
 * -webkit-line-clamp：处理字体可显示行数，参考如下
 * https://tdesign.tencent.com/miniprogram/components/radio?tab=api
 */

import type { FormItemProvide , FormProvide } from '../common/tokens'

import { defineComponent, computed  } from 'vue'
import { MpMixin                    } from '../common/mixins'
import { useInject                  } from '../common/hooks'
import { FORM_KEY, FORM_ITEM_KEY    } from '../common/tokens'
import { radio_props                } from './radio2'
import { radioGroupKey              } from '../radio-group2/token'

export default defineComponent({
    ...MpMixin,

    name : 'SdRadio2',
    props: radio_props,
    emits: ['update:modelValue', 'change'],
    setup(props, ctx) {
        const radioGroup = useInject(radioGroupKey)?.parent               // sd-radio-group 组件
        const formItem   = useInject<FormItemProvide>(FORM_ITEM_KEY)?.parent // sd-form-item 组件
        const form       = useInject<FormProvide>(FORM_KEY)?.parent          // sd-form 组件

        // 是否选中
        const checked$ = computed({
            get: () => {
                if (radioGroup) {
                    return props.name ? radioGroup?.props.modelValue === props.name : false  // Group 模式必须声明 name
                } else {
                    return props.modelValue ?? props.defaultChecked ?? false
                }
            },
            set: (val: string | number | boolean) => {
                ctx.emit('update:modelValue', val)
            },
        })

        const shape$ = computed(() => radioGroup?.props.shape ?? props.shape) // 形状单独默认 Group 优先级更高，便于统一显示

        const block$ = computed(() => props.block ?? radioGroup?.props.block)

        // 选中图标自定义
        const checked_icon$ = computed(() => props.activeIcon ?? radioGroup?.props.activeIcon)

        // 多选框图标颜色
        const checked_color$ = computed(() => props.activeColor ?? radioGroup?.props.activeColor)

        // 图标位置
        const icon_pos$ = computed(() => props.iconPosition ?? radioGroup?.props.iconPosition ?? 'left')

        // 允许取消选中
        const allowUncheck$ = computed(() => {
            return props.allowUncheck
                ?? radioGroup?.props.allowUncheck
                ?? false
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
            shape$,
            block$,
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
        class="sd-radio2"
        :class="[
            customClass,
            {
                [`sd-radio2--${ shape$ }`]: !!shape$,
                'sd-radio2--block'        : !!block$,
                'sd-radio2--reverse'      : icon_pos$ === 'right',
                'is-checked'              : checked$,
                'is-disabled'             : disabled$,
                'is-readonly'             : readonly$,
            },
        ]"
        @tap="handleToggle"
    >
        <sd-icon
            v-if="checked$ && checked_icon$"
            :name="checked_icon$"
            :color="checked_color$"
            custom-class="sd-radio2__icon-custom"
        />

        <view
            v-else-if="['square', 'circle'].includes(shape$)"
            :class="`sd-radio2__icon sd-radio2__icon--${ shape$ }`"
        >
            <sd-icon
                name="check"
                :custom-style="{ background: checked$ ? checked_color$ : undefined }"
            />
        </view>

        <view class="sd-radio2__label">
            <slot>
                {{ label  }}
            </slot>

            <sd-icon
                v-if="shape$ === 'button-check'"
                custom-class="sd-radio2__icon-button-check"
                name="check"
            />
        </view>
    </view>
</template>
