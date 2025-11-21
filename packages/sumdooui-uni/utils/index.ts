import * as is from './is'
import * as dt from './dt'
import * as obj from './obj'
import { clone } from './clone'
import { sleep } from './sleep'

/** 转换单位 */
function toUnit(val: string | number | undefined, unit = 'rpx') {
    return is.isNumber(val) ? `${ val }${ unit }` : val
}

export function getCurrentPage<T>() {
    const pages = getCurrentPages()
    return pages[pages.length - 1] as T & Page.PageInstance
}

export {
    dt,
}

export default {
    ...is,
    dt,
    obj,
    toUnit,
    clone,
    getCurrentPage,
    sleep,
}
