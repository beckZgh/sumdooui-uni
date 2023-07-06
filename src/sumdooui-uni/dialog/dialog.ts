import type { ExtractPropTypes , PropType } from 'vue'


export type DialogType         = 'alert' | 'confirm' | 'prompt' | 'success' | 'warning' | 'error'
export type DialogButtonLayout = 'row' | 'column'

export const dialog_props = {
    /** 显示隐藏值 */
    visible          : { type: Boolean, default: false },
    /** 对话框类型 */
    type             : { type: String as PropType<DialogType>, default: 'alert' },
    /** 对话框宽度 */
    width            : { type: [Number, String], default: '80%' },
    /** 图片地址 */
    image            : { type: String },
    /** 图片高度 */
    imageHeight      : { type: [Number, String], default: '75%' },
    /** 标题 */
    title            : { type: String },
    /** 内容, 通过 \n 换行 */
    content          : { type: String },
    /** 取消按钮文本 */
    cancelButtonText : { type: String, default: '取消'  },
    /** 确认按钮文本 */
    confirmButtonText: { type: String, default: '确认'  },
    /** 按钮布局 */
    buttonLayout     : { type: String as PropType<DialogButtonLayout>, default: 'row' },
    /** 关闭前回调，支持 Promise */
    beforeClose      : { type: Function },
    /** prommpt 模式，输入框类型 */
    inputType        : { type: String, default: 'text' },
    /** prommpt 模式，占位提示文案 */
    placeholder      : { type: String, default: '请输入内容...' },
    /** prommpt 模式，输入字符字数限制 */
    maxLength        : { type: Number, default: 50 },
}

export type DialogProps = ExtractPropTypes<typeof dialog_props>
