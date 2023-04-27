import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export type ImageMode     = 'scaleToFill' | 'apectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
export type ImageShape    = 'round' | 'circle'
export type ImageFit      = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ImagePosition = 'center' | 'top' | 'bottom' | 'left' | 'right'

export const image_props = {
    ...COMMON_PROPS,

    /** 图片路径 */
    src               : { type: String },
    /** 图片展示模式 */
    mode              : { type: String as PropType<ImageMode>, default: 'scaleToFill' },
    /** 图片模式 */
    fit               : { type: String as PropType<ImageFit>, default: 'fill' },
    /** 图片位置 */
    position          : { type: String as PropType<ImagePosition>, default: 'center' },
    /** 懒加载 */
    lazyload          : { type: Boolean },
    /** 图片形状 */
    shape             : { type: String as PropType<ImageShape> },
    /** 显示图片加载中 */
    showLoading       : { type: Boolean, default: true },
    /** 显示图片异常 */
    showError         : { type: Boolean, default: true },
    /** 图片宽度 */
    width             : { type: [String, Number] },
    /** 图片高度，支持设置百分比则按比例展示 */
    height            : { type: [String, Number] },
    /** 图片圆角自定义 */
    radius            : { type: [String, Number] },
    /** 点击预览图片 */
    previewOnClick    : { type: Boolean },
    /** webp 格式解析 */
    webp              : { type: Boolean },
    /** 长按图片菜单 */
    showMenuByLongress: { type: Boolean },
}

export type ImageProps = ExtractPropTypes<typeof image_props>
