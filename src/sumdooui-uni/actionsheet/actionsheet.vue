<script lang="ts">
import { defineComponent, computed } from 'vue'

import { actionsheet_props, type ActionsheetItem } from './actionsheet'
export default defineComponent({
    name   : 'SdActionsheet',
    props  : actionsheet_props,
    options: {
        virtualHost: true,
    },
    emits: [
        'update:visible',
        'cancel',
        'select',
        'getuserinfo',
        'contact',
        'getphonenumber',
        'opensetting',
        'launchapp',
        'chooseavatar',
    ],
    setup(props, { emit }) {
        const internal_visible$ = computed({
            get() { return  props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        function onCancel(e: Event) {
            internal_visible$.value = false
            emit('cancel', e)
        }

        function onSelect(item: ActionsheetItem, index: number) {
            if (item.disabled) return
            internal_visible$.value = false
            emit('select', item, index)
        }

        return {
            onCancel,
            onSelect,
            internal_visible$,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="internal_visible$"
        :show-top-close="false"
    >
        <view v-if="description" class="sd-actionsheet__desc">
            {{ description }}
        </view>
        <template v-for="(item, _idx) in items" :key="_idx">
            <view class="sd-actionsheet__item" :class="{ [`sd-actionsheet__item--${ align }`]: true }">
                <sd-button
                    block
                    shape="square"
                    variant="text"
                    size="large"
                    :disabled="item.disabled"
                    :icon="item.icon"
                    :icon-color="item.color"
                    :open-type="item.open_type"
                    @getuserinfo="$emit('getuserinfo', $event)"
                    @contact="$emit('contact', $event)"
                    @getphonenumber="$emit('getphonenumber', $event)"
                    @opensetting="$emit('opensetting', $event)"
                    @launchapp="$emit('launchapp', $event)"
                    @chooseavatar="$emit('chooseavatar', $event)"
                    @click="onSelect(item, _idx)"
                >
                    <text :style="{ color: item.color }">
                        {{ item.text }}
                    </text>
                </sd-button>
            </view>
        </template>
        <view v-if="showCancel" class="sd-actionsheet__bottom" @tap="onCancel">
            {{ cancelText }}
        </view>
    </sd-popup>
</template>

