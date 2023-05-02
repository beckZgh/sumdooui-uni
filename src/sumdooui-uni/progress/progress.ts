import type { ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

export const progress_props = {
    ...COMMON_PROPS,

    /** 当前进度  0-100 */
    value     : { type: Number, default: 0 },
    /** 进度条颜色 */
    stokeColor: { type: String },
    /** 进度条宽度 */
    stokeWidth: { type: Number },
    /** 显示进度文本内容 */
    showText  : { type: Boolean, default: true },
    /** 自定义文本 */
    text      : { type: String },
    /** 内显或外显文本内容 */
    textInside: { type: Boolean, default: true },
    /** 文本内容颜色 */
    textColor : { type: String },
}

export type ProgressProps = ExtractPropTypes<typeof progress_props>
