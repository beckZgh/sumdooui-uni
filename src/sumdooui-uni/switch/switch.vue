<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { switch_props } from './switch'
import { FORM_ITEM_KEY, type FormItemProvide } from '../common/tokens'

export default defineComponent({
    name : 'SdSwitch',
    props: switch_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const form_item = inject<FormItemProvide>(FORM_ITEM_KEY)

        const checked = ref(props.modelValue === props.activeValue)

        function handleToggle() {
            checked.value = !checked.value
            emit('update:modelValue', checked.value ? props.activeValue : props.inactiveValue)
            emit('change', checked.value)
            form_item?.validate('change')
        }

        return {
            checked,
            handleToggle,
        }
    },
})
</script>

<template>
    <view
        class="sd-switch"
        :class="{ 'is-checked': checked, 'is-disabled': disabled }"
        :style="{ background: checked ? activeColor : inactiveColor }"
        @tap="handleToggle"
    >
        <view class="sd-switch__inner" />
    </view>
</template>
