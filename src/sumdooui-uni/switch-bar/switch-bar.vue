<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { switch_props, type SwitchBarItem } from './switch-bar'

export default defineComponent({
    name   : 'SdSwitchBar',
    props  : switch_props,
    options: {
        virtualHost: true,
    },
    emits: ['change'],
    setup(props, { emit }) {
        // 当前激活项
        const internal_current = ref(props.current)

        const items$ = computed(() => {
            return props.items.map((item) => {
                return typeof item === 'string' ? { name: item } : item
            })
        })

        function onClick(item: SwitchBarItem, index: number) {
            internal_current.value = index
            emit('change', { ...item, index })
        }

        return {
            internal_current,
            items$,
            onClick,
        }
    },
})
</script>

<template>
    <view
        class="sd-switch-bar-box"
        :class="{ 'sd-switch-bar-box--round': round }"
        :style="{ background: backgrond }"
    >
        <view class="sd-switch-bar">
            <template v-for="(item, index) in items$" :key="index">
                <view
                    class="sd-switch-bar__item"
                    :class="{
                        'is-active': internal_current === index,
                    }"
                    :style="{
                        width: `${ itemWidth }rpx`,
                    }"
                    @tap="onClick(item, index)"
                >
                    {{ item.name }}
                </view>
            </template>
            <view
                class="sd-switch-bar__focus"
                :style="{
                    width    : `${ itemWidth }rpx`,
                    transform: `translateX(${ internal_current * itemWidth }rpx)`,
                }"
            />
        </view>
    </view>
</template>
