<script setup lang="ts">
import { ref } from 'vue'
const visible_1 = ref(false)
const visible_2 = ref(false)
const visible_3 = ref(false)
const visible_4 = ref(false)
const value_4 = ref('')

function onInput(id: string | number) {
    uni.showToast({ title: `输入: ${ id }`, icon: 'none' })
}
</script>

<template>
    <sd-page title="NumberKeyboard 键盘">
        <demo-card title="基本用法" :card="false">
            <sd-cell title="默认键盘" arrow @click="visible_1 = true" />
            <sd-cell title="随机数键盘" arrow @click="visible_2 = true" />
            <sd-cell title="带右侧栏键盘" arrow @click="visible_3 = true" />
            <sd-cell title="双向绑定" :value="value_4" arrow @click="visible_4 = true" />
        </demo-card>

        <sd-number-keyboard v-model:visible="visible_1" @input="onInput" />
        <sd-number-keyboard v-model:visible="visible_2" random-keys @input="onInput" />
        <sd-number-keyboard v-model:visible="visible_3" mode="right-column" @input="onInput" />
        <sd-number-keyboard v-model:visible="visible_4" v-model="value_4" />
    </sd-page>
</template>
