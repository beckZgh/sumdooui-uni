
import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfirmType } from '../common/types'

export const textarea_props = {
    /** 绑定值 */
    modelValue   : { type: String, default: '' },
    /** 显示边框 */
    border       : { type: Boolean, default: true },
    /** 高度 */
    height       : { type: [Number, String] },
    /** 占位描述 */
    placeholder  : { type: String, default: '请输入内容...' },
    /** 最大字数 */
    maxlength    : { type: Number, default: -1 },
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
}

export type TextareaProps = ExtractPropTypes<typeof textarea_props>
