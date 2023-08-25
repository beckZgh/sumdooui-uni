<script lang="ts">
import { defineComponent, computed, watch, reactive, toRefs } from 'vue'
import { MpMixin } from '../common/mixins'
import { picker_props, type PickerOptionItem } from './picker'

export default defineComponent({
    ...MpMixin,

    name : 'SdPicker',
    props: picker_props,
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
    setup(props, { emit }) {
        const state = reactive({
            column_count        : 0, // 列数统计
            auto_column_map     : {} as Record<string, PickerOptionItem[]>, // 联动列数据映射
            columns             : [] as PickerOptionItem[][],
            selected_indexs     : [] as number[],
            last_selected_indexs: [] as number[],
            moving              : false,
        })

        const visible$ = computed({
            get() { return props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        watch(visible$, (visible) => {
            visible && setTimeout(init, 10)
        }, { immediate: true })

        // 初始化列
        function init() {
            setAutoColumnMap()
            setColumnCount()
            setSelectedIndexs()
            setColumnData()
        }

        // 设置显示数据列数
        function setColumnCount() {
            if (props.mode === 'single-column') {
                state.column_count = 1
            } else if (props.mode === 'multi-column') {
                state.column_count = props.options.length
            } else if (props.mode === 'auto-column') {
                let count  = 1
                let column = props.options as PickerOptionItem[] | null

                while (column && column[0].children) {
                    column = column[0] ? column[0]['children'] : null
                    count += 1
                }
                state.column_count = count
            }
        }

        // 设置联动数据映射
        function setAutoColumnMap() {
            if (props.mode !== 'auto-column') return
            const map = {} as Record<string, PickerOptionItem[]>
            (props.options as PickerOptionItem[]).forEach((item) => {
                if (item.children) {
                    loadChildren(map, item.value, item.children)
                }
            })
            state.auto_column_map = map
        }

        // 设置默认选中值
        function setSelectedIndexs() {
            const values = props.defaultValue || []
            if (props.mode === 'single-column') {
                const options         = props.options as PickerOptionItem[]
                state.selected_indexs = [Math.max(0, options.findIndex(item => item.value === values[0]))]
            } else if (props.mode === 'multi-column') {
                const options         = props.options as PickerOptionItem[][]
                state.selected_indexs = options.map((data, index) => {
                    return Math.max(0, data.findIndex(item => item.value === values[index]))
                })
            } else if (props.mode === 'auto-column') {
                const options = props.options as PickerOptionItem[]
                const values  = (props.defaultValue || []).length === state.column_count ? (props.defaultValue || []) : []
                const indexs  = [] as number[]

                let key = ''
                for (let i = 0; i < state.column_count; i++) {
                    // 第一列默认为整个list数组
                    if (i === 0) {
                        const idx = Math.max(0, options.findIndex(item => item.value === values[0]))
                        key = `${ options[idx].value }`
                        indexs.push(idx)
                    } else {
                        const data = state.auto_column_map[key] || []
                        const idx  = data.length ? Math.max(0, data.findIndex(item => item.value === values[0])) : 0

                        key += `/${ data[idx].value }`
                        indexs.push(idx)
                    }
                }
                state.selected_indexs = indexs
            }
            state.last_selected_indexs = [...state.selected_indexs]
        }

        // 设置显示列数据
        function setColumnData() {
            if (props.mode === 'single-column') {
                state.columns = [props.options as PickerOptionItem[]]
            } else if (props.mode === 'multi-column') {
                state.columns = props.options as PickerOptionItem[][]
            } else if (props.mode === 'auto-column') {
                const options      = props.options as PickerOptionItem[]
                const auto_columns = [] as PickerOptionItem[][]
                let key = ''
                for (let i = 0; i < state.column_count; i++) {
                    // 第一列默认为整个list数组
                    if (i === 0) {
                        auto_columns[0] = cloneColumns(options)
                        key = `${ options[state.selected_indexs[i]].value }`
                    } else {
                        const data      = state.auto_column_map[key] || []
                        auto_columns[i] = data

                        key += `/${ data[state.selected_indexs[i]].value }`
                    }
                }
                state.columns = auto_columns
            }
        }

        // 浅克隆列数据，剔除 children 属性
        function cloneColumns(columns: PickerOptionItem[]): PickerOptionItem[] {
            return columns
            // return columns.map((item) => {
            //     const o = { ...item }
            //     delete o.children
            //     return o
            // })
        }

        // 递归生成子选项映射路径
        function loadChildren(map: Record<string, PickerOptionItem[]>, key: string | number, children?: PickerOptionItem[]) {
            if (!children) return

            map[key] = cloneColumns(children)
            if (children.length) {
                children.forEach((item) => {
                    loadChildren(map, `${ key }/${ item.value }`, item.children)
                })
            }
        }

        function onPickerstart() {
            state.moving = true
        }

        function onPickerend() {
            state.moving = false
        }

        function onPickerChange(e: any) {
            // 非联动模式选择选中下标为最终结果
            const selected_indexs = e.detail.value
            state.selected_indexs = selected_indexs
            if (props.mode !== 'auto-column') return

            // -------------------------------------------------------
            const change_index = state.last_selected_indexs.findIndex((item, index) => item !== selected_indexs[index])
            if (change_index === -1) return

            // let prefix_key = ''
            // for (let i = 0; i <= change_index; i++) {
            //     const column: any = state.columns[i][selected_indexs[i]]
            //     if (column) {
            //         prefix_key += prefix_key ? `/${ column.value }` : column.value
            //     }
            // }

            // for (let i = change_index + 1; i <= state.columns.length - 1; i++) {
            //     const columns            = state.auto_column_map[prefix_key] || []
            //     state.columns[i]         = columns
            //     state.selected_indexs[i] = 0
            //     prefix_key += `/${ columns[0].value }`
            // }

            // 此方式需要 cloneColumns 函数保留 children 属性数据
            for (let i = change_index + 1; i < state.column_count; i++) {
                const column             = state.columns[i - 1][i - 1 === change_index ? selected_indexs[change_index] : 0]
                state.columns[i]         = (column ? column['children'] : []) as PickerOptionItem[]
                state.selected_indexs[i] = 0
            }

            state.last_selected_indexs = selected_indexs
        }

        function onCancel() {
            if (state.moving) return
            emit('update:visible', false)
            emit('cancel')
        }

        function onConfirm() {
            if (state.moving) return
            emit('update:visible', false)
            emit('confirm', getSelectedValue())
        }

        function getSelectedValue() {
            if (props.mode === 'single-column') {
                const item = state.columns[0][state.selected_indexs[0]]
                return {
                    selectedValues: item ? [item.value] : [undefined],
                    selectedItems : item ? [item] : [undefined],
                }
            } else if (props.mode === 'multi-column') {
                const items = state.columns.map((data, index) => data[state.selected_indexs[index]])
                return {
                    selectedValues: items.map(item => item ? item.value : undefined),
                    selectedItems : items,
                }
            } else if (props.mode === 'auto-column') {
                const selectedValues = [] as (string | number)[]
                const selectedItems  = [] as PickerOptionItem[]
                for (let i = 0; i < state.column_count; i++) {
                    const data = state.columns[i]
                    const idx  = state.selected_indexs[i]
                    const item = data[idx >= data.length ? data.length - 1 : idx]
                    if (item) {
                        selectedValues[i] = item.value
                        selectedItems[i]  = item
                    }
                }

                return { selectedValues, selectedItems }
            }
        }

        // 设置选中项
        function setIndexs(indexs: number[]) {
            state.selected_indexs = indexs
        }

        // 设置列数据
        function setColumns(index: number, columns: PickerOptionItem[]) {
            state.columns[index] = columns
        }

        return {
            ...toRefs(state),
            visible$,
            onCancel,
            onConfirm,
            onPickerChange,
            onPickerstart,
            onPickerend,
            setIndexs,
            setColumns,
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
    >
        <view class="sd-picker">
            <view v-if="title" class="sd-picker__title">
                {{ title }}
            </view>
            <view class="sd-picker-content" :style="{ height: `${ itemHeight * visibleItemCount }px` }">
                <picker-view
                    :value="selected_indexs"
                    class="sd-picker-view"
                    :indicator-style="`height: ${ itemHeight }px`"
                    :immediate-change="immediateChange"
                    @pickstart="onPickerstart"
                    @pickend="onPickerend"
                    @change="onPickerChange"
                >
                    <picker-view-column v-for="(options, column_index) in columns" :key="`column_${ column_index }`">
                        <view
                            v-for="(item, index) in options" :key="index"
                            class="sd-picker-view-column"
                            :style="`height: ${ itemHeight }px`"
                        >
                            <text>{{ item.label }}</text>
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
