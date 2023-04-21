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
    function queryNodeInfos(selector: string): Promise<NodeInfo[]> {
        return new Promise((resolve) => {
            if (!query) return resolve([])

            query.selectAll(selector).boundingClientRect((rects) => {
                const first_top = (rects as UniNamespace.NodeInfo[])[0]?.top || 0
                const node_info = (rects as UniNamespace.NodeInfo[]).map((item) => {
                    return { height: +(item.height || 0).toFixed(0), top: +((item.top || 0) - first_top).toFixed(0) }
                })

                // 多补充一项，用于进行比较
                const len = node_info.length
                if (len) {
                    const last_item = node_info[len - 1]
                    node_info.push({
                        height: 0,
                        top   : +(last_item.top + last_item.height).toFixed(0),
                    })
                }

                resolve(node_info)
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
