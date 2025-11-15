import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export interface ActionsheetItem {
    id       ?: string
    icon     ?: string
    text      : string
    color    ?: string
    disabled ?: boolean
    open_type?: string
}

export const actionsheet_props = {
    ...COMMON_PROPS,

    /** 显示隐藏绑定值 */
    visible    : { type: Boolean, default: false },
    /** 数据项目 */
    items      : { type: Array as PropType<ActionsheetItem[]>, default: () => [] },
    /** 顶部标题 */
    description: { type: String },
    /** 显示关闭按钮 */
    showCancel : { type: Boolean, default: true },
    /** 取消文本 */
    cancelText : { type: String, default: '取消' },
    /** 排列方向 */
    align      : { type: String as PropType<'left' | 'center'>, default: 'center' },
}

export type ActionsheetProps = ExtractPropTypes<typeof actionsheet_props>
