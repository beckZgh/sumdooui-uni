<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed, getCurrentInstance } from 'vue'
import { collapse_item_props } from './collapse-item'
import { COLLAPSE_KEY, type CollapseProvide } from '../common/tokens'
import { useInject, useSelectoryQuery } from '../common/hooks'

export default defineComponent({
    name   : 'SdCollapseItem',
    props  : collapse_item_props,
    emits  : ['change'],
    options: {
        virtualHost: true,
    },
    setup(props, { emit, expose }) {
        const { parent } = useInject<CollapseProvide>(COLLAPSE_KEY)

        const instance = getCurrentInstance()!
        const state = reactive({
            is_open      : parent?.props?.accordion ? false : props.open,
            detail_height: 0,
        })

        const show_border$ = computed(() => props.border ?? parent?.props.border ?? true)
        const show_arrow$  = computed(() => props.arrow  ?? parent?.props.arrow  ?? true)

        const { queryNodeHeight } = useSelectoryQuery()
        onMounted(() => {
            queryNodeHeight('.sd-collapse-item__detail')
                .then((height) => {
                    state.detail_height = height
                })
        })

        function onClick() {
            if (props.disabled) return
            if (parent) {
                parent.onChange(instance, !state.is_open, props.index)
            } else {
                state.is_open = !state.is_open
                emit('change', { open: state.is_open, index: props.index })
            }
        }

        function setOpen(open: boolean) {
            state.is_open = open
        }
        expose({ setOpen })

        return {
            ...toRefs(state),
            show_border$,
            show_arrow$,
            setOpen,
            onClick,
        }
    },
})
</script>

<template>
    <view class="sd-collapse-item" :class="{ 'has-border': show_border$ }">
        <view class="sd-collapse-item-cell" :class="{ 'is-open': is_open }" @tap="onClick">
            <sd-icon v-if="icon" :name="icon" :color="iconColor" :size="iconSize" />
            <text class="sd-collapse-item-cell__title" :style="icon ? 'padding-left: 16rpx' : ''">
                <slot v-if="$slots.title" />
                <template v-else>
                    {{ title }}
                </template>
            </text>
            <sd-icon v-if="show_arrow$" custom-class="sd-collapse-item-cell__arrow" name="down" />
        </view>
        <view
            class="sd-collapse-item__body"
            :style="{ height: is_open ? `${ detail_height }px` : '0px' }"
        >
            <view class="sd-collapse-item__detail">
                <slot v-if="$slots.default" />
                <template v-else>
                    {{ content }}
                </template>
            </view>
        </view>
    </view>
</template>
