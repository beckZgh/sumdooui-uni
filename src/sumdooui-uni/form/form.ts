import type { PropType, ExtractPropTypes } from 'vue'
import type { Form } from '../common/types'

export const form_props = {
    /** 子项关联值 */
    model        : { type: Object as PropType<Record<string, any>>, default: () => ({}) },
    /** 校验规则 */
    rules        : { type: Object as PropType<Record<string, Form.RuleItem[]>>, default: () => ({}) },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 只读状态 */
    readonly     : { type: Boolean },
    /** 标签宽度 */
    labelWidth   : { type: [Number, String] as PropType<string | number> },
    /** 标签位置 */
    labelPosition: { type: String as PropType<Form.LalbePosition>, default: 'left' },
    /** 内容区域方向 */
    bodyAlign    : { type: String as PropType<'left' | 'right'>  },
    /** 显示底部边框 */
    borderBottom : { type: Boolean, default: true },
    /** 是否添加冒号 */
    colon        : { type: Boolean },
    /** 显示错误信息 */
    showError    : { type: Boolean },
    /** 错误信息展示类型 */
    errorType    : { type: String as PropType<Form.ErrorType>, default: 'message' },
}

export type FormProps = ExtractPropTypes<typeof form_props>