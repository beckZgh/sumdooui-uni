import type { PropType, ExtractPropTypes } from 'vue'
import type { Component } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export const button_props = {
    ...COMMON_PROPS,

    /** 预设按钮主题 */
    type            : { type: String as PropType<Component.Type> },
    /** 按钮尺寸 */
    size            : { type: String as PropType<Component.Size> },
    /** 椭圆按钮 */
    round           : { type: Boolean, default: false },
    /** 圆角按钮 */
    circle          : { type: Boolean, default: false },
    /** 朴素按钮 */
    plain           : { type: Boolean, default: false },
    /** 幽灵按钮 */
    ghost           : { type: Boolean, default: false },
    /** 文本按钮 */
    text            : { type: Boolean, default: false },
    /** 文本按钮显示背景色 */
    bg              : { type: Boolean, default: false },
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
    buttonText      : { type: String },
    /** 禁用按钮 */
    disabled        : { type: Boolean, default: false },
    // 小程序按钮特殊属性
    // https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    openType        : { type: String as PropType<Component.ButtonOpenType> },
    formType        : { type: String },
    appParameter    : { type: String },
    sessionForm     : { type: String },
    sendMessageTitle: { type: String },
    sendMessagePath : { type: String },
    sendMessageImg  : { type: String },
    showMessageCard : { type: Boolean },
}

export type ButtonProps = ExtractPropTypes<typeof button_props>
