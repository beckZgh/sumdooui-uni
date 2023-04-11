<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import Utils from '../utils'
import ICONS from './icons'

export default defineComponent({
    name : 'SdIcon',
    props: {
        name : { type: String           },
        size : { type: [String, Number] },
        color: { type: String           },
        type : { type: String           }, // 预设主题色，未指定 color 可用
    },
    setup(props) {
        // 字体图标
        const icon$ = computed(() => {
            return props.name ? ICONS[props.name] : ''
        })

        // 图标样式
        const icon_styles$ = computed(() => {
            const styles: CSSProperties = {}

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
        :style="icon_styles$"
    >
        {{ icon$ }}
    </text>
</template>

<style>
@font-face {
    font-family: "sd-iconfont"; /* Project id 4005820 */
    src: url('./iconfont.ttf?t=1681114183334') format('truetype');
}

.sd-icon {
    font-family: 'sd-iconfont';
    text-decoration: none;
    text-align: center;
}
</style>
