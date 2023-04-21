import type { ExtractPropTypes } from 'vue'

export const switch_props = {
    /** 绑定值 */
    modelValue   : { type: [String, Boolean, Number], default: false },
    activeValue  : { type: [String, Number, Boolean], default: true },
    inactiveValue: { type: [String, Number, Boolean], default: false },
    activeColor  : { type: String },
    inactiveColor: { type: String },
    disabled     : { type: Boolean },
}

export type SwitchProps = ExtractPropTypes<typeof switch_props>
