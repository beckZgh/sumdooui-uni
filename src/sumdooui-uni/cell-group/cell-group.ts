import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const cell_group_props = {
    ...COMMON_PROPS,

    /** 标题 */
    title     : { type: String, default: ''               },
    /** 标题自定义样式 */
    titleStyle: { type: Object as PropType<CSSProperties> },
    /** 内容区域自定义样式 */
    bodyStyle : { type: Object as PropType<CSSProperties> },
    /** 卡片模式 */
    round     : { type: Boolean, default: false },
    /** 显示边框 */
    border    : { type: Boolean, default: false },
    /** 显示右侧箭头 */
    arrow     : { type: Boolean, default: false },
    /** 点击反馈 */
    clickable : { type: Boolean, default: false },
}

export type CellGroupProps = ExtractPropTypes<typeof cell_group_props>
