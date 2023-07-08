import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const stepper_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue     : { type: Number, default: 0 },
    /** 步进器宽度 */
    width          : { type: [String, Number] },
    /** 步进器高度（也是按钮的宽度） */
    height         : { type: [String, Number] },
    /* 最小值 */
    min            : { type: Number },
    /* 最大值 */
    max            : { type: Number },
    /* 步长 */
    step           : { type: Number },
    /** 禁用状态 */
    disabled       : { type: Boolean },
    /** 是否显示减少按钮 */
    showMinus      : { type: Boolean, default: true },
    /** 禁用减少按钮 */
    disabledMinus  : { type: Boolean },
    /** 是否显示数字显示区域 */
    showInput      : { type: Boolean, default: true },
    /** 是否显示数字显示区域边框 */
    showInputBorder: { type: Boolean, default: true },
    /** 禁用数字显示区域，不可点击 */
    disabledInput  : { type: Boolean },
    /** 是否显示增加按钮 */
    showPlus       : { type: Boolean, default: true },
    /** 禁用增加按钮 */
    disabledPlus   : { type: Boolean },
    /** 异步变更 */
    asyncChange    : { type: Boolean },
    /** 圆角风格 */
    round          : { type: Boolean },
}

export type StepperProps = ExtractPropTypes<typeof stepper_props>
