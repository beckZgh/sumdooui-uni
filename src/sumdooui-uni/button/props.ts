import type { PropType, CSSProperties } from 'vue'
import type { ComponentType, ComponentSize } from '../common/types'

type ButtonShapeType = 'square' | 'round' | 'circle'
type ButtonVariant   = 'light' | 'plain' | 'text'

export default  {
    customClass     : { type: String },
    customStyle     : { type: Object as PropType<CSSProperties> },
    type            : { type: String as PropType<ComponentType>  , default: 'default' },
    size            : { type: String as PropType<ComponentSize>  , default: 'normal'  },
    shape           : { type: String as PropType<ButtonShapeType>, default: 'round'   },
    variant         : { type: String as PropType<ButtonVariant> },
    block           : { type: Boolean, default: false  },
    icon            : { type: String },
    iconSize        : { type: [String, Number] },
    iconColor       : { type: String },
    loading         : { type: Boolean, default: false },
    loadingText     : { type: String },
    text            : { type: String },
    disabled        : { type: Boolean, default: false },
    // 小程序按钮特殊属性
    // https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    openType        : { type: String },
    formType        : { type: String },
    appParameter    : { type: String },
    sessionForm     : { type: String },
    sendMessageTitle: { type: String },
    sendMessagePath : { type: String },
    sendMessageImg  : { type: String },
    showMessageCard : { type: Boolean },
}
