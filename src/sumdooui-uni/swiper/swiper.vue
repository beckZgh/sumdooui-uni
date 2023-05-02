<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { swiper_props, type SwiperItem } from './swiper'
import { MpMixin } from '../common/mixins'

import Utils from '../utils'
export default defineComponent({
    ...MpMixin,

    name : 'SdSwiper',
    props: swiper_props,
    emits: [
        'change',
        'transition',
        'animationfinish',
        'click',
        'getuserinfo',
        'contact',
        'getphonenumber',
        'opensetting',
        'launchapp',
        'chooseavatar',
        'error',
    ],
    setup(props, { emit }) {
        const root_style$ = computed(() => {
            return {
                ...props.customStyle,
                width : Utils.toUnit(props.width),
                height: Utils.toUnit(props.height),
            }
        })

        function onClick(item: SwiperItem, index: number) {
            emit('click', { item, index })
        }

        // 当前激活项
        const active_index = ref(props.current)
        function onChange(e: any) {
            active_index.value = e.detail.current
            _emitCurrent('change', e)
        }

        function onTransition(e: any) {
            emit('transition', e)
        }

        function onAnimationfinish(e: any) {
            emit('animationfinish', e)
        }

        function _emitCurrent(name: 'change' | 'transition' | 'animationfinish', e: any) {
            const current = e.detail.current
            emit(name, { current, ...props.items[current] })
        }

        return {
            root_style$,
            active_index,
            onClick,
            onChange,
            onTransition,
            onAnimationfinish,
        }
    },
})
</script>

<template>
    <view
        class="sd-swiper"
        :class="[
            customClass,
            { [`sd-swiper--${ type }`]: !!type, 'sd-swiper--vertical': vertical },
        ]"
        :style="root_style$"
    >
        <swiper
            :autoplay="autoplay"
            :current="current"
            :interval="interval"
            :duration="duration"
            :circular="circular"
            :vertical="vertical"
            :previous-margin="type === 'card' ? '1px' : 0"
            :next-margin="type === 'card' ? '1px' : 0"
            :snap-to-edge="snapToEdge"
            :display-multiple-items="displayMultipleItems"
            :easing-function="easingFunction"
            class="sd-swiper__items"
            @change="onChange"
            @transition="$emit('transition', $event)"
            @animationfinish="$emit('animationfinish', $event)"
        >
            <template v-for="(item, index) in items" :key="index">
                <swiper-item
                    class="sd-swiper__item" :class="[active_index === index ? 'is-active' : '']"
                    :item-id="item.itemId"
                    :skip-hidden-item-layout="item.skipHiddenItemLayout"
                >
                    <view class="sd-swiper__item-content">
                        <button
                            v-if="item.openType"
                            :open-type="item.openType"
                            class="sd-swiper__item-button"
                            @getuserinfo="$emit('getuserinfo', $event)"
                            @contact="$emit('contact', $event)"
                            @getphonenumber="$emit('getphonenumber', $event)"
                            @opensetting="$emit('opensetting', $event)"
                            @launchapp="$emit('launchapp', $event)"
                            @chooseavatar="$emit('chooseavatar', $event)"
                            @error="$emit('error', $event)"
                            @click.stop="onClick(item, index)"
                        >
                            <sd-image mode="aspectFill" :src="item.src" :radius="type === 'card' ? radius : 0" width="100%" height="100%" />
                        </button>
                        <sd-image v-else :src="item.src" :radius="type === 'card' ? radius : 0" width="100%" height="100%" @click="onClick(item, index)" />
                    </view>
                </swiper-item>
            </template>
        </swiper>

        <!-- 轮播指示器 -->
        <view v-if="indicatorDots && type !== 'card'" class="sd-swiper__dots">
            <view
                v-for="(_, index) in items"
                :key="index"
                class="sd-swiper__dot"
                :class="[active_index === index ? 'is-active' : '']"
            />
        </view>
    </view>
</template>

