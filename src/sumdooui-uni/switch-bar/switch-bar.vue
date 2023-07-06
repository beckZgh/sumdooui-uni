<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, ref, computed } from 'vue'
import { switch_props                   } from './switch-bar'
import { MpMixin                        } from '../common/mixins'
import { useSelectoryQuery              } from '../common/hooks'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdSwitchBar',
    props: switch_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const { queryNodeWidth } = useSelectoryQuery(false)
        const current_index = ref(props.modelValue) // 当前激活项
        const item_width    = ref(0)                // 当前项宽度

        const wrap_style$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }
            if (props.width    ) styles.width      = Utils.toUnit(props.width)
            if (props.height   ) styles.height     = Utils.toUnit(props.height)
            if (props.backgrond) {
                styles.background  = props.backgrond
                styles.borderColor = props.backgrond
            }
            return styles
        })

        init()
        async function init() {
            item_width.value = await queryNodeWidth('.sd-switch-bar__item')
        }

        function onClick(index: number) {
            current_index.value = index
            emit('update:modelValue', index)
            emit('change', index)
        }

        return {
            current_index,
            item_width,
            wrap_style$,
            onClick,
        }
    },
})
</script>

<template>
    <view
        class="sd-switch-bar"
        :class="[customClass, { 'sd-switch-bar--round': round }]"
        :style="wrap_style$"
    >
        <view class="sd-switch-bar__items">
            <template v-for="(name, index) in items" :key="index">
                <view
                    class="sd-switch-bar__item"
                    :class="{ 'is-active': current_index === index }"
                    :style="{ color: current_index === index ? activeColor : color }"
                    @tap="onClick(index)"
                >
                    {{ name }}
                </view>
            </template>
        </view>
        <view
            class="sd-switch-bar__focus"
            :style="{
                width    : `${ item_width }px`,
                transform: `translateX(${ current_index * item_width }px)`,
            }"
        />
    </view>
</template>
