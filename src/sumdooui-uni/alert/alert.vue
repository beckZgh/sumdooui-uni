<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, ref, computed } from 'vue'
import { MpMixin     } from '../common/mixins'
import { alert_props } from './alert'

export default defineComponent({
    ...MpMixin,

    name : 'SdAlert',
    props: alert_props,
    emits: ['click', 'close'],
    setup(props) {
        const visible = ref(true)

        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.background) style.backgroundColor = props.background
            if (props.color     ) style.color           = props.color
            return style
        })

        const icon_name$ = computed(() => {
            if (props.icon) return props.icon
            switch (props.type) {
                case 'success': return 'check-circle-fill'
                case 'danger' : return 'close-circle-fill'
                case 'warning': return 'warning-circle-fill'
                default       : return ''
            }
        })

        return { visible, root_style$, icon_name$ }
    },
})
</script>

<template>
    <view
        v-if="visible"
        class="sd-alert"
        :class="[
            customClass,
            {
                [`sd-alert--${ type }`]: !!type,
                ['sd-alert--light']    : light,
                'is-center'            : center,
            },
        ]"
        :style="root_style$"
        @tap="$emit('click', $event)"
    >
        <sd-icon v-if="showIcon && icon_name$" :name="icon_name$" :size="iconSize" custom-class="sd-alert__icon" />
        <view class="sd-alert__body">
            <view v-if="title" class="sd-alert__title" :style="titleStyle">
                {{ title }}
            </view>
            <view class="sd-alert__content" :style="descriptionStyle">
                <slot v-if="$slots.default" />
                <template v-else>
                    {{ description }}
                </template>
            </view>
        </view>
        <sd-icon v-if="closeable" name="close" custom-class="sd-alert__close" @tap="visible = false" />
    </view>
</template>

