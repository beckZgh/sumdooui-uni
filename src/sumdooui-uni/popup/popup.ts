import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'
import { COMMON_PROPS } from '../common/props'

type PopupPosition = 'left' | 'right' | 'top' | 'bottom' | 'center'
type BeforeCloseFn = () => boolean | Promise<boolean>

export const popup_props = {
    ...COMMON_PROPS,

    /** 显示绑定值 */
    visible            : { type: Boolean, default: false },
    /** 弹出位置 */
    position           : { type: String as PropType<PopupPosition>, default: 'bottom' },
    /** 弹出层标题 */
    title              : { type: String },
    /** 显示顶部关闭按钮 */
    showTopClose       : { type: Boolean },
    /** 显示顶部关闭按钮 */
    showBottomClose    : { type: Boolean },
    /** 自定义类名 */
    overlayClass       : { type: [Object, String] },
    /** 自定义样式 */
    overlayStyle       : { type: Object as PropType<CSSProperties> },
    /** 显示遮罩层 */
    overlay            : { type: Boolean, default: true },
    /** 点击遮罩层关闭 */
    closeOnClickOverlay: { type: Boolean, default: true },
    /** 显示圆角 */
    round              : { type: Boolean, default: true },
    /** 弹出层宽度 */
    width              : { type: [Number, String] },
    /** 最大滚动区域 */
    maxHeight          : { type: [Number, String], default: '60vh' },
    /** 开启手势关闭 */
    // gestureCloseable: { type: Boolean, default: false },
    /** 动画时间 (s) */
    duration           : { type: Number },
    /** 是否可滚动 */
    scrollable         : { type: Boolean, default: true },
    /** 关闭时，销毁其中的元素 */
    // destroyOnclose  : { type: Boolean, default: false },
    /** 层叠值 */
    zIndex             : { type: Number },
    /** 是否锁定背景滚动 */
    lockScroll         : { type: Boolean, default: false },
    /** 关闭前回调 */
    beforeClose        : { type: Function as PropType<BeforeCloseFn> },
    /** 开启底部安全区域适配 */
    safeAreaInsetBottom: { type: Boolean, default: true },
}

export type PopupProps = ExtractPropTypes<typeof popup_props>
