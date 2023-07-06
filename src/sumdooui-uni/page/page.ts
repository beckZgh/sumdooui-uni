import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import type { NavbarProps  } from '../navbar/navbar'
import type { LoadingProps } from '../loading/loading'
import type { EmptyProps   } from '../empty/empty'

import { COMMON_PROPS } from '../common/props'
export type PageStatus = 'visible' | 'loading' | 'error' | 'noauth'

export const page_props = {
    ...COMMON_PROPS,
    showHeader         : { type: Boolean, default: true              }, // 显示顶部区域
    title              : { type: String                              }, // 导航栏标题
    showBack           : { type: Boolean  , default: true            }, // 显示返回按钮
    showHome           : { type: Boolean  , default: true            }, // 显示首页按钮
    onClickBack        : { type: Function                            }, // 处理返回函数
    navbarProps        : { type: Object as PropType<NavbarProps>     }, // 导航栏组件 Props
    lockScroll         : { type: Boolean  , default: false           }, // 锁定页面滚动
    background         : { type: String                              }, // 页面背景色
    backgroundImage    : { type: String                              }, // 页面背景图片
    loading            : { type: Number   , default: 0               }, // 加载状态
    loadingText        : { type: String   , default: '加载中...'     }, // 加载状态文本
    loadingProps       : { type: Object as PropType<LoadingProps>    }, // 加载状态组件 Props
    error              : { type: String   , default: ''              }, // 页面异常信息
    errorButtonText    : { type: String   , default: '刷新一下'      }, // 页面异常按钮文本
    emptyProps         : { type: Object as PropType<EmptyProps>      }, // 页面异常组件 Props
    safeAreaInsetBottom: { type: Boolean, default: true              }, // 底部安全区域展示
    // -------------------------------------------------------------------
    headerClass        : { type: [String, Object] as PropType<string | Record<string, boolean>> },
    headerStyle        : { type: Object as PropType<CSSProperties> },
    bodyClass          : { type: [String, Object] as PropType<string | Record<string, boolean>> },
    bodyStyle          : { type: Object as PropType<CSSProperties> },
    footerClass        : { type: [String, Object] as PropType<string | Record<string, boolean>> },
    footerStyle        : { type: Object as PropType<CSSProperties> },
}

export type PageProps = ExtractPropTypes<typeof page_props>
