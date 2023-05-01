/**
 * 使用选择器查询
 */
import { getCurrentInstance } from 'vue'

export type NodeInfo = { top: number; height: number }

export function useSelectoryQuery(in_page = false) {
    const instance = getCurrentInstance()
    const query = in_page ? uni.createSelectorQuery() : uni.createSelectorQuery().in(instance)

    // 读取节点高度
    function queryNodeWidth(selector: string): Promise<number> {
        return new Promise((resolve) => {
            if (!query) return resolve(0)

            query.select(selector).fields({ size: true }, (_rect) => {
                const rect = _rect as UniNamespace.NodeInfo
                resolve(rect ? (rect.width || 0) : 0)
            }).exec()
        })
    }

    // 读取节点高度
    function queryNodeHeight(selector: string): Promise<number> {
        return new Promise((resolve) => {
            if (!query) return resolve(0)

            query.select(selector).fields({ size: true }, (_rect) => {
                const rect = _rect as UniNamespace.NodeInfo
                resolve(rect ? (rect?.height || 0) : 0)
            }).exec()
        })
    }

    // 读取节点高度
    function queryNodeInfo(selector: string): Promise<UniNamespace.NodeInfo> {
        return new Promise((resolve) => {
            if (!query) return resolve({} as UniNamespace.NodeInfo)

            query.select(selector).boundingClientRect((rect) => {
                resolve(rect as UniNamespace.NodeInfo)
            }).exec()
        })
    }

    // 读取节点信息
    function queryNodeInfos(selector: string): Promise<UniNamespace.NodeInfo[]> {
        return new Promise((resolve) => {
            if (!query) return resolve([] as UniNamespace.NodeInfo[])

            query.selectAll(selector).boundingClientRect((rects) => {
                resolve(rects as UniNamespace.NodeInfo[])
            }).exec()
        })
    }

    return {
        instance,
        query,
        queryNodeWidth,
        queryNodeHeight,
        queryNodeInfo,
        queryNodeInfos,
    }
}
