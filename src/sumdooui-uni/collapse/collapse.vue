<script lang="ts">
import { defineComponent } from 'vue'
import { MpMixin         } from '../common/mixins'
import { collapse_props  } from './collapse'
import { COLLAPSE_KEY    } from '../common/tokens'
import { useProvide      } from '../common/hooks'

export default defineComponent({
    ...MpMixin,

    name : 'SdCollapse',
    props: collapse_props,
    emits: ['change'],
    setup(props, { emit }) {
        const { internal_children } = useProvide(COLLAPSE_KEY)({ props, onChange })

        function onChange(child: any, open: boolean, index: number | string) {
            if (props.accordion) {
                internal_children.forEach((item: any) => {
                    item.proxy.is_open = item === child ? open : false
                })
            } else {
                child.proxy.is_open = open
            }

            emit('change', { open, index })
        }
    },
})
</script>

<template>
    <view class="sd-collapse" :class="customClass" :style="customStyle">
        <slot />
    </view>
</template>
