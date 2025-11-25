<script setup lang="ts">
import { reactive } from 'vue'
import { defineFormSchema } from '@/utils/form'

const opts = [
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 },
]

const m = reactive({
    form_model: {
        checkbox_group1: [],
        checkbox_group2: [],
        checkbox_group3: [],
        checkbox_group4: [],
        checkbox_group5: [],
        checkbox_group6: [],
        checkbox_group7: [],
        radio_group1   : '',
        radio_group2   : '',
        radio_group3   : '',
        radio_group4   : '',
        radio_group5   : '',
        radio_group6   : '',
        radio_group7   : '',
    },
    form_schema: defineFormSchema(`
        输入框*   : input@input
        文本框    : textarea@textarea
        数字框    : number@number
        多选框    : checkbox@checkbox
        多选组1   : checkbox_group1@checkbox-group
        多选组2   : checkbox_group2@checkbox-group
        多选组3   : checkbox_group3@checkbox-group
        多选组4   : checkbox_group4@checkbox-group
        多选组5   : checkbox_group5@checkbox-group
        多选组6   : checkbox_group6@checkbox-group
        多选组7   : checkbox_group7@checkbox-group
        单选组1   : radio_group1@radio-group
        单选组2   : radio_group2@radio-group
        单选组3   : radio_group3@radio-group
        单选组4   : radio_group4@radio-group
        单选组5   : radio_group5@radio-group
        单选组6   : radio_group6@radio-group
        单选组7   : radio_group7@radio-group
        评分      : rate@rate
        开关      : switch@switch
    `, {
        checkbox_group1: { options: opts },
        checkbox_group2: { options: opts, props: { column: 1 } },
        checkbox_group3: { options: opts, props: { column: 2 } },
        checkbox_group4: { options: opts, props: { border: true } },
        checkbox_group5: { options: opts, props: { border: true, column: 1 } },
        checkbox_group6: { options: opts, props: { border: true, column: 2 } },
        checkbox_group7: { options: opts, props: { divider: true }, formItem: { labelPosition: 'top' } },
        radio_group1   : { options: opts },
        radio_group2   : { options: opts, props: { column: 1 } },
        radio_group3   : { options: opts, props: { column: 2 } },
        radio_group4   : { options: opts, props: { border: true } },
        radio_group5   : { options: opts, props: { border: true, column: 1 } },
        radio_group6   : { options: opts, props: { border: true, column: 2 } },
        radio_group7   : { options: opts, props: { divider: true }, formItem: { labelPosition: 'top' } },
        radio_group    : { options: opts },
    }),
})
</script>

<template>
    <sd-page title="Form 表单应用">
        <demo-card title="基本用法" :body-style="{ padding: 0 }">
            <sd-form
                :model="m.form_model"
                :schema="m.form_schema"
                :label-width="160"
            >
                <template #item="field_props">
                    <app-form-field v-bind="field_props" />
                </template>
            </sd-form>
        </demo-card>
    </sd-page>
</template>
