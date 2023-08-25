<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { tabbar_item_props                 } from './tabbar-item'
import { MpMixin                           } from '../common/mixins'
import { TABBLE_KEY, type TabbarProvide    } from '../common/tokens'

export default defineComponent({
    ...MpMixin,

    name : 'SdTabbarItem',
    props: tabbar_item_props,
    emits: ['click'],
    setup(props, { emit }) {
        const tabbar = inject<TabbarProvide>(TABBLE_KEY)

        const text$ = computed(() => tabbar?.props.text)

        const is_active$ = computed(() => {
            return tabbar?.props.modelValue === props.name
        })

        const color$ = computed(() => {
            const { activeColor, inactiveColor } = tabbar?.props || {}
            return is_active$.value ? activeColor : inactiveColor
        })

        const icon$ = computed(() => {
            return is_active$.value ? (props.activeIcon || props.icon) : props.icon
        })

        const image$ = computed(() => {
            return is_active$.value ? props.activeImage : props.image
        })

        function onClick(e: Event) {
            tabbar?.onChange(props)
            emit('click', e)
        }

        return {
            is_active$,
            text$,
            color$,
            icon$,
            image$,
            onClick,
        }
    },
})
</script>

<template>
    <view
        class="sd-tabbar__item"
        :class="[customClass, { 'is-active': is_active$, 'only-text': text$ }]"
        :style="{ ...customStyle, color: color$ }"
        @tap="onClick"
    >
        <slot v-if="$slots.default" />
        <template v-else>
            <!-- 显示徽标 -->
            <sd-badge v-if="dot || badge" :dot="dot" :content="badge" v-bind="badgeProps">
                <sd-image
                    v-if="image$"
                    width="56rpx"
                    height="56rpx"
                    :src="image$"
                    :show-loading="false"
                    :show-error="false"
                />
                <sd-icon v-else-if="icon$" :name="icon$" />
            </sd-badge>

            <!-- 无徽标模式 -->
            <template v-else>
                <sd-image
                    v-if="image$"
                    width="56rpx"
                    height="56rpx"
                    :src="image$"
                    :show-loading="false"
                    :show-error="false"
                />
                <sd-icon v-else-if="icon$" :name="icon$" />
            </template>

            <!-- 文本 -->
            <text v-if="text" class="sd-tabbar__item-text">
                {{ text }}
            </text>
        </template>
    </view>
</template>
