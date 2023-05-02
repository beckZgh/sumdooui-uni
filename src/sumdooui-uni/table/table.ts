import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import { COMMON_PROPS } from '../common/props'

export interface TableColumn {
    prop        ?: string
    title       ?: string
    align       ?: 'left' | 'center' | 'right'
    headerAlign ?: 'left' | 'center' | 'right'
    footerAlign ?: 'left' | 'center' | 'right'
    sortable    ?: boolean
    headerClass ?: string | Record<string, any>
    headerStyle ?: string | CSSProperties
    rowClass    ?: string | Record<string, any>
    rowStyle    ?: string | CSSProperties
    colClass    ?: string | Record<string, any>
    colStyle    ?: string | CSSProperties
}

export const table_props = {
    ...COMMON_PROPS,

    /** 表格列定义 */
    columns: { type: Array as PropType<TableColumn[]>, default: () => [] },
    /** 表格数据 */
    data   : { type: Array as PropType<any[]>, default: () => [] },
    /** 表格高度 */
    height : { type: [String, Number] },
}

export type TableProps = ExtractPropTypes<typeof table_props>
