import type { ExtractPropTypes } from 'vue'

import { COMMON_PROPS } from '../common/props'

export const row_props = {
    ...COMMON_PROPS,

    /** 栅格间隔 */
    gutter: { type: [String, Number] },
    /** flex 布局 */
    flex  : { type: Boolean },
}

export type RowProps = ExtractPropTypes<typeof row_props>
