/**
 * 浅克隆
 * v25.11.18
 */
export function clone(value: any) {
    // 非对象类型（包括 null）直接返回
    if (value == null || typeof value !== 'object') {
        return value
    }

    // 处理 Date
    if (value instanceof Date) {
        return new Date(value.getTime())
    }

    // 处理 RegExp
    if (value instanceof RegExp) {
        const flags = value.flags || (value.global ? 'g' : '') + (value.ignoreCase ? 'i' : '') + (value.multiline ? 'm' : '')
        return new RegExp(value.source, flags)
    }

    // 处理 Array
    if (Array.isArray(value)) {
        return value.slice() // 或 [...value]
    }

    // 处理普通 Object（包括 Object.create(null) 等）
    if (typeof value === 'object') {
        return Object.assign(Object.create(Object.getPrototypeOf(value)), value)
    }

    // 其他情况（如函数、Symbol 等）
    // lodash.clone 会直接返回函数本身（函数视为不可变）
    return value
}

/**
 * 深度克隆
 * v25.11.18
 */
export function cloneDeep(value: any, visited = new WeakMap()) {
    // 基本类型或 null 直接返回
    if (value === null || typeof value !== 'object') {
        return value
    }

    // 处理循环引用：如果已克隆过，直接返回缓存的副本
    if (visited.has(value)) {
        return visited.get(value)
    }

    // Date
    if (value instanceof Date) {
        const copy = new Date(value.getTime())
        visited.set(value, copy)
        return copy
    }

    // RegExp
    if (value instanceof RegExp) {
        const flags = value.flags || (value.global    ? 'g' : '')
                                  + (value.ignoreCase ? 'i' : '')
                                  + (value.multiline  ? 'm' : '')
                                  + (value.dotAll     ? 's' : '')
                                  + (value.unicode    ? 'u' : '')
                                  + (value.sticky     ? 'y' : '')
        const copy = new RegExp(value.source, flags)
        visited.set(value, copy)
        return copy
    }

    // Map
    if (value instanceof Map) {
        const copy = new Map()
        visited.set(value, copy)
        for (const [k, v] of value) {
            copy.set(cloneDeep(k, visited), cloneDeep(v, visited))
        }
        return copy
    }

    // Set
    if (value instanceof Set) {
        const copy = new Set()
        visited.set(value, copy)
        for (const v of value) {
            copy.add(cloneDeep(v, visited))
        }
        return copy
    }

    // ArrayBuffer / TypedArray（简单处理）
    if (ArrayBuffer.isView(value)) {
        return new (value.constructor as any)(value)
    }
    if (value instanceof ArrayBuffer) {
        return value.slice(0)
    }

    // 函数：lodash.cloneDeep 会直接返回原函数（不复制）
    if (typeof value === 'function') {
        return value
    }

    // 普通对象或数组
    const copy: any = Array.isArray(value) ? [] : {}
    visited.set(value, copy)

    // 递归拷贝所有自有可枚举属性（包括 symbol 键）
    const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)]
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            copy[key] = cloneDeep(value[key], visited)
        }
    }

    return copy
}
