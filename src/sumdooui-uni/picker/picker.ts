import type { PropType, ExtractPropTypes } from 'vue'

export type PickerMode       = 'selector' | 'multi-selector'
export type PickerOptionItem = { label: string; value: string; children?: PickerOptionItem[]; [key: string]: any }

export const picker_props = {
    /** 绑定值 */
    modelValue  : { type: Boolean, default: false },
    defaultValue: { type: [String, Number, Array] as PropType<string | number | (string | number)[]> },
    mode        : { type: String as PropType<PickerMode>, default: 'selector' },
    title       : { type: String, default: '请选择' },
    cancelText  : { type: String, default: '取消' },
    confirmText : { type: String, default: '确认' },
    options     : { type: Array as PropType<PickerOptionItem[] | PickerOptionItem[][]>, default: () => [] },
}

export type PickerProps = ExtractPropTypes<typeof picker_props>
