import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'


import { COMMON_PROPS } from '../common/props'

export const pull_refresh_props = {
    ...COMMON_PROPS,

    /** 内容区域自定义样式 */
    contentStyle       : { type: Object as PropType<CSSProperties> },
    /** 刷新函数 */
    onRefresh          : { type: Function as PropType<() => Promise<{ ok: boolean }>> },
    /** 禁用刷新 */
    disabled           : { type: Boolean, default: false },
    /** 下拉过程提示文案 */
    pullingText        : { type: String, default: '下拉刷新数据' },
    /** 释放过程提示文案 */
    loosingText        : { type: String, default: '释放即可刷新' },
    /** 加载过程中提示文案 */
    loadingText        : { type: String, default: '加载中...' },
    /** 刷新成功文案 */
    successText        : { type: String, default: '刷新成功' },
    /** 显示刷新成功文案 */
    showSuccessText    : { type: Boolean, default: true  },
    /** 刷新成功文案显示时长 */
    successDuration    : { type: Number, default: 500 },
    /** 触发下拉刷新的距离 */
    pullDistance       : { type: Number, default: 50 },
    /** 距离右侧或底部的距离触发 scrolltolower 事件 */
    lowerThreshold     : { type: [String, Number], default: 50 },
    /** 滚动动画 */
    scrollWithAnimation: { type: Boolean, default: false },
}

export type PullRefreshProps = ExtractPropTypes<typeof pull_refresh_props>
