
import type { PropType, ExtractPropTypes } from 'vue'
import type { BadgeProps } from '../badge/badge'

export type TabbarItem = {
    name        : string
    icon       ?: string
    activeIcon ?: string
    image      ?: string
    activeImage?: String
    badge      ?: number
    dot        ?: boolean
    badgeProps ?: Omit<BadgeProps, 'badge' | 'dot'>
    [key: string]: any
}

export const tabbar_props = {
    /** 绑定值 */
    modelValue   : { type: [Number, String] },
    /** 图标或图片模式 */
    type         : { type: String as PropType<'icon' | 'image'>, default: 'icon' },
    /** 标签选项 */
    items        : { type: Array as PropType<TabbarItem[]>, default: () => [] },
    /** 激活的颜色 */
    activeColor  : { type: String  },
    /** 未激活的颜色 */
    inactiveColor: { type: String  },
    /** 固定在底部 */
    fixed        : { type: Boolean },
    /** 使用占位元素 */
    placeholder  : { type: Boolean, default: true },
    /** 层叠值 */
    zIndex       : { type: Number  },
    /** 显示顶部边框 */
    showTopBorder: { type: Boolean },
    /** 切换前的回调函数 */
    beforeChange : { type: Function },
}

export type TabbarProps = ExtractPropTypes<typeof tabbar_props>
