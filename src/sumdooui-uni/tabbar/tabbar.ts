
import type { PropType, ExtractPropTypes } from 'vue'

export type TabbarItem = {
    name       : string
    icon      ?: string
    activeIcon?: string
    badge     ?: number
    dot       ?: boolean
}

export const tabbar_props = {
    /** 绑定值 */
    modelValue   : { type: [Number, String] },
    /** 标签选项 */
    items        : { type: Array as PropType<TabbarItem[]>, default: () => [] },
    /** 激活的颜色 */
    activeColor  : { type: String  },
    /** 未激活的颜色 */
    inactiveColor: { type: String  },
    /** 固定在底部 */
    fixed        : { type: Boolean },
    /** 层叠值 */
    zIndex       : { type: Number  },
    /** 显示顶部边框 */
    showTopBorder: { type: Boolean },
}

export type TabbarProps = ExtractPropTypes<typeof tabbar_props>
