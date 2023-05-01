import type { PropType, ExtractPropTypes } from 'vue'
import type { BadgeProps } from '../badge/badge'

export type TabsItem = {
    title     : string
    name     ?: string | number
    badge    ?: number
    dot      ?: boolean
    badgeProps?: Omit<BadgeProps, 'content' | 'dot'>
    disabled ?: boolean
}

export const tabs_props = {
    /** 绑定值 */
    modelValue  : { type: [String, Number], default: 0 },
    /** 标签项 */
    items       : { type: Array as PropType<(TabsItem | string)[]>, default: () => [] },
    /** 标签栏背景色 */
    background  : { type: String },
    /** 标签栏高度 */
    height      : { type: [Number, String] },
    /** 默认颜色 */
    color       : { type: String },
    /** 激活颜色 */
    activeColor : { type: String },
    /** 线条宽度 */
    lineWidth   : { type: [Number, String] },
    /** 线条高度 */
    lineHeight  : { type: [Number, String] },
    /** 动画时长 */
    duration    : { type: Number, default: 0.2 },
    /** 内容靠左展示，超出一瓶是可滚动，需设置对应 name */
    scrollable  : { type: Boolean },
    /** 是否吸顶定位 */
    sticky      : { type: Boolean },
    /** 距离顶部位置（固定定位、吸顶定位使用） */
    offsetTop   : { type: Number },
    /** 切换前回调 */
    beforeChange: { type: Function },
}

export type TabsProps = ExtractPropTypes<typeof tabs_props>
