<script lang="ts">
/**
 * 后续统一样式的 Picker 组件（待替换 sd-picker 组件）
 * v25.11.21
 */
import { defineComponent, computed, reactive, watch } from 'vue'
import { MpMixin      } from '../common/mixins'
import { picker2_props } from './picker2'

export default defineComponent({
    ...MpMixin,

    name : 'SdPicker',
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
        const state = reactive({
            moving     : false,
            column_opts: props.options || [],
            indexs     : [] as number[],
        })

        watch(() => props.options, (options) => {
            state.column_opts = options || []
        })

        const $pickerCtx = {
            setColumnOptions,
            setColumnIndex,
        }

        const visible$ = computed({
            get() { return props.visible },
            set(value) { ctx.emit('update:visible', value) },
        })

        function onOpen() {
            const values = props.defaultValue || []
            const indexs = [] as number[]

            props.options.forEach((opts, col_idx) => {
                const idx = opts.findIndex(item => item[props.valueField] === values[col_idx])
                indexs.push(idx === -1 ? 0 : idx)
            })

            state.indexs = indexs
        }

        // 滚动开始
        function onPickerStart() {
            state.moving = true
            ctx.emit('pickerstart', { $pickerCtx })
        }

        // 选择器变化
        function onPickChange(e: any) {
            const old_indexs = state.indexs
            const new_indexs = e.detail.value as number[]

            // 变更列下标
            const changeColumnIndex = old_indexs.findIndex((val, idx) => val !== new_indexs[idx])

            state.indexs = new_indexs
            ctx.emit('change', { $pickerCtx, changeColumnIndex, selectedIndexs: new_indexs  })
        }

        // 滚动结束
        function onPickerEnd() {
            state.moving = false
            ctx.emit('pickerend', { $pickerCtx })
        }

        // 取消选择
        function onCancel() {
            visible$.value = false
            ctx.emit('cancel')
        }

        // 确认选择
        function onConfirm() {
            if (state.moving) return // 滚动中不处理

            visible$.value = false

            ctx.emit('confirm', getConfirmValues())
        }

        // 取得确认后的值
        function getConfirmValues() {
            const options = props.options || []
            const items = options.map((columns, idx) => columns[state.indexs[idx]])
            return {
                selectedItems : items,
                selectedValues: items.map(item => item[props.valueField]),
            }
        }

        // 设置对应列的选项列表
        function setColumnOptions(column_index: number, options: any[]) {
            state.column_opts[column_index] = options // 更改指定列的选项列表
            state.indexs[column_index] = 0            // 重置指定列的选中下标
        }

        // 设置对应列的选中值
        function setColumnIndex(column_idx: number, value_index: number) {
            state.indexs[column_idx] = value_index
        }

        return {
            state,
            visible$,
            onOpen,
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
        v-model:visible="visible$"
        position="bottom"
        max-height="initial"
        :show-top-close="false"
        @open="onOpen"
        @close="$emit('close')"
    >
        <view class="sd-picker">
            <view v-if="title" class="sd-picker__title">
                {{ title }}
            </view>
            <view class="sd-picker-content" :style="{ height: `${ itemHeight * visibleItemCount }px` }">
                <picker-view
                    class="sd-picker-view"
                    :value="state.indexs"
                    :indicator-style="`height: ${ itemHeight }px`"
                    :immediate-change="immediateChange"
                    @pickstart="onPickerStart"
                    @pickend="onPickerEnd"
                    @change="onPickChange"
                >
                    <picker-view-column v-for="(columns, column_index) in state.column_opts" :key="`column_${ column_index }`">
                        <view
                            v-for="(item, index) in columns" :key="index"
                            class="sd-picker-view-column"
                            :style="`height: ${ itemHeight }px`"
                        >
                            <text>{{ item[labelField] }}</text>
                        </view>
                    </picker-view-column>
                </picker-view>
            </view>
            <view class="sd-picker-footer">
                <sd-button text bg type="success" width="240rpx" :custom-style="{ marginRight: '15px' }" @click="onCancel">
                    {{ cancelText }}
                </sd-button>
                <sd-button width="240rpx" type="success" @click="onConfirm">
                    {{ confirmText }}
                </sd-button>
            </view>
        </view>
    </sd-popup>
</template>
