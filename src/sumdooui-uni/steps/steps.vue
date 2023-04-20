<script lang="ts">
import { defineComponent } from 'vue'
import { steps_props } from './steps'

export default defineComponent({
    name : 'SdSteps',
    props: steps_props,
})
</script>

<template>
    <view
        class="sd-steps"
        :class="{ [`sd-steps--${ direction }`]: true }"
    >
        <template v-for="(item, index) in items" :key="index">
            <view
                class="sd-steps__item"
                :class="{ 'is-done': index < current }"
            >
                <sd-icon
                    v-if="type === 'icon'"
                    :name=" index < current ? (item.activeIcon || activeIcon) : (item.inactiveIcon || inactiveIcon)"
                    :color="index < current ? activeColor : inactiveColor"
                    size="44rpx"
                />
                <sd-image
                    v-else-if="type === 'image'"
                    :src="index < current ? (item.activeImage || activeImage) : (item.inactiveImage || inactiveImage)"
                    width="44rpx"
                    height="44rpx"
                    :show-loading="false"
                    :show-error="false"
                >
                    <template #placeholder />
                </sd-image>
                <view
                    v-else class="sd-steps__number"
                    :style="{
                        backgroundColor: index < current ? activeColor : inactiveColor,
                        borderColor    : index < current ? activeColor : inactiveColor,
                    }"
                >
                    {{ index + 1 }}
                </view>

                <view v-if="index < items.length - 1" class="sd-steps__line" />
                <view class="sd-steps__content">
                    <view class="sd-steps__item-name">
                        {{ item.name }}
                    </view>
                    <text v-if="item.desc" class="sd-steps__item-desc">
                        {{ item.desc }}
                    </text>
                </view>
            </view>
        </template>
    </view>
</template>
