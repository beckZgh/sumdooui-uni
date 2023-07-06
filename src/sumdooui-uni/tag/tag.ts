import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'

export type TagShape   = 'square' | 'round' | 'mark'

import { COMMON_PROPS } from '../common/props'

export const tag_props = {
    ...COMMON_PROPS,

    /** 类型 */
    type      : { type: String as PropType<Component.Type> },
    /** 尺寸 */
    size      : { type: String as PropType<Component.Size> },
    /** 图标 */
    icon      : { type: String },
    /** 文本 */
    text      : { type: String },
    /** 最大宽度 */
    maxWidth  : { type: [String, Number] },
    /** 背景颜色 */
    background: { type: String },
    /** 文本颜色 */
    color     : { type: String },
    /** 发光标签 */
    light     : { type: Boolean },
    /** 朴素标签 */
    plain     : { type: Boolean },
    /** 标签形状 */
    shape     : { type: String as PropType<TagShape>, default: 'square' },
    /** 可关闭的 */
    closeable : { type: Boolean, default: false },
}

export type TagProps = ExtractPropTypes<typeof tag_props>
