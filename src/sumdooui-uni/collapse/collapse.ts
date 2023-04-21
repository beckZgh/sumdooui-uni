import type { PropType, ExtractPropTypes } from 'vue'

export const collapse_props = {
    /** 绑定值 */
    modelValue: { type: [Number, Array] as PropType<number | number[]>, default: () => [] },
    /** 显示边框 */
    border    : { type: Boolean, default: true },
    /** 是否显示箭头 */
    arrow     : { type: Boolean, default: true },
    /** 手风琴模式 */
    accordion : { type: Boolean, default: false },
}

export type CollapseProps = ExtractPropTypes<typeof collapse_props>
