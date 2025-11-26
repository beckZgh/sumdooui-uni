import type { Picker2Props } from './picker2'

export type HookMethods = {
    onCancel     ?: () => void
    onConfirm    ?: (params: { selectedItems: any[]; selectedLabels: (string | number)[]; selectedValues: any[] }) => void
    onChange     ?: (params: { $pickerCtx: PickerContext; changeColumnIndex: number; selectedIndexs: number[] }) => void
    onPickerStart?: (params: { $pickerCtx: PickerContext }) => void
    onPickerEnd  ?: (params: { $pickerCtx: PickerContext }) => void
}

export type OpenMethodParams = Partial<Picker2Props> & HookMethods

export type PickerContext = {
    getColumnItems: <T extends number>(column_index: T) => T extends number ? any[] : any[][]
    setColumnItems: (column_index: number, items: any[]) => void
    setColumnIndex: (column_idx: number, value_index: number) => void
    open          : (params: OpenMethodParams) => void
    close         : () => void
}
