import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'


export type NumberKeyboardMode = 'default' | 'right-column'
export const number_keyboard_props = {
    ...COMMON_PROPS,
    /** 显示、隐藏绑定值 */
    visible    : { type: Boolean, default: false },
    /** 绑定值 */
    modelValue : { type: String, default: '' },
    /** 标题 */
    title      : { type: String  },
    /** 键盘模式 */
    mode       : { type: String as PropType<NumberKeyboardMode>, default: 'default' },
    /** 自定义键盘额外的键，最多两个 */
    customKeys : { type: [String, Array] as PropType<string | string[]> },
    /** 输入值最大长度 */
    maxlength  : { type: Number, default: 6 },
    /** 自定义完成按钮文字 */
    confirmText: { type: String },
    /** 随机生成键 */
    randomKeys : { type: Boolean },
    /** 关闭前回调 */
    beforeClose: { type: Function },
}

export type NumberKeyboardProps = ExtractPropTypes<typeof number_keyboard_props>
