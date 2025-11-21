<script lang="ts">
import { defineComponent } from 'vue'
import { MpMixin         } from '../common/mixins'
import { form_props      } from './form'
import { useProvide      } from '../common/hooks'
import { FORM_KEY        } from '../common/tokens'

export default defineComponent({
    ...MpMixin,

    name : 'SdForm',
    props: form_props,
    setup(props) {

        // 注入表单
        const { internal_children } = useProvide(FORM_KEY)({
            props,
            validate,
            validateFields,
            resetFields,
            clearValidate,
        })

        // 对整个表单进行校验
        async function validate(cb?: (errors: any[]) => void): Promise<boolean> {
            const errs = [] as any[]

            for (const child of internal_children) {
                const instance = child.proxy as any
                if ( !instance ) continue

                // 开始校验
                await instance.validate('', (errors: any[]) => {
                    errs.push(...errors)
                })
            }

            cb && cb(errs) // 回调抛出错误：可外部进行提示

            return !errs.length
        }

        // 对指定字段进行校验
        async function validateFields(props: string | string[] = [], cb?: (errors: any[]) => void) {

            props = Array.isArray(props) ? props : [props]
            if (!props.length) return true

            const errs = [] as any[]

            for (const child of internal_children) {
                const instance = child.proxy as any
                if ( !instance ) continue

                // 非指定字段不校验
                if (props.length && !props.includes(instance.prop)) continue

                // 开始校验
                await instance.validate('', (errors: any[]) => {
                    errs.push(...errors) // 收集错误信息
                })
            }

            cb && cb(errs) // 回调抛出错误：可外部进行提示

            return !errs.length
        }

        // 对整个表单进行重置，将所有字段重置未初始化值，并移除校验结果
        function resetFields(props: string | string[] = []) {
            props = Array.isArray(props) ? props : [props]

            for (const child of internal_children) {
                const instance = child.proxy as any
                if ( !instance ) continue

                // 非指定字段不重置
                if (props.length && !props.includes(instance.prop)) continue

                instance.resetField()
            }
        }

        // 移除表单项的检验结果
        function clearValidate() {
            for (const child of internal_children) {
                const instance = child.proxy as any
                if ( !instance ) continue

                instance.clearValidate()
            }
        }

        return {
            validate,
            validateFields,
            resetFields,
            clearValidate,
        }
    },
})
</script>

<template>
    <view class="sd-form" :class="customClass" :style="customStyle">
        <slot />
        <template v-for="(item, index) in schema"  :key="index">
            <template v-if="item.id && $slots[item.id]">
                <slot :name="item.id" />
            </template>
            <template v-if="item.field && $slots[item.field]">
                <slot :name="item.field" />
            </template>
            <slot v-else name="item" :item="item" :model="model" />
        </template>
    </view>
</template>
