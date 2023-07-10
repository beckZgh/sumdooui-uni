<script lang="ts">
import { defineComponent } from 'vue'
import { MpMixin         } from '../../common/mixins'

import CalendarWeeks from './CalendarWeeks.vue'

export default defineComponent({
    ...MpMixin,

    name      : 'CalendarHeader',
    components: { CalendarWeeks },
    props     : {
        /** 日历模式, 默认滚动模式、关闭为切换模式  */
        scrollable    : { type: Boolean },
        /** 显示标题 */
        showTitle     : { type: Boolean },
        /** 标题 */
        title         : { type: String },
        /** 显示副标题 */
        showSubtitle  : { type: Boolean },
        /** 标题 */
        subtitle      : { type: String },
        /** 周起始日 */
        firstDayOfWeek: { type: Number },
        /** 弹窗形式展示 */
        poppable      : { type: Boolean  },
    },
    emits: [
        'click-subtitle',
        'prev-year',
        'next-year',
        'prev-month',
        'next-month',
    ],
})
</script>

<template>
    <view class="sd-calendar-header">
        <view v-if="showTitle && title && !poppable" class="sd-calendar-header__title">
            {{ title }}
        </view>
        <view v-if="showSubtitle && subtitle" class="sd-calendar-header__actions">
            <sd-button v-if="!scrollable" text size="small" icon="double-left" @click="$emit('prev-year')" />
            <sd-button v-if="!scrollable" text size="small" icon="left" @click="$emit('prev-month')" />
            <text class="sd-calendar-header__subtitle" @tap="$emit('click-subtitle')">
                {{ subtitle }}
            </text>
            <sd-button v-if="!scrollable" text size="small" icon="right" @click="$emit('next-month')" />
            <sd-button v-if="!scrollable" text size="small" icon="double-right" @click="$emit('next-year')" />
        </view>
        <CalendarWeeks :first-day-of-week="firstDayOfWeek" />
    </view>
</template>
