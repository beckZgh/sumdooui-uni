import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import type { BadgeProps } from '../badge/badge'

export const grid_item_props = {
    /** 文本 */
    text        : { type: String },
    /** 文本样式 */
    textStyle   : { type: Object as PropType<CSSProperties> } ,
    /** 描述 */
    desc        : { type: String },
    /** 图标 */
    icon        : { type: String },
    /** 图标颜色 */
    iconColor   : { type: String },
    /** 图标大小 */
    iconSize    : { type: [Number, String] },
    /** 图片地址 */
    image       : { type: String },
    /** 图片宽度 */
    imageWidth  : { type: [Number, String] },
    /** 图片高度 */
    imageHeight : { type: [Number, String] },
    /** 自定义样式 */
    contentStyle: { type: Object as PropType<CSSProperties> },
    /** 徽标内容 */
    badge       : { type: [String, Number] },
    /** 徽标内容 */
    dot         : { type: Boolean },
    /** 徽标属性配置 */
    badgeProps  : { type: Object as PropType<Omit<BadgeProps, 'content' | 'dot'>> },
}

export type GridItemProps = ExtractPropTypes<typeof grid_item_props>
