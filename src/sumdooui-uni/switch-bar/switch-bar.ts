import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export type SwitchBarItem = {
    name: string
    [key: string]: any
}

export const switch_props = {
    ...COMMON_PROPS,

    /** 默认值 */
    modelValue: { type: Number, default: 0 },
    /** 是否圆角 */
    round     : { type: Boolean, default: false },
    /** 选项列表 */
    items     : { type: Array as PropType<(SwitchBarItem | string)[]>, default: () => [] },
    /** 选项宽度 */
    itemWidth : { type: Number, default: 106 },
    /** 自定义背景色 */
    backgrond : { type: String },
}

export type SwitchProps = ExtractPropTypes<typeof switch_props>
