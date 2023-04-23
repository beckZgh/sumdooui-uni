
import type { PropType, ExtractPropTypes } from 'vue'

export const radio_props = {
    /** 显示类型 */
    type        : { type: String as PropType<'default' | 'card' | 'tag'>, default: 'default' },
    /** 绑定值 */
    modelValue  : { type: [Boolean, String, Number] as PropType<boolean | string | number>, default: false },
    /** 唯一标识符 */
    name        : { type: [String, Number] },
    /** 标题 */
    label       : { type: String },
    /** 禁用状态 */
    disabled    : { type: Boolean },
    /** 图标位置 */
    iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
    /** 文本位置 */
    align       : { type: String as PropType<'left' | 'right'>, default: 'left' },
}

export type RadioProps = ExtractPropTypes<typeof radio_props>
