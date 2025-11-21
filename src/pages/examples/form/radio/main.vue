<script setup lang="ts">
import { ref } from 'vue'
const fruits = ref(1)
const fruit_opts = ref([
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: '西瓜', value: 3 },
    { label: '橘子', value: 4 },
])
</script>

<template>
    <sd-page title="Radio 单选框">
        <demo-card title="基本用法">
            <sd-radio-group v-model="fruits" :options="fruit_opts" />
        </demo-card>

        <demo-card title="图标在右侧">
            <sd-radio-group v-model="fruits" icon-position="right" :options="fruit_opts" />
        </demo-card>

        <demo-card title="自定义图标">
            <sd-radio-group v-model="fruits" :options="fruit_opts" active-icon="check-square-fill" inactive-icon="square" />
        </demo-card>

        <demo-card title="自定义大小">
            <sd-radio-group v-model="fruits" :options="fruit_opts" :icon-size="50" :label-size="32" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-radio-group v-model="fruits" :options="fruit_opts" active-color="#09BE4F" inactive-color="#777777" />
        </demo-card>

        <demo-card title="纵向显示">
            <sd-radio-group v-model="fruits" direction="column" :options="fruit_opts" />
        </demo-card>

        <demo-card title="禁用态">
            <sd-radio-group v-model="fruits" :column="2" disabled :options="fruit_opts" />
        </demo-card>

        <demo-card title="结合表单域" :card="false">
            <sd-form>
                <sd-form-item label="水果一">
                    <sd-radio-group v-model="fruits" :options="fruit_opts" />
                </sd-form-item>
                <sd-form-item label="水果二">
                    <sd-radio-group v-model="fruits" :options="fruit_opts" direction="column" />
                </sd-form-item>
            </sd-form>
        </demo-card>
    </sd-page>
</template>
