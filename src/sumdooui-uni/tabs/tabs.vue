<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed, ref, onMounted, nextTick } from 'vue'
import { tabs_props } from './tabs'

import Utils from '../utils'
export default defineComponent({
    name   : 'SdTabs',
    props  : tabs_props,
    options: {
        virtualHost: true,
    },
    emits: ['change'],
    setup(props, { emit }) {
        const current_index = ref(props.current)
        const scroll_in_to  = ref('')

        const items$ = computed(() => {
            return props.items.map((item) => {
                if (Utils.isString(item)) {
                    return { name: item, _id: getId() }
                } else {
                    return { ...item, _id: getId() }
                }
            })
        })

        const item_style$ = computed(() => {
            const style: CSSProperties = {
                height: Utils.toUnit(props.height),
            }
            return style
        })

        onMounted(() => {
            nextTick(() => {
                handleSwitchTab(current_index.value)
            })
        })

        function handleSwitchTab(index: number) {
            const tab = items$.value[index]
            if ( !tab ) return
            if (current_index.value === index || tab.disabled) return

            current_index.value = index
            const scroll_index = Math.max(index - 1, 0)
            scroll_in_to.value = items$.value[scroll_index]._id

            const emit_event = { ...tab, index }
            Reflect.deleteProperty(emit_event, '_id')
            emit('change', emit_event)
        }

        function getId() {
            return `sd_${ Math.ceil(Math.random() * 10e5).toString(36) }`
        }

        return {
            current_index,
            items$,
            item_style$,
            scroll_in_to,
            handleSwitchTab,
        }
    },
})
</script>

<template>
    <scroll-view
        class="sd-tabs"
        scroll-with-animation
        :show-scrollbar="false"
        :scroll-x="scrollable"
        :scroll-into-view="scroll_in_to"
        :style="{
            'is-fixed' : fixed && !sticky,
            'is-sticky': sticky,
            'top'      : (fixed || sticky && top) ? `${ top }px` : undefined,
            background,
        }"
    >
        <view class="sd-tabs__main" :class="{ 'is-full': !leftAlign }">
            <template v-for="(tab, _idx) in items$" :key="_idx">
                <view
                    :id="tab._id"
                    class="sd-tabs__item"
                    :class="{ 'is-active': _idx === current_index, 'is-disabled': tab.disabled }"
                    :style="item_style$"
                    @tap="handleSwitchTab(_idx)"
                >
                    <view class="sd-tabs__item-text">
                        {{ tab.name }}
                    </view>
                    <view v-if="_idx === current_index" class="sd-tabs__item-line" />
                </view>
            </template>
        </view>
    </scroll-view>
</template>
