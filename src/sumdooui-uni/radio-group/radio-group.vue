<script lang="ts">
import { defineComponent   } from 'vue'
import { radio_group_props } from './radio-group'
import { useProvide        } from '../common/hooks'
import { RADIO_GROUP_KEY   } from '../common/tokens'

export default defineComponent({
    name : 'SdRadioGroup',
    props: radio_group_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        useProvide(RADIO_GROUP_KEY)({ props, onChange })

        function onChange(value: string | number | boolean) {
            emit('update:modelValue', value)
            emit('change', value)
        }

        return {}
    },
})
</script>

<template>
    <view class="sd-radio-group" :class="{ 'is-wrap': wrap }">
        <slot v-if="$slots.default" />
        <template v-else>
            <template v-for="(opt, index) in options" :key="index">
                <sd-radio
                    :label="opt.label"
                    :type="type"
                    :name="opt.value"
                    :icon-position="iconPosition"
                    :align="align"
                />
            </template>
        </template>
    </view>
</template>
