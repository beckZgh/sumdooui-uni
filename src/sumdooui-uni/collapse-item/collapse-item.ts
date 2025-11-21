import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const collapse_item_props = {
    ...COMMON_PROPS,

    /** 唯一标识 */
    index       : { type: [Number, String], default: 0 },
    /** 图标 */
    icon        : { type: String },
    /** 图标颜色 */
    iconColor   : { type: String },
    /** 图标大小 */
    iconSize    : { type: String, default: '40rpx' },
    /** 标题 */
    title       : { type: String, default: '' },
    /** 内容 */
    content     : { type: String, default: '' },
    /** 显示箭头 */
    arrow       : { type: Boolean, default: undefined },
    /** 显示边框线 */
    border      : { type: Boolean, default: undefined },
    /** 是否默认展开 */
    open        : { type: Boolean, default: false },
    /** 是否禁用 */
    disabled    : { type: Boolean, default: false },
    /** 是否点击反馈 */
    clickable   : { type: Boolean, default: true },
    /** 顶部区域自定义样式 */
    headertStyle: { type: [String, Object] as PropType<CSSProperties | string> },
    /** 内容区域自定义样式 */
    contentStyle: { type: [String, Object] as PropType<CSSProperties | string> },
}

export type CollapseItemProps = ExtractPropTypes<typeof collapse_item_props>
