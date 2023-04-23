<script lang="ts">
import { defineComponent, computed } from 'vue'
import { radio_props } from './radio'
import { useInject   } from '../common/hooks'
import { RADIO_GROUP_KEY, type RadioGroupProvide } from '../common/tokens'

export default defineComponent({
    name : 'SdRadio',
    props: radio_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const { parent } = useInject<RadioGroupProvide>(RADIO_GROUP_KEY)

        const checked$ = computed<string | boolean | number>({
            get() {
                // radio-group
                if (parent) {
                    return props.name ? (parent.props.modelValue === props.name) : parent.props.modelValue
                } else {
                    return props.name ? (props.modelValue === props.name) : props.modelValue
                }
            },
            set(value) {
                emit('update:modelValue', value)
            },
        })

        const disabled$ = computed(() => {
            return (
                parent
                    ? parent?.props.disabled || props.disabled
                    : props.disabled
            ) ?? false
        })

        function handleToggle() {
            if (disabled$.value) return

            if (parent) {
                parent.onChange(props.name ? props.name : props.modelValue)
            } else {
                emit('update:modelValue', props.name ? props.name : props.modelValue)
                emit('change')
            }
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
        class="sd-radio"
        :class="{
            [`sd-radio-${ type }`]: !!type,
            'is-checked'          : checked$,
            'is-disabled'         : disabled$,
        }"
        @tap="handleToggle"
    >
        <!-- 原始组件 -->
        <radio :checked="checked$" :disabled="disabled$" class="sd-radio__original" />

        <!-- 卡片类型 -->
        <template v-if="type === 'card'">
            <view class="sd-radio__label">{{ label }}</view>
            <view v-show="checked$" class="sd-radio-card__check">
                <sd-icon name="check" />
            </view>
        </template>

        <!-- 标签类型 -->
        <template v-else-if="type === 'tag'">
            <view class="sd-radio__label">{{ label }}</view>
        </template>

        <!-- 默认类型 -->
        <template v-else>
            <text
                v-if="iconPosition === 'right'"
                class="sd-radio__label sd-radio__label-left"
                :style="{ textAlign: align }"
            >{{ label }}</text>
            <sd-icon size="46rpx" :name="checked$ ? 'check-circle-fill' : 'circle'" />
            <text
                v-if="iconPosition === 'left'"
                class="sd-radio__label"
                :style="{ textAlign: align }"
            >{{ label }}</text>
        </template>
    </label>
</template>
