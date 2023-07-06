<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, ref, computed } from 'vue'
import { MpMixin      } from '../common/mixins'
import { navbar_props } from './navbar'

export default defineComponent({
    ...MpMixin,

    name : 'SdNavbar',
    props: navbar_props,
    emits: [
        'click-left',
        'click-right',
    ],
    setup(props) {
        // 初始化状态栏高度
        const status_height = ref(20)
        const navbar_height = ref(0)
        const total_height  = ref(0)

        // 导航栏样式
        const navbar_styles$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }
            if (props.background   ) styles.backgroundColor = props.background
            if (props.color        ) styles.color           = props.color
            if (status_height.value) styles.paddingTop      = `${ status_height.value }px`
            return styles
        })

        init()
        function init() {
            const { statusBarHeight = 0 } = uni.getSystemInfoSync()
            const { top, height         } = uni.getMenuButtonBoundingClientRect()

            status_height.value = statusBarHeight
            navbar_height.value = height + ((top - statusBarHeight) * 2)
            total_height.value  = status_height.value + navbar_height.value
        }

        return {
            status_height,
            navbar_height,
            total_height,
            navbar_styles$,
        }
    },
})
</script>

<template>
    <!-- 固定定位时，占位区域 -->
    <view v-if="fixed && placeholder" :style="{ height: `${ total_height }px` }" />
    <!-- 内容区域 -->
    <view
        class="sd-navbar"
        :class="[customClass, { [`is-fixed`]: fixed }]"
        :style="navbar_styles$"
    >
        <view class="sd-navbar__content" :style="{ height: `${ navbar_height }px` }">
            <view v-if="leftArrow || leftIcon || $slots.left" class="sd-navbar__left" @tap="$emit('click-left', $event)">
                <slot v-if="$slots.left" name="left" />
                <template v-else>
                    <sd-icon v-if="leftArrow || leftIcon" :name="leftArrow ? 'left' : leftIcon" />
                    <text v-if="leftText">
                        {{ leftText }}
                    </text>
                </template>
            </view>
            <view class="sd-navbar__center">
                <slot v-if="$slots.title" name="title" />
                <text v-else class="sd-navbar__center-title" :style="titleStyle">
                    {{ title }}
                </text>
            </view>
            <view class="sd-navbar__right" @tap="$emit('click-right', $event)">
                <slot v-if="$slots.right" name="right" />
                <template v-else>
                    <text v-if="rightText">
                        {{ rightText }}
                    </text>
                    <sd-icon v-if="rightIcon" :name="rightIcon" />
                </template>
            </view>
        </view>
    </view>
</template>
