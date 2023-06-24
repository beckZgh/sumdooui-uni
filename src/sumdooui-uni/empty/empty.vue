<script lang="ts">
import type { CSSProperties } from 'vue'

import img_data    from './images/img_data_3x.png'
import img_order   from './images/img_order_3x.png'
import img_search  from './images/img_search_3x.png'
import img_network from './images/img_network_3x.png'
import img_address from './images/img_address_3x.png'
import img_news    from './images/img_news_3x.png'

import { defineComponent, computed } from 'vue'
import { MpMixin     } from '../common/mixins'
import { empty_props } from './empty'

import Utils from '../utils'

const EMPTY_IMGS: Record<string, string> = {
    img_data,
    img_order,
    img_search,
    img_network,
    img_address,
    img_news,
}

const EMPTY_TEXT: Record<string, string> = {
    img_data   : '暂无数据～',
    img_order  : '暂无订单～',
    img_search : '没有找到对应的内容～',
    img_network: '请检查网络设置～',
    img_address: '暂无新地址信息～',
    img_news   : '暂无新消息～',
}

export default defineComponent({
    ...MpMixin,

    name : 'SdEmpty',
    props: empty_props,
    emits: ['click-button'],
    setup(props) {
        // 缺省容器样式
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.background) style.backgroundColor = props.background
            if (props.height    ) style.height = Utils.toUnit(props.height)
            return style
        })

        // 缺省图片
        const empty_img$ = computed(() => {
            return props.image ? props.image : (EMPTY_IMGS[`img_${ props.type }`] || EMPTY_IMGS.img_data)
        })

        // 缺省w文案
        const empty_text$ = computed(() => {
            return props.text ? props.text : (EMPTY_TEXT[`img_${ props.type }`] || EMPTY_TEXT.img_data)
        })

        return {
            root_style$,
            empty_img$,
            empty_text$,
        }
    },
})
</script>

<template>
    <view class="sd-empty" :class="[customClass, { [`sd-empty--${ scene }`]: true }]" :style="root_style$">
        <sd-image
            width="100%"
            height="50%"
            :src="empty_img$"
            :show-loading="false"
            :show-error="false"
            v-bind="imageProps"
        />
        <view v-if="empty_text$" class="sd-empty__text">
            {{ empty_text$ }}
        </view>
        <slot v-if="$slots.extra" name="extra" />
        <sd-button v-if="buttonText" custom-class="sd-empty__btn" @click="$emit('click-button')">
            {{ buttonText }}
        </sd-button>
    </view>
</template>

