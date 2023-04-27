
import type { ExtractPropTypes, PropType } from 'vue'
import type { Component } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export const icon_props = {
    ...COMMON_PROPS,

    /** 图标主题 */
    theme  : { type: String as PropType<Component.Theme> }, // 预设主题色，未指定 color 可用
    /** 图标名称 */
    name   : { type: String           },
    /** 图标大小 */
    size   : { type: [String, Number] },
    /** 图标颜色 */
    color  : { type: String           },
    /** 加载动画 */
    loading: { type: Boolean, default: false },
}

export type IconProps = ExtractPropTypes<typeof icon_props>
