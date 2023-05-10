import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export interface FooterLink {
    name: string
    url?: string
    openType?: 'navigateTo' | 'reLaunch' | 'switchTab' | 'redirectTo'
}

export const footer_props = {
    ...COMMON_PROPS,

    /** 描述文本 */
    text               : { type: String  },
    /** 底部链接 */
    links              : { type: Array as PropType<FooterLink[]>, default: () => [] },
    /** 固定底部 */
    isFixed            : { type: Boolean },
    /** 预留安全底部区域 */
    safeAreaInsetBottom: { type: Boolean, default: true },
}

export type FooterProps = ExtractPropTypes<typeof footer_props>
