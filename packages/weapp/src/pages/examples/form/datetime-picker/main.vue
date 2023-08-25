v3

<script setup lang="ts">
import { ref, reactive } from 'vue'
const state = reactive({
    show_year      : false,
    year_text      : '',
    show_month     : false,
    month_text     : '',
    show_year_month: false,
    year_month_text: '',
    show_date      : false,
    date_text      : '',
})
</script>

<template>
    <sd-page title="DatetimePicker 日期时间选择器">
        <demo-card title="基础用法" :body-style="{ paddingLeft: 0, paddingRight: 0 }">
            <sd-cell-group arrow>
                <sd-cell title="选择年" :value="state.year_text" @click="state.show_year = true" />
                <sd-cell title="选择月" :value="state.month_text" @click="state.show_month = true" />
                <sd-cell title="选择年月" :value="state.year_month_text" @click="state.show_year_month = true" />
                <sd-cell title="选择日期" :value="state.date_text" @click="state.show_date = true" />
            </sd-cell-group>
        </demo-card>

        <sd-datetime-picker v-model:visible="state.show_year" mode="year" />
        <sd-datetime-picker v-model:visible="state.show_month" mode="month" />
        <sd-datetime-picker v-model:visible="state.show_year_month" mode="year-month" />
        <sd-datetime-picker v-model:visible="state.show_date" mode="date" />
    </sd-page>
</template>

