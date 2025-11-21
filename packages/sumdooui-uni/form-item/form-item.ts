import type { PropType, ExtractPropTypes } from 'vue'
import type { Form, Component } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export const form_item_props = {
    ...COMMON_PROPS,

    /** 关联数据 key */
    prop         : { type: String },
    /** 校验规则 */
    rules        : { type: Array as PropType<Form.RuleItem[]> },
    /** 显示必填 */
    required     : { type: Boolean },
    /** 标题 */
    label        : { type: String },
    /** 标签宽度 */
    labelWidth   : { type: [Number, String] as PropType<string | number> },
    /** 标签位置 */
    labelPosition: { type: String as PropType<Form.LalbePosition> },
    /** 内容区域方向 */
    inputAlign   : { type: String as PropType<Component.InputAlign>  },
    /** 显示底部边框 */
    borderBottom : { type: Boolean },
    /** 是否添加冒号 */
    colon        : { type: Boolean },
    /** 显示错误信息 */
    showError    : { type: Boolean },
    /** 提示信息 */
    tips         : { type: String },
    /** 错误信息展示类型 */
    errorType    : { type: String as PropType<Form.ErrorType> },
}

export type FormItemProps = ExtractPropTypes<typeof form_item_props>
