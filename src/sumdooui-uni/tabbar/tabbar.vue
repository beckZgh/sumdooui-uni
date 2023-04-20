<script lang="ts">
import { defineComponent } from 'vue'

import { tabbar_props, type TabbarItem } from './tabbar'

export default defineComponent({
    name   : 'SdTabbar',
    props  : tabbar_props,
    emits  : ['update:modelValue', 'change'],
    options: {
        virtualHost: true,
    },
    setup(props, { emit }) {
        const getColor = (index: number) => {
            if (Number(props.modelValue) === index) {
                return props.activeColor || undefined
            } else {
                return props.inactiveColor || undefined
            }
        }

        const getImage = (index: number) => {
            const item = props.items[index]
            if ( !item ) return ''

            return (Number(props.modelValue) === index ? item.activeImage : item.image) || ''
        }

        const getIcon = (index: number) => {
            const item = props.items[index]
            if ( !item ) return ''

            return (Number(props.modelValue) === index ? (item.activeIcon || item.icon) : item.icon) || ''
        }

        async function onChange(item: TabbarItem, index: number) {
            const params = { ...item, index }
            if (typeof props.beforeChange === 'function') {
                const result = await props.beforeChange(params)
                if ( !result ) return
            }

            emit('update:modelValue', index)
            emit('change', params)
        }

        return { getColor, getIcon, getImage, onChange }
    },
})
</script>

<template>
    <view class="sd-tabbar-box">
        <view
            class="sd-tabbar"
            :class="{
                'is-fixed'         : fixed,
                'sd-tabbar--border': showTopBorder,
            }"
            :style="zIndex ? `z-index: ${ zIndex }` : ''"
        >
            <!-- 图标模式 -->
            <template v-if="type === 'icon'">
                <template v-for="(tab, _idx) in items" :key="_idx">
                    <view
                        class="sd-tabbar__item"
                        :class="{ 'is-active': Number(modelValue) === _idx }"
                        :style="{ color: getColor(_idx) }"
                        @tap="onChange(tab, _idx)"
                    >
                        <template v-if="tab.icon">
                            <sd-badge v-bind="{ ...tab.badgeProps, dot: tab.dot, content: tab.badge }">
                                <sd-icon :name="getIcon(_idx)" />
                            </sd-badge>
                        </template>
                        <text v-if="tab.name" class="sd-tabbar__item-text">
                            {{ tab.name }}
                        </text>
                    </view>
                </template>
            </template>

            <!-- 图片模式 -->
            <template v-if="type === 'image'">
                <template v-for="(tab, _idx) in items" :key="_idx">
                    <view
                        class="sd-tabbar__item"
                        :class="{ 'is-active': Number(modelValue) === _idx }"
                        :style="{ color: getColor(_idx) }"
                        @tap="onChange(tab, _idx)"
                    >
                        <sd-badge v-bind="{ ...tab.badgeProps, dot: tab.dot, content: tab.badge }">
                            <sd-image
                                v-if="tab.image"
                                :src="getImage(_idx)"
                                width="56rpx" height="56rpx"
                                :show-loading="false"
                                :show-error="false"
                            />
                        </sd-badge>
                        <text v-if="tab.name" class="sd-tabbar__item-text">
                            {{ tab.name }}
                        </text>
                    </view>
                </template>
            </template>
        </view>

        <!-- 固定底部定位时的占位元素 -->
        <view v-if="fixed && placeholder" class="sd-tabbar__placeholder" />
    </view>
</template>
