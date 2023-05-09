<script lang="ts">
import { defineComponent } from 'vue'
import { COMMON_PROPS } from '../common/props'
import { MpMixin } from '../common/mixins'

function kebabCase(word: string ) {
    const newWord = word
        .replace(/[A-Z]/g, i => `-${  i }`)
        .toLowerCase()
        .replace(/^-/, '')

    return newWord
}

function mapThemeVarsToCSSVars(themeVars?: { [k: string]: string }) {
    const cssVars: { [k: string]: string } = {}
    if ( !themeVars ) return cssVars

    Object.keys(themeVars).forEach((key) => {
        const cssVarsKey = `--sd-${ kebabCase(key) }`
        cssVars[cssVarsKey] = themeVars[key]
    })

    return cssVars
}

export default defineComponent({
    ...MpMixin,

    name : 'SdConfigProvide',
    props: {
        ...COMMON_PROPS,
        themeVars: { type: Object },
    },
    setup() {
        return { mapThemeVarsToCSSVars }
    },
})
</script>

<template>
    <view
        class="sd-config-provide"
        :class="customClass"
        :style="{ ...customStyle, ...mapThemeVarsToCSSVars(themeVars) }"
    >
        <slot />
    </view>
</template>
