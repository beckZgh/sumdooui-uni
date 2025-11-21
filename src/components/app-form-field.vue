<script lang="ts">
import type { PropType  } from 'vue'
import type { FieldConfig } from '@/utils/form'

import {
    defineComponent, reactive, ref, computed, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted,
} from 'vue'

export default defineComponent({
    name : 'AppFormRenderField',
    props: {
        item           : { type: Object as PropType<FieldConfig> },
        model          : { type: Object as PropType<Record<string, any>>, default: () => ({}) },
        showInputBorder: { type: Boolean },
    },
    setup(props) {
        // 控件配置
        const config = reactive({
            tag  : 'input',
            field: undefined,
            label: undefined,
            ...props.item,
        })

        // 控件绑定值
        const model_value$ = computed<any>({
            get: () => {
                return $utils.obj.get(props.model, config.field)
            },
            set: (val: any) => {
                config.field && $utils.obj.set(props.model, config.field, val)
            },
        })

        const visible              = ref(false)                         // 弹窗控件的显示开关
        const selected_show_text   = ref<string | undefined>(undefined) // 最后一次选中的值
        const last_selected_values = ref<any>()                         // 最后一次选中的值

        // 显示文本
        const show_text$ = computed(() => {
            // 减少 picker 等控件计算显示文本的过程
            if (model_value$.value === last_selected_values.value && $utils.isString(selected_show_text.value)) {
                return selected_show_text.value
            }

            if (['picker'].includes(config.tag)) {
                return formatPickerValueText(model_value$.value || [])
            }

            return model_value$.value
        })

        // 标题文本
        const label$ = computed(() => $utils.isFunction(config.label) ? config.label(getCbParams()) : config.label)

        // 选项列表
        const options$ = computed<any[]>(() => config.options || [])

        // 是否隐藏
        const hidden$ = computed(() => $utils.isFunction(config.hidden) ? config.hidden(getCbParams()) : config.hidden)

        // 是否必填
        const required$ = computed(() => $utils.isFunction(config.required) ? config.required(getCbParams()) : config.required)

        // 是否禁用
        const disabled$ = computed(() => $utils.isFunction(config.disabled) ? config.disabled(getCbParams()) : config.disabled)

        // 占位文本
        const placeholder$ = computed(() => {
            const { tag, placeholder } = config
            if ($utils.isFunction(placeholder)) return placeholder(getCbParams())

            if (!tag) return ''
            if (placeholder && $utils.isString(placeholder)) return placeholder

            const label = label$.value
            if (['picker', 'region', 'calendar'].includes(tag)) return `请选择${ label }`

            return `请输入${ label }`
        })

        // 显示边框
        const border$ = computed(() => props.showInputBorder ? 'surround' : 'none')

        // 组件事件监听
        const events$ = computed(() => {
            const _events_ = {} as any
            const events = config.events
            if (events) {
                Object.entries(events).forEach(([k, v]) => {
                    const fn = v
                    if ( !fn ) return

                    _events_[k] = ($event: any) => fn(getCbParams($event))
                })
            }
            return _events_
        })

        // 组件属性配置
        const props$ = computed(() => ({ ...config.props, ...events$.value }))

        // 弹窗组件属性统一配置（<sd-input type="select" />）
        const input_select_props$ = computed(() => {
            return {
                type       : 'select',
                placeholder: placeholder$.value,
                border     : border$.value,
                selectOpen : visible.value,
                disabled   : disabled$.value,
                onClick    : show,
            }
        })

        // 执行挂载前钩子函数
        onBeforeMount(() => { config.onBeforeMount && config.onBeforeMount(getCbParams()) })

        // 初始化默认值并执行挂载后钩子函数
        onMounted(() => {
            if (typeof config.value !== 'undefined') {
                model_value$.value = config.value
            }

            config.onMounted && config.onMounted(getCbParams())
        })

        // 执行卸载前钩子函数
        onBeforeUnmount(() => { config.onBeforeUnmount && config.onBeforeUnmount(getCbParams()) })

        // 执行卸载钩子函数
        onUnmounted(() => { config.onUnmounted && config.onUnmounted(getCbParams()) })

        // 取得回调函数注入参数
        function getCbParams($event?: any): any {
            const params: Record<string, any> = {
                $model : props.model,
                $value : $utils.obj.get(props.model, config.field),
                $field : config.field || '',
                $config: config,
            }

            if ($event) params.$event = $event

            return params
        }

        // 处理 Calendar 日历选择器确认值
        function handleCalendarConfirm(date: string) {
            model_value$.value = date
        }

        // 处理 Select 选择器确认值
        function handleSelectConfirm({ selectedItems, selectedValues }: any) {
            setSelectedShowText(selectedItems)

            model_value$.value = selectedValues
            last_selected_values.value = selectedValues
        }

        // https:// developers.weixin.qq.com/miniprogram/dev/component/picker.html#%E6%97%A5%E6%9C%9F%E9%80%89%E6%8B%A9%E5%99%A8%EF%BC%9Amode-date
        // 微信小程序自带的 picker 选择器，选中值处理
        function handleRawPickerChange(e: any) {
            model_value$.value = e.detail.value
        }

        // 处理 Picker 选择器确认值
        function handlePickerConfirm({ selectedItems, selectedValues }: any) {
            setSelectedShowText(selectedItems)

            model_value$.value = selectedValues
            last_selected_values.value = selectedValues
        }

        // 设置选中项显示文本
        function setSelectedShowText(selectedItems: any[]) {
            const labelField = config.props?.labelField || 'label'

            if (selectedItems.length) {
                selected_show_text.value = selectedItems.map((item: any) => item[labelField]).join(',')
            } else {
                selected_show_text.value = ''
            }
        }

        // 格式化 Picker 选择器选中值的文本显示
        function formatPickerValueText(values: any[]) {
            const options = config.options || []
            if ( !values.length || !options.length) return ''

            const {
                labelField = 'label',
                valueField = 'value',
            } = config.props || {}

            return options.map((opts, col_idx) => {
                if (!Array.isArray(opts)) return ''

                const item = opts.find((item: any) => item[valueField] === values[col_idx])
                if ( !item ) return ''

                return item[labelField] || ''
            }).join(',')
        }

        // 处理 DatetimePicker 选择器确认值
        function handleDatetimePickerConfirm({ value }: any) {
            model_value$.value = value
        }

        // 处理表单项点击
        function handleFormItemClick($event: any) {
            config.onFormItemClick && config.onFormItemClick(getCbParams($event))
        }

        function show() { visible.value = true  }
        function hide() { visible.value = false }

        return {
            visible,
            config,
            model_value$,
            show_text$,
            label$,
            options$,
            hidden$,
            required$,
            disabled$,
            placeholder$,
            border$,
            props$,
            input_select_props$,
            handlePickerConfirm,
            handleDatetimePickerConfirm,
            handleCalendarConfirm,
            handleSelectConfirm,
            handleRawPickerChange,
            handleFormItemClick,
            show,
            hide,
        }
    },
})
</script>

