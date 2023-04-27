import type { PropType, CSSProperties , ExtractPropTypes } from 'vue'
import type { Component  } from '../common/types'
import type { IconProps  } from '../icon/icon'
import type { ImageProps } from '../image/image'

import { COMMON_PROPS } from '../common/props'

export const cell_props = {
    ...COMMON_PROPS,

    /** 左侧图标 */
    icon            : { type: String },
    /** 左侧图标配置 */
    iconProps       : { type: Object as PropType<Omit<IconProps, 'name'>> },
    /** 左侧图片 */
    image           : { type: String },
    /** 左侧图片配置 */
    imageProps      : { type: Object as PropType<Omit<ImageProps, 'src'>> },
    /** 标题 */
    title           : { type: String, default: ''               },
    /** 标题自定义样式 */
    titleStyle      : { type: Object as PropType<CSSProperties> },
    /** 副标题 */
    description     : { type: String, default: ''               },
    /** 副标题自定义样式 */
    descriptionStyle: { type: Object as PropType<CSSProperties> },
    /** 右侧值 */
    value           : { type: String, default: ''               },
    /** 右侧值自定义样式 */
    valueStyle      : { type: Object as PropType<CSSProperties> },
    /** 底部边框 */
    border          : { type: Boolean, default: undefined       },
    /** 底部边框自定义样式 */
    borderStyle     : { type: Object as PropType<CSSProperties> },
    /** 左侧区域自定义样式 */
    leftStyle       : { type: Object as PropType<CSSProperties> },
    /** 右侧区域自定义样式 */
    rightStyle      : { type: Object as PropType<CSSProperties> },
    /** 是否圆角 */
    round           : { type: Boolean, default: undefined       },
    /** 是否点击反馈 */
    clickable       : { type: Boolean, default: undefined       },
    /** 是否显示右侧箭头 */
    arrow           : { type: Boolean, default: undefined       },
    /** 微信按钮开放能力 */
    openType        : { type: String as PropType<Component.ButtonOpenType> },
}

export type CellProps = ExtractPropTypes<typeof cell_props>

