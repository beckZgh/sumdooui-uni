<script lang="ts">
/**
 * 后续统一样式的 Picker 组件（待替换 sd-picker 组件）
 * v25.11.21
 */
import type { PickerContext, OpenMethodParams, HookMethods } from './types'
import type { Picker2Props } from './picker2'

import { defineComponent, reactive, watch , computed } from 'vue'
import { MpMixin       } from '../common/mixins'
import { picker2_props } from './picker2'

import $utils from '../utils'


const HookMethodKeys = [
    'onCancel',
    'onConfirm',
    'onChange',
    'onPickerStart',
    'onPickerEnd',
] as const

export default defineComponent({
    ...MpMixin,

    name : 'SdPicker2',
    props: picker2_props,
    emits: [
        'update:visible',
        'pickerstart',
        'pickerend',
        'change',
        'open',
        'close',
        'cancel',
        'confirm',
    ],
    setup(props, ctx) {
        let timer: ReturnType<typeof setTimeout>

        // 用于保存手动调用 open 方法打开的钩子函数
        let events: HookMethods = {}

        const state = reactive({
            columns       : [] as any[][],               // 列选项集合
            indexs        : [] as number[],              // 选中列选项值下标
            moving        : false,                       // 是否在滚动中
            keys          : { label: 'label', value: 'value' },
            // -----------------------------------------------------------------
            is_manual_open: false,                       // 是否通过方法手动打开
            manual_props  : {} as Partial<Picker2Props>, // 通过方法传入的 props 进行覆盖默认 props
            visible       : props.visible,               // 是否显示弹窗
            delay         : props.delay,
        })

        const props$ = computed(() => ({ ...props, ...state.manual_props, columns: [] }))

        const $pickerCtx: PickerContext = {
            getColumnItems,
            setColumnItems,
            setColumnIndex,
            open,
            close,
        }

        watch(() => props.visible, (visible) => {
            state.visible = visible
        })

        watch(() => state.visible, (visible) => {
            ctx.emit('update:visible', visible)
        })

        // 监听 v-model:visible 打开
        function onOpen() {
            !state.is_manual_open && init(props) // 通过 open 调用已提前处理了数据，无需重复执行
            ctx.emit('open')
        }

        // 监听 v-model:visible 关闭
        function onClose() {
            state.is_manual_open = false
            state.moving  = false
            state.columns = []
            state.indexs  = []
            ctx.emit('close')
        }

        // 初始化数据
        function init(opts: OpenMethodParams) {
            // 1）合并组件属性配置
            state.manual_props = $utils.obj.omit(opts, ['columns']) // 少一次 columns 数据保存

            // 2）合并回调函数配置
            events = { ...$utils.obj.pick(opts, HookMethodKeys) } // 克隆并覆盖已有缓存

            // 3.1) 设置关联选项属性名
            if (opts.keys) {
                if (opts.keys.label) state.keys.label = opts.keys.label
                if (opts.keys.value) state.keys.value = opts.keys.value
            }

            // 3.2) 设置延迟渲染值
            if ($utils.isNumber(opts.delay)) state.delay = opts.delay

            // 4) 取得默认选中值
            const columns = opts.columns || []
            state.indexs = getSelectedIndexs(columns, opts.defaultValue || [], state.keys)

            // 5) 渲染列表
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                state.columns = columns
            }, state.delay) // 避免阻塞动画
        }

        // 取得选中的下标
        function getSelectedIndexs(columns: any[][], values: any[], keys: Picker2Props['keys']) {
            // 取得默认选中下标
            const indexs = [] as number[]
            columns.forEach((items, col_idx) => {
                const idx = items.findIndex(item => item[keys.value] === values[col_idx])
                indexs.push(idx === -1 ? 0 : idx)
            })
            return indexs
        }

        // 滚动开始
        function onPickerStart() {
            state.moving = true

            events.onPickerStart
                ? events.onPickerStart({ $pickerCtx })
                : ctx.emit('pickerstart', { $pickerCtx })
        }

        // 选择器变化
        function onPickChange(e: any) {
            const old_indexs = state.indexs
            const new_indexs = e.detail.value as number[]

            // 变更列下标
            const changeColumnIndex = old_indexs.findIndex((val, idx) => val !== new_indexs[idx])

            state.indexs = new_indexs

            events.onChange
                ? events.onChange({ $pickerCtx, changeColumnIndex, selectedIndexs: new_indexs  })
                : ctx.emit('change', { $pickerCtx, changeColumnIndex, selectedIndexs: new_indexs  })
        }

        // 滚动结束
        function onPickerEnd() {
            state.moving = false

            events.onPickerEnd
                ? events.onPickerEnd({ $pickerCtx })
                : ctx.emit('pickerend', { $pickerCtx })
        }

        // 取消选择
        function onCancel() {
            state.visible = false

            events.onCancel
                ? events.onCancel()
                : ctx.emit('cancel')
        }

        // 确认选择
        function onConfirm() {
            if (state.moving) return // 滚动中不处理

            const values  = getConfirmValues()
            state.visible = false

            events.onConfirm
                ? events.onConfirm(values)
                : ctx.emit('confirm', values)
        }

        // 取得确认后的值
        function getConfirmValues() {
            const items = state.columns.map((items, idx) => items[state.indexs[idx]])
            return {
                selectedItems : items,
                selectedLabels: items.map(item => item[state.keys.label]),
                selectedValues: items.map(item => item[state.keys.value]),
            }
        }

        /***************************************************************************************
         *  暴露 API
         ***************************************************************************************/

        // 打开 Picker 弹窗
        function open(opts: Parameters<PickerContext['open']>[0]) {
            state.is_manual_open = true
            init(opts)
            state.visible = true
        }

        // 关闭 Picker 弹窗
        function close() {
            state.visible = false
        }

        // 获取全部选项列表或指定列选项列表
        function getColumnItems(column_index?: number): any[] | any[][] {
            if ($utils.isNumber(column_index)) {
                return state.columns[column_index] || []
            } else {
                return state.columns
            }
        }

        // 设置对应列的选项列表
        function setColumnItems(column_index: number, items: any[]) {
            state.columns[column_index] = items // 更改指定列的选项列表
            state.indexs[column_index]  = 0            // 重置指定列的选中下标
        }

        // 设置对应列的选中值
        function setColumnIndex(column_idx: number, value_index: number) {
            state.indexs[column_idx] = value_index
        }

        ctx.expose($pickerCtx)

        return {
            state,
            props$,
            onOpen,
            onClose,
            onPickerStart,
            onPickerEnd,
            onPickChange,
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
        :show-top-close="false"
        @open="onOpen"
        @close="onClose"
    >
        <view class="sd-picker">
            <view v-if="props$.title" class="sd-picker__title">
                {{ props$.title }}
            </view>
            <view class="sd-picker-content" :style="{ height: `${ props$.itemHeight * props$.visibleItemCount }px` }">
                <picker-view
                    class="sd-picker-view"
                    :value="state.indexs"
                    :indicator-style="`height: ${ props$.itemHeight }px`"
                    :immediate-change="props$.immediateChange"
                    @pickstart="onPickerStart"
                    @pickend="onPickerEnd"
                    @change="onPickChange"
                >
                    <picker-view-column v-for="(items, idx) in state.columns" :key="`column_${ idx }`">
                        <view
                            v-for="(item, index) in items" :key="index"
                            class="sd-picker-view-column"
                            :style="`height: ${ props$.itemHeight }px`"
                        >
                            <text>{{ item[state.keys.label] }}</text>
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="sd-picker-footer">
                <sd-button text bg type="success" width="240rpx" :custom-style="{ marginRight: '15px' }" @click="onCancel">
                    {{ props$.cancelButtonText }}
                </sd-button>
                <sd-button width="240rpx" type="success" @click="onConfirm">
                    {{ props$.confirmButtonText }}
                </sd-button>
            </view>
        </view>
    </sd-popup>
</template>
