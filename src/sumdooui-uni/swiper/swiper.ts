import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

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
    ...COMMON_PROPS,

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
    // 是否显示轮播面板指示点
    indicatorDots       : { type: Boolean, default: true },
    // 轮播面板指示点默认颜色
    indicatorColor      : { type: String, default: 'rgba(0, 0, 0, 0.3)' },
    // 轮播面板指示点激活颜色
    indicatorActiveColor: { type: String, default: '#000000' },
    // 是否自动轮播
    autoplay            : { type: Boolean, default: false },
    // 当前所在滑块的 index
    current             : { type: Number, default: 0 },
    // 自动切换时间间隔
    interval            : { type: Number, default: 3000 },
    // 滑动动画时长
    duration            : { type: Number, default: 500 },
    // 是否采用衔接滑动
    circular            : { type: Boolean, default: true },
    // 滑动方向是否为纵向
    vertical            : { type: Boolean, default: false },
    // 前边距
    previousMargin      : { type: String, default: '0px' },
    // 后边距
    nextMargin          : { type: String, default: '0px' },
    // 当 swiper-item 的个数大于等于 2，关闭 circular 并且开启 previous-margin 或 next-margin 的时候，
    // 可以指定这个边距是否应用到第一个、最后一个元素
    snapToEdge          : { type: Boolean, default: false },
    // 同时显示的滑块数量
    displayMultipleItems: { type: Number, default: 1 },
    // 指定 swiper 切换的动画类型
    easingFunction      : { type: String, default: 'default' },
}

export type SwiperProps = ExtractPropTypes<typeof swiper_props>
