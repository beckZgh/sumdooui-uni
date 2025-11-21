
import type { PropType, ExtractPropTypes } from 'vue'
import type { BadgeProps } from '../badge/badge'
import { COMMON_PROPS } from '../common/props'

export const tabbar_item_props = {
    ...COMMON_PROPS,

    /** 唯一标识 */
    name       : { type: [String, Number] },
    /** 文本 */
    text       : { type: String },
    /** 图标 */
    icon       : { type: String },
    /** 激活时显示的图标 */
    activeIcon : { type: String },
    /** 图片图标 */
    image      : { type: String },
    /** 激活时显示的图片图标 */
    activeImage: { type: String },
    /** 显示徽标内容 */
    badge      : { type: [Number, String] },
    /** 显示圆点 */
    dot        : { type: Boolean },
    /** 徽标配置 */
    badgeProps : { type: Object as PropType<Omit<BadgeProps, 'content' | 'dot'>> },
}

export type TabbarItemProps = ExtractPropTypes<typeof tabbar_item_props>
