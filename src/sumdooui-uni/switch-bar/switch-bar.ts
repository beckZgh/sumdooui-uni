import type { PropType, ExtractPropTypes } from 'vue'

export type SwitchBarItem = {
    name: string
    [key: string]: any
}

export const switch_props = {
    /** 默认值 */
    current  : { type: Number, default: 0 },
    /** 是否圆角 */
    round    : { type: Boolean, default: false },
    /** 选项列表 */
    items    : { type: Array as PropType<(SwitchBarItem | string)[]>, default: () => [] },
    /** 选项宽度 */
    itemWidth: { type: Number, default: 106 },
    /** 自定义背景色 */
    backgrond: { type: String },
}

export type SwitchProps = ExtractPropTypes<typeof switch_props>
