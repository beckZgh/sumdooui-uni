<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    dialog_1: false,
    dialog_2: false,
    dialog_3: false,
    dialog_4: false,
    dialog_5: false,
    dialog_6: false,
    dialog_7: false,
    dialog_8: false,
    dialog_9: false,

    dialog_content     : '我是一段简短的内容我是一段简短的内容我是一段简短的内容',
    dialog_long_content: '我是一段简短的内容我是一段简短的内容我是一段简短的内容'.repeat(10),
})
</script>

<template>
    <sd-page title="Dialog 对话框">
        <demo-card title="默认对话框" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_1 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="成功对话框" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_2 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="错误对话框" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_3 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="警告对话框" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_4 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="确认对话框" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_5 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="输入对话框" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_6 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="按钮纵向排列" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_7 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="显示头部情景图" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_8 = true">
                应用
            </sd-button>
        </demo-card>

        <demo-card title="显示超长内容" body-class="sd-flex-x-center">
            <sd-button width="75%" variant="plain" @click="m.dialog_9 = true">
                应用
            </sd-button>
        </demo-card>

        <!-- 确认消息 -->
        <sd-dialog v-model:visible="m.dialog_1" type="alert" title="标题" :content="m.dialog_content" />

        <!-- 成功对话框 -->
        <sd-dialog v-model:visible="m.dialog_2" type="success" title="操作成功" :content="m.dialog_content" />

        <!-- 错误对话框 -->
        <sd-dialog v-model:visible="m.dialog_3" type="error" title="操作失败" :content="m.dialog_content" />

        <!-- 警告对话框 -->
        <sd-dialog v-model:visible="m.dialog_4" type="warning" title="警告操作" :content="m.dialog_content" />

        <!-- 确认对话框 -->
        <sd-dialog v-model:visible="m.dialog_5" type="confirm" title="标题" :content="m.dialog_content" />

        <!-- 输入对话框 -->
        <sd-dialog v-model:visible="m.dialog_6" type="prompt" title="标题" />

        <!-- 按钮纵向排列 -->
        <sd-dialog v-model:visible="m.dialog_7" type="confirm" title="标题" button-layout="column" :content="m.dialog_content" />

        <!-- 显示头部情景图 -->
        <sd-dialog
            v-model:visible="m.dialog_8" type="confirm" title="标题" button-layout="column"
            :content="m.dialog_content"
            image="/static/images/trunk.jpeg"
        />

        <!-- 显示超长内容 -->
        <sd-dialog
            v-model:visible="m.dialog_9" title="标题"
            :content="m.dialog_long_content"
        />
    </sd-page>
</template>
