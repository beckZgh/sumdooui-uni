<script lang="ts">
import type { CSSProperties } from 'vue'
import type { FormProvide   } from '../common/tokens'

import { defineComponent, computed, onMounted, ref } from 'vue'
import { FORM_KEY, FORM_ITEM_KEY } from '../common/tokens'
import { MpMixin                 } from '../common/mixins'
import { useInject, useProvide   } from '../common/hooks'
import { form_item_props         } from './form-item'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdFormItem',
    props: form_item_props,
    setup(props) {
        const { parent: form } = useInject<FormProvide>(FORM_KEY)
        useProvide(FORM_ITEM_KEY)({ props, validate, resetField, clearValidate })

        const error = ref('')

        let initial_value: any // 初始化值
        onMounted(() => {
            if (form) {
                if (props.prop) {
                    initial_value = Utils.getValueByPath(form.props.model, props.prop)
                }
            }
        })

        // 显示冒号
        const colon$ = computed(() => props.colon ?? form?.props.colon ?? true)

        // 标题位置
        const label_position$ = computed(() => props.labelPosition || form?.props.labelPosition || 'right')

        // 内容区域排版
        const input_align$ = computed(() => props.inputAlign || form?.props.inputAlign )

        // 显示底部边框
        const show_border$ = computed(() => props.borderBottom || form?.props.borderBottom)

        // 是否显示异常信息
        const show_error$ = computed(() => props.showError ?? form?.props.showError ?? true)

        // 异常提示类型
        const error_type$ = computed(() => props.errorType || form?.props.errorType || 'message')

        // 标题样式
        const label_style$ = computed(() => {
            const styles: CSSProperties = {}
            const position = label_position$.value
            if (!['left', 'right'].includes(position)) return styles

            styles.textAlign = position as 'left' | 'right'

            const label_width = props.labelWidth || form?.props.labelWidth
            if (label_width) styles.width = Utils.toUnit(label_width)

            return styles
        })

        async function validate(trigger?: string | string[]) {
            const rules = getFilteredRules(trigger)
            if ( !rules.length ) return true

            error.value = ''

            const curr_value = Utils.getValueByPath(form?.props.model, props.prop)

            rules.forEach((rule) => {
                if (rule.required) {
                    if (curr_value === null || curr_value === undefined || curr_value === '') {
                        error.value = rule.message
                    }
                } else if (Utils.isRegExp(rule.regex)) {
                    if (!rule.regex.test(curr_value)) {
                        error.value = rule.message
                    }
                } else if (Utils.isFunction(rule.validator)) {
                    const result = rule.validator(curr_value, rule)
                    if (Utils.isPromise(result)) {
                        result.then((res) => {
                            if (Utils.isString(res)) {
                                error.value = res
                            } else if (res === false) {
                                error.value = rule.message
                            }
                        })
                    } else {
                        if (Utils.isString(result)) {
                            error.value = result
                        } else if (result === false) {
                            error.value = rule.message
                        }
                    }
                }
            })
        }

        function getFilteredRules(curr_trigger?: string | string[]) {
            const rules = props.rules || (props.prop ? form?.props.rules[props.prop] : '')
            if ( !rules || !rules.length ) return []

            return rules.filter((rule: any) => {
                if (!rule.trggier || !curr_trigger) return true
                if (Array.isArray(rule.trggier)) {
                    return rule.trggier.includes(curr_trigger)
                } else {
                    return rule.tigger === curr_trigger
                }
            })
        }

        function resetField() {
            if (props.prop) {
                (form?.props.model || {})[props.prop] = initial_value
            }
            error.value = ''
        }

        function clearValidate() {
            error.value = ''
        }

        return {
            colon$,
            error,
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
        }]"
        :style="customStyle"
    >
        <view class="sd-form-item-content" :class="{ 'sd-form-item-content--column': label_position$ === 'top' }">
            <view class="sd-form-item-content__left" :style="label_style$">
                <text v-if="required && label_position$ === 'right'" class="sd-form-item__required">
                    *
                </text>
                <text v-if="label" class="sd-form-item__label">
                    {{ label }}<template v-if="colon$">
                        :
                    </template>
                </text>
                <text v-if="required && (label_position$ === 'left' || label_position$ === 'top')" class="sd-form-item__required">
                    *
                </text>
            </view>
            <view class="sd-form-item-content__right">
                <slot />
            </view>
        </view>
        <view v-if="tips" class="sd-form-item__tips" :style="{ paddingLeft: label_style$.width }">
            {{ tips }}
        </view>
        <view v-if="error && show_error$" class="sd-form-item__error" :style="{ paddingLeft: label_style$.width }">
            {{ error }}
        </view>
    </view>
</template>
