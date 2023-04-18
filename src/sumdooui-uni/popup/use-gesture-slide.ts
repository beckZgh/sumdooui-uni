/**
 * 手势滑动
 */
import type { CSSProperties } from 'vue'
import type { PopupProps } from './popup'
import { reactive, toRef } from 'vue'

export const useGestureSlide = (props: PopupProps, close: Function) => {
    const state = reactive({
        start_x    : 0,
        start_y    : 0,
        slide_style: {} as CSSProperties,
        scroll_top : 0,
        is_revert  : false, // 是否还原
        no_move    : false, // 是否禁止移动
        i          : 0,
    })

    /** 监听滚动 */
    function onScrollTop(e: { detail: { scrollTop: number } } ) {
        state.scroll_top = e.detail.scrollTop
    }

    // 滑动开始
    function onTouchStart(e: TouchEvent) {
        // 未开启手势关闭
        if (!props.gestureCloseable) return

        state.start_x = e.touches[0].clientX
        state.start_y = e.touches[0].clientY
    }

    // 滑动中
    function onTouchMove(e: TouchEvent) {
        // 未开启手势关闭
        if (!props.gestureCloseable) return

        const slide_style: CSSProperties = {}

        const delta_x = e.touches[0].clientX - state.start_x
        const delta_y = e.touches[0].clientY - state.start_y

        const judge_move = judgeMove(delta_x, delta_y)
        if ( !judge_move ) return

        switch (props.position) {
            case 'bottom': {
                slide_style.bottom = `${ -delta_y }px`
                judgeBack(delta_y)
                break
            }
            case 'top': {
                slide_style.top = `${ delta_y }px`
                judgeBack(delta_y)
                break
            }
            case 'left': {
                slide_style.left = `${ delta_x }px`
                judgeBack(delta_x)
                break
            }
            case 'right': {
                slide_style.right = `${ -delta_x }px`
                judgeBack(delta_x)
                break
            }
        }

        state.slide_style = slide_style
    }

    // 滑动结束
    function onTouchEnd(e: TouchEvent) {
        // 未开启手势关闭
        if (!props.gestureCloseable) return

        const distance_x = e.changedTouches[0].clientX - state.start_x
        const distance_y = e.changedTouches[0].clientY - state.start_y

        const judge_move = judgeMove(distance_x, distance_y)
        if (judge_move && !state.is_revert) {
            close()
            setTimeout(() => {
                state.slide_style[props.position as any] = 0
            }, (props.duration + 0.1) * 1000)
        } else {
            // 回到原位
            state.slide_style[props.position as any] = 0
            state.is_revert = false
            state.no_move = false
        }
    }

    // 判断移动方向是否正确
    function judgeMove(distance_x: number, distance_y: number) {
        // 禁止移动
        if (state.no_move) return false

        // 上下滑动判断 scrollTop
        if (distance_y > 0 && props.position === 'bottom' && state.scroll_top === 0) {
            // 底部弹出，向下拉隐藏
            return true
        } else if (distance_y < 0 && props.position === 'top' && state.scroll_top === 0) {
            // 顶部弹出，向上推隐藏
            return true
        } else if (distance_x > 0 && props.position === 'right') {
            state.i++
            if (Math.abs(distance_y) > 10 && state.i < 2) {
                state.no_move = true
                return false
            } else {
                return true
            }
        } else if (distance_x < 0 && props.position === 'left') {
            state.i++
            if (Math.abs(distance_y) > 10 && state.i < 2) {
                state.no_move = true
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    // 判断是否滚动到关闭的距离，否则还原
    function judgeBack(distance: number) {
        // 滑动不够距离
        if (Math.abs(distance) < 100) {
            state.is_revert = true
        } else {
            state.is_revert = false
        }
    }

    return {
        slide_style: toRef(state, 'slide_style'),
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onScrollTop,
    }
}
