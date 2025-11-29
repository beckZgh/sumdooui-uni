<script lang="ts">
import { defineComponent, computed } from 'vue'
import { checkbox_group2_props } from './checkbox-group2'
import { MpMixin               } from '../common/mixins'
import { useProvide            } from '../common/hooks'
import { checkboxGroupKey      } from './token'

export default defineComponent({
    ...MpMixin,

    name : 'SdCheckboxGroup2',
    props: checkbox_group2_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    setup(props, ctx) {
        // 绑定值
        const model_value$ = computed({
            get() {
                return Array.isArray(props.modelValue) ? props.modelValue : []
            },
            set(values) {
                ctx.emit('update:modelValue', values)
            },
        })

        // 更新值
        const updateValue = (checked: boolean, value: string | number | boolean) => {
            if (checked) {
                if (props.max && model_value$.value.length >= props.max) return
                model_value$.value.push(value)
            } else {
                model_value$.value.splice(model_value$.value.indexOf(value), 1)
            }

            ctx.emit('change', [...model_value$.value])
        }

        // 检查是否已勾选
        const isChecked = (value: any) => {
            return model_value$.value.includes(value)
        }

        useProvide(checkboxGroupKey)({ props, updateValue, isChecked })
    },
})
</script>

<template>
    <view
        class="sd-checkbox-group2"
        :class="[customClass, {
            'sd-checkbox-group2--divider': divider,
            'is-multi-column'            : column > 1,
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
            <sd-checkbox2
                :label="item[keys?.label || 'label']"
                :active-value="item[keys?.value || 'value']"
                :disabled="item[keys?.disabled || 'disabled']"
                :custom-style="item.style"
                v-bind="item.props"
            />
        </template>
    </view>
</template>
