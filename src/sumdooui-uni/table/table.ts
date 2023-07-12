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

type TableAlign = 'left' | 'center' | 'right'

export const table_props = {
    ...COMMON_PROPS,

    /** 表格列定义 */
    columns    : { type: Array as PropType<TableColumn[]>, default: () => [] },
    /** 表格数据 */
    data       : { type: Array as PropType<any[]>, default: () => [] },
    /** 表格高度 */
    height     : { type: [String, Number] },
    /** 最大高度 */
    maxHeight  : { type: [String, Number] },
    /** 显示边框 */
    border     : { type: Boolean },
    /** 斑马纹 */
    stripe     : { type: Boolean, default: true },
    /** 对齐方式 */
    align      : { type: String as PropType<TableAlign>, default: 'center' },
    /** 表头列对齐方式 */
    headerAlign: { type: String as PropType<TableAlign> },
    /** 是否显示表头 */
    showHeader : { type: Boolean },
    /** 为空时显示的文本 */
    emptyText  : { type: String },
}

export type TableProps = ExtractPropTypes<typeof table_props>
