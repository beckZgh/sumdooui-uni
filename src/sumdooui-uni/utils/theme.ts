/**
 * 处理主题相关
 */

import { TinyColor } from '@ctrl/tinycolor'

/** 生成给定颜色值的梯度色阶  */
export function genColors(color: string) {
    const _color  = new TinyColor(color)
    return {
        colors: [
            _color.mix('#fff', 10).toHexString(), // 0
            _color.mix('#fff', 20).toHexString(), // 1
            _color.mix('#fff', 30).toHexString(), // 2
            _color.mix('#fff', 40).toHexString(), // 3
            _color.mix('#fff', 50).toHexString(), // 4
            _color.mix('#fff', 60).toHexString(), // 5
            _color.mix('#fff', 70).toHexString(), // 6
            _color.mix('#fff', 80).toHexString(), // 7
            _color.mix('#fff', 90).toHexString(), // 8
        ],
    }
}
