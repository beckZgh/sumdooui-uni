<script lang="ts">
import { defineComponent, computed } from 'vue'
import { MpMixin } from '../../common/mixins'

export default defineComponent({
    ...MpMixin,

    name : 'CalendarWeeks',
    props: {
        /** 周起始日 */
        firstDayOfWeek: { type: Number, default: 1 },
    },
    setup(props) {
        const def_weeks =  ['日','一', '二', '三', '四', '五', '六']
        const weeks$ = computed(() => {
            return [
                ...def_weeks.slice(props.firstDayOfWeek, 7),
                ...def_weeks.slice(0, props.firstDayOfWeek),
            ]
        })

        return { weeks$ }
    },
})
</script>

<template>
    <view class="sd-calendar__weeks">
        <view v-for="item in weeks$" :key="`week_${ item }`" class="sd-calendar__weeks-item">
            {{ item }}
        </view>
    </view>
</template>
