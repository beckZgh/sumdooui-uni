<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, reactive, computed, toRefs, watch, nextTick } from 'vue'
import { useSelectoryQuery } from '../common/hooks'
import { MpMixin } from '../common/mixins'
import { tabs_props, type TabsItem } from './tabs'

import Utils from '../utils'
export default defineComponent({
    ...MpMixin,

    name : 'SdTabs',
    props: tabs_props,
    emits: [
        'update:modelValue',
        'change',
    ],
    setup(props, { emit }) {
        const state = reactive({
            items           : [] as (TabsItem & { name: string | number })[],
            current_idx     : 0,
            current_name    : props.modelValue,
            scroll_left     : 0,
            line_offset_left: '',
        })

        watch(() => state.current_idx, (index) => {
            const item = state.items[index]
            emit('update:modelValue', item.name, item)
            emit('change', item.name, item)
        })

        const header_style$ = computed(() => {
            const style: CSSProperties = {}
            if (props.height    ) style.height = Utils.toUnit(props.height)
            if (props.background) style.background = props.background
            return style
        })

        const line_style$ = computed(() => {
            const style: CSSProperties = { transitionDuration: `${ props.duration }s` }
            if (props.lineWidth  ) style.width = Utils.toUnit(props.lineWidth)
            if (props.lineHeight ) style.height = Utils.toUnit(props.lineHeight)
            if (props.activeColor) style.backgroundColor = props.activeColor
            return style
        })

        init()
        function init() {
            const items = props.items.map((item, index) => {
                if (Utils.isString(item)) {
                    return { title: item, name: index }
                } else {
                    return { ...item, name: item.name || index }
                }
            })

            const current_idx  = Math.max(items.findIndex(item => item.name === props.modelValue), 0)
            const current_name = (items[current_idx]?.name || items[0]?.name) ?? ''

            state.items        = items
            state.current_idx  = current_idx
            state.current_name = current_name

            nextTick(() => {
                loadNodeInfo().then(() => {
                    transformLine(current_idx)
                })
            })
        }

        async function handleSwitchTab(index: number) {
            const tab = state.items[index]
            if ( !tab || tab.disabled) return

            // 更改前校验
            if (Utils.isFunction(props.beforeChange)) {
                const res = await props.beforeChange(tab.name, tab)
                if ( !res ) return
            }

            state.current_idx  = index
            state.current_name = tab.name

            nextTick(() => {
                transformLine(index)
            })
        }

        const { queryNodeWidth, queryNodeInfos } = useSelectoryQuery()

        let tabs_width = 0
        let line_width = 0
        let tab_rects  = [] as UniApp.NodeInfo[]
        function loadNodeInfo() {
            return Promise.all([
                queryNodeWidth('.sd-tabs'),
                queryNodeWidth('.sd-tabs__line'),
                queryNodeInfos('.sd-tabs__item'),
            ]).then((res) => {
                tabs_width = res[0]
                line_width = res[1]
                tab_rects  = res[2]
            })
        }

        function transformLine(index: number) {
            const rect = tab_rects[index]
            if ( !rect || !tabs_width ) return

            state.scroll_left      = !props.scrollable ? 0 : rect.left! - (tabs_width - rect.width!) / 2
            state.line_offset_left = `${ rect.left! + (rect.width! / 2) - (line_width / 2) }px`
        }

        function onSwiperChange(e: any) {
            if (e.detail.source === 'touch') {
                const index = e.target.current || e.detail.current
                handleSwitchTab(index)
            }
        }

        return {
            ...toRefs(state),
            header_style$,
            line_style$,
            handleSwitchTab,
            onSwiperChange,
        }
    },
})
</script>

<template>
    <view class="sd-tabs" :class="customStyle" :style="customStyle">
        <sd-sticky :disabled="!sticky" :offset-top="offsetTop">
            <scroll-view
                scroll-with-animation
                class="sd-tabs__header"
                :style="header_style$"
                :show-scrollbar="false"
                :scroll-x="scrollable"
                :scroll-left="scroll_left"
            >
                <view class="sd-tabs__items" :class="{ 'is-scrollable': scrollable }">
                    <template v-for="(tab, index) in items" :key="tab.name">
                        <view
                            class="sd-tabs__item"
                            :class="{ 'is-active': tab.name === current_name, 'is-disabled': tab.disabled }"
                            :style="{ color: tab.name === current_name ? activeColor : color }"
                            @tap="handleSwitchTab(index)"
                        >
                            <template v-if="tab.dot || tab.badge">
                                <sd-badge :offset="['-6rpx', '-10rpx']" v-bind="tab.badgeProps" :dot="tab.dot" :content="tab.badge">
                                    <view class="sd-tabs__item-text">
                                        {{ tab.title }}
                                    </view>
                                </sd-badge>
                            </template>

                            <view v-else class="sd-tabs__item-text">
                                {{ tab.title }}
                            </view>
                        </view>
                    </template>
                    <view
                        class="sd-tabs__line"
                        :style="{
                            ...line_style$,
                            transform: `translateX(${ line_offset_left })`,
                        }"
                    />
                </view>
            </scroll-view>
        </sd-sticky>
    </view>
</template>
