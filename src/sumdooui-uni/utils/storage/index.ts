import { isNumber, isObject } from '../is'

export interface StorageCacheOptions {
    /** 缓存前缀      */ prefixKey?: string
    /** 过期时间 (秒) */ expire   ?: number
}

interface CacheParams {
    /** 缓存值          */ value : any
    /** 当前时间 (毫秒) */ time  : number
    /** 过期时间 (秒)   */ expire: number
}

export class StorageCache {
    private prefixKey: string // 缓存前缀
    private expire   : number // 缓存时效

    // 创建缓存实例
    public static create(opt?: StorageCacheOptions) {
        return new StorageCache(opt)
    }

    public constructor(opt?: StorageCacheOptions) {
        this.prefixKey = opt?.prefixKey ?? ''
        this.expire    = opt?.expire    ?? 0
    }

    /** 缓存数据 */
    public set(key: string, value: any, expire = this.expire): boolean {
        try {
            const stringifyData = JSON.stringify({
                value,
                time: Date.now(),
                expire,
            })

            uni.setStorageSync(this.getKey(key), stringifyData)
            return true
        }
        catch (err) {
            return false
        }
    }

    public get<T = any>(key: string): T | null {
        try {
            const val = uni.getStorageSync(this.getKey(key))
            if ( !val ) return null

            // 不符合存储格式、代表异常数据
            const parseValue: CacheParams = JSON.parse(val)
            if ( !isObject(parseValue) ) {
                this.remove(key)
                return null
            }

            const { value, time, expire } = parseValue
            if ( value === undefined || !isNumber(time) || !isNumber(expire)) {
                this.remove(key)
                return null
            }

            // 检查过期时间
            if (expire && Date.now() > (expire * 1000) + time) {
                this.remove(key)
                return null
            }

            return value
        } catch (error) {
            return null
        }
    }

    public remove(key: string) {
        try {
            uni.removeStorageSync(this.getKey(key))
            return true
        } catch (error) {
            return false
        }
    }

    /** 获取指定前缀的 key 数组 */
    public getKeys() {
        const prefixKey = this.getKey('')
        try {
            return (uni.getStorageInfoSync().keys || []).filter((key) => {
                return key && key.startsWith(prefixKey)
            })
        } catch (error) {
            return []
        }
    }

    /** 清空当前前缀下的所有 key */
    public clear(): void {
        this.getKeys().forEach(key => this.remove(key))
    }

    /** 清空当前前缀下的过期缓存 */
    public clearUp(): void {
        this.getKeys().forEach(key => this.get(key))
    }

    /** 获取缓存 key (含前缀) */
    private getKey(key: string) {
        return key.startsWith(this.prefixKey) ? key : `${ this.prefixKey }:${ key }`
    }
}
