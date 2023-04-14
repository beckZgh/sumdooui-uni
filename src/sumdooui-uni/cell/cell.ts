import type { PropType, CSSProperties , ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const cell_props = {
    ...COMMON_PROPS,

    /** 标题 */
    title            : { type: String, default: ''               },
    /** 标题自定义样式 */
    titleStyle       : { type: Object as PropType<CSSProperties> },
    /** 副标题 */
    subTitle         : { type: String, default: ''               },
    /** 副标题自定义样式 */
    subTitleStyle    : { type: Object as PropType<CSSProperties> },
    /** 右侧值 */
    value            : { type: String, default: ''               },
    /** 右侧值自定义样式 */
    valueStyle       : { type: Object as PropType<CSSProperties> },
    /** 顶部边框线 */
    topBorder        : { type: Boolean, deafult: false           },
    /** 顶部边框线自定义样式 */
    topBorderStyle   : { type: Object as PropType<CSSProperties> },
    /** 底部边框 */
    bottomBorder     : { type: Boolean, default: false           },
    /** 底部边框自定义样式 */
    bottomBorderStyle: { type: Object as PropType<CSSProperties> },
    /** 是否圆角 */
    round            : { type: Boolean, default: false           },
    /** 是否点击反馈 */
    clickable        : { type: Boolean, default: true            },
    /** 是否显示右侧箭头 */
    arrow            : { type: Boolean, default: false           },
}

export type CellProps = ExtractPropTypes<typeof cell_props>

