type UniSuccess<T    = any> = T extends (...args: any) => any ? Required<Parameters<T>>[0] : unknown
type UniResult<T     = any> = Promise<{ ok: true; data: T } | { ok: false; err: string }>
type UniTransform<T> =
        T extends (opt?: any) => any
            ?   (opt?: Omit<Parameters<T>[0], 'success' | 'fail'>) => UniResult<UniSuccess<Required<Parameters<T>[0]>['success']>>
            :       T extends (opt: any) => any
                ?   (opt: Omit<Parameters<T>[0], 'success' | 'fail'>) => UniResult<UniSuccess<Required<Parameters<T>[0]>['success']>>
                :    T

interface Uni {
    $: {
        [K in keyof Omit<UniApp.Uni, '$'>]: UniTransform<UniApp.Uni[K]>
    }
}

