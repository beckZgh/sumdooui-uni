<script setup lang="ts">
import { ref } from 'vue'
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
    <sd-page title="Textarea 文本域">
        <demo-card title="基本用法">
            <sd-textarea v-model="input_1" />
        </demo-card>

        <demo-card title="显示输入计数">
            <sd-textarea v-model="input_2" :maxlength="50" show-word-limit />
        </demo-card>

        <demo-card title="自定义高度">
            <sd-textarea v-model="input_3" height="300rpx" />
        </demo-card>

        <demo-card title="高度随内容撑开">
            <sd-textarea v-model="input_4" auto-height />
        </demo-card>

        <demo-card title="自定义占位文本内容">
            <sd-textarea v-model="input_5" placeholder="请评论内容" />
        </demo-card>

        <!-- <demo-card title="自定义文本域样式">
            <sd-textarea v-model="input_6" :border="false" background="#f7f8fa" />
        </demo-card> -->

        <demo-card title="只读状态">
            <sd-textarea v-model="input_7" readonly />
        </demo-card>

        <demo-card title="禁用状态">
            <sd-textarea v-model="input_8" disabled />
        </demo-card>
    </sd-page>
</template>
