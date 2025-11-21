import type { CSSProperties , PropType, ExtractPropTypes } from 'vue'

import type { Component } from '../common/types'

import { COMMON_PROPS } from '../common/props'

export const alert_props = {
    ...COMMON_PROPS,

    /** 类型 */
    type            : { type: String as PropType<Component.Type>, default: 'warning' },
    /** 显示辅助图标 */
    showIcon        : { type: Boolean },
    /** 图标 */
    icon            : { type: String },
    /** 图标大小 */
    iconSize        : { type: [Number, String] },
    /** 标题文本 */
    title           : { type: String },
    /** 描述文本 */
    description     : { type: String },
    /** 背景颜色 */
    background      : { type: String },
    /** 文本颜色 */
    color           : { type: String },
    /** 居中显示 */
    center          : { type: Boolean },
    /** 浅色模式 */
    light           : { type: Boolean, default: true },
    /** 可关闭的 */
    closeable       : { type: Boolean, default: false },
    /** 标题自定义样式 */
    titleStyle      : { type: [String, Object] as PropType<string | CSSProperties> },
    /** 描述自定义样式 */
    descriptionStyle: { type: [String, Object] as PropType<string | CSSProperties> },
}

export type AlertProps = ExtractPropTypes<typeof alert_props>
