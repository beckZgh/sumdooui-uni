<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'

import { ROW_KEY, type RowProvide } from '../common/tokens'
import { useInject    } from '../common/hooks'
import { MpMixin      } from '../common/mixins'
import { col_props    } from './col'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdCol',
    props: col_props,
    setup(props) {
        const { parent } = useInject<RowProvide>(ROW_KEY)

        const root_class$ = computed(() => {
            return {
                [`sd-col-offset-${ props.offset }`]: true,
                [`sd-col-span-${ props.span }`]    : true,
                [`sd-col--gutter`]                 : parent?.props.gutter,
            }
        })

        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }

            const gutter = parent?.props.gutter
            if (Utils.isNumber(gutter)) {
                style.paddingLeft  = `${ gutter / 2 }px`
                style.paddingRight = `${ gutter / 2 }px`
            }

            return style
        })

        return {
            root_class$,
            root_style$,
        }
    },
})
</script>

<template>
    <view class="sd-col" :class="[customClass, root_class$]" :style="root_style$">
        <slot />
    </view>
</template>

