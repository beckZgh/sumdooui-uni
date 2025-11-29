import type { CSSProperties } from 'vue'
import type { Checkbox2Props } from '../checkbox2/checkbox2'

export namespace EcheckboxGroupTypes {
    /** 选项列表项配置 */
    export type OptionItem = {
        label   ?: string | number
        value   ?: string | number | boolean
        disabled?: boolean
        style   ?: CSSProperties
        props   ?: Partial<Checkbox2Props>
        [k: string]: any
    }

    /** 选项列表项属性名配置 */
    export type OptionItemKeys = {
        label      : string
        value      : string
        [k: string]: string
    }

    /**
     * 多选框显示形状
     * square：方形展示
     * circle: 圆形展示
     * button: 按钮样式展示
     * button-check: 按钮样式展示 (含 ✔ 图标)
     */
    export type CheckboxShape = 'square' | 'circle' | 'button' | 'button-check'
}
