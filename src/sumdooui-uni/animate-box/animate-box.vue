<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'

export default defineComponent({
    name : 'SdAnimation',
    props: {
        type  : { type: String , default: ''        },
        action: { type: String , default: 'initial' },
        loop  : { type: Boolean, default: false     },
    },
    emits: ['click'],
    setup(props, { emit }) {
        const state = reactive({
            clicked: false,
        })

        const classes$ = computed(() => {
            return {
                'sd-ani-container'              : true,
                [`sd-animation-${ props.type }`]: props.action === 'initial' || (state.clicked ? props.type : false),
                'loop'                          : props.loop,
            }
        })

        function handleClick(event: Event) {
            state.clicked = true
            if (!props.loop) {
                setTimeout(() => {
                    state.clicked = false
                }, 1000)
            }

            emit('click', event)
        }

        return {
            classes$,
            handleClick,
        }
    },
})
</script>

<template>
    <view class="sd-animation-box">
        <view :class="classes$" @tap="handleClick">
            <slot />
        </view>
    </view>
</template>
