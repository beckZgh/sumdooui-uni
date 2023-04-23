import type { PropType, ExtractPropTypes } from 'vue'

export type TabsItem = {
    name      : string
    badge    ?: number
    is_dot   ?: boolean
    icon     ?: string
    icon_size?: string | number
    disabled ?: boolean
}

export const tabs_props = {
    /** 标签项 */
    items     : { type: Array as PropType<(TabsItem | string)[]>, default: () => [] },
    /** 当前选中项 */
    current   : { type: Number, default: 0 },
    /** 是否超出可滚动 */
    scrollable: { type: Boolean, default: true },
    /** 标签栏高度 */
    height    : { type: [Number, String], default: 96 },
    /** 标签栏背景色 */
    background: { type: String },
    /** 是否固定定位 */
    fixed     : { type: Boolean },
    /** 是否吸顶定位 */
    sticky    : { type: Boolean },
    /** 距离顶部位置（固定定位、吸顶定位使用） */
    top       : { type: Number },
    /** 不足一屏时，是否靠左展示，默认居中 */
    leftAlign : { type: Boolean, default: false },
}

export type TabsProps = ExtractPropTypes<typeof tabs_props>
