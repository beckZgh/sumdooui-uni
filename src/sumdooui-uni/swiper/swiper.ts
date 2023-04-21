import type { PropType, ExtractPropTypes } from 'vue'

export type SwiperItem = {
    src                  : string   // 图片路径
    desc                ?: string   // 图片描述
    openType            ?: string   // 微信特征，点击触发
    to                  ?: string   // 跳转地址
    replace             ?: boolean  // 使用替换页面的方式
    // https://developers.weixin.qq.com/miniprogram/dev/component/swiper-item.html
    itemId              ?: string   // swiper-item 的标识符
    skipHiddenItemLayout?: boolean  // 是否跳过未显示的滑块布局
}

/**
 * preset 预设
 * splash 闪屏
 * fullpage 整瓶滑动
 * card 卡片类型 (不支持title)
 */
export type SwiperType = 'splash' | 'fullpage' | 'card'

// https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
export const swiper_props = {
    /** 展示类型 */
    type                : { type: String as PropType<SwiperType> },
    /** 宽度 */
    width               : { type: [String, Number], default: '100%'    },
    /** 高度 */
    height              : { type: [String, Number], default: '270rpx'  },
    // 圆角值
    radius              : { type: Number, default: 16 },
    // 轮播数据
    items               : { type: Array as PropType<SwiperItem[]>, default: () => [] },
    indicatorDots       : { type: Boolean, default: true },
    indicatorColor      : { type: String, default: 'rgba(0, 0, 0, 0.3)' },
    indicatorActiveColor: { type: String, default: '#000000' },
    autoplay            : { type: Boolean, default: false },
    current             : { type: Number, default: 0 },
    interval            : { type: Number, default: 3000 },
    duration            : { type: Number, default: 500 },
    circular            : { type: Boolean, default: true },
    vertical            : { type: Boolean, default: false },
    previousMargin      : { type: String, default: '0px' },
    nextMargin          : { type: String, default: '0px' },
    snapToEdge          : { type: Boolean, default: false },
    displayMultipleItems: { type: Number, default: 1 },
    easingFunction      : { type: String, default: 'default' },
}

export type SwiperProps = ExtractPropTypes<typeof swiper_props>
