import type { CSSProperties, PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS  } from '../common/props'

export const navbar_props = {
    ...COMMON_PROPS,

    /** 标题 */
    title       : { type: String },
    /** 标题样式 */
    titleStyle  : { type: Object as PropType<CSSProperties> },
    /** 是否显示返回按钮 */
    leftArrow   : { type: Boolean },
    /** 左侧图标 */
    leftIcon    : { type: String },
    /** 左侧文本 */
    leftText    : { type: String },
    /** 右侧图标 */
    rightIcon   : { type: String },
    /** 右侧文本 */
    rightText   : { type: String },
    /** 固定定位 */
    fixed       : { type: Boolean },
    /** 是否占位 */
    placeholder : { type: Boolean },
    /** 显示底部边框 */
    bottomBorder: { type: Boolean },
    /** 背景色 */
    background  : { type: String },
    /** 文本颜色 */
    color       : { type: String },
}

export type NavbarProps = ExtractPropTypes<typeof navbar_props>
