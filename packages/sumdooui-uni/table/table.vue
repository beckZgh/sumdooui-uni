<script lang="ts">
import type { CSSProperties } from 'vue'
import type { TableColumn   } from './table'

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
    setup(props, ctx) {
        const root_style$ = computed(() => {
            const style: CSSProperties = { ...props.customStyle }
            if (props.height   ) style.height    = Utils.toUnit(props.height)
            if (props.maxHeight) style.maxHeight = Utils.toUnit(props.maxHeight)
            return style
        })

        function handleHeaderClick($event: any) {
            ctx.emit('header-click', { rows: props.rows, $event })
        }

        function handleHeaderCellClick($event: any, col: TableColumn, colIndex: number) {
            ctx.emit('header-cell-click', { rows: props.rows, col, colIndex, $event })
        }

        function handleRowClick($event:any, row: any, rowIndex: number) {
            ctx.emit('row-click', { rows: props.rows, row, rowIndex, $event })
        }

        function handleCellClick($event:any, row: any, rowIndex: number, col: TableColumn, colIndex: number) {
            ctx.emit('cell-click', { rows: props.rows, row, col, rowIndex, colIndex, $event })
        }

        function mergeHeaderStyle(col: TableColumn, colIndex: number): any {
            return [
                { flexBasis: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth },
                col.headerCellStyle,
                Utils.isFunction(props.headerCellStyle)
                    ? props.headerCellStyle({ col, colIndex })
                    : props.headerCellStyle,
            ]
        }

        function mergeCellStyle(row: any, rowIndex: number, col: TableColumn, colIndex: number): any {
            return [
                { flexBasis: col.width, minWidth: col.minWidth, maxWidth: col.maxWidth },
                col.cellStyle,
                Utils.isFunction(props.cellStyle)
                    ? props.cellStyle({ row, rowIndex, col, colIndex })
                    : props.cellStyle,
            ]
        }

        function formatter(row: any, rowIndex: number, col: TableColumn, colIndex: number) {
            const value = row[col.field || '']
            return Utils.isFunction(col.formatter)
                ? col.formatter({ row, rowIndex, col, colIndex, value })
                : value
        }

        return {
            root_style$,
            handleHeaderClick,
            handleHeaderCellClick,
            handleRowClick,
            handleCellClick,
            mergeHeaderStyle,
            mergeCellStyle,
            formatter,
        }
    },
})
</script>

<template>
    <view
        class="sd-table"
        :class="[customClass, {
            'sd-table--border'     : border,
            'sd-table--stripe'     : stripe,
            [`sd-table--${ size }`]: !!size,
        }]"
        :style="root_style$"
    >
        <sd-sticky v-if="showHeader" v-bind="stickyProps" :disabled="!enableSticky">
            <view class="sd-table-header" @tap="handleHeaderClick">
                <view class="sd-table-header__tr">
                    <view
                        v-for="(col, colIndex) in cols"
                        :key="colIndex"
                        class="sd-table-header__th" :class="[
                            { [`col--${ col.headerAlign || col.align || headerAlign || align }`]: true },
                            { 'col--ellipsis': col.showHeaderOverflow ?? col.showOverflow ?? showHeaderOverflow ?? showOverflow },
                            { 'col--clickable': col.headerClickable ?? col.clickable ?? headerClickable ?? clickable },
                            col.headerCellClass,
                        ]"
                        :style="mergeHeaderStyle(col, colIndex)"
                        @tap="handleHeaderCellClick($event, col, colIndex)"
                    >
                        <text>{{ col.title }}</text>
                    </view>
                </view>
            </view>
        </sd-sticky>

        <slot name="header-extra" />

        <view class="sd-table-body">
            <template v-if="rows.length">
                <view
                    v-for="(row, rowIndex) in rows"
                    :key="rowIndex"
                    class="sd-table-body__tr"
                    @tap="handleRowClick($event, row, rowIndex)"
                >
                    <view
                        v-for="(col, colIndex) in cols"
                        :key="colIndex"
                        class="sd-table-body__td" :class="[
                            { [`col--${ col.align || align }`]: true },
                            { 'col--ellipsis': col.showOverflow ?? showOverflow },
                            { 'col--clickable': col.clickable ?? clickable },
                            col.cellClass,
                        ]"
                        :style="mergeCellStyle(row, rowIndex, col, colIndex)"
                        @tap="handleCellClick($event, row, rowIndex, col, colIndex)"
                    >
                        <text v-if="col.type === 'seq'">
                            {{ rowIndex + 1 }}
                        </text>
                        <text v-else>
                            {{ formatter(row, rowIndex, col, colIndex) }}
                        </text>
                    </view>
                </view>
            </template>

            <slot v-else-if="$slots.empty" name="empty" />

            <view v-else class="sd-table__empty">
                <sd-empty :text="emptyText" :custom-style="{ width: '60%' }" background="transparent" />
            </view>
        </view>

        <view v-if="$slots.footer" class="sd-table-footer">
            <slot name="footer" />
        </view>
    </view>
</template>

