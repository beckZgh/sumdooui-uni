<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MpMixin } from '../common/mixins'
import { actionsheet_props, type ActionsheetItem } from './actionsheet'

export default defineComponent({
    ...MpMixin,

    name : 'SdActionsheet',
    props: actionsheet_props,
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
        const visible$ = computed({
            get() { return  props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        function onCancel(e: Event) {
            visible$.value = false
            emit('cancel', e)
        }

        function onSelect(item: ActionsheetItem, index: number) {
            if (item.disabled) return
            visible$.value = false
            emit('select', item, index)
        }

        return {
            visible$,
            onCancel,
            onSelect,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="visible$"
        :show-top-close="false"
    >
        <view class="sd-actionsheet" :class="customClass" :style="customStyle">
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
        </view>
    </sd-popup>
</template>

