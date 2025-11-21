import type { FormItemProps } from '@/sumdooui-uni/form-item/form-item'

/** 默认回调函数的参数列表 */
export type CallbackParams = {
    $model : Record<string, any>
    $field?: string
    $value : any
    $config: FieldConfig
}

/** 交互事件回调函数的参数列表 */
export type EventCallbackParams<T = any> = CallbackParams & { $event: T }

/** 配置路由跳转选择 */
export type FieldRouteInfo = {
    path          : string
    type    ?     : 'push' | 'replace'
    eventName?    : string   // 全局页面通讯事件名称
    onEventUpdate?: (params: any) => void
    events?       : Record<string, any> // 跳转页面可调用该回调进行更新
    success?      : (res: any) => void // 向跳转页面传递数据
}

/** 表单控件配置 */
export interface FieldConfig {
    id              ?: string
    field           ?: string
    value           ?: any
    tag             ?: string
    arrow           ?: boolean                           // 显示右侧箭头
    label           ?: string  | ((params: CallbackParams) => string)
    required        ?: boolean | ((params: CallbackParams) => boolean)
    rules           ?: any
    formItem        ?: Partial<FormItemProps>
    options         ?: any[]
    props           ?: Record<string, any>
    placeholder     ?: string | ((parmas: CallbackParams) => string)
    disabled        ?: boolean | ((params: CallbackParams) => boolean)
    hidden          ?: boolean | ((params: CallbackParams) => boolean)
    events          ?: Record<string, (params: EventCallbackParams) => void>
    onFormItemClick ?: (params: EventCallbackParams) => void
    onBeforeMount   ?: (params: CallbackParams) => void
    onMounted       ?: (params: CallbackParams) => void
    onBeforeUnmount ?: (params: CallbackParams) => void
    onUnmounted     ?: (params: CallbackParams) => void
}

export type RuleErrorItem = { message: string; fieldValue: any; field: string }

// 定义表单渲染配置
export function defineFormSchema(schema: string, schemaConfig?: Record<string, FieldConfig>): FieldConfig[] {
    return parseFormSchema(schema, schemaConfig)
}

export function parseFormSchema(schema: string, schemaConfig: Record<string, FieldConfig> = {}): FieldConfig[] {
    const schemas  = [] as FieldConfig[]
    const str_list = schema.trim().split('\n').map(str => str.trim())

    let i = 0
    while (i < str_list.length) {
        const str = str_list[i]!

        if (str.startsWith('//') || /^(-){2,2}(?!-)/.test(str)) {
            // 注释
            i += 1
            continue
        } else if (str === '') {
            schemas.push({ tag: 'gap' })
        } else {
            const item = parseFormField(str, schemaConfig)
            if (item) schemas.push(item)
        }

        i += 1
    }

    return schemas
}


// 解析动态表单项
function parseFormField(str: string, schemaConfig: Record<string, FieldConfig>): FieldConfig | null {
    if (!str) return null

    // ---------------------------------------------------------------------------------
    const split_idx = str.indexOf(':')
    const left_str  = split_idx !== -1 ? str.slice(0, split_idx).trim() : ''  // 取得 “：” 左侧字符
    const right_str = split_idx === -1 ? str : str.slice(split_idx + 1).trim() // 取得 “：” 右侧字符
    const label     = left_str.replace('*', '')       // 表单域：标题
    const required  = left_str.includes('*')          // 表单域：是否必填

    let tag   = ''
    let id    = ''
    let field = ''

    const match_1 = right_str.match(/^(([\w.#,-]+)@([\w-]+))$/) // id|field@component-name 模式
    const match_2 = right_str.match(/^(\[([\w.#@,-]+)\])$/)     // [#id|field|@component-name] 模式

    if (match_1) {
        id    = match_1[2].startsWith('#') ? match_1[2] : ''
        field = !id ? match_1[2] : ''
        tag   = match_1[3]
    } else if (match_2) {
        id    = match_2[2].startsWith('#') ? match_2[2] : ''
        tag   = match_2[2].startsWith('@') ? match_2[2] : 'input'
        field = (!id && !tag) ? match_2[2] : ''
    }

    return {
        label,
        required,
        id,
        tag,
        field,
        ...(tag   ? schemaConfig[`@${ tag }`] : undefined),
        ...(id    ? schemaConfig[id]          : undefined),
        ...(field ? schemaConfig[field]       : undefined),
    }
}
