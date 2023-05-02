<script lang="ts">
import type { CSSProperties } from 'vue'
import { defineComponent, computed  } from 'vue'
import { MpMixin } from '../common/mixins'
import { table_props } from './table'
import Utils from '../utils'


export default defineComponent({
    ...MpMixin,

    name : 'SdTable',
    props: table_props,
    setup(props) {
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.height) style.height = Utils.toUnit(props.height)
            return style
        })
        return { root_style$ }
    },
})
</script>

<template>
    <view class="sd-table" :class="customClass" :style="root_style$">
        <view class="sd-table__header">
            <view class="sd-table__header-tr">
                <template v-for="(col, col_index) in columns" :key="col_index">
                    <view class="sd-table__header-th">
                        {{ col.title }}
                    </view>
                </template>
            </view>
        </view>
        <view class="sd-table__body">
            <template v-if="data.length">
                <template v-for="(row, row_index) in data" :key="row_index">
                    <view class="sd-table__body-tr">
                        <template v-for="(col, col_index) in columns" :key="col_index">
                            <view class="sd-table__body-td">
                                {{ col.prop ? row[col.prop] : '' }}
                            </view>
                        </template>
                    </view>
                </template>
            </template>
            <view v-else class="sd-table__empty">
                <sd-empty :custom-style="{ width: '60%' }" />
            </view>
        </view>
    </view>
</template>

