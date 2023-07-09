<script lang="ts">
import { defineComponent, inject } from 'vue'
import { radio_group_props } from './radio-group'
import { useProvide } from '../common/hooks'
import { MpMixin } from '../common/mixins'
import {
    RADIO_GROUP_KEY,
    FORM_ITEM_KEY, type FormItemProvide,
} from '../common/tokens'

export default defineComponent({
    ...MpMixin,

    name : 'SdRadioGroup',
    props: radio_group_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    setup(props, { emit }) {
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)

        useProvide(RADIO_GROUP_KEY)({ props, onChange })

        function onChange(value: string | number | boolean) {
            emit('update:modelValue', value)
            emit('change', value)
            form_item?.validate('change')
        }

        return {}
    },
})
</script>

<template>
    <view
        class="sd-radio-group"
        :class="[customClass, { [`sd-radio-group--${ direction }`]: !!direction }]"
        :style="customStyle"
    >
        <slot v-if="$slots.default" />
        <template v-else>
            <template v-for="(opt, index) in options" :key="index">
                <sd-radio v-bind="opt" :name="opt.value" />
            </template>
        </template>
    </view>
</template>
