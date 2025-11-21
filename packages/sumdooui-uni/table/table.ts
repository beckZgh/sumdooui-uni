import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import { COMMON_PROPS } from '../common/props'

export interface TableColumn {
    type               ?: 'seq'
    field              ?: string
    title              ?: string
    width              ?: string | number
    minWidth           ?: string | number
    maxWidth           ?: string | number
    align              ?: 'left' | 'center' | 'right'
    headerAlign        ?: 'left' | 'center' | 'right'
    headerCellClass    ?: string | Record<string, any>
    headerCellStyle    ?: string | CSSProperties
    cellClass          ?: string | Record<string, any>
    cellStyle          ?: string | CSSProperties
    showOverflow       ?: boolean
    showHeaderOverflow ?: boolean
    clickable          ?: boolean
    headerClickable    ?: boolean
    formatter          ?: (params: { row: any; rowIndex: number; col: TableColumn; colIndex: number; value: any }) => string | number | boolean
    [k: string]         : any
    // sortable    ?: boolean
}

type TableAlign = 'left' | 'center' | 'right'

export const table_props = {
    ...COMMON_PROPS,

    /** 表格列定义 */
    cols              : { type: Array as PropType<TableColumn[]>, default: () => [] },
    /** 表格数据 */
    rows              : { type: Array as PropType<any[]>, default: () => [] },
    /** 表格高度 */
    height            : { type: [String, Number] },
    /** 最大高度 */
    maxHeight         : { type: [String, Number] },
    /** 显示边框 */
    border            : { type: Boolean },
    /** 自定义单元格内边距 */
    size              : { type: String as PropType<'small' | 'large'> },
    /** 斑马纹 */
    stripe            : { type: Boolean, default: false },
    /** 对齐方式 */
    align             : { type: String as PropType<TableAlign>, default: 'center' },
    /** 表头列对齐方式 */
    headerAlign       : { type: String as PropType<TableAlign> },
    /** 内容溢出显示 */
    showOverflow      : { type: Boolean, default: undefined },
    /** 表头内容溢出显示 */
    showHeaderOverflow: { type: Boolean, default: undefined },
    /** 内容溢出显示 */
    clickable         : { type: Boolean, default: undefined },
    /** 表头内容溢出显示 */
    headerClickable   : { type: Boolean, default: undefined },
    /** 是否显示表头 */
    showHeader        : { type: Boolean, default: true },
    /** 为空时显示的文本 */
    emptyText         : { type: String },
    /** 表头单元格自定义样式 */
    headerCellStyle   : { type: [String, Object, Function] },
    /** 单元格自定义样式 */
    cellStyle         : { type: [String, Object, Function] },
    /** 开启表头吸顶 */
    enableSticky      : { type: Boolean },
    /** 表头吸顶配置 */
    stickyProps       : { type: Object },
}

export type TableProps = ExtractPropTypes<typeof table_props>
