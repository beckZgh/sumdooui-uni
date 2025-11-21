import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'
import type { FormTypes } from './types'

import { COMMON_PROPS } from '../common/props'

export const form_props = {
    ...COMMON_PROPS,

    /** 子项关联值 */
    model        : { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 表单配置 */
    schema       : { type: Array as PropType<Record<string, any>[]> },
    /** 校验规则 */
    rules        : { type: Object as PropType<Record<string, FormTypes.RuleItem[]>>, default: () => ({}) },
    /** 禁用状态 */
    disabled     : { type: Boolean, default: undefined },
    /** 只读状态 */
    readonly     : { type: Boolean, default: undefined },
    /** 标签宽度 */
    labelWidth   : { type: [Number, String] as PropType<string | number> },
    /** 标签位置 */
    labelPosition: { type: String as PropType<FormTypes.LalbePosition> },
    /** 内容区域方向 */
    inputAlign   : { type: String as PropType<Component.InputAlign>  },
    /** 显示底部边框 */
    borderBottom : { type: Boolean, default: true },
    /** 是否添加冒号 */
    colon        : { type: Boolean, default: true },
    /** 显示错误信息 */
    showError    : { type: Boolean, default: true },
    /** 错误信息展示类型 */
    errorType    : { type: String as PropType<FormTypes.ErrorType>, default: 'border-bottom' },
    /** 显示 FormItem 标题 */
    showLabel    : { type: Boolean, default: undefined },
}

export type FormProps = ExtractPropTypes<typeof form_props>

export * from './types'
