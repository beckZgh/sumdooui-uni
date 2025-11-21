<script setup lang="ts">
import { reactive, ref } from 'vue'

const config = reactive({
    labelPosition: 'right',
    labelWidth   : 140,
    inputAlign   : 'left',
    disabled     : false,
    readonly     : false,
})

const gender_opts = [
    { label: '未知', value: 0 },
    { label: '先生', value: 1 },
    { label: '女士', value: 2 },
]

const firust_opts = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banner' },
    { label: '橘子', value: 'orange' },
]
const form = reactive({
    name   : '',
    gender : 0,
    firust : [],
    info   : '',
    stepper: 0,
    switch : false,
    rate   : 0,
})
const form_rules = reactive({
    name: [
        { required: true, message: '内容不能为空', trggier: ['blur', 'change'] },
    ],
    info: [
        { required: true, message: '内容不能为空', trggier: ['blur', 'change'] },
    ],
})

const m = reactive({
    show_border: false,
})

const form_ref = ref()
function handleSubmit() {
    const $form = form_ref.value
    if ( !$form ) return

    $form.validate()
}

function handleReset() {
    const $form = form_ref.value
    if ( !$form ) return

    $form.resetFields()
}

function handleClear() {
    const $form = form_ref.value
    if ( !$form ) return

    $form.clearValidate()
}
</script>

<template>
    <sd-page title="Form 表单应用">
        <demo-card title="绑定值" :card="false">
            <view style="padding: 30rpx;">
                {{ form }}
            </view>
        </demo-card>

        <demo-card title="基本用法">
            <sd-form
                ref="form_ref" :model="form"
                :rules="form_rules"
                label-position="top"
                :show-error="false"
            >
                <label for="name">
                    <sd-form-item prop="name" required label="输入框">
                        <sd-input id="name" v-model="form.name" :border="m.show_border" />
                    </sd-form-item>
                </label>
            </sd-form>
        </demo-card>
    </sd-page>
</template>

<style lang="scss" scoped>
:deep(.sd-form-item) {
    padding: 15px 12px;
    background: #F5F5F5;
    margin-bottom: 24rpx;
    border-radius: 12rpx;
    margin-left: 0;
    margin-right: 0;
}
</style>
