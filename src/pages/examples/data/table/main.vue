<script setup lang="ts">
import { reactive } from 'vue'

const table_props = reactive({
    columns: [
        { prop: 'name'   , title: '姓名' },
        { prop: 'gender' , title: '性别' },
        { prop: 'age'    , title: '年龄' },
        { prop: 'address', title: '地址' },
    ],
    data: new Array(10).fill(0).map((item, index) => {
        return {
            name   : `名称名称名称名称 ${ index + 1 }`,
            gender : '男',
            age    : 30,
            address: '地址',
        }
    }),
})
</script>

<template>
    <sd-page title="Table 表格数据">
        <demo-card title="基本用法" :card="false" :body-style="{ paddingBottom: '30rpx' }">
            <sd-table v-bind="table_props" align="center" />
        </demo-card>

        <demo-card title="带边框的表格" :card="false" :body-style="{ padding: '0 30rpx 30rpx' }">
            <sd-table v-bind="table_props" border />
        </demo-card>

        <demo-card title="暂无数据" :card="false">
            <sd-table v-bind="table_props" :data="[]" empty-text="测试为空文本" />
        </demo-card>
    </sd-page>
</template>

