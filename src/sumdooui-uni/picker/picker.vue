<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { picker_props, type PickerOptionItem } from './picker'

export default defineComponent({
    name : 'SdPicker',
    props: picker_props,
    emits: [
        'update:modelValue',
        'cancel',
        'confirm',
        'pickerstart',
        'pickerend',
        'change',
    ],
    setup(props, { emit }) {
        const picker_items  = ref([1])
        const picker_indexs = ref<number[]>([])

        const visible$ = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            },
        })

        onMounted(() => {
            init()
        })

        function init() {
            if (!props.defaultValue) return

            const options      = props.options
            const defaultValue = props.defaultValue
            switch (props.mode) {
                case 'selector': {
                    const idx = (options as PickerOptionItem[]).findIndex(item => item.value === defaultValue)
                    if (idx !== -1) picker_indexs.value = [idx]
                    return
                }
                case 'multi-selector': {
                    picker_indexs.value = (options as PickerOptionItem[][]).map((columns, index) => {
                        return columns.findIndex(item => item.value === ((defaultValue as (string | number)[]) || [])[index])
                    })
                }
            }
        }

        function onChange(e: any) {
            picker_indexs.value = e.detail.value
        }

        function onCancel() {
            emit('cancel', ...getItemValue())
            emit('update:modelValue', false)
        }

        function onConfirm() {
            emit('confirm', ...getItemValue())
            emit('update:modelValue', false)
        }

        function getItemValue() {
            const options = props.options
            switch (props.mode) {
                case 'selector': {
                    const item = (options as PickerOptionItem[])[picker_indexs.value[0]]
                    return [item.value || '', item]
                }
                case 'multi-selector': {
                    const arr = (options as unknown as PickerOptionItem[][]).map((columns, index) => {
                        const idx = picker_indexs.value[index]
                        return [columns[idx].value, columns[idx]]
                    })
                    return [arr.map(item => item[0]), arr.map(item => item[1])]
                }
            }

            return []
        }

        return {
            picker_indexs,
            visible$,
            onCancel,
            onConfirm,
            onChange,
        }
    },
})
</script>

<template>
    <sd-popup v-model:visible="visible$" position="bottom" :show-top-close="false">
        <view class="sd-picker__head">
            <view class="sd-picker__head-btn" @tap="onCancel">
                {{ cancelText }}
            </view>
            <view class="sd-picker__head-title">
                {{ title }}
            </view>
            <view class="sd-picker__head-btn is-confirm-btn" @tap="onConfirm">
                {{ confirmText }}
            </view>
        </view>
        <view class="sd-picker__body">
            <picker-view
                v-if="visible$"
                :value="picker_indexs"
                immediate-change
                class="sd-picker-view"
                indicator-style="height: 50px;"
                @change="onChange"
            >
                <!-- 单列模式 -->
                <template v-if="mode === 'selector'">
                    <picker-view-column>
                        <view v-for="(item, index) in (options as PickerOptionItem[])" :key="index" class="sd-picker-item">
                            <text>{{ item.label }}</text>
                        </view>
                    </picker-view-column>
                </template>

                <template v-else>
                    <!-- 多列模式 -->
                    <picker-view-column v-for="(columns, column_index) in (options as PickerOptionItem[][])" :key="column_index">
                        <view v-for="(item, index) in columns" :key="index" class="sd-picker-item">
                            <text>{{ item.label }}</text>
                        </view>
                    </picker-view-column>
                </template>
            </picker-view>
        </view>
    </sd-popup>
</template>
