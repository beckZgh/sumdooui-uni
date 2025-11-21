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

        <demo-card title="基本用法" :card="false">
            <sd-form
                ref="form_ref" :model="form"
                :rules="form_rules"
                :label-width="`${ config.labelWidth }rpx`"
                :label-position="config.labelPosition"
                :input-align="config.inputAlign"
                :disabled="config.disabled"
                :readonly="config.readonly"
            >
                <sd-form-item prop="name" required label="输入框">
                    <sd-input v-model="form.name" :border="m.show_border" />
                </sd-form-item>
                <sd-form-item prop="gender" label="单选框">
                    <sd-radio-group v-model="form.gender" :options="gender_opts" />
                </sd-form-item>
                <sd-form-item prop="firust" label="复选框" tips="选择你喜欢的水果">
                    <sd-checkbox-group v-model="form.firust" :options="firust_opts" />
                </sd-form-item>
                <sd-form-item prop="stepper" label="步进器">
                    <sd-stepper v-model="form.stepper" />
                </sd-form-item>
                <sd-form-item prop="switch" label="开关">
                    <sd-switch v-model="form.switch" />
                </sd-form-item>
                <sd-form-item prop="rate" label="评分">
                    <sd-rate v-model="form.rate" />
                </sd-form-item>
                <sd-form-item prop="info" required label="文本域">
                    <sd-textarea v-model="form.info" :border="m.show_border" />
                </sd-form-item>
                <sd-form-item>
                    <sd-button :disabled="config.disabled || config.readonly" @click="handleSubmit">
                        提交
                    </sd-button>
                    <sd-button :disabled="config.disabled || config.readonly" :custom-style="{ marginLeft: '30rpx' }" @click="handleReset">
                        重置
                    </sd-button>
                    <sd-button :disabled="config.disabled || config.readonly" :custom-style="{ marginLeft: '30rpx' }" @click="handleClear">
                        清空
                    </sd-button>
                </sd-form-item>
            </sd-form>
        </demo-card>

        <demo-card title="表单配置" :card="false">
            <sd-cell title="标题位置">
                <template #extra>
                    <sd-radio-group
                        v-model="config.labelPosition" :options="[
                            { label: '左边', value: 'left' },
                            { label: '右边', value: 'right' },
                            { label: '顶部', value: 'top' },
                        ]"
                    />
                </template>
            </sd-cell>
            <sd-cell title="内容方向排版">
                <template #extra>
                    <sd-radio-group
                        v-model="config.inputAlign" :options="[
                            { label: '靠左显示', value: 'left' },
                            { label: '靠右显示', value: 'right' },
                        ]"
                    />
                </template>
            </sd-cell>
            <sd-cell title="标题宽度">
                <template #extra>
                    <sd-stepper v-model="config.labelWidth" />
                </template>
            </sd-cell>
            <sd-cell title="禁用表单">
                <template #extra>
                    <sd-switch v-model="config.disabled" />
                </template>
            </sd-cell>
            <sd-cell title="只读模式表单">
                <template #extra>
                    <sd-switch v-model="config.readonly" />
                </template>
            </sd-cell>
        </demo-card>
    </sd-page>
</template>

