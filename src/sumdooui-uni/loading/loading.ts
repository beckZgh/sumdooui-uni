import type { PropType, ExtractPropTypes } from 'vue'

type IconType = 'circle' | 'line' | 'image' | 'meet'
type IconScene = 'page' | 'local' | 'auto'
type IconDirection = 'row' | 'column'

export const loading_props = {
    /** loading 类型 */
    type      : { type: String as PropType<IconType>, default: 'circle' },
    /** 场景 */
    scene     : { type: String as PropType<IconScene>, default: 'local' },
    /** 高度 */
    height    : { type: [Number, String] },
    /** 背景颜色 */
    background: { type: String },
    /** 颜色 */
    color     : { type: String },
    /** 加载文本 */
    text      : { type: String },
    /** 排列方向 */
    direction : { type: String as PropType<IconDirection>, default: 'row' },
}

export type LoadingProps = ExtractPropTypes<typeof loading_props>
