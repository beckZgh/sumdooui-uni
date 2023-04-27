<script lang="ts">
import type { CSSProperties } from 'vue'

import Utils from '../utils'
import ICONS from './icons'

import { defineComponent, computed } from 'vue'
import { MpMixin } from '../common/mixins'
import { icon_props } from './icon'

export default defineComponent({
    ...MpMixin,

    name : 'SdIcon',
    props: icon_props,
    emits: ['click'],
    setup(props) {
        // 字体图标
        const icon$ = computed(() => {
            return props.name ? ICONS[props.name] : ''
        })

        // 图标样式
        const icon_styles$ = computed(() => {
            const styles: CSSProperties = {
                ...props.customStyle,
            }

            if (props.color) styles.color = props.color
            if (props.size ) {
                styles.fontSize = Utils.toUnit(props.size)
                styles.width    = Utils.toUnit(props.size) // 解决字体加载不及时，高度产生变化
                styles.height   = Utils.toUnit(props.size) // 解决字体加载不及时，高度产生变化
            }

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
        :class="[customClass, { 'is-loading': loading, [`sd-icon--${ theme }`]: !!theme }]"
        :style="icon_styles$"
        @tap="$emit('click', $event)"
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
