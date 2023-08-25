/**
 * 校验工具函数
 * v22.08.27
 */

const toString = Object.prototype.toString

/** 判断数据类型 */
export function is(val: unknown, type: string): boolean {
    return toString.call(val) === `[object ${ type }]`
}

/** 是否为字符串 */
export function isString(val: unknown): val is string {
    return is(val, 'String')
}

/** 是否为数字 */
export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

/** 是否为布尔值 */
export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

/** 是否为 undefined */
export function isUndefined(val: unknown): val is undefined {
    return typeof val === 'undefined'
}

/** 是否为 null */
export function isNull(val: unknown): val is null {
    return val === null
}

/** 是否为 null or undefined */
export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUndefined(val) || isNull(val)
}

/** 是否为对象 */
export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}

/** 是否为数组 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}

/** 是否为空 */
export function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0
    }

    return false
}

/** 是否为函数 */
export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

/** 是否日期对象 */
export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

/** 是否为正则 */
export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp')
}

/** 是否 Promise 函数 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/** 检查是否路径是否为绝对路径格式 */
export function isAbsolutePath(val: string): boolean {
    return !!val && /^[a-zA-Z]:(([a-zA-Z]*)||([a-zA-Z]*\\))*/.test(val)
}

/** 是否为网址 */
export function isUrl(path: string): boolean {
    const reg
          = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    return reg.test(path)
}

/** 检查是否为 Base64 格式 */
export function isBase64(val: unknown): boolean {
    if (!val || !isString(val)) return false

    const reg = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    return reg.test(val)
}

/** 是否为邮箱 */
export function isEmail(val: string): boolean {
    return !!val && /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(val)
}

/** 检查是否为外链 */
export function isExternal(path: string): boolean {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/** 是否为身份证号码 */
export function isIdCard(val: string | number): boolean {
    return !!val && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(String(val))
}

/** 是否为手机号 */
export function isMobileNumber(val: string | number): boolean {
    return !!val && /^1[3|4|5|7|8][0-9]\d{8}$/.test(String(val))
}
