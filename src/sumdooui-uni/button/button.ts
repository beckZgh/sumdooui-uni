import type { PropType, ExtractPropTypes } from 'vue'
import type { ComponentType, ComponentSize } from '../common/types'

type ButtonShapeType = 'square' | 'round' | 'circle'
type ButtonVariant   = 'light' | 'plain' | 'text'

import { COMMON_PROPS } from '../common/props'

export const button_props = {
    ...COMMON_PROPS,
    /** 预设按钮主题 */
    type            : { type: String as PropType<ComponentType>  , default: 'default' },
    /** 按钮尺寸 */
    size            : { type: String as PropType<ComponentSize>  , default: 'normal'  },
    /** 按钮形状 */
    shape           : { type: String as PropType<ButtonShapeType>, default: 'round'   },
    /** 按钮形态 */
    variant         : { type: String as PropType<ButtonVariant> },
    /** 块级按钮 */
    block           : { type: Boolean, default: false  },
    /** 按钮宽度 */
    width           : { type: String },
    /** 按钮图标 */
    icon            : { type: String },
    /** 按钮图标大小 */
    iconSize        : { type: [String, Number] },
    /** 按钮图标颜色 */
    iconColor       : { type: String },
    /** 加载中 */
    loading         : { type: Boolean, default: false },
    /** 加载中文本 */
    loadingText     : { type: String },
    /** 按钮文本 */
    text            : { type: String },
    /** 禁用按钮 */
    disabled        : { type: Boolean, default: false },
    // 小程序按钮特殊属性
    // https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    openType        : { type: String },
    formType        : { type: String },
    appParameter    : { type: String },
    sessionForm     : { type: String },
    sendMessageTitle: { type: String },
    sendMessagePath : { type: String },
    sendMessageImg  : { type: String },
    showMessageCard : { type: Boolean },
}

export type ButtonProps = ExtractPropTypes<typeof button_props>
