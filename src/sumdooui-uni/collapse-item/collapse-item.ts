import type { ExtractPropTypes } from 'vue'

export const collapse_item_props = {
    /** 唯一标识 */
    index    : { type: [Number, String], default: 0 },
    /** 图标 */
    icon     : { type: String },
    /** 图标颜色 */
    iconColor: { type: String },
    /** 图标大小 */
    iconSize : { type: String, default: '40rpx' },
    /** 标题 */
    title    : { type: String, default: '' },
    /** 内容 */
    content  : { type: String, default: '' },
    /** 显示箭头 */
    arrow    : { type: Boolean, default: undefined },
    /** 显示边框线 */
    border   : { type: Boolean, default: undefined },
    /** 是否禁用 */
    disabled : { type: Boolean, default: false },
    /** 是否默认展开 */
    open     : { type: Boolean, default: false },
}

export type CollapseItemProps = ExtractPropTypes<typeof collapse_item_props>
