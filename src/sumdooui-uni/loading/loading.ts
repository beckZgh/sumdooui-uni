import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export type LoadingType      = 'spinner' | 'line' | 'image' | 'meet'
export type LoadingDirection = 'row' | 'column'

export const loading_props = {
    ...COMMON_PROPS,

    /** 主题类型 */
    type       : { type: String as PropType<Component.Type> },
    /** loading 类型 */
    loadingType: { type: String as PropType<LoadingType>, default: 'spinner' },
    /** 全屏 */
    fullscreen : { type: Boolean, default: false },
    /** 背景颜色 */
    background : { type: String },
    /** 颜色 */
    color      : { type: String },
    /** 加载文本 */
    text       : { type: String },
    /** 排列方向 */
    direction  : { type: String as PropType<LoadingDirection>, default: 'row' },
}

export type LoadingProps = ExtractPropTypes<typeof loading_props>