<template>
    <!-- 展示：按钮 -->
    <template v-if="!hidden$">
        <template v-if="config.tag === 'gap'">
            <view style="height: 20rpx;" />
        </template>
        <template v-else-if="config.tag === 'alert'">
            <sd-alert v-bind="props$" />
        </template>

        <template v-else-if="config.tag === 'table'">
            <sd-table v-bind="props$" />
        </template>

        <template v-else-if="config.tag === 'button'">
            <sd-button v-bind="props$" />
        </template>

        <template v-else-if="config.tag === 'buttons'">
            <template v-for="(btn, idx) in config.options" :key="idx">
                <sd-button v-bind="btn" />
            </template>
        </template>

        <sd-form-item
            v-else
            v-bind="config.formItem"
            :label="label$"
            :prop="config.field"
            :required="required$"
            :rules="config.rules"
            :clickable="config.arrow"
            @tap="handleFormItemClick"
        >
            <!-- 展示：文本 -->
            <template v-if="config.tag === 'text'">
                <text>{{ model_value$ }}</text>
                <!-- <sd-input :model-value="model_value$" readonly  :disabled="disabled$" :placeholder="placeholder$" /> -->
            </template>

            <!-- 输入框 -->
            <template v-if="config.tag === 'input'">
                <sd-input v-bind="props$" v-model="model_value$" :disabled="disabled$" :placeholder="placeholder$" :border="border$" />
            </template>

            <!-- 文本域 -->
            <template v-if="config.tag === 'textarea'">
                <sd-textarea v-bind="props$" v-model="model_value$" :disabled="disabled$" :placeholder="placeholder$" :border="border$" />
            </template>

            <!-- 数字步进器 -->
            <template v-if="config.tag === 'number'">
                <sd-stepper v-bind="props$" v-model="model_value$" :disabled="disabled$" />
            </template>

            <!-- 评分 -->
            <template v-if="config.tag === 'rate'">
                <sd-rate v-bind="props$" v-model="model_value$" :disabled="disabled$" />
            </template>

            <!-- 开关 -->
            <template v-if="config.tag === 'switch'">
                <sd-switch v-bind="props$" v-model="model_value$" :disabled="disabled$" />
            </template>

            <!-- 多选框 -->
            <template v-if="config.tag === 'checkbox'">
                <sd-checkbox v-bind="props$" v-model="model_value$" :disabled="disabled$" />
            </template>

            <!-- 多选框组 -->
            <template v-if="config.tag === 'checkbox-group'">
                <sd-checkbox-group v-bind="props$" v-model="model_value$" :disabled="disabled$" :options="options$" />
            </template>

            <!-- 单选框组 -->
            <template v-if="config.tag === 'radio-group'">
                <sd-radio-group v-bind="props$" v-model="model_value$" :disabled="disabled$" :options="options$" />
            </template>

            <!-- 日历选择控件: 单个日期、多个日期、日期范围 -->
            <template v-if="['date', 'dates', 'daterange'].includes(config.tag)">
                <sd-input v-bind="input_select_props$" />
                <sd-calendar
                    v-model:visible="visible"
                    v-bind="props$"
                    :mode="config.tag"
                    :default-date="model_value$"
                    @confirm="handleCalendarConfirm"
                />
            </template>

            <!-- 弹窗选择控件 -->
            <template v-if="['select', 'select-multi'].includes(config.tag)">
                <sd-input v-bind="input_select_props$" :model-value="show_text$" />
                <sd-select
                    v-bind="props$"
                    v-model:visible="visible"
                    :options="config.options"
                    :default-value="model_value$"
                    :multi="config.tag === 'select-multi'"
                    @confirm="handleSelectConfirm"
                />
            </template>

            <!-- 级联选择控件: 待实现 -->
            <template v-if="config.tag === 'cascader'">
                <sd-input v-bind="input_select_props$" />
            </template>

            <!-- https://developers.weixin.qq.com/miniprogram/dev/component/picker-view.html -->
            <!-- 微信小程序提供的 picker-view 滚动选择器: 待实现 -->
            <template v-if="config.tag === 'picker'">
                <sd-input v-bind="input_select_props$" :model-value="show_text$" />
                <sd-picker2
                    v-bind="props$"
                    v-model:visible="visible"
                    :options="config.options"
                    :default-value="model_value$"
                    @confirm="handlePickerConfirm"
                />
            </template>

            <!-- 日期时间选择器: (year, year-month, date, time, datetime) -->
            <template v-if="/^picker-(year|year-month|date|time|datetime)$/.test(config.tag)">
                <sd-input v-bind="input_select_props$" :model-value="show_text$" />
                <sd-datetime-picker
                    v-bind="props$"
                    v-model:visible="visible"
                    :mode="config.tag.replace('picker-', '')"
                    :options="config.options"
                    :default-value="model_value$"
                    @confirm="handleDatetimePickerConfirm"
                />
            </template>

            <!-- 地址选择器: 待实现 (province, city, area) -->
            <template v-if="config.tag === 'region-picker'">
                <sd-input v-bind="input_select_props$" />
            </template>

            <!-- 跳转页面编辑 -->
            <template v-if="config.arrow" #extra>
                <sd-icon name="right" />
            </template>
        </sd-form-item>
    </template>
</template>
