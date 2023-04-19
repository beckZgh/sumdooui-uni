import type { PropType, ExtractPropTypes } from 'vue'

export type TabsItem = {
    name: string
    badge?: number
    is_dot?: boolean
    icon?: string
    icon_size?: string | number
    disabled?: boolean
}

export const tabs_props = {
    items     : { type: Array as PropType<(TabsItem | string)[]>, default: () => [] },
    current   : { type: Number, default: 0 },
    scrollable: { type: Boolean, default: true },
    height    : { type: [Number, String], default: 96 },
    background: { type: String },
    fixed     : { type: Boolean },
    sticky    : { type: Boolean },
    top       : { type: Number },
    leftAlign : { type: Boolean, default: false },
}

export type TabsProps = ExtractPropTypes<typeof tabs_props>
