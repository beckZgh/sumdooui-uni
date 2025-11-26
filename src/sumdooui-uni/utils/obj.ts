
/**
 * 取得指定路径的对象值
 * v25.11.18
 */
export function get(obj?: Record<string, any>, path?: string, defaultValue = undefined) {
    // 无效数据不处理
    if (!obj || !path) return defaultValue

    // 将路径统一转换为数组
    const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split('.')

    let result = obj
    for (const key of keys) {
        if (result == null || typeof result !== 'object') {
            return defaultValue
        }
        result = result[key]
    }

    return result !== undefined ? result : defaultValue
}

/**
 * 设置指定路径的对象值 (修改原有对象)
 * v25.11.18
 */
export function set(obj: Record<string, any>, path: string, value: any) {
    if (obj == null) return obj // null 或 undefined 时直接返回

    // 标准化路径为字符串数组，处理 a[0].b 形式
    const keys = Array.isArray(path)
        ? path.map(String)
        : path.replace(/\[(\d+)\]/g, '.$1').split('.')

    let current = obj

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const isLast = i === keys.length - 1

        // 如果是最后一级，直接赋值并退出
        if (isLast) {
            current[key] = value
            break
        }

        // 下一个 key 决定当前应是对象还是数组
        const nextKey = keys[i + 1]
        const isNextIndex = /^\d+$/.test(nextKey)

        // 如果 current[key] 不存在或类型不对，创建合适的容器
        if (current[key] == null) {
            current[key] = isNextIndex ? [] : {}
        } else if (
            typeof current[key] !== 'object'
      || (Array.isArray(current[key]) !== isNextIndex)
        ) {
            // 类型不匹配（比如原来是字符串，或数组/对象用反了），覆盖为新容器
            current[key] = isNextIndex ? [] : {}
        }

        current = current[key]
    }

    return obj // lodash.set 返回原对象（已修改）
}

/**
 * 取得指定 key 的值
 * v25.11.26
 */
export function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
    const o = {} as T
    Object.entries(obj).forEach(([k, v]) => {
        const _k = k as K
        if (!keys.includes(_k)) return
        o[_k] = v
    })
    return o
}

/**
 * 排除指定 key 的值
 * v25.11.26
 */
export function omit<T extends Object, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K> {
    const o = {} as T
    Object.entries(obj).forEach(([k, v]) => {
        const _k = k as K
        if (keys.includes(_k)) return
        o[_k] = v
    })
    return o
}

