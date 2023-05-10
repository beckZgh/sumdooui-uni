<script setup lang="ts">
import { ref } from 'vue'
const search_1 = ref('')
function onClickInput() {
    console.log('onClickInput')
}
</script>

<template>
    <sd-page title="Search 搜素栏">
        <demo-card title="基本用法" :card="false" transparent>
            <sd-search v-model="search_1" />
        </demo-card>

        <demo-card title="事件监听" :card="false" transparent>
            <sd-search v-model="search_1" action-text="取消" />
        </demo-card>

        <demo-card title="搜索框内容对齐" :card="false" transparent>
            <sd-search v-model="search_1" input-align="center" />
        </demo-card>

        <demo-card title="禁用状态" :card="false" transparent>
            <sd-search v-model="search_1" disabled />
        </demo-card>

        <demo-card title="只读状态" :card="false" transparent>
            <sd-search v-model="search_1" readonly />
        </demo-card>

        <demo-card title="自定义背景色" :card="false" transparent>
            <sd-search v-model="search_1" background="#4fc08d" />
        </demo-card>

        <demo-card title="自定义操作" :card="false" transparent>
            <sd-search v-model="search_1">
                <template #action>
                    测试
                </template>
            </sd-search>
        </demo-card>
    </sd-page>
</template>
