<script lang="ts">
import { computed, defineComponent, onMounted, reactive, nextTick, getCurrentInstance, onUnmounted, watch } from 'vue'
import { virtual_props } from './virtual-list'

export default defineComponent({
    name : 'SdVirtualList',
    props: virtual_props,
    emits: [
        'scroll',
    ],
    setup: (props, ctx) => {
        const instance = getCurrentInstance()
        let scroll_timer: ReturnType<typeof setTimeout>

        const state = reactive({
            to_scroll_top: 0, // 跳转的位置
            scroll_top   : 0, // 当前滚动的位置
            total_height : 0,
            item_height  : props.itemHeight || 80,
            visible_count: 0, // 可显示的数量
            start_index  : 0, // 起始索引
            start_offset : 0, // 偏移量
        })

        const visible_data$ = computed(() => {
            return props.list.slice(state.start_index, state.start_index + state.visible_count)
        })

        // 监听列表数据变化
        watch(
            () => props.list,
            () => {
                calcListHeight()
                nextTick(() => calcVisibleRange())
            },
            { deep: true, immediate: true },
        )

        // 监听容器高度变化
        watch(
            () => props.containerHeight,
            () => {
                nextTick(() => calcVisibleRange())
            },
        )

        // 计算列表高度
        function calcListHeight() {
            state.total_height = props.list.length * props.itemHeight
        }

        // 计算显示范围
        function calcVisibleRange() {
            if (!props.list.length) return

            // 获取滚动容器可视高度
            uni.createSelectorQuery()
                .in(instance)
                .select('.sd-virtual-list')
                .boundingClientRect((rect) => {
                    if (!rect) return
                    const viewportHeight = (rect as UniApp.NodeInfo).height || 0

                    // 计算可视区域能显示的项数（加预加载数）
                    const itemHeight = typeof props.itemHeight === 'number' ? props.itemHeight : 80
                    state.visible_count = Math.ceil(viewportHeight / itemHeight) + props.preLoad

                    // 计算起始索引
                    const currentTop = state.scroll_top
                    let currentIndex = 0

                    // 固定高度：直接计算索引
                    currentIndex = Math.floor(currentTop / props.itemHeight)

                    // 边界处理
                    currentIndex = Math.max(0, Math.min(currentIndex, props.list.length - state.visible_count))
                    state.start_index = currentIndex

                    // 计算偏移量（滚动到当前项的顶部距离）
                    state.start_offset = 0
                    for (let i = 0; i < state.start_index; i++) {
                        state.start_offset += props.itemHeight
                    }
                })
                .exec()
        }

        // 跳转指定索引
        function scrollToIndex(index: number) {
            if (index < 0 || index >= props.list.length) return

            // 计算目标位置的滚动距离
            let targetTop = 0
            for (let i = 0; i < index; i++) {
                targetTop += props.itemHeight
            }

            state.to_scroll_top = targetTop
            nextTick(() => calcVisibleRange())
        }

        // 滚动事件处理
        function onScroll(e: any) {
            state.scroll_top = e.detail.scrollTop
            ctx.emit('scroll', e.detail)

            // 防抖计算可视区域 (避免滚动频繁计算)
            scroll_timer && clearTimeout(scroll_timer)
            scroll_timer = setTimeout(() => {
                calcVisibleRange()
            }, 16) // 约 60fps , 减少性能消耗
        }

        function handleTouchStop() {
            nextTick(() => calcVisibleRange())
        }

        // 生命周期：挂载时初始化
        onMounted(() => {
            nextTick(() => {
                calcListHeight()
                calcVisibleRange()
            })
        })

        // 生命周期：卸载时清除定时器
        onUnmounted(() => {
            if (scroll_timer) clearTimeout(scroll_timer)
        })

        ctx.expose({
            scrollToIndex, // 跳转指定索引
            calcVisibleRange, // 手动重新计算可视区域
        })

        return {
            state,
            visible_data$,
            onScroll,
            handleTouchStop,
        }
    },
})
</script>

<template>
    <view
        class="sd-virtual-list"
        :style="{ height: containerHeight }"
    >
        <scroll-view
            scroll-y
            :style="{ height: '100%' }"
            :scroll-top="state.to_scroll_top"
            @scroll="onScroll"
        >
            <!-- 占位高度 -->
            <view :style="{ height: `${ state.total_height }px`, position: 'relative' }">
                <view
                    :style="{
                        position : 'absolute',
                        left     : 0,
                        transform: `translate3d(0, ${ state.start_offset }px, 0)`,
                        width    : '100%',
                    }"
                >
                    <template
                        v-for="(item, index) in visible_data$"
                        :key="index"
                    >
                        <slot :item="item" :index="state.start_index + index" />
                    </template>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
