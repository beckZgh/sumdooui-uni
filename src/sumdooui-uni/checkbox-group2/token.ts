import type { InjectionKey } from 'vue'
import type { CheckboxGroup2Props } from './checkbox-group2'

type CheckboxGroupProvide = {
    props      : CheckboxGroup2Props
    updateValue: (checked: boolean, value: string | number | boolean) => void
    isChecked  : (value: any) => boolean
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupProvide> = Symbol('chekcbox-group')

