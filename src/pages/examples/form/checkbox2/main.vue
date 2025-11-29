<script setup lang="ts">
import { ref, reactive } from 'vue'

const m = reactive({
    checkbox_group: [],
})

const checked = ref(false)

const opts = ref([
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3 },
    { label: '选项四', value: 4 },
    { label: '选项五', value: 5 },
])
</script>

<template>
    <sd-page title="Checkbox2 多选框">
        <demo-card title="基本用法">
            <sd-checkbox2 v-model="checked">
                已知晓《用户隐私协议》，并同意使用
            </sd-checkbox2>
        </demo-card>

        <demo-card title="非受控状态，默认选中">
            <sd-checkbox2 default-checked>
                已知晓《用户隐私协议》，并同意使用
            </sd-checkbox2>
        </demo-card>

        <demo-card title="不同类型">
            <sd-checkbox2 shape="square">方形</sd-checkbox2>
            <sd-checkbox2 default-checked shape="square">方形</sd-checkbox2>
            <sd-checkbox2 shape="circle">圆形</sd-checkbox2>
            <sd-checkbox2 default-checked shape="circle">圆形</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 block shape="button">按钮类型</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 default-checked block shape="button">按钮类型</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 block shape="button-check">按钮类型带图标</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 default-checked block shape="button-check">按钮类型带图标</sd-checkbox2>
        </demo-card>

        <demo-card title="自定义选中颜色">
            <sd-checkbox2 default-checked active-color="red">已知晓《用户隐私协议》，并同意使用</sd-checkbox2>
        </demo-card>

        <demo-card title="自定义选中图标">
            <sd-checkbox2 default-checked active-icon="circle-solid">已知晓《用户隐私协议》，并同意使用</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 disabled default-checked active-icon="circle-solid">已知晓《用户隐私协议》，并同意使用</sd-checkbox2>
        </demo-card>

        <demo-card title="图标在右侧">
            <sd-checkbox2 icon-position="right" block shape="square">方形</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 icon-position="right" block shape="circle">圆形</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 icon-position="right" block shape="button">按钮类型</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 icon-position="right" block shape="button-check">按钮类型带图标</sd-checkbox2>
        </demo-card>

        <demo-card title="禁用态">
            <sd-checkbox2 disabled shape="square">方形</sd-checkbox2>
            <sd-checkbox2 disabled default-checked shape="square">方形</sd-checkbox2>
            <sd-checkbox2 disabled shape="circle">圆形</sd-checkbox2>
            <sd-checkbox2 disabled default-checked shape="circle">圆形</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 disabled block shape="button">按钮类型</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 disabled default-checked block shape="button">按钮类型</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 disabled block shape="button-check">按钮类型带图标</sd-checkbox2>
            <view style="height: 12px;" />
            <sd-checkbox2 disabled default-checked block shape="button-check">按钮类型带图标</sd-checkbox2>
        </demo-card>

        <demo-card title="显示分割线 (独占一行)">
            <sd-checkbox-group2 v-model="m.checkbox_group" divider :options="opts" />
        </demo-card>

        <demo-card title="双列展示">
            <sd-checkbox-group2 v-model="m.checkbox_group" :column="2" :options="opts" />
        </demo-card>

        <demo-card title="双列展示 (按钮形状)">
            <sd-checkbox-group2 v-model="m.checkbox_group" shape="button" :column="2" :options="opts" />
        </demo-card>

        <view style="height: 200px;" />
    </sd-page>
</template>
