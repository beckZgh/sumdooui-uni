<script lang="ts">
import { defineComponent, computed } from 'vue'
import { checkbox_props } from './checkbox'
import { useInject } from '../common/hooks'
import { CHECKBOX_GROUP_KEY, type CheckboxGroupProvide } from '../common/tokens'

export default defineComponent({
    name : 'SdCheckbox',
    props: checkbox_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const { parent } = useInject<CheckboxGroupProvide>(CHECKBOX_GROUP_KEY)

        const checked$ = computed<string | boolean | number>({
            get() {
                // checkbox-group
                if (parent) {
                    return parent.props.modelValue.includes(props.activeValue)
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
            if (parent && parent.props.max && parent.props.modelValue.length >= parent.props.max) {
                if (!checked$.value) return true
            }
            return false
        })

        const disabled$ = computed(() => {
            return (
                parent
                    ? parent?.props.disabled || props.disabled || is_limit_disabled$.value
                    : props.disabled
            ) ?? false
        })

        function handleToggle() {
            if (disabled$.value || props.readonly) return

            if (parent) {
                parent.onChange(!checked$.value, props.activeValue)
                return
            }

            if (!checked$.value) {
                checked$.value = props.activeValue
            } else {
                checked$.value = props.inactiveValue
            }

            emit('change', checked$.value)
        }

        return {
            checked$,
            disabled$,
            handleToggle,
        }
    },
})
</script>

<template>
    <label
        class="sd-checkbox"
        :class="{
            [`sd-checkbox--${ type }`]: !!type,
            'is-checked'              : checked$,
            'is-disabled'             : disabled$,
        }"
        :style="{
            color: checked$ ? activeColor : inactiveColor,
        }"
        @tap="handleToggle"
    >
        <checkbox :value="checked$" :disabled="disabled$" class="sd-checkbox__original" />

        <view v-if="type === 'card'" class="sd-checkbox__card">
            <view class="sd-checkbox__label">{{ label }}</view>
            <view v-if="desc" class="sd-checkbox__desc">{{ desc }}</view>

            <view v-show="checked$" class="sd-checkbox__card-check">
                <sd-icon name="check" />
            </view>
        </view>

        <!-- 默认类型 -->
        <template v-if="!type">
            <text v-if="iconPosition === 'right'" class="sd-checkbox__text sd-checkbox__text-left">{{ label }}</text>
            <sd-icon size="46rpx" :name="checked$ ? 'square-check-fill' : 'square'" />
            <text v-if="iconPosition === 'left'" class="sd-checkbox__text sd-checkbox__text-right">{{ label }}</text>
        </template>
    </label>
</template>
