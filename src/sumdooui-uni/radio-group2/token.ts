import type { InjectionKey } from 'vue'
import type { RadioGroup2Props } from './radio-group2'

type RadioGroupProvide = {
    props      : RadioGroup2Props
    updateValue: (value: string | number | boolean) => void
    isChecked  : (value: any) => boolean
}

export const radioGroupKey: InjectionKey<RadioGroupProvide> = Symbol('radio-group')

