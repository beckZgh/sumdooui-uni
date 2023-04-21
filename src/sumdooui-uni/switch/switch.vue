<script lang="ts">
import { defineComponent, ref } from 'vue'
import { switch_props } from './switch'
export default defineComponent({
    name : 'SdSwitch',
    props: switch_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const checked = ref(props.modelValue === props.activeValue)

        function handleToggle() {
            checked.value = !checked.value
            emit('update:modelValue', checked.value ? props.inactiveValue : props.activeValue)
            emit('change', checked.value)
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
