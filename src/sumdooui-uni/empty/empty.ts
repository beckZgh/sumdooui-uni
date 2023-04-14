import type { CSSProperties , PropType, ExtractPropTypes } from 'vue'


type EmptyType = 'data' | 'order' | 'search' | 'network' | 'news' | 'address'

export const empty_props = {
    /** 内置缺省图片 */
    type      : { type: String as PropType<EmptyType>, default: 'data' },
    /** 自定义缺省图片 */
    src       : { type: String },
    /** 缺省图片自定义样式 */
    imgStyle  : { type: Object as PropType<CSSProperties> },
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
