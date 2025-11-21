import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'
import type { FormTypes } from '../form/types'

import { COMMON_PROPS } from '../common/props'

export const form_item_props = {
    ...COMMON_PROPS,

    /** 关联数据 key */
    prop         : { type: String },
    /** 校验规则 */
    rules        : { type: Array as PropType<FormTypes.RuleItem[]> },
    /** 显示必填 */
    required     : { type: Boolean, default: undefined },
    /** 标题 */
    label        : { type: String },
    /** 标签宽度 */
    labelWidth   : { type: [Number, String] as PropType<string | number> },
    /** 标签位置 */
    labelPosition: { type: String as PropType<FormTypes.LalbePosition> },
    /** 内容区域方向 */
    inputAlign   : { type: String as PropType<Component.InputAlign>  },
    /** 显示底部边框 */
    borderBottom : { type: Boolean, default: undefined },
    /** 是否添加冒号 */
    colon        : { type: Boolean, default: undefined },
    /** 显示错误信息 */
    showError    : { type: Boolean, default: undefined },
    /** 点击效果 */
    clickable    : { type: Boolean },
}

export type FormItemProps = ExtractPropTypes<typeof form_item_props>
