<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from 'vue'
import { MpMixin } from '../common/mixins'
import { number_keyboard_props } from './number-keyboard'

import Utils from '../utils'
export default defineComponent({
    ...MpMixin,

    name : 'SdNumberKeyboard',
    props: number_keyboard_props,
    emits: [
        'update:visible',
        'update:modelValue',
        'delete',
        'confirm',
        'close',
        'input',
    ],
    setup(props, { emit }) {
        const visible$ = computed({
            get() { return props.visible },
            set(value) {
                emit('update:visible', value)
            },
        })

        const key_list$ = computed(() => {
            return props.mode === 'right-column' ? getCustomKeys() : getDefaultKeys()
        })

        function getDefaultKeys() {
            const object = { id: 'lock', type: 'lock' }
            if (props.customKeys) {
                const key = Array.isArray(props.customKeys) ? props.customKeys[0] : props.customKeys
                if (key) {
                    object.id   = key
                    object.type = 'custom'
                }
            }
            return [
                ...getBasicKeys(),
                object,
                { id: 0, type: 'number' },
                { id: 'delete', type: 'delete' },
            ]
        }

        function getBasicKeys() {
            const keys = new Array(9).fill(0).map((_, index) => ({ id: index + 1, type: 'number' }))
            if (props.randomKeys) {
                return keys.sort(() => (Math.random() > 0.5) ? 1 : -1)
            } else {
                return keys
            }
        }

        function getCustomKeys() {
            return [
                ...getBasicKeys(),
                { id: 0  , type: 'number' },
                { id: '.', type: 'custom' },
            ]
        }

        async function close() {
            if (Utils.isFunction(props.beforeClose)) {
                const result = await props.beforeClose()
                if ( !result ) return
            }
            visible$.value = false
        }

        function onClickKey(item: { id: number | string; type: string }) {
            switch (item.type) {
                case 'number':
                case 'custom': {
                    emit('input', item.id)
                    if (props.modelValue.length < props.maxlength) {
                        emit('update:modelValue', `${ props.modelValue }${ item.id }`)
                    }
                    break
                }
                case 'delete': {
                    emit('delete')
                    emit('update:modelValue', props.modelValue.slice(0, props.modelValue.length - 1))
                    break
                }
                case 'confirm': {
                    emit('confirm')
                    close()
                    break
                }
                case 'lock': {
                    close()
                    break
                }
            }
        }

        return {
            visible$,
            key_list$,
            onClickKey,
            close,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="visible$"
        :show-top-close="false"
        :mask-closeable="false"
    >
        <view class="sd-number-keyboard" :class="customClass" :style="customStyle">
            <view v-if="$slots.header" class="sd-number-keyboard__header">
                <slot name="header" />
            </view>
            <view class="sd-number-keyboard__body">
                <view class="sd-number-keyboard__body-left">
                    <view
                        v-for="item in key_list$"
                        :key="item.id"
                        class="keyboard-wrapper"
                        :class="{ 'is-large': mode === 'right-column' && item.id === 0 }"
                    >
                        <view class="keyboard-wrapper__item" @tap="onClickKey(item)">
                            <template v-if="item.type === 'number' || item.type === 'custom'">
                                {{ item.id }}
                            </template>
                            <sd-image
                                v-if="item.type === 'lock'"
                                width="60rpx"
                                height="60rpx"
                                src="https://img11.360buyimg.com/imagetools/jfs/t1/146371/38/8485/738/5f606425Eca239740/14f4b4f5f20d8a68.png"
                            />
                            <sd-image
                                v-if="item.type === 'delete'"
                                width="60rpx"
                                height="60rpx"
                                src="https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png"
                            />
                        </view>
                    </view>
                </view>
                <view v-if="mode === 'right-column'" class="sd-number-keyboard__body-right">
                    <view class="keyboard-wrapper">
                        <view class="keyboard-wrapper__item" @tap="onClickKey({ id: 'delete', type: 'delete' })">
                            <sd-image
                                width="60rpx"
                                height="60rpx"
                                src="https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png"
                            />
                        </view>
                    </view>
                    <view class="keyboard-wrapper">
                        <view
                            class="keyboard-wrapper__item is-finish-key"
                            @tap="onClickKey({ id: 'confirm', type: 'confirm' })"
                        >
                            {{ confirmText || '完成' }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </sd-popup>
</template>

