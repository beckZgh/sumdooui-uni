<script setup lang="ts">
import { ref } from 'vue'
const text_input = ref('')
const number_input = ref('')
const digit_input = ref('')
const idcard_input = ref('')
const nickname_input = ref('')
const safe_password_input = ref('')
const password_input = ref('')
const input_1 = ref('')
const input_2 = ref('')
const input_3 = ref('')
const input_4 = ref('')
const input_5 = ref('')
const input_6 = ref('')
const input_7 = ref('做一个对业务能提效的技术工具！')
const input_8 = ref('做一个对业务能提效的技术工具！')
</script>

<template>
    <sd-page title="Input 输入框">
        <demo-card title="文本输入框">
            <sd-input v-model="text_input" />
        </demo-card>

        <demo-card title="数字输入框">
            <sd-input v-model="number_input" type="number" />
        </demo-card>

        <demo-card title="带小数点的数字输入框">
            <sd-input v-model="digit_input" type="digit" />
        </demo-card>

        <demo-card title="身份证输入框">
            <sd-input v-model="idcard_input" type="idcard" />
        </demo-card>

        <demo-card title="昵称输入键盘">
            <sd-input v-model="nickname_input" type="nickname" />
        </demo-card>

        <demo-card title="密码输入框">
            <sd-input v-model="password_input" type="password" show-password />
        </demo-card>

        <demo-card title="安全密码输入框">
            <sd-input v-model="safe_password_input" type="safe-password" />
        </demo-card>

        <demo-card title="显示输入计数">
            <sd-input v-model="input_1" :maxlength="50" show-word-limit />
        </demo-card>

        <demo-card title="一键清空">
            <sd-input v-model="input_2" clearable />
        </demo-card>

        <demo-card title="带前置图标的输入框">
            <sd-input v-model="input_3">
                <template #prefix>
                    <sd-icon name="search" />
                </template>
            </sd-input>
        </demo-card>

        <demo-card title="带后置图标的输入框">
            <sd-input v-model="input_4">
                <template #suffix>
                    <sd-icon name="search" />
                </template>
            </sd-input>
        </demo-card>

        <demo-card title="自定义占位文本内容">
            <sd-input v-model="input_5" placeholder="请评论内容" />
        </demo-card>

        <demo-card title="自定义文本域样式">
            <sd-input v-model="input_6" :border="false" background="#f7f8fa" />
        </demo-card>

        <demo-card title="只读状态">
            <sd-input v-model="input_7" readonly />
        </demo-card>

        <demo-card title="禁用状态">
            <sd-input v-model="input_8" disabled />
        </demo-card>
    </sd-page>
</template>
