import type { InjectionKey } from 'vue'
import type { RadioGroupProps } from './radio-group2'

type RadioGroupProvide = {
    props      : RadioGroupProps
    updateValue: (value: string | number | boolean) => void
    isChecked  : (value: any) => boolean
}

export const radioGroupKey: InjectionKey<RadioGroupProvide> = Symbol('radio-group')

