/**
 * 日期操作函数
 * v22.08.27
 */

import dayjs from 'dayjs'

export const WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日']
export const FORMAT_DEFAULT      = 'YYYY-MM-DD'   // 默认日期格式化
export const INVALID_DATE_STRING = 'Invalid Date' // 无效日期

/** 是否有效日期 */
export const isValid = (date: string | number | Date) => {
    if (typeof date === 'string' || typeof date === 'number') {
        const d = new Date(date)
        return d.toString() !== INVALID_DATE_STRING
    } else {
        return date.toString() !== INVALID_DATE_STRING
    }
}

/**
  *  日期格式化
  *  ----------------------------------------------------------
  *  占位符 | 输出             | 详情                     |
  *  :-     |  -:              | -:                       |
  *  YY     | 18               | 两位数的年份             |
  *  YYYY   | 2018             | 四位数的年份             |
  *  M      | 1-12             | 月份, 从 1 开始          |
  *  MM     | 01-12            |  月份, 两位数            |
  *  MMM    | Jan-Dec          | 缩写的月份名称           |
  *  MMMM   | January-December | 完整的月份名称           |
  *  D      | 1-31             | 月份里的一天             |
  *  DD     | 01-31            | 月份里的一天, 两位数     |
  *  d      | 0-6              | 一周中的一天, 星期天是 0 |
  *  dd     | Su-Sa            | 最简写的星期几           |
  *  ddd    | Sun-Sat          | 简写的星期几             |
  *  dddd   | Sunday-Saturday  | 星期几                   |
  *  H      | 0-23             | 小时                     |
  *  HH     | 00-23            | 小时, 两位数             |
  *  h      | 1-12             | 小时, 12 小时制          |
  *  hh     | 01-12            | 小时, 12 小时制, 两位数  |
  *  m      | 0-59             | 分钟                     |
  *  mm     | 00-59            | 分钟, 两位数             |
  *  s      | 0-59             | 秒                       |
  *  ss     | 00-59            | 秒, 两位数               |
  *  SSS    | 000-999          | 毫秒, 三位数             |
  *  Z      | +05:00           | UTC 的偏移量, ±HH:mm     |
  *  ZZ     | +05:00           | UTC 的偏移量, ±HH:mm     |
  *  A      | AM，PM           |                          |
  *  a      | am, pm           |                          |
  */
export function format(date: string | number | Date, format?: string): string {
    return dayjs(date).format(format || FORMAT_DEFAULT)
}

// 获取天
export function getDay(date: string | number | Date): number {
    return new Date(date).getDate()
}

/** 获取月 */
export function getMonth(date: string | number | Date): number {
    return new Date(date).getMonth() + 1
}

/** 获取年 */
export function getYear(date: string | number | Date): number {
    return new Date(date).getFullYear()
}

/** 获取今天的日期 */
export function getToday(): string {
    return format(new Date())
}

/** 转换为 Date 对象 */
export function toDate(date: string | number | Date): Date | null {
    let d: Date

    // 兼容 ios 只支持 “/”
    if (typeof date === 'string') {
        date = date.replace(/-/g, '/')
        d    = new Date(date)
    } else if (typeof date === 'number') {
        d = new Date(date)
    } else {
        d = date
    }

    return isValid(d) ? d : null
}

/** 根据年月日创建新日期 */
export function newDate(y: number, m: number, d: number) {
    return format(new Date(y, m - 1, d))
}

/** 上日 (可前进多日) */
export function prevDate(date: string | number | Date, amount = 1) {
    const d = new Date(date)
    d.setDate(d.getDate() - amount)
    return format(d)
}

/** 下日 (可后退多日) */
export function nextDate(date: string | number | Date, amount = 1) {
    const d = new Date(date)
    d.setDate(d.getDate() + amount)
    return format(d)
}

/**  返回星期几的数字, 星期日默认返回 7  */
export function getWeekday(date: string | number | Date, sunday_number = 7) {
    const w = new Date(date).getDay()
    return w === 0 ? sunday_number : w
}

/**  返回星期几中文标识 */
export function getWeekName(date: string | number | Date): string {
    const weekday = getWeekday(date, 7) - 1
    if (weekday < 0 || weekday > 6) {
        throw new Error(`[dt.getWeekName]: 无效的星期 => ${ weekday }`)
    }
    return WEEK_DAYS[weekday]!
}

/** 周的第一天 */
export function firstDateOfWeek(date: string | number | Date) {
    const day = getWeekday(date)
    return prevDate(date, day - 1)
}

/** 周的最后一天 */
export function lastDateOfWeek(date: string | number | Date) {
    const day = getWeekday(date)
    return nextDate(date, 7 - day)
}

/** 获取当前周为一年的第几周 */
export function getWeekNumberOfYear(date: Date): number | null {
    if (!isValid(date)) return null

    const d = new Date(date.getTime())
    d.setHours(0, 0, 0, 0)
    d.setDate(date.getDate() + 3 - ((d.getDay() + 6) % 7))
    const week1 = new Date(date.getFullYear(), 0, 4)

    return (
        1
         + Math.round(
             ((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7,
         )
    )
}

/** 获取月份第一天星期几 */
export const getFirstDayOfMonth = function (date: Date) {
    const temp = new Date(date.getTime())
    temp.setDate(1)
    return temp.getDay()
}

/** 月的第一天 */
export function firstDateOfMonth(date: string | number | Date) {
    const y = getYear(date)
    const m = getMonth(date)
    return newDate(y, m, 1)
}

/** 月的最后一天 */
export function lastDateOfMonth(date: string | number | Date) {
    const y = getYear(date)
    const m = getMonth(date)
    return newDate(y, m + 1, 0)
}

/** 上月同日 */
export function prevMonthSameDate(date: string | number | Date) {
    const y = getYear(date)
    const m = getMonth(date) - 1
    const d = getDay(date)

    date = newDate(y, m, d)

    const Y = getYear(date)
    const M = getMonth(date)
    if (y * 12 + m === Y * 12 + M) return date

    return newDate(y, m + 1, 0)
}

/** 下月同日 */
export function nextMonthSameDate(date: string | number | Date) {
    const y = getYear(date)
    const m = getMonth(date) + 1
    const d = getDay(date)

    date = newDate(y, m, d)

    const Y = getYear(date)
    const M = getMonth(date)
    if (y * 12 + m === Y * 12 + M) return date

    return newDate(y, m + 1, 0)
}

/** 获得指定月的天数 */
export function getMonthDays(y: number, m: number) {
    const d1 = new Date(newDate(y, m, 1))
    const d2 = new Date(newDate(y, m + 1, 1))
    return (Number(d2) - Number(d1)) / (1000 * 60 * 60 * 24)
}

/**
  * 获取起始日期与结束日期的天数和
  *
  * 示例:
  * ```javascript
  * dt.getDiffDays('2022-08-27', '2022-08-28') => 1
  * ```
  */
export function getDiffDays(start_date: string | number | Date, end_date: string | number | Date) {
    start_date = new Date(start_date)
    end_date   = new Date(end_date)
    return (Number(end_date) - Number(start_date)) / (1000 * 60 * 60 * 24)
}
