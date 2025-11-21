<script lang="ts">
import { defineComponent, reactive, nextTick, toRefs, watch, onMounted, onUnmounted } from 'vue'
import { sticky_props      } from './sticky'
import { useSelectoryQuery } from '../common/hooks'
import { MpMixin           } from '../common/mixins'
import Utils from '../utils'

function onPageScroll(options: Page.PageScrollOption) {
    const page = Utils.getCurrentPage<{ SdPageScroller: any[] }>()
    page?.SdPageScroller.forEach((scroller: unknown) => {
        if (Utils.isFunction(scroller)) {
            scroller(options)
        }
    })
}

const ROOT_ELEMENT = '.sd-sticky'
export default defineComponent({
    ...MpMixin,

    name : 'SdSticky',
    props: sticky_props,
    emits: ['scroll'],
    setup(props, { emit }) {
        const state = reactive({
            height    : 0 ,    // 吸顶元素的高度
            fixed     : false, // 吸附状态
            root_style: '',    // 根元素的样式
            wrap_style: '',    // 内容容器的样式
        })

        // 外部处理滚动函数
        watch(() => props.scrollTop, (scrollTop) => { onScroll({ scrollTop }) })

        // 外部不处理滚动函数，则默认使用页面滚动，且必须在 created 执行，onMounted 挂载 onPageScroll 不生效
        initPageScroller()
        function initPageScroller() {
            // 外部自定义滚动容器
            if (props.scrollTop !== null) return

            const page = Utils.getCurrentPage<{ SdPageScroller: any[] }>()
            if ( !page ) return

            const SdPageScroller = page.SdPageScroller || []

            // 收集一次外部 onPageScroll 处理函数
            if (Utils.isFunction(page.onPageScroll) && page.onPageScroll !== onPageScroll) {
                SdPageScroller.push(page.onPageScroll.bind(page))
            }

            // 添加当前组件的滚动处理函数
            SdPageScroller.push(onScroll)

            page.SdPageScroller = SdPageScroller
            page.onPageScroll   = onPageScroll
        }

        onMounted(() => {
            onScroll({ scrollTop: props.scrollTop })
        })

        onUnmounted(() => {
            const page = Utils.getCurrentPage<{ SdPageScroller: any[] }>()
            if ( !page || !page.SdPageScroller) return

            // 移除当前组件的滚动处理函数
            const idx = page.SdPageScroller.indexOf(onScroll)
            if (idx !== -1) page.SdPageScroller.splice(idx, 1)
        })

        // 监听滚动设置是否吸附
        const { queryNodeInfo } = useSelectoryQuery()
        function onScroll({ scrollTop }: { scrollTop?: number } = {}) {
            // 外部禁用，不处理
            if (props.disabled) {
                throttle({ fixed: false })
                return
            }

            // 指定容器范围
            if (Utils.isFunction(props.container)) {
                Promise.all([
                    queryNodeInfo(ROOT_ELEMENT),
                    getContainerRect(),
                ]).then(([root, container]) => {
                    let fixed = false
                    if (props.offsetTop + root.height! > container.height! + container.top!) {
                        throttle({ fixed, height: root.height || 0 })
                    } else if (props.offsetTop >= root.top!) {
                        fixed = true
                        throttle({ fixed, height: root.height || 0 })
                    } else {
                        throttle({ fixed })
                    }
                })
            } else {
                queryNodeInfo(ROOT_ELEMENT).then((rect) => {
                    let fixed = false
                    if (props.offsetTop >= (rect.top || 0)) {
                        fixed = true
                        throttle({ fixed, height: rect.height || 0 })
                    } else {
                        throttle({ fixed })
                    }

                    emit('scroll', { scrollTop, isFixed: fixed })
                })
            }
        }

        function throttle(params: { fixed: boolean; height?: number }) {
            // 二次状态一致
            if (params.fixed === state.fixed) return

            nextTick(() => {
                let container_style = ''
                let content_style = ''
                if (params.fixed) {
                    container_style += `height: ${ params.height }px; z-index: ${ props.zIndex }`
                    content_style   += `position: fixed; top: ${ props.offsetTop }px; left: 0; right: 0;`
                }

                state.root_style = container_style
                state.wrap_style = content_style
                state.fixed      = params.fixed
            })
        }

        function getContainerRect(): Promise<UniApp.NodeInfo> {
            const nodes_ref: UniApp.NodesRef = props.container!()
            return new Promise((resolve) => {
                nodes_ref.boundingClientRect((rect) => {
                    resolve(rect as UniApp.NodeInfo)
                }).exec()
            })
        }

        return { ...toRefs(state) }
    },
})
</script>

<template>
    <view class="sd-sticky" :style="root_style">
        <view :style="wrap_style">
            <slot />
        </view>
    </view>
</template>

