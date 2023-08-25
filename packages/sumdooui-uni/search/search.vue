<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { MpMixin } from '../common/mixins'
import { search_props } from './search'

export default defineComponent({
    ...MpMixin,

    name : 'SdSearch',
    props: search_props,
    emits: [
        'update:modelValue',
        'blur',
        'focus',
        'change',
        'confirm',
        'clear',
        'click-action',
        'click-input',
    ],
    setup(props, { emit }) {
        const internal_value = ref(props.modelValue || '')

        watch(() => props.modelValue, (value) => {
            internal_value.value = value
        })

        watch(internal_value, (value) => {
            emit('update:modelValue', value)
            emit('change', value)
        })

        function onClear() {
            internal_value.value = ''
            emit('update:modelValue', '')
            emit('change', '')
            emit('clear')
        }

        return {
            internal_value,
            onClear,
        }
    },
})
</script>

<template>
    <view
        class="sd-search"
        :class="[customClass, { [`sd-search--${ shape }`]: shape, 'has-action': $slots.action || actionText }]"
        :style="{ ...customStyle, background }"
    >
        <sd-input
            v-model="internal_value"
            custom-class="sd-search__input"
            :focus="focus"
            :readonly="readonly"
            :disabled="disabled"
            :placeholder="placeholder"
            :placeholder-style="placeholderStyle"
            :maxlength="maxlength"
            :input-align="inputAlign"
            :border="false"
            :prefix-icon="prefixIcon"
            :suffix-icon="suffixIcon"
            :clearable="clearable"
            confirm-type="search"
            @blur="$emit('blur', $event)"
            @focus="$emit('focus', $event)"
            @clear="onClear"
            @confirm="$emit('confirm', $event)"
            @tap="$emit('click-input')"
        >
            <template #prefix>
                <slot v-if="$slots.prefix" name="prefix" />
            </template>

            <template #suffix>
                <slot v-if="$slots.suffix" name="suffix" />
            </template>
        </sd-input>

        <view v-if="$slots.action || actionText" class="sd-search__action" @tap="$emit('click-action')">
            <slot v-if="$slots.action" name="action" />
            <text v-else>
                {{ actionText }}
            </text>
        </view>
    </view>
</template>

