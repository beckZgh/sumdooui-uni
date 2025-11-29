<script lang="ts">
/**
 * 文本展示
 * v25.11.29
 */
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { MpMixin    } from '../common/mixins'
import { text_props } from './text'
import $utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdText',
    props: text_props,
    setup: (props) => {
        const is_empty$ = computed(() => props.emptyValues.includes(props.value))

        const text_style$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }
            if (props.color) styles.color    = props.color
            if (props.size ) styles.fontSize = $utils.toUnit(props.size)
            return styles
        })

        const value$ = computed(() => {
            if (is_empty$.value) return ''

            const { mode, value } = props
            if (!mode ) return value


            if ($utils.isString(value)) {
                if (mode === 'datetime') return formatDate(value, 'YYYY-YYYY-MM-DD HH:mm:ss')
                if (mode === 'date'    ) return formatDate(value, 'YYYY-MM-DD')
                if (mode === 'time'    ) return formatDate(value, 'HH:mm:ss')
            }

            return ''
        })

        function formatDate(value: string | number | Date, format: string) {
            if ($utils.dt.isValid(value)) {
                return $utils.dt.format(value, format)
            } else {
                return value
            }
        }

        return {
            value$,
            text_style$,
            is_empty$,
        }
    },
})
</script>

<template>
    <view
        class="sd-text"
        :class="[
            customClass, {
                [`sd-text--${ type }`]: !!type,
                'sd-text--block'      : block,
            },
        ]"
        :style="text_style$"
    >
        <text v-if="!is_empty$">
            {{ value$ }}
        </text>
        <text v-else-if="!!placeholder" class="sd-text__placeholder">
            {{ placeholder }}
        </text>
    </view>
</template>
