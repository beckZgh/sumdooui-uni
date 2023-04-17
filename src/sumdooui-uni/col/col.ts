import type { ExtractPropTypes } from 'vue'

export const col_props = {
    /** 所占行数，总行数24 */
    span  : { type: Number, default: 24 },
    /** 偏移行数 */
    offset: { type: Number, default: 0 },
}

export type RowProps = ExtractPropTypes<typeof col_props>
