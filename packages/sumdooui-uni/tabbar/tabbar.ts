
import type { PropType, ExtractPropTypes } from 'vue'
import type { TabbarItemProps } from '../tabbar-item/tabbar-item'

import { COMMON_PROPS } from '../common/props'

export type TabbarItem = (TabbarItemProps & { [key: string]: any })
export const tabbar_props = {
    ...COMMON_PROPS,

    /** 绑定值 */
    modelValue   : { type: [Number, String] },
    /** 文本模式 */
    text         : { type: Boolean },
    /** 圆角显示 */
    round        : { type: Boolean },
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
