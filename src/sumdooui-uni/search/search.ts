import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'
import { COMMON_PROPS } from '../common/props'

export type SearchShape = 'round' | 'square'

export const search_props = {
    ...COMMON_PROPS,

    /** 受控值 */
    modelValue      : { type: String, default: '' },
    /** 背景色 */
    background      : { type: String },
    /** 输入框形状 */
    shape           : { type: String as PropType<SearchShape>, default: 'round' },
    /** 占位内容文本 */
    placeholder     : { type: String, default: '请输入搜素关键词' },
    /** 占位内容样式 */
    placeholderStyle: { type: Object },
    /** 输入框内容对齐方式 */
    inputAlign      : { type: String as PropType<Component.InputAlign> },
    /** 获得焦点 */
    focus           : { type: Boolean },
    /** 禁用状态 */
    disabled        : { type: Boolean },
    /** 只读状态 */
    readonly        : { type: Boolean },
    /** 可清空的 */
    clearable       : { type: Boolean, default: true },
    /** 最大输入数量 */
    maxlength       : { type: Number },
    /** 前置图标 */
    prefixIcon      : { type: String, default: 'search' },
    /** 后置图标 */
    suffixIcon      : { type: String },
    /** 右侧操作文本 */
    actionText      : { type: String },
}

export type SearchProps = ExtractPropTypes<typeof search_props>
