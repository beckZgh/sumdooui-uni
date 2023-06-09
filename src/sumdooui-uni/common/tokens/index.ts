import type { ComponentInternalInstance, SetupContext } from 'vue'
import type { PageProps      } from '../../page/page'
import type { GridProps      } from '../../grid/grid'
import type { CellGroupProps } from '../../cell-group/cell-group'
import type { RowProps       } from '../../row/row'
import type { CollapseProps  } from '../../collapse/collapse'
import type { CheckboxGroupProps } from '../../checkbox-group/checkbox-group'
import type { RadioGroupProps } from '../../radio-group/radio-group'
import type { FormProps } from '../../form/form'
import type { FormItemProps } from '../../form-item/form-item'
import type { TabbarProps } from '../../tabbar/tabbar'
import type { TabbarItemProps } from '../../tabbar-item/tabbar-item'

export const PAGE_KEY   = Symbol('page')
export type PageProvide = {
    instance: ComponentInternalInstance
    props: PageProps
    isFirstPage: () => boolean
    getPageHeaderHeight: () => number
}

export const COLLAPSE_KEY = Symbol('collapse')
export type CollapseProvide = {
    props: CollapseProps
    onChange: (instance: ComponentInternalInstance, open: boolean, index: number | string) => void
}

export const GRID_KEY = Symbol('grid')
export type GridProvide = { props: GridProps; emit: SetupContext['emit'] }

export const ROW_KEY = Symbol('row')
export type RowProvide = { props: RowProps }

export const CHECKBOX_GROUP_KEY = Symbol('chekcbox-group')
export type CheckboxGroupProvide = {
    props: CheckboxGroupProps
    onChange: (checked: boolean, value: string | number | boolean) => void
    disabled: boolean
}

export const RADIO_GROUP_KEY = Symbol('radio-group')
export type RadioGroupProvide = {
    props: RadioGroupProps
    onChange: (value: string | number | boolean) => void
}

export const FORM_KEY = Symbol('form')
export type FormProvide = {
    props: FormProps
}

export const FORM_ITEM_KEY = Symbol('field')
export type FormItemProvide = {
    props: FormItemProps
    validate: (trigger: string | string[]) => void
}

export const CELL_GROUP_KEY = Symbol('cell-group')
export type CellGroupProvide = { props: CellGroupProps }

export const TABBLE_KEY = Symbol('tabbar')
export type TabbarProvide = {
    props: TabbarProps
    onChange: (item: TabbarItemProps) => void
}
