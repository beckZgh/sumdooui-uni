<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { form_props } from './form'
import { useProvide } from '../common/hooks'
import { FORM_KEY } from '../common/tokens'
export default defineComponent({
    name : 'SdForm',
    props: form_props,
    setup(props) {
        const state = reactive({
            rules: {} as Record<string, any[]>,
            error: {},
        })

        // 注入表单
        useProvide(FORM_KEY)({ props })

        // 添加规则
        function addRules(prop: string, rules: any[]) {
            state.rules[prop] = rules
        }

        // 删除规格
        function removeRules(prop: string) {
            return Reflect.deleteProperty(state.rules, prop)
        }

        function validRules(prop: string, target: string | string[]) {
            const rules = state.rules[prop]
            if ( !rules || rules.length ) return

            // 根据 target 进行校验
            rules.forEach((item) => {})
        }

        // 对整个表单进行校验
        function validate() {

        }

        // 对部分表单字段进行校验
        function validField(prop: string, rules: any[]) {

        }

        // 对整个表单进行重置，将所有字段重置未初始化值，并移除校验结果
        function resetFields() {

        }

        // 移除表单项的检验结果
        function clearValidate() {

        }

        return {}
    },
})
</script>

<template>
    <view class="sd-form">
        <slot />
    </view>
</template>
