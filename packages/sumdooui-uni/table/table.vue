<script lang="ts">
import type { CSSProperties } from 'vue'

import { defineComponent, computed } from 'vue'
import { MpMixin                   } from '../common/mixins'
import { table_props               } from './table'

import Utils from '../utils'

export default defineComponent({
    ...MpMixin,

    name : 'SdTable',
    props: table_props,
    emits: [
        'cell-click',
        'row-click',
        'header-click',
        'header-cell-click',
    ],
    setup(props) {
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.height   ) style.height    = Utils.toUnit(props.height)
            if (props.maxHeight) style.maxHeight = Utils.toUnit(props.maxHeight)
            return style
        })
        return { root_style$ }
    },
})
</script>

<template>
    <view
        class="sd-table"
        :class="[customClass, {
            'sd-table--border'                : border,
            'sd-table--stripe'                : stripe,
            [`sd-table--${ align || 'left' }`]: true,
        }]"
        :style="root_style$"
    >
        <view
            v-if="showHeader"
            class="sd-table-header"
            :class="[
                { [`sd-table-header--${ headerAlign || align || 'left' }`]: true },
            ]"
            @tap="$emit('header-click', $event)"
        >
            <view class="sd-table-header__tr">
                <template v-for="(col, col_index) in columns" :key="col_index">
                    <view class="sd-table-header__th" @tap="$emit('header-cell-click', { $col: col, $col_index: col_index })">
                        {{ col.title }}
                    </view>
                </template>
            </view>
        </view>
        <view class="sd-table-body">
            <template v-if="data.length">
                <template v-for="(row, row_index) in data" :key="row_index">
                    <view class="sd-table-body__tr" @tap="$emit('row-click', { $row: row, $row_index: row_index })">
                        <template v-for="(col, col_index) in columns" :key="col_index">
                            <view
                                class="sd-table-body__td"
                                @tap="$emit('cell-click', { $row: row, $col: col, $row_index: row_index, $col_index: col_index })"
                            >
                                {{ col.prop ? row[col.prop] : '' }}
                            </view>
                        </template>
                    </view>
                </template>
            </template>
            <view v-else class="sd-table__empty">
                <sd-empty :text="emptyText" :custom-style="{ width: '60%' }" />
            </view>
        </view>
        <view v-if="$slots.footer" class="sd-table-footer">
            <slot name="footer" />
        </view>
    </view>
</template>

