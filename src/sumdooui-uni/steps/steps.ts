import type { PropType, ExtractPropTypes } from 'vue'

export type StepsType = 'number' | 'icon' | 'image'

export type StepsItem = {
    name  : string
    desc ?: string
    inactiveIcon?: string
    activeIcon?: string
    inactiveImage?: string
    activeImage?: string
}

export type StepsDirection = 'row' | 'column'

export const steps_props = {
    /** 当前步骤类型 */
    type         : { type: String as PropType<StepsType>, default: 'number' },
    /** 当前步骤 */
    current      : { type: Number, default: 0 },
    /** 步骤选项 */
    items        : { type: Array as PropType<StepsItem[]>, default: () => [] },
    /** 未激活时的颜色 */
    inactiveColor: { type: String },
    /** 未激活时的颜色 */
    activeColor  : { type: String },
    /** 未激活时的图标 */
    inactiveIcon : { type: String, default: 'circle' },
    /** 激活时的图标 */
    activeIcon   : { type: String, default: 'circle-check-fill' },
    /** 未激活时的图片 */
    inactiveImage: { type: String },
    /** 激活时的图片 */
    activeImage  : { type: String },
    /** 布局方向 */
    direction    : { type: String as PropType<StepsDirection>, default: 'row' },
}

export type StpesProps = ExtractPropTypes<typeof steps_props>
