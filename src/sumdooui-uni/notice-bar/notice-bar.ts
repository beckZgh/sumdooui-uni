import type { ExtractPropTypes, PropType } from 'vue'
import type { Component } from '../common/types'
import { COMMON_PROPS } from '../common/props'

export const notice_bar_props = {
    ...COMMON_PROPS,

    /** 主题 */
    theme     : { type: String as PropType<Component.Theme>, default: 'warning' },
    /** 文本内容 */
    content   : { type: [String, Array] },
    /** 滚动方向 */
    direction : { type: String as PropType<'horizontal' | 'vertical'> },
    /** 前置图标 */
    prefixIcon: { type: String },
    /** 是否换行 */
    wrapable  : { type: Boolean, default: false },
    /** 内容超出区域，进行滚动 */
    scrollable: { type: Boolean, default: true },
    /** 滚动速率(px/s) */
    speed     : { type: Number, default: 60 },
    /** 动画延迟时间 */
    delay     : { type: Number, default: 1 },
    /** 自定义背景色 */
    background: { type: String },
    /** 自定义颜色 */
    color     : { type: String },
    /** 是否显示关闭按钮 */
    closeable : { type: Boolean },
}

export type NoticeBarProps = ExtractPropTypes<typeof notice_bar_props>
