import type { ExtractPropTypes, PropType } from 'vue'
import type { Component } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export const switch_props = {
    ...COMMON_PROPS,

    /** 预设主题 */
    type         : { type: String as PropType<Component.Type> },
    /** 绑定值 */
    modelValue   : { type: [String, Boolean, Number], default: false },
    /** 选中时的值 */
    activeValue  : { type: [String, Number, Boolean], default: true },
    /** 未选中时的值 */
    inactiveValue: { type: [String, Number, Boolean], default: false },
    /** 选中时的颜色 */
    activeColor  : { type: String },
    /** 未选中时的颜色 */
    inactiveColor: { type: String },
    /** 自定义大小 */
    size         : { type: [Number, String] },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 变更前检查（支持异步） */
    beforeChange : { type: Function as PropType<(value: boolean) => boolean | Promise<boolean>> },
}

export type SwitchProps = ExtractPropTypes<typeof switch_props>
