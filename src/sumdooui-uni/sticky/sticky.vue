<script lang="ts">
import { onPageScroll } from '@dcloudio/uni-app'
import { defineComponent, reactive, watch, nextTick, toRefs, inject } from 'vue'
import { sticky_props      } from './sticky'
import { useSelectoryQuery } from '../common/hooks'
import { PAGE_KEY, type PageProvide } from '../common/tokens'

export default defineComponent({
    name : 'SdSticky',
    props: sticky_props,
    setup(props) {
        // sd-page 组件（自定义顶部时可能会使用这个）
        const sd_page = inject<PageProvide>(PAGE_KEY)

        const {
            queryNodeInfo,
        } = useSelectoryQuery()

        const state = reactive({
            height         : 0 ,    // 吸顶元素的高度
            fixed_status   : false, // 吸附状态
            container_style: '',    // 容器的样式
            content_style  : '',    // 内容的样式
        })

        // 自定义则根据传入的 scrollTop 计算
        if (props.custom) {
            watch(() => props.scrollTop, onScroll)
        } else {
            // 默认使用页面滚动，Tips: 需要页面调用一次
            onPageScroll(() => { onScroll() })
        }

        // 监听滚动设置是否吸附
        function onScroll() {
            queryNodeInfo('.sd-sticky').then((rect) => {
                if (props.offsetTop >= (rect.top || 0)) {
                    throttle({ fixed_status: true, height: rect.height || 0 })
                } else {
                    throttle({ fixed_status: false })
                }
            })
        }

        function throttle(params: { fixed_status: boolean; height?: number }) {
            // 二次状态一致
            if (params.fixed_status === state.fixed_status) return

            nextTick(() => {
                let offsetTop = props.offsetTop
                // 补充自定义页面时，自定义 sd-page 组件的顶部导航高度
                if (sd_page && sd_page.props.showNavbar) {
                    offsetTop += sd_page.state.navbar_height
                }

                let container_style = ''
                let content_style = ''
                if (params.fixed_status) {
                    container_style += `height: ${ params.height }px`
                    content_style   += `position: fixed; top: ${ offsetTop }px; left: 0; right: 0; z-index: ${ props.zIndex }`
                }

                state.container_style = container_style
                state.content_style   = content_style
                state.fixed_status    = params.fixed_status
            })
        }

        return { ...toRefs(state) }
    },
})
</script>

<template>
    <view class="sd-sticky" :style="container_style">
        <view class="sd-sticky__bd" :style="content_style">
            <slot />
        </view>
    </view>
</template>

