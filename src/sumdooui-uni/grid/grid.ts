import type { PropType, ExtractPropTypes } from 'vue'
import { COMMON_PROPS } from '../common/props'

type GridDirection = 'row' | 'column'

export const grid_props = {
    ...COMMON_PROPS,

    /** 每一行列数 */
    column   : { type: Number, default: 4 },
    /** 点击反馈 */
    clickable: { type: Boolean, default: true },
    /** 是否显示边框 */
    border   : { type: Boolean, default: false },
    /** 是否格子显示为正方形 */
    square   : { type: Boolean, default: false },
    /** 内容排列方向 */
    direction: { type: String as PropType<GridDirection>, default: 'column' },
}

export type GridProps = ExtractPropTypes<typeof grid_props>
