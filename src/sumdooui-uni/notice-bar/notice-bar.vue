<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed, reactive, toRefs, onMounted, watch } from 'vue'
import { MpMixin           } from '../common/mixins'
import { useSelectoryQuery } from '../common/hooks'
import { notice_bar_props  } from './notice-bar'

export default defineComponent({
    ...MpMixin,

    name : 'SdNoticeBar',
    props: notice_bar_props,
    emits: ['click', 'close'],
    setup(props, { emit }) {
        const state  = reactive({
            visible        : true,
            body_width     : 0,     // 可显示区域宽度
            content_width  : 0,     // 内容总宽度
            duration       : 0,     // 动画周期时间
            first_running  : true,  // 第一次运行
            animation_class: '',
        })

        // 容器自定义样式
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.background) style.backgroundColor = props.background
            if (props.color     ) style.color           = props.color
            return style
        })

        // 内容自定义样式
        const content_style$ = computed(() => {
            return {
                animationDelay   : `${ state.first_running ? props.delay : 0 }s`,
                animationDuration: `${ state.duration }s`,
                transform        : `translateX(${ state.first_running ? 0 : `${ state.body_width }px` })`,
            } as CSSProperties
        })

        watch(() => props.content, init)
        onMounted(init)

        const { queryNodeWidth } = useSelectoryQuery()
        function init() {
            setTimeout(async () => {
                const [body_width, content_width] = await Promise.all([
                    queryNodeWidth('.sd-notice-bar__body'),
                    queryNodeWidth('.sd-notice-bar__content'),
                ])

                if (!props.wrapable && props.scrollable && content_width > body_width) {
                    state.body_width      = body_width
                    state.content_width   = content_width
                    state.duration        = content_width / props.speed
                    state.animation_class = 'play'
                } else {
                    state.animation_class = ''
                }
            }, 100)
        }

        function onAnimationEnd() {
            state.first_running = false
            setTimeout(() => {
                state.duration        = (state.content_width + state.body_width) / props.speed
                state.animation_class = 'play-infinite'
            }, 0)
        }

        function onClick(e: Event) {
            emit('click', e)
        }

        function onClose(e: Event) {
            state.visible = false
            emit('close', e)
        }

        return {
            ...toRefs(state),
            root_style$,
            content_style$,
            onAnimationEnd,
            onClick,
            onClose,
        }
    },
})
</script>

<template>
    <view
        v-show="visible"
        class="sd-notice-bar"
        :class="[
            customClass,
            {
                'sd-notice-bar--wrapable'   : wrapable,
                [`sd-notice-bar--${ type }`]: true,
                [`is-${ direction }`]       : !!direction,
            },
        ]"
        :style="root_style$"
        @tap="onClick"
    >
        <view v-if="$slots.prefix || prefixIcon" class="sd-notice-bar__prefix">
            <slot v-if="$slots.prefix" name="prefix" />
            <sd-icon v-else :name="prefixIcon || 'sound'" />
        </view>

        <view class="sd-notice-bar__body">
            <view
                class="sd-notice-bar__content"
                :class="[animation_class, { 'is-ellipsis': scrollable === false && !wrapable }]"
                :style="content_style$"
                @animationend="onAnimationEnd"
            >
                <slot v-if="$slots.default" />
                <template v-else-if="content">
                    {{ content }}
                </template>
            </view>
        </view>

        <view v-if="closeable" class="sd-notice-bar__suffix" @tap="onClose">
            <sd-icon name="close" />
        </view>
    </view>
</template>
