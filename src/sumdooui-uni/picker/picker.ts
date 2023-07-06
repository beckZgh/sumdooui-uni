import type { PropType, ExtractPropTypes } from 'vue'

export type PickerOptionItem = { label: string; value: string; children?: PickerOptionItem[]; [key: string]: any }

export const picker_props = {
    /** 显示隐藏开关 */
    visible     : { type: Boolean, default: false },
    /** 默认选中值 */
    defaultValue: { type: [String, Number, Array] as PropType<string | number | (string | number)[]> },
    /** 标题 */
    title       : { type: String, default: '请选择' },
    /** 取消文本 */
    cancelText  : { type: String, default: '取消' },
    /** 确认文本 */
    confirmText : { type: String, default: '确认' },
    /** 数据源 */
    options     : { type: [Object, Array] as PropType<PickerOptionItem | PickerOptionItem[] | PickerOptionItem[][]>, default: () => [] },
    /** 自动检测 children 联动，无需联动时可设置 false，则不进行查找 */
    autoColumn  : { type: Boolean, default: true },
}

export type PickerProps = ExtractPropTypes<typeof picker_props>
