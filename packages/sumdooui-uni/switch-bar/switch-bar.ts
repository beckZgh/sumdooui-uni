import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export type SwitchBarItem = {
    name: string
    [key: string]: any
}

export const switch_props = {
    ...COMMON_PROPS,

    /** 默认值 */
    modelValue : { type: Number, default: 0 },
    /** 选项列表 */
    items      : { type: Array as PropType<(SwitchBarItem | string)[]>, default: () => [] },
    /** 整体宽度 */
    width      : { type: [String, Number] },
    /** 整体高度 */
    height     : { type: [String, Number] },
    /** 是否圆角 */
    round      : { type: Boolean, default: false },
    /** 自定义背景色 */
    backgrond  : { type: String },
    /** 自定义文本颜色 */
    color      : { type: String },
    /** 自定义激活文本颜色 */
    activeColor: { type: String },
}

export type SwitchProps = ExtractPropTypes<typeof switch_props>
