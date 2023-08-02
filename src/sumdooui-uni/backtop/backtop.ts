import type { PropType, ExtractPropTypes } from 'vue'
import type { Component                  } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export type BacktopScene = 'page' | 'scroll-view'

export const backtop_props = {
    ...COMMON_PROPS,

    /** 主题预设 */
    type      : { type: String as PropType<Component.Type>, default: 'primary' },
    /** 滚动高度距离 */
    offsetTop : { type: Number, default: 300 },
    /** 按钮距离右侧位置 */
    right     : { type: Number, default: 36 },
    /** 按钮距离底部位置 */
    bottom    : { type: Number, default: 100 },
    /** 使用场景 */
    scene     : { type: String, default: 'page' },
    /** 图标颜色 */
    iconColor : { type: String },
    /** 背景颜色 */
    background: { type: String },
}

export type  BacktopProps = ExtractPropTypes<typeof backtop_props>
