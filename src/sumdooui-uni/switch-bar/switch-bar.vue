<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { switch_props } from './switch-bar'
import { MpMixin } from '../common/mixins'

export default defineComponent({
    ...MpMixin,

    name : 'SdSwitchBar',
    props: switch_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        // 当前激活项
        const current_index = ref(props.modelValue)

        const items$ = computed(() => {
            return props.items.map((item) => {
                return typeof item === 'string' ? { name: item } : item
            })
        })

        function onClick(index: number) {
            current_index.value = index
            emit('update:modelValue', index)
            emit('change', index)
        }

        return {
            current_index,
            items$,
            onClick,
        }
    },
})
</script>

<template>
    <view
        class="sd-switch-bar"
        :class="{ 'sd-switch-bar--round': round }"
        :style="{ background: backgrond }"
    >
        <view class="sd-switch-bar__items">
            <template v-for="(item, index) in items$" :key="index">
                <view
                    class="sd-switch-bar__item"
                    :class="{
                        'is-active': current_index === index,
                    }"
                    :style="{
                        width: `${ itemWidth }rpx`,
                    }"
                    @tap="onClick(index)"
                >
                    {{ item.name }}
                </view>
            </template>
        </view>
        <view
            class="sd-switch-bar__focus"
            :style="{
                width    : `${ itemWidth }rpx`,
                transform: `translateX(${ current_index * itemWidth }rpx)`,
            }"
        />
    </view>
</template>
