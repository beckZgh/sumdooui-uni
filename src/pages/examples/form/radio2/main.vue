<script setup lang="ts">
import { ref, reactive } from 'vue'

const m = reactive({
    radio_group: 2,
})

const radio_1 = ref(false)
const radio_2 = ref(false)

const opts = ref([
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2, disabled: true },
    { label: '选项三', value: 3, disabled: true },
    { label: '选项四', value: 4 },
    { label: '选项五', value: 5 },
])
</script>

<template>
    <sd-page title="Radio 单选框">
        <demo-card title="基本用法">
            <view style="display: flex;">
                <sd-radio2 v-model="radio_1">
                    已知晓《用户隐私协议》，并同意使用
                </sd-radio2>
            </view>
        </demo-card>

        <demo-card title="可取消选中">
            <view style="display: flex;">
                <sd-radio2 v-model="radio_2" allow-uncheck>
                    已知晓《用户隐私协议》，并同意使用
                </sd-radio2>
            </view>
        </demo-card>

        <demo-card title="非受控状态，默认选中">
            <view style="display: flex;">
                <sd-radio2 default-checked>
                    已知晓《用户隐私协议》，并同意使用
                </sd-radio2>
            </view>
        </demo-card>

        <demo-card title="独占一行">
            <sd-radio-group2 v-model="m.radio_group" :column="1" :options="opts" />
        </demo-card>

        <demo-card title="图标在右侧">
            <sd-radio-group2 v-model="m.radio_group" :column="1" icon-position="right" :options="opts" />
        </demo-card>

        <demo-card title="自定义图标">
            <sd-radio-group2 v-model="m.radio_group" :column="1" icon-position="right" :options="opts" active-icon="circle-solid" />
        </demo-card>

        <demo-card title="自定义颜色">
            <sd-radio-group2 v-model="m.radio_group" :column="1" icon-position="right" :options="opts" active-color="#09BE4F" />
        </demo-card>

        <demo-card title="禁用态">
            <sd-radio-group2 v-model="m.radio_group" :column="1" icon-position="right" disabled :options="opts" />
        </demo-card>

        <demo-card title="显示边框">
            <sd-radio-group2 v-model="m.radio_group" border :options="opts" />
        </demo-card>

        <demo-card title="显示边框 (独占一行)">
            <sd-radio-group2 v-model="m.radio_group" border :column="1" :options="opts" />
        </demo-card>

        <demo-card title="显示分割线 (独占一行)">
            <sd-radio-group2 v-model="m.radio_group" divider :column="1" :options="opts" />
        </demo-card>

        <demo-card title="双列展示">
            <sd-radio-group2 v-model="m.radio_group" :column="2" :options="opts" />
        </demo-card>

        <demo-card title="双列展示 (带边框)">
            <sd-radio-group2 v-model="m.radio_group" border :column="2" :options="opts" />
        </demo-card>

        <view style="height: 200px;" />
    </sd-page>
</template>
