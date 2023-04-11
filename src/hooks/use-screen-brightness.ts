/**
 * 保证页面进入屏幕亮度不低于 0.8
 * v23.03.27
 */
import { onLoad, onUnload } from '@dcloudio/uni-app'

export function useScreenBrightness() {
    let brightness = 0 // 进入时的屏幕亮度

    // 调整屏幕亮度
    onLoad(async () => {
        const res = await uni.$.getScreenBrightness()
        if ( !res.ok ) return

        brightness = res.data.value
        if (brightness && brightness < 0.8) {
            uni.setScreenBrightness({ value: 0.8 })
        }
    })

    // 恢复原有屏幕亮度
    onUnload(() => {
        brightness && uni.setScreenBrightness({ value: brightness })
    })
}
