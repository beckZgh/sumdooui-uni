<script setup lang="ts">
import { reactive, ref } from 'vue'
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
    name   : 'beck',
    address: 'test',
    gender : 0,
    firust : [],
    info   : '',
    switch : false,
})
const form_rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trggier: ['blur', 'change'] },
    ],
    address: [
        { required: true, message: '请输入地址' },
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
        <demo-card title="基本用法" :card="false">
            <sd-form ref="form_ref" :model="form" :rules="form_rules" label-width="120rpx" body-align="left">
                <sd-form-item prop="name" required label="姓名">
                    <sd-input v-model="form.name" :border="m.show_border" placeholder="请输入姓名" />
                </sd-form-item>
                <sd-form-item prop="address" required label="地址">
                    <sd-input v-model="form.address" :border="m.show_border" placeholder="请输入地址" />
                </sd-form-item>
                <sd-form-item prop="gender" label="爱好">
                    <sd-radio-group v-model="form.gender" :options="gender_opts" />
                </sd-form-item>
                <sd-form-item prop="firust" label="水果">
                    <sd-checkbox-group v-model="form.firust" :options="firust_opts" />
                </sd-form-item>
                <sd-form-item prop="switch" label="开关">
                    <sd-switch v-model="form.switch" />
                </sd-form-item>
                <sd-form-item prop="info" required label="描述">
                    <sd-textarea v-model="form.info" :border="m.show_border" placeholder="请输入个人描述" />
                </sd-form-item>
                <sd-form-item>
                    <sd-button @click="handleSubmit">
                        提交
                    </sd-button>
                    <sd-button :custom-style="{ marginLeft: '30rpx' }" @click="handleReset">
                        重置
                    </sd-button>
                    <sd-button :custom-style="{ marginLeft: '30rpx' }" @click="handleClear">
                        清空
                    </sd-button>
                </sd-form-item>
            </sd-form>
        </demo-card>
        <demo-card title="绑定值" :card="false">
            <sd-cell title="是否显示边框" :clickable="false">
                <template #extra>
                    <sd-switch v-model="m.show_border" />
                </template>
            </sd-cell>

            <view style="padding: 30rpx;">
                {{ form }}
            </view>
        </demo-card>
    </sd-page>
</template>

