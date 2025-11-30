<script lang="ts">
import { defineComponent, computed, reactive, watch } from 'vue'
import { MpMixin      } from '../common/mixins'
import { select_props } from './select'

import $utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdSelect',
    props: select_props,
    emits: [
        'update:visible',
        'open',
        'close',
        'scroll',
        'cancel',
        'confirm',
    ],
    setup(props, ctx) {
        const state = reactive({
            values       : [] as any[],                  // 选中值
            scroll_top   : 0,
            to_scroll_top: 0,
            visible      : props.visible,               // 是否显示弹窗
        })

        const $selectCtx = {
            getValues,
            setValues,
            updateScrollTop,
        }

        watch(() => props.visible, (visible) => { state.visible = visible })
        watch(() => state.visible, (visible) => { ctx.emit('update:visible', visible)  })

        // 选项列表
        const options$ = computed(() => {
            const opts = props.options || []

            const filter_fn = props.filter
            if ($utils.isFunction(filter_fn)) {
                return opts.filter(filter_fn)
            } else {
                return opts
            }
        })

        // 监听 v-model:visible 打开
        function onOpen() {
            init()

            ctx.emit('open')
        }

        // 监听 v-model:visible 关闭
        function onClose() {
            ctx.emit('close')
        }

        function onScroll(e: any) {
            const scrollTop = e.detail.scrollTop
            ctx.emit('scroll', { scrollTop, $selectCtx })
        }

        // 初始化数据
        function init() {
            // 取得默认选中值
            state.values = getSelectedVaule()
        }

        // 取得选中值
        function getSelectedVaule() {
            const { defaultValue, multi } = props
            if ($utils.isNullOrUnDef(defaultValue)) return []

            if (multi && Array.isArray(defaultValue)) {
                return defaultValue
            } else if ($utils.isString(defaultValue) || $utils.isNumber(defaultValue)) {
                return [defaultValue]
            }

            return []
        }

        // 当一直滚动时，关闭弹窗再次打开会造成读取位置信息异常，ios（可开启 enable-passive 优化）
        // function scrollInToView() {
        //     query.select('#scroll-wrap').fields({ rect: true, size: true, scrollOffset: true }, () => {})
        //     query.select('.sd-select-item.is-checked').fields({ rect: true, size: true }, () => {})

        //     query.exec(([scrollViewInfo, nodeRect]) => {
        //         if (!scrollViewInfo || !nodeRect) return

        //         const nodeOffsetTop = nodeRect.top - scrollViewInfo.top + scrollViewInfo.scrollTop
        //         const { scrollTop, height: scrollViewHeight } = scrollViewInfo
        //         const nodeHeight = nodeRect.height

        //         const isVisible = nodeOffsetTop < scrollTop + scrollViewHeight && nodeOffsetTop + nodeHeight > scrollTop
        //         if ( isVisible ) return

        //         state.scroll_top = nodeOffsetTop - (scrollViewHeight / 2 - nodeHeight / 2) // 定位至中间
        //     })
        // }

        // 取消选择
        function onCancel() {
            state.visible = false
            ctx.emit('cancel')
        }

        // 确认选择
        function onConfirm() {
            const values  = getConfirmValues()
            state.visible = false
            ctx.emit('confirm', values)
        }

        // 取得确认后的值
        function getConfirmValues() {
            const options = options$.value
            const items   = options.filter(item => state.values.includes(item[props.keys.value]))

            return {
                selectedItems : items,
                selectedLabels: items.map(item => item[props.keys.label]),
                selectedValues: items.map(item => item[props.keys.value]),
            }
        }

        /***************************************************************************************
         *  暴露 API
         ***************************************************************************************/

        // 获取值
        function getValues() {
            return state.values
        }

        // 设置值
        function setValues(values: any[]) {
            state.values = values
        }

        // 更细当前滚动位置
        function updateScrollTop(top: number) {
            state.to_scroll_top = top
        }

        ctx.expose($selectCtx)

        return {
            state,
            options$,
            onScroll,
            onOpen,
            onClose,
            onCancel,
            onConfirm,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="state.visible"
        position="bottom"
        max-height="initial"
        show-top-close
        round
        :title="title"
        @open="onOpen"
        @close="onClose"
    >
        <slot name="top" />
        <view class="sd-select-content">
            <scroll-view
                scroll-y
                :scroll-top="state.to_scroll_top"
                :style="{ maxHeight: '800rpx' }"
                @scroll="onScroll"
            >
                <sd-checkbox-group2
                    v-if="multi"
                    v-model="state.values"
                    :options="options$"
                    divider
                    :max="max"
                    :icon-position="iconPosition"
                    :active-color="activeColor"
                    :active-icon="activeIcon"
                />
                <sd-radio-group2
                    v-else
                    v-model="state.values[0]"
                    :options="options$"
                    divider
                    :icon-position="iconPosition"
                    :active-color="activeColor"
                    :active-icon="activeIcon"
                />
            </scroll-view>
        </view>
        <slot name="bottom" />

        <view class="sd-select-footer">
            <sd-button type="primary" block round @click="onConfirm">
                {{ confirmButtonText }}
            </sd-button>
        </view>
    </sd-popup>
</template>
