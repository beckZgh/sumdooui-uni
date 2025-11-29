import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const virtual_props = {
    ...COMMON_PROPS,

    // 列表数据源
    list: {
        type    : Array,
        required: true,
        default : () => [],
    },
    // 列表项高度（固定高度传数值，动态高度传函数）
    itemHeight: {
        type    : Number,
        required: true,
        default : 80, // 默认80px
    },
    // 容器高度（如 '500px'/'100%'）
    containerHeight: {
        type   : String,
        default: '100%',
    },
    // 预加载数量（可视区域外提前渲染的项数）
    preLoad: {
        type   : Number,
        default: 5,
    },
}

export type VirtualProps = ExtractPropTypes<typeof virtual_props>
