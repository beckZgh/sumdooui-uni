<script lang="ts">
import { defineComponent   } from 'vue'
import { radio_group_props } from './radio-group2'
import { MpMixin           } from '../common/mixins'
import { useProvide        } from '../common/hooks'
import { radioGroupKey     } from './token'

export default defineComponent({
    ...MpMixin,

    name : 'SdRadioGroup2',
    props: radio_group_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    setup(props, ctx) {
        // 更新值
        const updateValue = (value: string | number | boolean) => {
            ctx.emit('update:modelValue', value)
            ctx.emit('change', value)
        }

        // 检查是否已勾选
        const isChecked = (value: any) => {
            return props.modelValue === value
        }

        useProvide(radioGroupKey)({ props, updateValue, isChecked })
    },
})
</script>

<template>
    <view
        class="sd-radio-group2"
        :class="[customClass, {
            'sd-radio-group2--divider': divider,
            'is-multi-column'         : column > 1,
        }]"
        :style="{
            '--width': column > 1 ? `calc((100% - ${ column - 1 } * 24rpx) / ${ column })` : undefined,
            ...customStyle,
        }"
    >
        <slot />
        <template
            v-for="(item, idx) in options"
            :key="idx"
        >
            <sd-radio2
                :label="item[keys?.label || 'label']"
                :name="item[keys?.value || 'value']"
                :disabled="item[keys?.disabled || 'disabled']"
                :custom-style="item.style"
                v-bind="item.props"
            />
        </template>
    </view>
</template>
