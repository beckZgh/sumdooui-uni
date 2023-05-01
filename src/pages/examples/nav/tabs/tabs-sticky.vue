<script setup lang="ts">
const items = [
    '标签一',
    '标签二',
    '标签三',
    '标签四',
    '标签五',
    '标签六',
    '标签七',
    '标签八',
    '标签九',
    '标签十',
]
</script>

<template>
    <sd-image width="100%" height="50%" />
    <sd-tabs :items="items" sticky scrollable />
    <template v-for="item in 50" :key="item">
        <sd-cell title="单行标题" />
    </template>
</template>
