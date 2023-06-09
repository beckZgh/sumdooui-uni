import type { PropType, ExtractPropTypes , CSSProperties } from 'vue'
import type { Component } from '../common/types'
import { COMMON_PROPS } from '../common/props'

type AvatarShapeType = 'circle' | 'round' | 'none'

export const avatar_props = {
    ...COMMON_PROPS,

    /** 头像资源路径 */
    src       : { type: String },
    /** 图标显示 */
    icon      : { type: String },
    /** 显示文本 */
    text      : { type: String },
    /** 文本、图标颜色 */
    color     : { type: String },
    /** 文本、图标大小 */
    fontSize  : { type: [String, Number] },
    /** 文本自定义样式 */
    textStyle : { type: Object as PropType<CSSProperties> },
    /** 头像形状 */
    shape     : { type: String as PropType<AvatarShapeType>, default: 'circle' },
    // 预设大小
    size      : { type: [String, Number] as PropType<Component.Size | number> },
    /** 背景色 */
    background: { type: String },
}

export type AvatarProps = ExtractPropTypes<typeof avatar_props>
