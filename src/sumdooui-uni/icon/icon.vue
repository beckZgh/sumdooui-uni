<script lang="ts">
import type { CSSProperties } from 'vue'

import Utils from '../common/utils'
import ICONS from './icons'

import { defineComponent, computed } from 'vue'
import { icon_props } from './icon'

export default defineComponent({
    name : 'SdIcon',
    props: icon_props,
    setup(props) {
        // 字体图标
        const icon$ = computed(() => {
            return props.name ? ICONS[props.name] : ''
        })

        // 图标样式
        const icon_styles$ = computed(() => {
            const styles: CSSProperties = { ...props.customStyle }

            if (props.color) styles.color    = props.color
            if (props.size ) styles.fontSize = Utils.toUnit(props.size)

            return styles
        })

        return {
            icon$,
            icon_styles$,
        }
    },
})
</script>

<template>
    <text
        class="sd-icon"
        :class="[{ 'is-loading': loading }, customClass]"
        :style="icon_styles$"
    >
        {{ icon$ }}
    </text>
</template>

<style lang="scss">
@font-face {
    font-family: "sd-iconfont"; /* Project id 4005820 */
    src: url('./iconfont.ttf?t=1681114183334') format('truetype');
}
</style>
