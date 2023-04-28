<script lang="ts">
import { defineComponent, provide      } from 'vue'
import { tabbar_props, type TabbarItem } from './tabbar'
import { MpMixin                       } from '../common/mixins'
import { TABBLE_KEY                    } from '../common/tokens'

export default defineComponent({
    ...MpMixin,

    name : 'SdTabbar',
    props: tabbar_props,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        // 注入
        provide(TABBLE_KEY, { props, onChange })

        async function onChange(item: TabbarItem) {
            if (item.name === undefined || item.name === null) return

            const params = { ...item }
            if (typeof props.beforeChange === 'function') {
                const result = await props.beforeChange(params)
                if ( !result ) return
            }

            emit('update:modelValue', params.name)
            emit('change', params.name, params)
        }

        return { onChange }
    },
})
</script>

<template>
    <view class="sd-tabbar-box">
        <view
            class="sd-tabbar"
            :class="[
                customClass,
                {
                    'is-fixed'         : fixed,
                    'sd-tabbar--border': showTopBorder,
                    'sd-tabbar--round' : round,
                },
            ]"
            :style="{ ...customStyle, 'z-index': zIndex ? zIndex : undefined }"
        >
            <slot v-if="$slots.default" />
            <template v-else>
                <template v-for="(item, index) in items" :key="index">
                    <sd-tabbar-item v-bind="item" :name="index" />
                </template>
            </template>
        </view>

        <!-- 固定底部定位时的占位元素 -->
        <view v-if="fixed && placeholder" class="sd-tabbar__placeholder" />
    </view>
</template>
