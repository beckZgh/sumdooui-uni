
import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfirmType, InputType, Component } from '../common/types'
import { COMMON_PROPS } from '../common/props'

export const input_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue   : { type: String, default: '' },
    /** input 类型 */
    type         : { type: String as PropType<InputType>, default: 'text' },
    /** 密码模式 */
    showPassword : { type: Boolean },
    /** 显示边框 */
    border       : { type: Boolean, default: true },
    /** 占位描述 */
    placeholder  : { type: String, default: '请输入内容...' },
    /** 最大字数 */
    maxlength    : { type: Number, default: -1 },
    /** 是否显示清除按钮 */
    clearable    : { type: Boolean, default: false },
    /** 自动聚焦, 拉起键盘 */
    autoFocus    : { type: Boolean, default: false },
    /** 仅聚焦 */
    focus        : { type: Boolean, default: false },
    /** 自动高度 */
    autoHeight   : { type: Boolean },
    /** 指定光标与键盘的距离 */
    cursorSpacing: { type: Number, default: 100 },
    /** 显示字数统计 */
    showWordLimit: { type: Boolean },
    /** 只读状态 */
    readonly     : { type: Boolean, default: undefined },
    /** 禁用状态 */
    disabled     : { type: Boolean, default: undefined },
    /** 设置键盘右下角的文字 */
    confirmType  : { type: String as PropType<ConfirmType>, default: 'done' },
    /** 背景 */
    background   : { type: String },
    /** 前置图标 */
    prefixIcon   : { type: String },
    /** 后置图标 */
    suffixIcon   : { type: String },
    /** 内容对齐方式 */
    inputAlign   : { type: String as PropType<Component.InputAlign> },
}

export type InputProps = ExtractPropTypes<typeof input_props>
