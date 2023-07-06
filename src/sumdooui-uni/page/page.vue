<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, ref, computed, onMounted, provide } from 'vue'
import { page_props } from './page'
import { useSelectoryQuery } from '../common/hooks'
import { PAGE_KEY   } from '../common/tokens'
import { MpMixin    } from '../common/mixins'

export default defineComponent({
    ...MpMixin,

    name : 'SdPage',
    props: page_props,
    emits: [
        'mounted',
        'click-error-button',
    ],
    setup(props, { emit }) {
        const app_base_info = uni.getAppBaseInfo()  // 应用基础信息
        const pages         = getCurrentPages()     // 所有页面实例
        const first_page    = pages.length === 1

        // 页面标题
        const page_title$ = computed(() => props.title || app_base_info?.appName || '')

        // 显示返回首页按钮
        const show_home_button$ = computed(() => props.showHome && first_page)

        // 显示返回上一级按钮
        const show_back_button$ = computed(() => props.showBack && !first_page)

        // 页面样式
        const page_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.background     ) style.backgroundColor = props.background
            if (props.backgroundImage) style.backgroundImage = `url(${ props.backgroundImage })`
            return style
        })

        // 查询当前 navbar 高度
        const { instance, queryNodeHeight } = useSelectoryQuery(false)
        const header_height = ref(0)
        onMounted(init)
        async function init() {
            if (props.showHeader) {
                header_height.value = await queryNodeHeight('#page_header')
            }
            emit('mounted', {
                header_height: header_height.value,
                first_page,
            })
        }

        // 取得页面顶部区域高度
        function getPageHeaderHeight() {
            return header_height.value
        }

        // 判断当前页面是否为首次加载
        function isFristPage() {
            return first_page
        }

        // 处理返回
        function onClickNavbarLeft() {
            // 处理回到首页
            if (first_page && props.showHome) {
                const home_path = instance?.appContext.config.globalProperties?.$sd?.home_path
                home_path && uni.reLaunch({ url: home_path })
                return
            }

            if (typeof props.onClickBack === 'function') {
                props.onClickBack()
            } else {
                uni.navigateBack({ delta: 1 })
            }
        }

        provide(PAGE_KEY, { instance, props, getPageHeaderHeight, isFristPage })

        return {
            header_height,
            page_title$,
            page_style$,
            show_home_button$,
            show_back_button$,
            onClickNavbarLeft,
            getPageHeaderHeight,
            isFristPage,
        }
    },
})
</script>

<template>
    <view
        class="sd-page"
        :class="[{ 'lock-scroll': lockScroll, 'has-bg-img': backgroundImage }]"
        :style="page_style$"
    >
        <!-- 页面顶部区域 -->
        <div v-if="showHeader && header_height" :style="{ height: `${ header_height }px` }" />
        <view
            v-if="showHeader"
            id="page_header"
            class="sd-page__header"
            :class="[headerClass, { 'sd-page__header--fixed': header_height }]"
            :style="headerStyle"
        >
            <sd-navbar
                :title="page_title$"
                :left-icon="show_home_button$ ? 'home' : (show_back_button$ ? 'left' : undefined)"
                :border="false"
                v-bind="navbarProps"
                @click-left="onClickNavbarLeft"
            />
            <view class="sd-page__header-extra">
                <slot name="header-extra" />
            </view>
        </view>

        <!-- 页面内容区域 -->
        <view
            class="sd-page__body"
            :class="[{ 'is-visible': loading === 0 }, bodyClass]"
            :style="bodyStyle"
        >
            <slot />
            <view v-if="safeAreaInsetBottom" class="sd-page-safe-area-bottom" />
        </view>

        <!-- 页面底部区域 -->
        <view v-show="loading === 0" class="sd-page__footer" :class="footerClass" :style="footerStyle">
            <slot name="footer" />
            <view v-if="safeAreaInsetBottom" class="sd-page-safe-area-bottom" />
        </view>

        <!-- 页面加载中过渡 -->
        <view v-if="loading === 1" class="sd-page__loading-wrap">
            <sd-loading type="line" scene="page" :text="loadingText" v-bind="loadingProps" />
        </view>

        <!-- 页面错误信息显示 -->
        <view v-if="loading === -1" class="sd-page__error-wrap">
            <sd-empty :text="error" v-bind="emptyProps">
                <template #extra>
                    <sd-button
                        icon="replay"
                        type="primary"
                        round
                        width="320rpx"
                        @click="$emit('click-error-button')"
                    >
                        {{ errorButtonText }}
                    </sd-button>
                </template>
            </sd-empty>
        </view>
    </view>
</template>
