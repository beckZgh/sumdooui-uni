<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, ref, computed } from 'vue'
import { navbar_props } from './navbar'

export default defineComponent({
    name : 'SdNavbar',
    props: navbar_props,
    emits: [
        'click-left',
        'click-right',
    ],
    setup(props) {
        const status_height = ref(20)

        // 导航栏样式
        const navbar_styles$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }
            if (props.background) styles.backgroundColor = props.background
            if (props.color) styles.color = props.color
            return styles
        })

        // 初始化状态栏高度
        initStatusHeight()
        function initStatusHeight() {
            uni.getSystemInfo({
                success(res) {
                    if (res.statusBarHeight) {
                        status_height.value = res.statusBarHeight
                    }
                },
            })
        }

        return {
            status_height,
            navbar_styles$,
        }
    },
})
</script>

<template>
    <view
        class="sd-navbar-box"
        :style="{ '--sd-navbar-padding-top': `${ status_height }px` }"
    >
        <!-- 固定定位时，占位区域 -->
        <view v-if="fixed && placholder" class="sd-navbar-placeholder" />

        <!-- 内容区域 -->
        <view
            id="navbar"
            ref="navbar_ref"
            class="sd-navbar"
            :class="{
                [`is-fixed`]   : fixed,
                [`is-safe-top`]: safeAreaInsertTop,
            }"
            :style="navbar_styles$"
        >
            <view v-if="leftArrow || leftIcon || $slots.left" class="sd-navbar__left" @tap="$emit('click-left', $event)">
                <sd-icon v-if="leftArrow || leftIcon" :name="leftArrow ? 'left' : leftIcon" />
                <text v-if="leftText">
                    {{ leftText }}
                </text>
                <slot name="left" />
            </view>
            <view class="sd-navbar__center">
                <slot v-if="$slots.title" name="title" />
                <text class="sd-navbar__center-title" :style="titleStyle">
                    {{ title }}
                </text>
            </view>
            <view class="sd-navbar__right" @tap="$emit('click-right', $event)">
                <slot name="right" />
                <text v-if="rightText">
                    {{ rightText }}
                </text>
                <sd-icon v-if="rightIcon" :name="rightIcon" />
            </view>
        </view>
    </view>
</template>
