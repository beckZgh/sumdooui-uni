import type { ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const col_props = {
    ...COMMON_PROPS,

    /** 所占行数，总行数24 */
    span  : { type: Number, default: 24 },
    /** 偏移行数 */
    offset: { type: Number, default: 0 },
}

export type RowProps = ExtractPropTypes<typeof col_props>
