<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { dialog_props } from './dialog'
import Utils from '../utils'

export default defineComponent({
    name : 'SdDialog',
    props: dialog_props,
    emits: [
        'update:visible',
        'cancel',
        'confirm',
    ],
    setup(props, { emit }) {
        const visible$ = computed({
            get() { return props.visible },
            async set(value) {
                if (!value && Utils.isFunction(props.beforeClose)) {
                    const res = await props.beforeClose()
                    if ( !res ) return
                }
                emit('update:visible', value)
            },
        })

        // 显示取消按钮
        const show_cancel_button$ = computed(() => {
            return ['prompt', 'confirm'].includes(props.type)
        })

        // 显示类型图标
        const show_icon$ = computed(() => {
            return ['success', 'warning', 'error', 'info'].includes(props.type)
        })

        // 取得对应状态类型的图标
        function getIconByType() {
            if (!show_icon$.value) return ''
            switch (props.type) {
                case 'success': return 'check-circle'
                case 'warning': return 'warning-circle'
                case 'error'  : return 'close-circle'
                default: return ''
            }
        }

        // Prompt 模式
        const input_val = ref('')
        function onInput(e: Event) {
            input_val.value = (e as any).detail.value
        }

        // 监听点击取消按钮
        async function onClickCancel(e: Event) {
            emit('cancel', e)
            visible$.value = false
        }

        // 监听点击确认按钮
        async function onClickConfirm(e: Event) {
            if (props.type === 'prompt') {
                emit('confirm', { event: e, inputValue: input_val.value })
            } else {
                emit('confirm', e)
            }
            visible$.value = false
        }

        return {
            input_val,
            visible$,
            show_cancel_button$,
            show_icon$,
            getIconByType,
            onClickCancel,
            onClickConfirm,
            onInput,
        }
    },
})
</script>

<template>
    <sd-popup
        v-model:visible="visible$"
        position="center"
        max-height="none"
        :width="width"
        :show-top-close="false"
    >
        <view v-if="image" class="sd-dialog__image">
            <sd-image :src="image" width="100%" :height="imageHeight" />
        </view>

        <view class="sd-dialog__main">
            <view v-if="show_icon$" class="sd-dialog__icon" :class="{ [`is-${ type }`]: true }">
                <sd-icon :name="getIconByType()" />
            </view>

            <view v-if="title" class="sd-dialog__title">
                {{ title }}
            </view>

            <scroll-view scroll-y class="sd-dialog__desc">
                {{ content }}
                <template v-if="type === 'prompt'">
                    <input
                        class="sd-dialog__input"
                        cursor-spacing="200"
                        :type="inputType"
                        :placeholder="placeholder"
                        :maxlength="maxLength"
                        @input="onInput"
                    >
                </template>
                <slot v-if="$slots.default" />
            </scroll-view>
        </view>

        <!-- 按钮横向排列 -->
        <view v-if="buttonLayout === 'row'" class="sd-dialog__footer sd-dialog__footer--row">
            <slot v-if="$slots.footer" name="footer" />
            <template v-else>
                <template v-if="show_cancel_button$">
                    <sd-button block @click="onClickCancel">
                        {{ cancelButtonText }}
                    </sd-button>
                </template>
                <sd-button block type="primary" @click="onClickConfirm">
                    {{ confirmButtonText }}
                </sd-button>
            </template>
        </view>

        <!-- 按钮纵向排列 -->
        <view v-if="buttonLayout === 'column'" class="sd-dialog__footer sd-dialog__footer--column">
            <slot v-if="$slots.footer" name="footer" />
            <template v-else>
                <sd-button block type="primary" @click="onClickConfirm">
                    {{ confirmButtonText }}
                </sd-button>
                <template v-if="show_cancel_button$">
                    <sd-button block variant="text" @click="onClickCancel">
                        {{ cancelButtonText }}
                    </sd-button>
                </template>
            </template>
        </view>
    </sd-popup>
</template>

