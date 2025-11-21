import type { RuleItem as _RuleItem } from '../utils/async-validator'

export namespace FormTypes {
    /** 标题显示位置 */
    export type LalbePosition = 'left' | 'right' | 'top'

    /** 显示错误类型 */
    export type ErrorType = 'none' | 'message' | 'border-bottom'

    /** 校验规则项 */
    export type RuleItem = _RuleItem

    /** 默认回调函数的参数列表 */
    export type CallbackParams = {
        $model: Record<string, any>
        $field: string
        $value: any
    }

    /** 交互事件回调函数的参数列表 */
    export type EventCallbackParams<T = any> = CallbackParams & { $event: T }

    /** 校验错误信息项 */
    export type RuleErrorItem = { message: string; fieldValue: any; field: string }
}

/** 表单注入环境上下文 */
export interface FormContext {
    validate      : (cb?: (erros: FormTypes.RuleErrorItem[]) => void) => Promise<boolean>
    validateFields: (props?: string | string[], cb?: (erros: FormTypes.RuleErrorItem[]) => void) => Promise<boolean>
    resetFields   : (props?: string | string[]) => Promise<void>
    clearValidate : () => Promise<void>
}
