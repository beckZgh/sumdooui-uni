import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const stepper_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue   : { type: Number, default: 0 },
    /* 最小值 */
    min          : { type: Number, default: 0 },
    /* 最大值 */
    max          : { type: Number },
    /* 步长 */
    step         : { type: Number },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 是否显示减少按钮 */
    showMinus    : { type: Boolean, default: true },
    /** 禁用减少按钮 */
    disabledMinus: { type: Boolean },
    /** 禁用数字显示区域，不可点击 */
    disabledInput: { type: Boolean },
    /** 是否显示增加按钮 */
    showPlus     : { type: Boolean, default: true },
    /** 禁用增加按钮 */
    disabledPlus : { type: Boolean },
    /** 异步变更 */
    asyncChange  : { type: Boolean },
    /** 输入框宽度 */
    inputWidth   : { type: [Number, String] },
    /** 按钮大小 */
    buttonSize   : { type: [Number, String] },
}

export type StepperProps = ExtractPropTypes<typeof stepper_props>
