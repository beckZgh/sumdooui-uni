// 可写入的对象
declare type Writable<T> = {
    -readonly [P in keyof T]: T[P];
}

// 可为 Null 的类型
declare type Nullable<T> = T | null

// key 为 string，值为 T 类型的对象
declare type Recordable<T = any> = Record<string, T>

// key为 string，值为 只读 T 类型的对象
declare interface ReadonlyRecordable<T = any> {
    readonly [key: string]: T
}

// 声明迭代器的类型
declare interface Indexable<T = any> {
    [key: string]: T
}

// 递归所有属性为可选属性
declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
}

// 递归所有属性为必须属性
declare type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>
}

// 递归所有属性为只读属性
declare type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
}

// 默认函数类型
declare type Fn = <T = any, R = T>(...arg: T[]) => R

// 默认异步函数类型
declare type PromiseFn = <T = any, R = T>(...arg: T[]) => Promise<R>

// setTimeout 类型
declare type TimeoutHandle = ReturnType<typeof setTimeout>

// setInterval 类型
declare type IntervalHandle = ReturnType<typeof setInterval>

// 提取函数参数类型
declare type ParamsFnType<T> = T extends (...args: infer P) => any ? P : never

// 提取同步函数返回值类型
declare type ReturnFnType<T> = T extends (...args: any) => infer P ? P : never

// 提取 API 返回数据类型
declare type ReturnApiData<T> = T extends (...args: any) => Promise<infer P> ? (P extends { data: any } ? P['data'] : never) : never

// 提取 API 返回数据类型 v23.11.15
declare type ReturnApiResData<T> = T extends (...args: any) => Promise<infer P> ? (P extends { data: any } ? P['data'] : never) : never

// 提取 API 返回数据类型 v23.11.15
declare type ReturnApiRes<T> = T extends (...args: any) => Promise<infer P> ? P : never

// 提取 API 请求参数类型
declare type ParamsApiReq<T> = T extends (req: infer P) => any ? P : never
