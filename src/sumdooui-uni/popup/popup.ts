import type { ExtractPropTypes , PropType } from 'vue'

type PopupPosition = 'left' | 'right' | 'top' | 'bottom' | 'center'

export const popup_props = {
    /** 显示绑定值 */
    visible         : { type: Boolean, default: false },
    /** 弹出位置 */
    position        : { type: String as PropType<PopupPosition>, default: 'bottom' },
    /** 弹出层标题 */
    title           : { type: String },
    /** 显示顶部关闭按钮 */
    showTopClose    : { type: Boolean, default: undefined },
    /** 显示顶部关闭按钮 */
    showBottomClose : { type: Boolean },
    /** 显示遮罩层 */
    mask            : { type: Boolean, default: true },
    /** 点击 mask 关闭 */
    maskCloseable   : { type: Boolean, default: true },
    /** 显示圆角 */
    round           : { type: Boolean, default: true },
    /** 弹出层宽度 */
    width           : { type: [Number, String] },
    /** 弹出层高度 */
    height          : { type: [Number, String], default: 'auto' },
    /** 最大滚动区域 */
    maxHeight       : { type: [Number, String], default: '60vh' },
    /** 开启手势关闭 */
    gestureCloseable: { type: Boolean, default: false },
    /** 动画时间 (s) */
    duration        : { type: Number, default: 0.3 },
    /** 是否可滚动 */
    scrollable      : { type: Boolean, default: true },
    /** 锁定滚动，不允许穿透滚动 */
    lockScroll      : { type: Boolean, default: false },
}

export type PopupProps = ExtractPropTypes<typeof popup_props>
