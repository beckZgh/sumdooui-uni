
import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const radio_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue   : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 唯一标识符 */
    name         : { type: [String, Number] },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 标题 */
    label        : { type: String },
    /** 标题大小 */
    labelSize    : { type: [Number, String] },
    /** 图标位置 */
    iconPosition : { type: String as PropType<'left' | 'right'> },
    /** 图标大小 */
    iconSize     : { type: [Number, String] },
    /** 未选中的颜色 */
    inactiveColor: { type: String },
    /** 未选中的图标 */
    inactiveIcon : { type: String },
    /** 选中的颜色 */
    activeColor  : { type: String },
    /** 选中的图标 */
    activeIcon   : { type: String },
}

export type RadioProps = ExtractPropTypes<typeof radio_props>
