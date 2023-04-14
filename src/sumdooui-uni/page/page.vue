<script lang="ts">
import { defineComponent, reactive, computed, getCurrentInstance } from 'vue'
import { page_props } from './page'

export default defineComponent({
    name : 'SdPage',
    props: page_props,
    emits: [
        'click-back',
        'click-home',
    ],
    setup(props, { emit }) {
        // 应用基础信息
        const app_base_info = uni.getAppBaseInfo()
        const pages = getCurrentPages()
        const instance = getCurrentInstance()

        // 页面标题
        const page_title$ = computed(() => {
            return props.title || app_base_info?.appName || ''
        })

        const state = reactive({
            first_page: pages.length === 1,
        })

        const show_home_button$ = computed(() => {
            return props.showHomeButton && state.first_page
        })

        const show_back_button$ = computed(() => {
            return props.showBackButton && !state.first_page
        })

        // 处理返回
        function onClickNavbarLeft(e: Event) {
            if (show_back_button$.value) {
                if (typeof props.onClickBack === 'function') {
                    props.onClickBack(e)
                } else {
                    if (props.autoRoute) {
                        uni.navigateBack({ delta: props.delta || 1 })
                    } else {
                        emit('click-back')
                    }
                }
            } else if (show_home_button$.value) {
                if (typeof props.onClickHome === 'function') {
                    props.onClickHome(e)
                } else {
                    if (props.autoRoute && instance) {
                        const home_path = instance.appContext.config.globalProperties?.$sd?.home_path
                        home_path && uni.reLaunch({ url: home_path })
                    } else {
                        emit('click-home')
                    }
                }
            }
        }

        return {
            page_title$,
            show_home_button$,
            show_back_button$,
            onClickNavbarLeft,
        }
    },
})
</script>

<template>
    <view
        class="sd-page"
        :class="[{ 'is-lock-scroll': lockScroll }, customClass]"
        :style="{ ...customStyle, background }"
    >
        <!-- 页面导航 -->
        <view v-if="showNavbar" class="sd-page__navbar">
            <sd-navbar
                :title="page_title$"
                v-bind="{ ...navbarProps }"
                :left-icon="show_home_button$ ? 'home' : (show_back_button$ ? 'left' : undefined)"
                safe-area-insert-top
                fixed
                placholder
                @click-left="onClickNavbarLeft"
            />
        </view>

        <!-- 页面顶部 -->
        <view v-if="$slots.header" class="sd-page__header">
            <slot name="header" />
        </view>

        <!-- 页面内容 -->
        <view class="sd-page__content">
            <slot />
        </view>
    </view>
</template>

<style lang="scss">
@use './page.scss';
</style>
