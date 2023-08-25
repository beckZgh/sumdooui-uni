import type { PropType, ExtractPropTypes } from 'vue'

export const sticky_props = {
    /** 吸顶位置 */
    offsetTop: { type: Number, default: 0 },
    /** 当前滚动区域的滚动位置 */
    scrollTop: { type: Number, default: null },
    /** 设置层叠 */
    zIndex   : { type: Number, default: 1000 },
    /** 返回 NodesRef 节点的函数: 指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置。 */
    container: { type: Function as PropType<Function> },
    /** 禁用 */
    disabled : { type: Boolean, default: false  },
}

export type StickyProps = ExtractPropTypes<typeof sticky_props>
