import type { PropType, ExtractPropTypes } from 'vue'
import type { Form } from '../common/types'

export const form_item_props = {
    /** 关联数据 key */
    prop         : { type: String, default: '' },
    /** 校验规则 */
    rules        : { type: Array as PropType<Form.RuleItem[]> },
    /** 显示必填 */
    required     : { type: Boolean },
    /** 禁用状态 */
    disabled     : { type: Boolean },
    /** 只读状态 */
    readonly     : { type: Boolean },
    /** 标题 */
    label        : { type: String },
    /** 标签宽度 */
    labelWidth   : { type: [Number, String] as PropType<string | number>, default: '' },
    /** 标签位置 */
    labelPosition: { type: String as PropType<Form.LalbePosition> },
    /** 显示底部边框 */
    borderBottom : { type: Boolean },
    /** 是否添加冒号 */
    colon        : { type: Boolean },
    /** 显示错误信息 */
    showError    : { type: Boolean },
    /** 提示信息 */
    tips         : { type: String, default: '' },
    /** 错误信息展示类型 */
    errorType    : { type: String as PropType<Form.ErrorType>, default: 'message' },
}

export type FormItemProps = ExtractPropTypes<typeof form_item_props>
