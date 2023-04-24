<script setup lang="ts">
import { reactive } from 'vue'
const form = reactive({
    name   : '',
    address: '',
})
const form_rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trggier: ['blur'] },
    ],
    address: [
        { required: true, message: '请输入地址' },
    ],
})
</script>

<template>
    <sd-page title="Form 表单应用">
        <demo-card title="基本用法" :card="false">
            <sd-form :model="form" :rules="form_rules" label-width="120rpx">
                <sd-form-item prop="name" required label="姓名">
                    <sd-input v-model="form.name" placeholder="请输入姓名" />
                </sd-form-item>
                <sd-form-item prop="address" required label="地址">
                    <sd-input v-model="form.address" placeholder="请输入地址" />
                </sd-form-item>
            </sd-form>
        </demo-card>
    </sd-page>
</template>

