<script lang="ts">
import { defineComponent } from 'vue'
import { MpMixin } from '../common/mixins'
import { footer_props, type FooterLink } from './footer'

export default defineComponent({
    ...MpMixin,

    name : 'SdFooter',
    props: footer_props,
    setup() {
        function onClickLink(item: FooterLink) {
            if (item.url) {
                (uni as any)[item.openType || 'navigateTo']({
                    url: item.url,
                })
            }
        }
        return { onClickLink }
    },
})
</script>

<template>
    <view
        class="sd-footer"
        :class="[customClass, { 'is-fixed': isFixed, 'safe-area-insert-bottom': safeAreaInsetBottom }]"
        :style="customStyle"
    >
        <view v-if="links.length" class="sd-footer__link">
            <template v-for="(item, index) in links" :key="index">
                <view class="sd-footer__link-item" @tap="onClickLink(item)">
                    {{ item.name }}
                </view>
            </template>
        </view>

        <view class="sd-footer__text">
            {{ text }}
        </view>
    </view>
</template>

