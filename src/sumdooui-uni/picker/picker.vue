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
        'cancel',
        'confirm',
        'pickerstart',
        'pickerend',
        'change',
        'open',
        'opened',
        'close',
        'closed',
    ],
    setup(props, { emit }) {
        const state = reactive({
            auto_column_map: {} as Record<string, PickerOptionItem[]>, // 联动列数据映射
            columns        : [] as PickerOptionItem[][],
            selected_indexs: [] as number[],
            moving         : false,
            type           : 'single' as 'single' | 'multiple' | 'auto', // single 单列 multiple 多列 auto 联动
        })

        const visible$ = computed({
            get() { return props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        watch(() => props.options, () => {
            initColumnsWithType()
            getInitialValue()
        }, { immediate: true })

        function resetState() {
            state.auto_column_map = {} // 联动列数据映射
            state.columns         = []
            state.selected_indexs = []
            state.moving          = false
            state.type            = 'single' // single 单列 multiple 多列 auto 联动
        }

        // 初始化列和选择类型
        function initColumnsWithType() {
            if (!props.options) {
                resetState()
                return
            }

            const options      = Array.isArray(props.options) ? props.options : [props.options]
            const first_column = options[0] // 第一列

            // 未声明是否联动，则默认读取 children 视为联动属性
            if (props.autoColumn !== false && 'children' in first_column) {
                // 处理数据映射：以每列的值对应的children
                const map = {} as any
                props.options.forEach((item: PickerOptionItem) => loadChildren(map, item.value, item.children || []))
                state.auto_column_map = map
                state.columns         = getAutoColumns()

                // 标识联动数据
                state.type = 'auto'
            } else {
                if (options.length === 1) {
                    state.columns = (Array.isArray(first_column) ? options : [options]) as PickerOptionItem[][]
                } else {
                    state.columns = options as PickerOptionItem[][]
                }

                // 标识当前数据类型
                state.type = state.columns.length > 1 ? 'multiple' : 'single'
            }
        }

        function getAutoColumns(): PickerOptionItem[][] {
            const arr = [props.options as PickerOptionItem[]] as PickerOptionItem[][]
            let column: any = (props.options as PickerOptionItem[])[0]
            let key = ''
            while (true) {
                // 未取得列或者无子项退出循环
                if (!column) break
                key += key ? `/${ column.value }` : column.value
                column = (column.children || [])[0]
                if (state.auto_column_map[key]) {
                    arr.push(state.auto_column_map[key])
                }
            }
            return arr
        }

        function loadChildren(map:any, key: string, children: any[]) {
            if (!children) return

            map[key] = children
            if (children.length) {
                children.forEach((item) => {
                    loadChildren(map, `${ key }/${ item.value }`, item.children)
                })
            }
        }

        function getInitialValue() {
            switch (state.type) {
                case 'single': {
                    const def_value = props.defaultValue as string | number
                    const index     = state.columns[0].findIndex(item => item.value === def_value)
                    state.selected_indexs = [index === -1 ? 0 : index]
                    break
                }
                case 'multiple': {
                    const def_value = props.defaultValue as (string | number)[]
                    state.selected_indexs = state.columns.map((columns, column_index) => {
                        const index = columns.findIndex(item => item.value === def_value[column_index])
                        return index === -1 ? 0 : index
                    })
                    break
                }
                case 'auto': {
                    const def_value    = props.defaultValue as (string | number)[]
                    const first_value  = def_value[0]
                    const first_column = state.columns[0]

                    const first_index = first_column.findIndex(item => item.value === first_value)
                    if (first_index === -1) {
                        state.selected_indexs = state.columns.map(() => 0)
                    }

                    const selected_index = [] as number[]
                    const auto_columns   = [] as PickerOptionItem[][]

                    let key = first_value
                    for (let i = 1; i < state.columns.length; i++) {
                        const value   = def_value[i]
                        const columns = state.auto_column_map[key] || []

                        const index = columns.findIndex(item => String(item.vlaue) === String(value))
                        if (index === -1) {
                            selected_index.push(0)
                        } else {
                            selected_index.push(index)
                            auto_columns.push(columns)
                            key = joinKey(String(key), columns[index]?.value)
                        }

                        // state.selected_indexs = state.columns.map((column, column_index) => {
                        //     const value = def_value[column_index]
                        //     if ( !value ) return 0

                        //     if (column_index === 0) {
                        //         const index = column.findIndex(item => item.value === value)
                        //         return index === -1 ? 0 : 0
                        //     } else {
                        //         key += key ? `/${ value }` : value
                        //         console.log('---key', key, value, (state.auto_column_map[key] || []))
                        //         const index = (state.auto_column_map[key] || []).findIndex(item => item.value === value)
                        //         return index === -1 ? 0 : index
                        //     }
                        // })
                    }



                    state.selected_indexs = selected_index
                    break
                }
            }
        }

        function joinKey(key: string, val: string) {
            key += key ? `/${ val }` : val
            return key
        }

        function onPickerstart() {
            state.moving = true
        }
        function onPickerend() {
            state.moving = false
        }

        function onPickerChange(e: any) {
            const selected_indexs = e.detail.value
            if (state.type !== 'auto') {
                state.selected_indexs = selected_indexs
                return
            }


            // 找出当前变化的列
            const change_index = state.selected_indexs.findIndex((item, index) => item !== selected_indexs[index])
            if (change_index === -1) return

            let prefix_key = ''
            for (let i = 0; i <= change_index; i++) {
                const column: any = state.columns[i][selected_indexs[i]]
                prefix_key += prefix_key ? `/${ column.value }` : column.value
            }

            const all_columns = [...state.columns]
            for (let i = change_index + 1; i <= state.columns.length - 1; i++) {
                const columns      = state.auto_column_map[prefix_key] || []
                selected_indexs[i] = 0
                all_columns[i]     = columns
                prefix_key += `/${ columns[0].value }`
            }

            state.columns = all_columns
            state.selected_indexs = selected_indexs
        }

        function onCancel() {
            if (state.moving) return
            emit('update:visible', false)
            emit('cancel')
        }

        function onConfirm() {
            // if (state.moving) return
            emit('update:visible', false)
            emit('confirm', getSelectedValue())
        }

        function getSelectedValue() {
            if (state.type === 'single') {
                const item = state.columns[0][state.selected_indexs[0]]
                return {
                    selectedValue  : item?.value || '',
                    selectedOptions: item,
                }
            } else if (state.type === 'multiple') {
                const selectedValue   = [] as (string | number)[]
                const selectedOptions = [] as PickerOptionItem[]

                state.selected_indexs.forEach((selected_index, column_index) => {
                    const item = state.columns[column_index][selected_index]
                    selectedValue.push(item?.value || '')
                    selectedOptions.push(item)
                })

                return { selectedValue, selectedOptions }
            }
        }

        return {
            ...toRefs(state),
            visible$,
            onCancel,
            onConfirm,
            onPickerChange,
            onPickerstart,
            onPickerend,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="visible$"
        position="bottom"
        :show-top-close="false"
    >
        <view class="sd-picker">
            <view v-if="title" class="sd-picker__title">
                {{ title }}
            </view>
            <view class="sd-picker-content">
                <picker-view
                    :value="selected_indexs"
                    class="sd-picker-view"
                    indicator-style="height: 50px; line-height: 50px;"
                    immediate-change
                    @pickstart="onPickerstart"
                    @pickend="onPickerend"
                    @change="onPickerChange"
                >
                    <picker-view-column v-for="(options, column_index) in columns" :key="`column_${ column_index }`">
                        <view v-for="(item, index) in options" :key="index" class="sd-picker-view-column">
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
