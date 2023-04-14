import type { PropType, ExtractPropTypes } from 'vue'
import type { NavbarProps } from '../navbar/navbar'

import { COMMON_PROPS } from '../common/props'

export const page_props = {
    ...COMMON_PROPS,

    /** 自动处理路由 */
    autoRoute     : { type: Boolean, default: true },
    /** 显示返回按钮 */
    showBackButton: { type: Boolean, default: true },
    /** 显示首页按钮 */
    showHomeButton: { type: Boolean, default: true },
    /** 显示顶部导航 */
    showNavbar    : { type: Boolean, default: true },
    /** 返回的层数 */
    delta         : { type: Number },
    /** 点击返回按钮处理函数 */
    onClickBack   : { type: Function },
    /** 点击首页按钮处理函数 */
    onClickHome   : { type: Function },
    /** 页面标题 */
    title         : { type: String },
    /** navbar 组件配置 */
    navbarProps   : { type: Object as PropType<NavbarProps> },
    /** 背景色 */
    background    : { type: String },
    /** 页面状态 */
    status        : { type: Number }, // 0 默认展示 1 loading 加载中 -1 加载失败 -2 暂无权限
    /** 页面错误文本 */
    errorText     : { type: String },
    /** 不允许滚动 */
    lockScroll    : { type: Boolean },
}

export type PageProps = ExtractPropTypes<typeof page_props>
