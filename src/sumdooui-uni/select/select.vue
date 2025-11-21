<script lang="ts">
import { defineComponent, computed, reactive, getCurrentInstance } from 'vue'
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
        'cancel',
        'confirm',
    ],
    setup(props, ctx) {
        const instance = getCurrentInstance()
        const query = uni.createSelectorQuery().in(instance)

        const state = reactive({
            values    : [] as (string | number)[], // 多选时保存的数据
            scroll_top: 0,
        })

        const visible$ = computed({
            get() { return props.visible },
            set(value) { ctx.emit('update:visible', value) },
        })

        const options$ = computed(() => {
            const opts = props.options || []

            if ($utils.isFunction(props.filter)) {
                return opts.filter(props.filter)
            } else {
                return opts
            }
        })

        async function onOpen() {
            const { defaultValue, multi } = props
            if ($utils.isNullOrUnDef(defaultValue)) {
                state.values = []
                return
            }

            if (multi && Array.isArray(defaultValue)) {
                state.values = defaultValue
            } else if ($utils.isString(defaultValue) || $utils.isNumber(defaultValue)) {
                state.values = [defaultValue]
            }

            setTimeout(() => {
                scrollInToView()
            }, 0)
        }

        // 当一直滚动时，关闭弹窗再次打开会造成读取位置信息异常，ios（可开启 enable-passive 优化）
        function scrollInToView() {
            query.select('#scroll-wrap').fields({ rect: true, size: true, scrollOffset: true }, () => {})
            query.select('.sd-select-item.is-checked').fields({ rect: true, size: true }, () => {})

            query.exec(([scrollViewInfo, nodeRect]) => {
                if (!scrollViewInfo || !nodeRect) return

                const nodeOffsetTop = nodeRect.top - scrollViewInfo.top + scrollViewInfo.scrollTop
                const { scrollTop, height: scrollViewHeight } = scrollViewInfo
                const nodeHeight = nodeRect.height

                const isVisible = nodeOffsetTop < scrollTop + scrollViewHeight && nodeOffsetTop + nodeHeight > scrollTop
                if ( isVisible ) return

                state.scroll_top = nodeOffsetTop - (scrollViewHeight / 2 - nodeHeight / 2) // 定位至中间
            })
        }

        // 取消选择
        function onCancel() {
            visible$.value = false
            ctx.emit('cancel')
        }

        // 确认选择
        function onConfirm() {
            visible$.value = false

            ctx.emit('confirm', getConfirmValues())
        }

        function getConfirmValues() {
            const options = props.options || []
            const items   = options.filter(item => state.values.includes(item[props.valueField]))

            return {
                selectedItems : items,
                selectedValues: items.map(item => item[props.valueField]),
            }
        }

        return {
            state,
            visible$,
            options$,
            onOpen,
            onCancel,
            onConfirm,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="visible$"
        position="bottom"
        max-height="initial"
        :show-top-close="false"
        :round="false"
        @open="onOpen"
        @close="$emit('close')"
    >
        <view class="sd-select">
            <view class="sd-select-header">
                <view @tap="onCancel">
                    {{ cancelText }}
                </view>
                <view class="sd-select__title">
                    {{ title }}
                </view>
                <view @tap="onConfirm">
                    {{ confirmText }}
                </view>
            </view>

            <view class="sd-select-content">
                <scroll-view
                    v-if="visible"
                    id="scroll-wrap"
                    enable-passive
                    style="height: 100%;"
                    scroll-y
                    :scroll-top="state.scroll_top"
                >
                    <sd-checkbox-group
                        v-if="multi"
                        v-model="state.values"
                        :min="min"
                        :max="max"
                        :icon-position="iconPosition"
                        :icon-size="iconSize"
                        :inactive-color="inactiveColor"
                        :inactive-icon="inactiveIcon"
                        :active-color="activeColor"
                        :active-icon="activeIcon"
                    >
                        <view
                            v-for="item in options$"
                            :key="item[valueField]"
                            class="sd-select-item"
                            :class="{ 'is-checked': state.values.includes(item[valueField]) }"
                        >
                            <sd-checkbox :label="item[labelField]" :active-value="item[valueField]" />
                        </view>
                    </sd-checkbox-group>

                    <sd-radio-group
                        v-else
                        v-model="state.values[0]"
                        :icon-position="iconPosition"
                        :icon-size="iconSize"
                        :inactive-color="inactiveColor"
                        :inactive-icon="inactiveIcon"
                        :active-color="activeColor"
                        :active-icon="activeIcon"
                    >
                        <view
                            v-for="item in options$"
                            :key="item[valueField]"
                            class="sd-select-item"
                            :class="{ 'is-checked': state.values.includes(item[valueField]) }"
                        >
                            <sd-radio :label="item[labelField]" :name="item[valueField]"  />
                        </view>
                    </sd-radio-group>
                </scroll-view>
            </view>
        </view>
    </sd-popup>
</template>
