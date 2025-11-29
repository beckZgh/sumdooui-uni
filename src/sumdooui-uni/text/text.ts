import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'
import { COMMON_PROPS } from '../common/props'

export const text_props = {
    ...COMMON_PROPS,

    /** 文本值 */
    value      : { type: [String, Number, Boolean, Date, Object, Array], default: () => undefined },
    /** 主题类型 */
    type       : { type: String as PropType<Component.Type> },
    /** 自定义颜色 */
    color      : { type: String },
    /** 自定义文本大小 */
    size       : { type: [String,Number] },
    /** 特殊类型: mobile 手机号脱敏, name 姓名脱敏, idcard 身份证号 bankcarc 银行卡, date 日期, time 时间 datetime 日期时间 */
    mode       : { type: String },
    /** 转为块级元素 */
    block      : { type: Boolean, default: undefined },
    /** 占位文本 */
    placeholder: { type: String },
    /**  */
    options    : { type: Array as PropType<any[]> },
    /**  */
    keys       : { type: Object as PropType<{ label: string; value: string }> },
    /** 空值匹配 */
    emptyValues: { type: Array as PropType<any[]>, default: () => [null, undefined] },
}

export type TextProps = ExtractPropTypes<typeof text_props>
