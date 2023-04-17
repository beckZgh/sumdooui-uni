<script lang="ts">
import { defineComponent, reactive, toRef, computed } from 'vue'
import { DEFAULT_OPTIONS, type ToastProps } from './toast'

export default defineComponent({
    name: 'SdToast',
    setup(_, { expose }) {
        const state = reactive({
            visible    : false,
            toast_props: { ...DEFAULT_OPTIONS } as ToastProps,
        })

        /**
         * 纯文本使用 row 模式
         */
        const root_class$ = computed(() => {
            const toast_props = state.toast_props
            let is_row = toast_props.direction === 'row'
            if (toast_props.type === 'none' && (!toast_props.icon && !toast_props.image)) {
                is_row = true
            }

            return {
                'sd-toast--row'             : is_row,
                'sd-toast--column'          : !is_row,
                [`is-${ toast_props.type }`]: toast_props.type !== 'none',
            }
        })

        let timer: ReturnType<typeof setTimeout>
        function show(props: string | ToastProps) {
            const _props  = typeof props === 'string' ? { message: props } : props
            const options = { ...DEFAULT_OPTIONS, ..._props } as typeof DEFAULT_OPTIONS

            if (!options.icon) {
                options.icon = getIconByType(options.type)
            }

            if (options.type === 'loading') {
                options.message = options.message || '加载中...'
            }

            state.toast_props = options
            state.visible     = true

            timer && clearTimeout(timer)
            if (options.duration > 0) {
                timer = setTimeout(() => {
                    hide()
                }, options.duration)
            }
        }

        function hide() {
            clearTimeout(timer)

            state.visible = false
            const onClose = state.toast_props.onClose
            if (typeof onClose === 'function') {
                onClose()
            }
        }

        // 取得 Toast 类型对应图标
        function getIconByType(type: typeof DEFAULT_OPTIONS['type']) {
            switch (type) {
                case 'success': return 'check-circle'
                case 'warning': return 'warning-circle'
                case 'error'  : return 'close-circle'
                default: return ''
            }
        }

        function stopEvent() {}

        expose({ show, hide })
        return {
            visible    : toRef(state, 'visible'),
            total_props: toRef(state, 'toast_props'),
            root_class$,
            stopEvent,
        }
    },
})
</script>

<template>
    <view v-if="visible && total_props.mask" clas="sd-toast-mask" catchtouchmove="stopEvent" />
    <view
        v-if="visible"
        class="sd-toast"
        :class="root_class$"
        catchtouchmove="stopEvent"
    >
        <view class="sd-toast__content">
            <sd-loading v-if="total_props.type === 'loading'" color="#fff" :type="total_props.loadingType" />
            <sd-icon
                v-else-if="total_props.icon"
                :name="total_props.icon"
                :color="total_props.iconColor ? total_props.iconColor : undefined"
                :size="total_props.iconSize"
            />
            <sd-image
                v-if="total_props.image"
                :src="total_props.image"
                :width="total_props.imageWidth"
                :height="total_props.imageHeight"
            />
            <view class="sd-toast__text">
                {{ total_props.message }}
            </view>
        </view>
    </view>
</template>

