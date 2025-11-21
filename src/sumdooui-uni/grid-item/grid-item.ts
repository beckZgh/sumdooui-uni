import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import type { Component  } from '../common/types'
import type { BadgeProps } from '../badge/badge'
import type { IconProps  } from '../icon/icon'
import type { ImageProps } from '../image/image'

import { COMMON_PROPS } from '../common/props'

export const grid_item_props = {
    ...COMMON_PROPS,

    /** 内容区域自定义样式 */
    contentStyle: { type: Object as PropType<CSSProperties> },
    /** 图标 */
    icon        : { type: String },
    /** 图标颜色 */
    iconColor   : { type: String },
    /** 图标大小 */
    iconSize    : { type: [Number, String] },
    /** 图标组件属性 */
    iconProps   : { type: Object as PropType<Omit<IconProps, 'name' | 'color' | 'size'>> },
    /** 图片地址 */
    image       : { type: String },
    /** 图标组件属性 */
    imageProps  : { type: Object as PropType<Omit<ImageProps, 'src'>> },
    /** 文本 */
    text        : { type: String },
    /** 文本样式 */
    textStyle   : { type: Object as PropType<CSSProperties> } ,
    /** 徽标内容 */
    badge       : { type: [String, Number] },
    /** 徽标内容 */
    dot         : { type: Boolean },
    /** 徽标属性配置 */
    badgeProps  : { type: Object as PropType<Omit<BadgeProps, 'content' | 'dot'>> },
    // 小程序按钮特殊属性
    // https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    openType    : { type: String as PropType<Component.ButtonOpenType> },
}

export type GridItemProps = ExtractPropTypes<typeof grid_item_props>
