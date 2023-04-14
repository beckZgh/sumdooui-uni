/** 类名 */
export type Classes = string | string[]

/** 样式 */
export interface Styles {
    [css: string]: string | number
}

/** 组件通用类型 */
export type ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'default'

/** 组件通用大小 */
export type ComponentSize = 'small' | 'normal' | 'large'
