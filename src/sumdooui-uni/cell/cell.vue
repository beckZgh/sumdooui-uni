<script lang="ts">
import { defineComponent, computed } from 'vue'
import { cell_props      } from './cell'
import { MpMixin         } from '../common/mixins'
import { CELL_GROUP_KEY, type CellGroupProvide  } from '../common/tokens'
import { useInject       } from '../common/hooks'

export default defineComponent({
    ...MpMixin,

    name : 'SdCell',
    props: cell_props,
    emits: [
        'click',
        'getuserinfo',
        'contact',
        'getphonenumber',
        'opensetting',
        'launchapp',
        'chooseavatar',
    ],
    setup(props) {
        const { parent: cell_group } = useInject<CellGroupProvide>(CELL_GROUP_KEY)

        const show_border$ = computed(() => {
            return props.border ?? cell_group?.props.border
        })

        const show_arrow$ = computed(() => {
            return props.arrow ?? cell_group?.props.arrow
        })

        const show_round$ = computed(() => {
            return props.round ?? cell_group?.props.round
        })

        const clickable$ = computed(() => {
            return props.clickable ?? cell_group?.props.clickable
        })

        return { show_border$, show_arrow$, show_round$, clickable$ }
    },
})
</script>

<template>
    <button
        v-if="openType"
        :open-type="openType"
        class="sd-cell sd-cell--button"
        :class="[customClass, { 'is-round': show_round$, 'is-active': clickable$ }]"
        :style="customStyle"
        @getuserinfo="$emit('getuserinfo', $event)"
        @contact="$emit('contact', $event)"
        @getphonenumber="$emit('getphonenumber', $event)"
        @opensetting="$emit('opensetting', $event)"
        @launchapp="$emit('launchapp', $event)"
        @chooseavatar="$emit('chooseavatar', $event)"
        @tap="$emit('click', $event)"
    >
        <!-- 单元格内容区域 -->
        <slot v-if="$slots.default" />
        <template v-else>
            <slot v-if="$slots.left" name="left" />
            <view v-else class="sd-cell__left" :style="leftStyle">
                <!-- 左侧icon/图片区域 -->
                <slot v-if="$slots.icon" name="icon" />
                <sd-image v-else-if="image" v-bind="imageProps" :src="image" />
                <sd-icon v-else-if="icon" v-bind="iconProps" :name="icon" />

                <!-- 左侧标题、描述 -->
                <view>
                    <view class="sd-cell__title" :style="titleStyle">
                        {{ title }}
                    </view>
                    <view v-if="description" class="sd-cell__desc" :style="descriptionStyle">
                        {{ description }}
                    </view>
                </view>
            </view>

            <slot v-if="$slots.right" name="right" />
            <template v-else>
                <view class="sd-cell__right" :style="rightStyle">
                    <!-- 单元格右侧内容 -->
                    <slot v-if="$slots.extra" name="extra" />
                    <view v-else-if="value" class="sd-cell__value" :style="valueStyle">
                        {{ value }}
                    </view>
                </view>
            </template>

            <!-- 右侧箭头 -->
            <view v-if="show_arrow$" class="sd-cell__arrow" />
        </template>

        <!-- 底部边框 -->
        <view v-if="show_border$" class="sd-cell__bottom-border" :style="borderStyle" />
    </button>
    <view
        v-else
        class="sd-cell"
        :class="[customClass, { 'is-round': show_round$, 'is-active': clickable$ }]"
        :style="customStyle"
        @tap="$emit('click', $event)"
    >
        <!-- 单元格内容区域 -->
        <slot v-if="$slots.default" />
        <template v-else>
            <slot v-if="$slots.left" name="left" />
            <view v-else class="sd-cell__left" :style="leftStyle">
                <!-- 左侧icon/图片区域 -->
                <slot v-if="$slots.icon" name="icon" />
                <sd-image v-else-if="image" v-bind="imageProps" :src="image" />
                <sd-icon v-else-if="icon" v-bind="iconProps" :name="icon" />

                <!-- 左侧标题、描述 -->
                <view>
                    <view class="sd-cell__title" :style="titleStyle">
                        {{ title }}
                    </view>
                    <view v-if="description" class="sd-cell__desc" :style="descriptionStyle">
                        {{ description }}
                    </view>
                </view>
            </view>

            <slot v-if="$slots.right" name="right" />
            <template v-else>
                <view class="sd-cell__right" :style="rightStyle">
                    <!-- 单元格右侧内容 -->
                    <slot v-if="$slots.extra" name="extra" />
                    <view v-else-if="value" class="sd-cell__value" :style="valueStyle">
                        {{ value }}
                    </view>
                </view>
            </template>

            <!-- 右侧箭头 -->
            <view v-if="show_arrow$" class="sd-cell__arrow" />
        </template>

        <!-- 底部边框 -->
        <view v-if="show_border$" class="sd-cell__bottom-border" :style="borderStyle" />
    </view>
</template>
