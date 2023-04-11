/**
 * 处理主题相关
 * v22.12.09
 */

import { TinyColor } from '@ctrl/tinycolor'

/** 生成主题变量 */
export function initThemeVar(
    params?: {
        brand_color  ?: string
        success_color?: string
        warning_color?: string
        danger_color ?: string
        info_color   ?: string
    },
) {
    // 色调
    const primary_color = params?.brand_color   || '#000'
    const success_color = params?.success_color || '#67c23a'
    const warning_color = params?.warning_color || '#e6a23c'
    const danger_color  = params?.danger_color  || '#f56c6c'
    const info_color    = params?.info_color    || '#909399'

    // 色阶
    const primary_colors = genColors(primary_color)
    const success_colors = genColors(success_color)
    const warning_colors = genColors(warning_color)
    const danger_colors  = genColors(danger_color)
    const info_colors    = genColors(info_color)

    return {
        // 基础色
        '--white': '#fff',
        '--black': '#000',
        '--blue' : '#409eff',

        // 背景色
        '--bg-color-page'   : '#f1f4fa',            // 页面背景底色
        '--bg-color-content': '#f8f8f8',            // 内部背景底色
        '--bg-color-mask'   : 'rgba(0, 0, 0, 0.6)', // 遮罩层背景底色
        '--bg-color-hover'  : 'rgba(0, 0, 0, 0.2)', // 激活底色

        // 主题色
        '--primary-color'         : primary_color,
        '--primary-color-1'       : primary_colors.colors[0],
        '--primary-color-2'       : primary_colors.colors[1],
        '--primary-color-3'       : primary_colors.colors[2],
        '--primary-color-4'       : primary_colors.colors[3],
        '--primary-color-5'       : primary_colors.colors[4],
        '--primary-color-6'       : primary_colors.colors[5],
        '--primary-color-7'       : primary_colors.colors[6],
        '--primary-color-8'       : primary_colors.colors[7],
        '--primary-color-9'       : primary_colors.colors[8],
        '--primary-color-hover'   : primary_colors.colors[3],
        '--primary-color-disabled': primary_colors.colors[7],

        // 成功颜色
        '--success-color'         : success_color,
        '--success-color-1'       : success_colors.colors[0],
        '--success-color-2'       : success_colors.colors[1],
        '--success-color-3'       : success_colors.colors[2],
        '--success-color-4'       : success_colors.colors[3],
        '--success-color-5'       : success_colors.colors[4],
        '--success-color-6'       : success_colors.colors[5],
        '--success-color-7'       : success_colors.colors[6],
        '--success-color-8'       : success_colors.colors[7],
        '--success-color-9'       : success_colors.colors[8],
        '--success-color-hover'   : success_colors.colors[3],
        '--success-color-disabled': success_colors.colors[7],

        // 警告颜色
        '--warning-color'         : warning_color,
        '--warning-color-1'       : warning_colors.colors[0],
        '--warning-color-2'       : warning_colors.colors[1],
        '--warning-color-3'       : warning_colors.colors[2],
        '--warning-color-4'       : warning_colors.colors[3],
        '--warning-color-5'       : warning_colors.colors[4],
        '--warning-color-6'       : warning_colors.colors[5],
        '--warning-color-7'       : warning_colors.colors[6],
        '--warning-color-8'       : warning_colors.colors[7],
        '--warning-color-9'       : warning_colors.colors[8],
        '--warning-color-hover'   : warning_colors.colors[3],
        '--warning-color-disabled': warning_colors.colors[7],

        // 危险颜色
        '--danger-color'         : danger_color,
        '--danger-color-1'       : danger_colors.colors[0],
        '--danger-color-2'       : danger_colors.colors[1],
        '--danger-color-3'       : danger_colors.colors[2],
        '--danger-color-4'       : danger_colors.colors[3],
        '--danger-color-5'       : danger_colors.colors[4],
        '--danger-color-6'       : danger_colors.colors[5],
        '--danger-color-7'       : danger_colors.colors[6],
        '--danger-color-8'       : danger_colors.colors[7],
        '--danger-color-9'       : danger_colors.colors[8],
        '--danger-color-hover'   : danger_colors.colors[3],
        '--danger-color-disabled': danger_colors.colors[7],

        // 信息颜色
        '--info-color'         : info_color,
        '--info-color-1'       : info_colors.colors[1],
        '--info-color-2'       : info_colors.colors[2],
        '--info-color-3'       : info_colors.colors[3],
        '--info-color-4'       : info_colors.colors[4],
        '--info-color-5'       : info_colors.colors[5],
        '--info-color-6'       : info_colors.colors[6],
        '--info-color-7'       : info_colors.colors[7],
        '--info-color-8'       : info_colors.colors[8],
        '--info-color-9'       : info_colors.colors[9],
        '--info-color-hover'   : info_colors.colors[3],
        '--info-color-disabled': info_colors.colors[7],

        // 文字颜色
        '--text-color-primary'    : '#181818',      // 主要文字：主标题
        '--text-color-secondary'  : '#181818',      // 次要文字：次标题
        '--text-color-title'      : '#181818',      // 用于重量级文字信息、标题
        '--text-color'            : '#333',         // 用于普通级段落信息、引导词
        '--text-color-subtitle'   : '#7f7f7f',      // 用于次要标题内容
        '--text-color-desc'       : '#b2b2b2',      // 描述文字
        '--text-color-placeholder': '#ccc',         // 占位文字
        '--text-color-link'       : 'var(--blue)',  // 链接文字

        // 边框
        '--border-color'        : '#dcdfe6',
        '--border-color-light'  : '#e4e7ed',
        '--border-color-lighter': '#ebeef5',

        // 透明度
        '--opacity-hover'   : 0.8,
        '--opacity-disabled': 0.5,

        // 阴影
        '--shadow-color': 'rgba(2, 4, 38, 0.05)',

        // 文字
        '--font-size-small' : '20rpx', // 10px
        '--font-size-base'  : '28rpx', // 12px
        '--font-size-large' : '28rpx', // 14px
        '--font-size-larger': '32rpx', // 16px
        '--font-size-title' : '36rpx', // 18px

        // 边框圆角
        '--border-radius-small' : '20rpx', // 10px
        '--border-radius-base'  : '30rpx', // 15px
        '--border-radius-round' : '40rpx', // 20px
        '--border-radius-circle': '50%'  ,
    }
}

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
