<script lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { defineComponent } from 'vue'
import { MpMixin         } from '../common/mixins'
import { form_props      } from './form'
import { useProvide      } from '../common/hooks'
import { FORM_KEY        } from '../common/tokens'

export default defineComponent({
    ...MpMixin,

    name : 'SdForm',
    props: form_props,
    setup(props, { expose }) {
        // 注入表单
        const { internal_children } = useProvide(FORM_KEY)({ props })

        // 对整个表单进行校验
        async function validate() {
            internal_children.forEach((child: ComponentInternalInstance) => {
                if (child.proxy) {
                    (child.proxy as any).validate()
                }
            })
        }

        // 对整个表单进行重置，将所有字段重置未初始化值，并移除校验结果
        function resetFields() {
            internal_children.forEach((child: ComponentInternalInstance) => {
                if (child.proxy) {
                    (child.proxy as any).resetField()
                }
            })
        }

        // 移除表单项的检验结果
        function clearValidate() {
            internal_children.forEach((child: ComponentInternalInstance) => {
                if (child.proxy) {
                    (child.proxy as any).clearValidate()
                }
            })
        }

        expose({
            validate,
            resetFields,
            clearValidate,
        })

        return {}
    },
})
</script>

<template>
    <view class="sd-form" :class="customClass" :style="customStyle">
        <slot />
    </view>
</template>
