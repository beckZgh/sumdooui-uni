<script setup lang="ts">
import { ref } from 'vue'
const selector_visible = ref(false)
const selector_value = ref()
const selector_opts = ref([
    { label: '苹果', value: 'apple'      },
    { label: '香蕉', value: 'banner'     },
    { label: '西瓜', value: 'watermelon' },
])

const selector_multi_visible = ref(false)
const selector_multi_value = ref('')
const selector_multi_opts = ref([
    [
        { label: '一月', value: 1 },
        { label: '二月', value: 2 },
        { label: '三月', value: 3 },
        { label: '四月', value: 4 },
        { label: '五月', value: 5 },
        { label: '六月', value: 6 },
        { label: '七月', value: 7 },
    ],
    [
        { label: '周一', value: 1 },
        { label: '周二', value: 2 },
        { label: '周三', value: 3 },
        { label: '周四', value: 4 },
        { label: '周五', value: 5 },
        { label: '周六', value: 6 },
        { label: '周日', value: 7 },
    ],
    [
        { label: '上午', value: 'monring'      },
        { label: '下午', value: 'afternoon'     },
        { label: '晚上', value: 'evening' },
    ],
])

function onConfirm(value: string | number, item: any) {
    selector_value.value = item.label
}

function onMultiConfirm(value: (string | number)[], item: any[]) {
    selector_multi_value.value = item.map(o => o.label).join(' - ')
}
</script>

<template>
    <sd-page title="Picker 选择器">
        <demo-card title="单列选择器" :card="false">
            <sd-cell title="单列选择器" :value="selector_value" arrow @click="selector_visible = true" />
        </demo-card>

        <demo-card title="多列选择器" :card="false">
            <sd-cell title="多列选择器" mode="multi-selector" :value="selector_multi_value" arrow @click="selector_multi_visible = true" />
        </demo-card>

        <sd-picker
            v-model="selector_visible"
            title="请选择水果"
            :options="selector_opts"
            default-value="banner"
            @confirm="onConfirm"
        />

        <sd-picker
            v-model="selector_multi_visible"
            title="请选择时辰"
            mode="multi-selector"
            :options="selector_multi_opts"
            @confirm="onMultiConfirm"
        />
    </sd-page>
</template>

