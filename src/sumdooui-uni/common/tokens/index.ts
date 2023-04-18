import type { GridProps } from '../../grid/grid'
import type { RowProps  } from '../../row/row'

export const PAGE_KEY   = Symbol('page')
export type PageProvide = { navbar_height: number }

export const GRID_KEY = Symbol('grid')
export type GridProvide = { props: GridProps }

export const ROW_KEY = Symbol('row')
export type RowProvide = { props: RowProps }
