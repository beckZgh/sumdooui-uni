<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed, onMounted, ref } from 'vue'
import { MpMixin } from '../common/mixins'
import { FORM_KEY, FORM_ITEM_KEY, type FormProvide } from '../common/tokens'
import { useInject, useProvide } from '../common/hooks'
import { form_item_props } from './form-item'
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
        const colon$ = computed(() => props.colon || form?.props.colon)

        // 标题位置
        const label_position$ = computed(() => (props.labelPosition || form?.props.labelPosition) || '')

        // 内容区域排版
        const body_align$ = computed(() => props.bodyAlign || form?.props.bodyAlign )

        // 显示底部边框
        const show_border$ = computed(() => form?.props.borderBottom)

        // 标题样式
        const label_style$ = computed(() => {
            const style: CSSProperties = {}
            const position = label_position$.value
            if (!['left', 'right'].includes(position)) return style

            style.textAlign = position as 'left' | 'right'

            const label_width = props.labelWidth || form?.props.labelWidth
            if (label_width) style.width = Utils.toUnit(label_width)

            return style
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
            const rules = props.rules || form?.props.rules[props.prop]
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
            body_align$,
            show_border$,
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
        :class="[customClass, { 'has-border': show_border$ }]"
        :style="customStyle"
    >
        <view class="sd-form-item__content" :class="{ 'is-column': label_position$ === 'top' }">
            <view class="sd-form-item__content-left" :style="label_style$ ">
                <text v-if="required && label_position$ === 'right'" class="sd-form-item__required">
                    *
                </text>
                {{ label }}
                <text v-if="required && (label_position$ === 'left' || label_position$ === 'top')" class="sd-form-item__required">
                    *
                </text>
            </view>
            <view class="sd-form-item__content-right" :class="{ 'is-content-right': body_align$ === 'right' }">
                <slot />
            </view>
        </view>
        <view v-if="error" class="sd-form-item__error" :style="{ paddingLeft: label_style$.width }">
            {{ error }}
        </view>
    </view>
</template>
