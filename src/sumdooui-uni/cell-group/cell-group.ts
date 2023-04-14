import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const cell_group_props = {
    ...COMMON_PROPS,

    /** 标题 */
    title     : { type: String, default: ''               },
    /** 标题自定义样式 */
    titleStyle: { type: Object as PropType<CSSProperties> },
}

export type CellGroupProps = ExtractPropTypes<typeof cell_group_props>
