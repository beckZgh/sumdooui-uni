import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const switch_props = {
    ...COMMON_PROPS,

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
    /** 禁用状态 */
    disabled     : { type: Boolean },
}

export type SwitchProps = ExtractPropTypes<typeof switch_props>
