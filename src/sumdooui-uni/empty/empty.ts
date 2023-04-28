import type { PropType, ExtractPropTypes } from 'vue'
import type { ImageProps } from '../image/image'
import { COMMON_PROPS } from '../common/props'

export type EmptyType = 'data' | 'order' | 'search' | 'network' | 'news' | 'address'

export const empty_props = {
    ...COMMON_PROPS,

    /** 内置缺省图片 */
    type      : { type: String as PropType<EmptyType>, default: 'data' },
    /** 自定义缺省图片 */
    image     : { type: String },
    /** 自定义缺省图片属性 */
    imageProps: { type: Object as PropType<Omit<ImageProps, 'src'>> },
    /** 文案 */
    text      : { type: String },
    /** 背景色 */
    background: { type: String },
    /** 高度 */
    height    : { type: [String, Number] },
    /** 按钮文本 */
    buttonText: { type: String },
    /** 场景 */
    scene     : { type: String as PropType<'local' | 'page'> },
}

export type EmptyProps = ExtractPropTypes<typeof empty_props>
