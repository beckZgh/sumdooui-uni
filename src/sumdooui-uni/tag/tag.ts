import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentType } from '../common/types'

type TagVariant = 'light' | 'plain'

import { COMMON_PROPS } from '../common/props'

export const tag_props = {
    ...COMMON_PROPS,

    /** 类型 */
    type      : { type: String as PropType<ComponentType>, default: 'default' },
    /** 文本 */
    text      : { type: String },
    /** 是否圆角 */
    round     : { type: Boolean, default: false },
    /** 最大宽度 */
    maxWidth  : { type: [String, Number] },
    /** 背景颜色 */
    background: { type: String },
    /** 文本颜色 */
    color     : { type: String },
    /** 形态 */
    variant   : { type: String as PropType<TagVariant> },
}

export type TagProps = ExtractPropTypes<typeof tag_props>
