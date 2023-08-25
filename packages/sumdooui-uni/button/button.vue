<script lang="ts">
import { defineComponent } from 'vue'
import { button_props    } from './button'
import { MpMixin         } from '../common/mixins'

export default defineComponent({
    ...MpMixin,

    name : 'SdButton',
    props: button_props,
    emits: [
        'click',
        'getuserinfo',
        'contact',
        'getphonenumber',
        'opensetting',
        'launchapp',
        'chooseavatar',
        'error',
    ],
    setup(props, { emit }) {
        // 监听按钮点击
        function onClick(event: Event) {
            if (props.disabled || props.loading) return
            emit('click', event)
        }

        return { onClick }
    },
})
</script>

<template>
    <button
        class="sd-button"
        :class="[
            customClass,
            {
                [`sd-button--${ type }`]: !!type,
                [`sd-button--${ size }`]: !!size,
                [`sd-button--round`]    : !!round,
                [`sd-button--circle`]   : !!circle,
                [`sd-button--ghost`]    : !!ghost,
                [`sd-button--plain`]    : !!plain,
                [`sd-button--text`]     : !!text,
                'has-bg'                : !!bg,
                'is-block'              : block,
                'is-loading'            : loading,
                'is-disabled'           : disabled,
                'has-text'              : loadingText || buttonText || $slots.default,
            },
        ]"
        :style="{ ...customStyle, width }"
        :form-type="formType"
        :open-type="openType"
        :app-parameter="appParameter"
        :session-form="sessionForm"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        @getuserinfo="$emit('getuserinfo', $event)"
        @contact="$emit('contact', $event)"
        @getphonenumber="$emit('getphonenumber', $event)"
        @opensetting="$emit('opensetting', $event)"
        @launchapp="$emit('launchapp', $event)"
        @chooseavatar="$emit('chooseavatar', $event)"
        @error="$emit('error', $event)"
        @tap="onClick"
    >
        <sd-icon
            v-if="loading || icon"
            custom-class="sd-button__icon"
            :name="loading ? 'loading' : icon"
            :loading="loading"
            :size="iconSize"
            :color="iconColor"
        />
        <text v-if="loadingText">
            {{ loadingText }}
        </text>
        <slot v-else-if="$slots.default" />
        <text v-else-if="buttonText">
            {{ buttonText }}
        </text>
    </button>
</template>
