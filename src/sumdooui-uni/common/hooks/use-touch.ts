import { reactive, toRefs } from 'vue'

/**
 * 触摸事件
 * - touchstart  手指放到屏幕上时触发
 * - touchmove   手指在屏幕上滑动时触发
 * - touchend    手指离开屏幕时触发
 * - touchcancel 系统取消 touch 事件时触发
 *
 * TouchEvent 属性
 * - touches        当前屏幕上所有手指的列表
 * - targetTouches  当前元素上所有手指的列表
 * - changedTouches 当前事件的手指列表
 *      - clientX / clientY 相对浏览器窗口的位置
 *      - pageX / pageY     触摸点相对于页面的位置
 *      - screenX / screenY 触摸点相对于屏幕的位置
 *      - identifier        touch 对象的ID
 *      - target            当前目标元素
 */

const MIN_DISTANCE = 10 // 最小滑动距离

export function useTouch() {
    const state = reactive({
        // 开始触摸点
        start_x  : 0 ,
        start_y  : 0 ,
        // 当前滑动的触摸点
        move_x   : 0 ,
        move_y   : 0 ,
        // 当前滑动距离开始触摸的距离 (offset 为绝对值)
        delta_x  : 0 ,
        delta_y  : 0 ,
        offset_x : 0 ,
        offset_y : 0 ,
        // 滑动方向
        direction: '',
    })

    const isVertical = () => state.direction === 'vertical'
    const isHorizontal = () => state.direction === 'horizontal'

    const reset = () => {
        state.delta_x   = 0
        state.delta_y   = 0
        state.offset_x  = 0
        state.offset_y  = 0
        state.direction = ''
    }

    const start = (event: TouchEvent) => {
        reset()
        state.start_x = event.touches[0].clientX
        state.start_y = event.touches[0].clientY
    }

    const move = (event: TouchEvent) => {
        const touch = event.touches[0]

        state.delta_x = touch.clientX - state.start_x
        state.delta_y = touch.clientY - state.start_y

        state.move_x = touch.clientX
        state.move_y = touch.clientY

        state.offset_x = Math.abs(state.delta_x)
        state.offset_y = Math.abs(state.delta_y)

        if (!state.direction) {
            state.direction = getDirection(state.offset_x, state.offset_y)
        }
    }

    return {
        ...toRefs(state),
        isVertical,
        isHorizontal,
        reset,
        start,
        move,
    }
}

// 取得滑动方向
function getDirection(x: number, y: number) {
    if (x > y && x > MIN_DISTANCE) {
        return 'horizontal'
    }
    if (y > x && y > MIN_DISTANCE) {
        return 'vertical'
    }
    return ''
}
