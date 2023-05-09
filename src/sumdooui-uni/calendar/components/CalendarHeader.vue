<script lang="ts">
import type { CalendarMode } from '../calendar'
import type { PropType } from 'vue'

import { defineComponent } from 'vue'
import { MpMixin } from '../../common/mixins'
import CalendarWeeks from './CalendarWeeks.vue'

export default defineComponent({
    ...MpMixin,

    name      : 'CalendarHeader',
    components: { CalendarWeeks },
    props     : {
        /** 日历模式, scroll 滚动模式、switch 切换模式  */
        mode          : { type: String as PropType<CalendarMode>, default: 'scroll' },
        /** 显示标题 */
        showTitle     : { type: Boolean, default: true },
        /** 标题 */
        title         : { type: String, default: '日期选择' },
        /** 显示副标题 */
        showSubtitle  : { type: Boolean, default: true },
        /** 标题 */
        subtitle      : { type: String, default: '' },
        /** 周起始日 */
        firstDayOfWeek: { type: Number, default: 1 },
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
    <view class="sd-calendar__header">
        <view v-if="showTitle && !poppable" class="sd-calendar__title">
            {{ title }}
        </view>
        <view v-if="showSubtitle && subtitle" class="sd-calendar__subtitle" @tap="$emit('click-subtitle')">
            <sd-button v-if="mode === 'switch'" variant="text" shape="square" size="small" icon="double-left" @click="$emit('prev-year')" />
            <sd-button v-if="mode === 'switch'" variant="text" shape="square" size="small" icon="left" @click="$emit('prev-month')" />
            {{ subtitle }}
            <sd-button v-if="mode === 'switch'" variant="text" shape="square" size="small" icon="right" @click="$emit('next-month')" />
            <sd-button v-if="mode === 'switch'" variant="text" shape="square" size="small" icon="double-right" @click="$emit('next-year')" />
        </view>
        <CalendarWeeks :first-day-of-week="firstDayOfWeek" />
    </view>
</template>
