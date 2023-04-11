const TIMERS: Record<string, ReturnType<typeof setTimeout>> = {}

/**
 * 延迟执行
 *
 * @param time 延迟时间 (ms)
 * @param key 可用于删除指定 `key` 的 `timer`
 */
export function sleep(time: number, key?: string) {
    // 清除相同key的timer
    if (key) {
        const timer = TIMERS[key]
        if (timer) {
            clearTimeout(timer)
            delete TIMERS[key]
        }
    }

    // 未指明时间
    if (!time) return Promise.resolve(true)

    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            if (!key) {
                resolve(true)
            }
            else if (TIMERS[key] === timer) {
                delete TIMERS[key]
                resolve(true)
            }
        }, time)

        if (key) {
            TIMERS[key] = timer
        }
    })
}
