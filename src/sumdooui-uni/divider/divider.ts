import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentType } from '../common/types'

type LineType  = 'solid' | 'dashed' | 'dotted'
type TypeSence = 'text' | 'line' | 'default'

export const divider_props = {
    /** 类型 */
    type     : { type: String as PropType<ComponentType> },
    /** 类型场景 */
    typeSence: { type: String as PropType<TypeSence>, default: 'default' },
    /** 线条颜色 */
    lineColor: { type: String },
    /** 线条类型 */
    lineType : { type: String as PropType<LineType>, default: 'solid' },
    /** 文本 */
    text     : { type: String },
    /** 文本颜色 */
    color    : { type: String },
    /** 文本大小 */
    textSize : { type: [Number, String] },
    /** 左右间距 */
    rowGap   : { type: Number, default: 36 },
    /** 上下间距 */
    columnGap: { type: Number, default: 60 },
}

export type DividerProps = ExtractPropTypes<typeof divider_props>
