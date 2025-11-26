<script setup lang="ts">
import type { PickerContext } from '@/sumdooui-uni/picker2/types'
import { reactive, ref } from 'vue'

const picker_ref = ref<PickerContext>()
const m = reactive({
    picker        : '',
    picker_text   : '',
    picker_visible: false,
    // --- Ref 调用-----------
    picker1       : [] as any[],
    picker1_text  : '',
    picker2       : [] as any[],
    picker2_text  : '',
    picker3       : [] as any[],
    picker3_text  : '',
    picker4       : [] as any[],
    picker4_text  : '',
})

const schools = Array.from({ length: 500 }).map((_, idx) => {
    const i = idx + 1
    return { label: `学校小学-${ i }`, value: `school_${ i }` }
})

const grades = Array.from({ length: 500 }).map((_, idx) => {
    const i = idx + 1
    return { label: `${ i }年级`, value: `grade_${ i }` }
})

type DemoItem = typeof demo_list[number]

const demo_list = [
    { title: '一列非联动选择', field: 'picker1', labelField: 'picker1_text', handle: handlePick },
    { title: '二列非联动选择', field: 'picker2', labelField: 'picker2_text', handle: handlePick },
    { title: '三列非联动选择', field: 'picker3', labelField: 'picker3_text', handle: handlePick },
    { title: '二列联动选择'  , field: 'picker4', labelField: 'picker4_text', handle: handlePick },
]

function handlePick(item: DemoItem) {
    const $picker = picker_ref.value
    if ( !$picker ) return

    switch (item.field) {
        case 'picker1': return showPicker1(item, $picker)
        case 'picker2': return showPicker2(item, $picker)
        case 'picker3': return showPicker3(item, $picker)
        case 'picker4': return showPicker4(item, $picker)
    }
}

// 一列选择
async function showPicker1(item: DemoItem, $picker: PickerContext) {
    $picker.open({
        title       : item.title,
        columns     : [grades],
        defaultValue: m.picker1,
        onConfirm   : ({ selectedValues, selectedLabels }) => {
            m.picker1      = selectedValues
            m.picker1_text = selectedLabels.join('-')
        },
    })
}

// 二列非联动选择
function showPicker2(item: DemoItem, $picker: PickerContext) {
    $picker.open({
        title  : item.title,
        columns: [
            [2022, 2023, 2024, 2025, 2026, 2027].map(value => ({ label: `${ value }年`, value })),
            ['春天', '夏天', '秋天', '冬天'].map(value => ({ label: value, value })),
        ],
        defaultValue: m.picker2,
        onConfirm   : ({ selectedValues, selectedLabels }) => {
            m.picker2      = selectedValues
            m.picker2_text = selectedLabels.join('-')
        },
    })
}

// 三列非联动选择
function showPicker3(item: DemoItem, $picker: PickerContext) {
    $picker.open({
        title  : item.title,
        columns: [
            [2022, 2023, 2024, 2025, 2026, 2027].map(value => ({ label: `${ value }年`, value })),
            ['北京', '上海', '广州', '深圳'].map(value => ({ label: value, value })),
            ['春天', '夏天', '秋天', '冬天'].map(value => ({ label: value, value })),
        ],
        defaultValue: m.picker3,
        onConfirm   : ({ selectedValues, selectedLabels }) => {
            m.picker3      = selectedValues
            m.picker3_text = selectedLabels.join('-')
        },
    })
}

// 二列联动选择
function showPicker4(item: DemoItem, $picker: PickerContext) {
    const city_map: Record<string, string[]> = {
        广州: ['广州', '深圳', '东莞', '佛山', '中山'],
        湖南: ['长沙', '株洲', '湘潭', '衡阳', '永州'],
        浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    }
    const provinces = Object.keys(city_map)

    const getCities = (grade: string) => {
        return (city_map[grade] || []).map(value => ({ label: value, value }))
    }

    $picker.open({
        title  : item.title,
        columns: [
            provinces.map(value => ({ label: value, value })),
            getCities(m.picker4[0] || provinces[0]),
        ],
        defaultValue: m.picker4,
        onChange    : ({ changeColumnIndex, selectedIndexs, $pickerCtx }) => {
            if (changeColumnIndex === 0) {
                $pickerCtx.setColumnItems(1, getCities(provinces[selectedIndexs[0]]))
            }
        },
        onConfirm: ({ selectedValues, selectedLabels }) => {
            m.picker4      = selectedValues
            m.picker4_text = selectedLabels.join('-')
        },
    })
}
</script>

<template>
    <sd-page title="Picker2 选择器">
        <demo-card title="基本用法" :card="false" transparent>
            <sd-cell title="选择学校" :value="m.picker_text" arrow @click="m.picker_visible = true" />
        </demo-card>

        <demo-card
            v-for="item in demo_list"
            :key="item.field"
            :title="item.title"
            :card="false"
            transparent
        >
            <sd-cell title="已选择" :value="(m as any)[item.labelField]" arrow @click="item.handle(item)" />
        </demo-card>

        <sd-picker2
            ref="picker_ref"
            v-model:visible="m.picker_visible"
            title="选择学校"
            :columns="[schools]"
            :default-value="[m.picker]"
            @confirm="({ selectedValues, selectedLabels }: any) => {
                m.picker      = selectedValues[0]
                m.picker_text = selectedLabels[0]
            }"
        />
    </sd-page>
</template>
