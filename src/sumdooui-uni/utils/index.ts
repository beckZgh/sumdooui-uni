import * as is from './is'
import * as dt from './dt'
import { sleep } from './sleep'

/** 转换单位 */
function toUnit(val: string | number, unit = 'rpx') {
    return is.isNumber(val) ? `${ val }${ unit }` : val
}

export default {
    ...is,
    dt,
    toUnit,
    sleep,
}
