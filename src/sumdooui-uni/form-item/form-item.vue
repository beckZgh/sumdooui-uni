<script lang="ts">
import type { CSSProperties } from 'vue'
import type { FormProvide   } from '../common/tokens'
import type { ValidateError, ValidateFieldsError, Values } from '../utils/async-validator'

import { defineComponent, computed, onMounted, reactive, nextTick } from 'vue'
import { FORM_KEY, FORM_ITEM_KEY } from '../common/tokens'
import { MpMixin                 } from '../common/mixins'
import { useInject, useProvide   } from '../common/hooks'
import { form_item_props         } from './form-item'

import $utils from '../utils'
import AsyncValidator from '../utils/async-validator'

export default defineComponent({
    ...MpMixin,

    name : 'SdFormItem',
    props: form_item_props,
    setup(props) {
        const { parent: form } = useInject<FormProvide>(FORM_KEY)

        let initial_value: any   // 初始化值
        let is_resetting = false // 是否重置中

        const state = reactive({
            valid_msg: '', // 错误信息
        })

        onMounted(() => {
            initial_value = getValue()
        })

        // 显示冒号
        const colon$ = computed(() => props.colon ?? form?.props.colon ?? true)

        // 显示标题
        const show_label$ = computed(() => form?.props.showLabel ?? true)

        // 标题位置
        const label_position$ = computed(() => props.labelPosition || form?.props.labelPosition || 'left')

        // 内容区域排版
        const input_align$ = computed(() => props.inputAlign || form?.props.inputAlign)

        // 显示底部边框
        const show_border$ = computed(() => props.borderBottom ?? form?.props.borderBottom)

        // 是否显示异常信息
        const show_error$ = computed(() => props.showError ?? form?.props.showError ?? true)

        // 异常提示类型
        const error_type$ = computed(() => form?.props.errorType)

        // 标题样式
        const label_style$ = computed(() => {
            const styles: CSSProperties = {}

            const position = label_position$.value
            if (!['left', 'right'].includes(position)) return styles

            styles.textAlign = position as 'left' | 'right'

            const label_width = props.labelWidth || form?.props.labelWidth
            if (label_width) styles.width = $utils.toUnit(label_width)

            return styles
        })

        // 规范校验规则
        const normalized_rules$ = computed(() => {
            const rules: any[] = []

            // form-item 配置的校验规则
            if (props.rules) rules.push(...props.rules)

            // form 配置的校验规则
            const form_rules = form?.props?.rules
            if (form_rules && props.prop) {
                const _rules = form_rules[props.prop]
                if (_rules) rules.push(..._rules)
            }

            // 是否配置了必填属性
            const required = props.required
            if (required !== undefined) {
                // 取得所有配置 required 的规则
                const required_rules = rules
                    .map((rule, i) => [rule, i] as const)
                    .filter(([rule]) => Object.keys(rule).includes('required'))

                // 替换当前 required 规则为 form-item required 值
                if (required_rules.length > 0) {
                    for (const [rule, i] of required_rules) {
                        if (rule.required === required) continue
                        rules[i] = { ...rule, required }
                    }
                } else {
                // 补充必填规则
                    rules.push({ required })
                }
            }

            return rules
        })

        // 校验指定规则
        async function validate(trigger?: string | string[], cb?: (parmas: any) => void): Promise<boolean> {
            if (is_resetting || !props.prop) return false // 重置中或无校验属性不处理

            const rules = getRulesByTrigger(trigger)
            if ( !rules.length ) return true

            const res = await doValidate(rules)
            if ( !res ) {
                state.valid_msg = ''
                return true
            }

            cb && cb(res.errors) // 通过回调抛出字段错误信息

            state.valid_msg = res.errors[0]?.message || '校验失败'

            return false
        }

        // 取得指定触发的校验规则列表
        function getRulesByTrigger(trigger?: string | string[]) {
            const rules = normalized_rules$.value
            if ( !rules || !rules.length ) return []

            return rules.filter((rule: any) => {
                if (!rule.trggier || !trigger) return true // 未声明则 blur change 触发

                if (Array.isArray(rule.trggier)) {         // 声明空数组则不校验
                    return rule.trggier.includes(trigger)
                } else {
                    return rule.tigger === trigger
                }
            })
        }

        // 开始校验
        function doValidate(rules: any[]): Promise<{ errors: ValidateError[]; fields: ValidateFieldsError | Values } | void> {
            const prop = props.prop || ''
            if ( !prop ) return Promise.resolve()

            // 创建校验器
            const validator = new AsyncValidator({ [prop]: rules })

            return new Promise((resolve) => {
                validator.validate(
                    { [prop]: $utils.obj.get(form?.props.model, prop) },
                    { firstFields: true },
                    (errors, fields) => {
                        if (errors?.length) {
                            resolve({ errors, fields })
                        } else {
                            resolve()
                        }
                    },
                )
            })
        }

        // 重置字段及校验错误
        async function resetField() {
            is_resetting = true

            setValue($utils.clone(initial_value)) // 重置默认值
            await nextTick()                      // 等待更新
            clearValidate()                       // 清空校验错误

            is_resetting = false
        }

        // 清空校验
        function clearValidate() {
            state.valid_msg = ''
        }

        // 获取关联值
        function getValue() {
            const prop = props.prop
            const model = form?.props.model
            if ( !prop || !model) return undefined

            return $utils.obj.get(model, prop) // 支持嵌套路径
        }

        // 设置关联值
        function setValue(val: any) {
            const prop = props.prop
            const model = form?.props.model
            if ( !prop || !model) return

            $utils.obj.set(model, prop, val)  // 支持嵌套路径
        }

        useProvide(FORM_ITEM_KEY)({ props, validate, resetField, clearValidate })

        return {
            state,
            colon$,
            show_label$,
            label_position$,
            label_style$,
            input_align$,
            show_border$,
            show_error$,
            error_type$,
            validate,
            resetField,
            clearValidate,
        }
    },
})
</script>

<template>
    <view
        class="sd-form-item"
        :class="[customClass, {
            'sd-form-item--border': show_border$,
            'is-content-right'    : input_align$ === 'right',
            'is-error'            : show_error$ && error_type$ === 'border-bottom' && state.valid_msg,
            'is-clickable'        : clickable,
        }]"
        :style="customStyle"
    >
        <view class="sd-form-item-content" :class="{ 'sd-form-item-content--column': label_position$ === 'top' }">
            <view v-if="show_label$" class="sd-form-item-content__left" :style="label_style$">
                <text v-if="required && label_position$ === 'right'" class="sd-form-item__required">
                    *
                </text>
                <text v-if="label" class="sd-form-item__label">
                    {{ label }}<template v-if="colon$">:</template>
                </text>
                <text v-if="required && (label_position$ === 'left' || label_position$ === 'top')" class="sd-form-item__required">
                    *
                </text>
            </view>
            <view class="sd-form-item-content__right">
                <slot />
            </view>
            <slot name="extra" />
        </view>
        <view v-if="show_error$ && error_type$ === 'message' && state.valid_msg" class="sd-form-item__error" :style="{ paddingLeft: label_style$.width }">
            {{ state.valid_msg }}
        </view>
    </view>
</template>
