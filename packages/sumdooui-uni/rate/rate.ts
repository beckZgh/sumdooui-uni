import type { PropType, ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const rate_props = {
    ...COMMON_PROPS,

    /** 表单内提交时的标识符 */
    name         : { type: String },
    /** 当前分值 */
    modelValue   : { type: Number, default: 0 },
    /** 图标总数 */
    count        : { type: Number, default: 5 },
    /** 图标大小 */
    size         : { type: [Number, String] as PropType<string | number> },
    /** 图标间距 */
    gutter       : { type: Number, default: 4 },
    /** 未激活的颜色 */
    inactiveColor: { type: String },
    /** 激活时的颜色 */
    activeColor  : { type: String },
    /** 未激活的图标 */
    inactiveIcon : { type: String, default: 'star' },
    /** 激活时的图标 */
    activeIcon   : { type: String, default: 'star-fill' },
    /** 允许半选 */
    allowHalf    : { type: Boolean },
    /** 只读状态 */
    readonly     : { type: Boolean },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 禁用状态下的颜色 */
    disabledColor: { type: String },
    /** 允许通过滑动手势评分 */
    // touchable    : { type: Boolean, default: true },
}

export type RateProps = ExtractPropTypes<typeof rate_props>
