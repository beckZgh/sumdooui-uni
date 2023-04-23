import type { ComponentInternalInstance } from 'vue'
import type { PageProps     } from '../../page/page'
import type { GridProps     } from '../../grid/grid'
import type { RowProps      } from '../../row/row'
import type { CollapseProps } from '../../collapse/collapse'
import type { CheckboxGroupProps } from '../../checkbox-group/checkbox-group'

export const PAGE_KEY   = Symbol('page')
export type PageProvide = {
    instance: ComponentInternalInstance
    props: PageProps
    state: { first_page: boolean; navbar_height: number }
}

export const COLLAPSE_KEY = Symbol('collapse')
export type CollapseProvide = {
    props: CollapseProps
    onChange: (instance: ComponentInternalInstance, open: boolean, index: number | string) => void
}

export const GRID_KEY = Symbol('grid')
export type GridProvide = { props: GridProps }

export const ROW_KEY = Symbol('row')
export type RowProvide = { props: RowProps }

export const CHECKBOX_GROUP_KEY = Symbol('chekcbox-group')
export type CheckboxGroupProvide = {
    props: CheckboxGroupProps
    onChange: (checked: boolean, value: string | number | boolean) => void
}
