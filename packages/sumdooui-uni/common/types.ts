/** 类名 */
export type Classes = string | string[]

/**
 *  键盘右下角按钮类型
    send    右下角按钮为“发送”
    search  右下角按钮为“搜索”
    next    右下角按钮为“下一个”
    go      右下角按钮为“前往”
    done    右下角按钮为“完成”
    return  右下角按钮为“换行”
 */
export type ConfirmType = 'send' | 'search' | 'next' | 'go' | 'done' | 'return'

/** input 输入类型 */
export type InputType = 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'nickname' | 'password' | 'select'

/** 样式 */
export interface Styles {
    [css: string]: string | number
}

/** 组件通用类型 */
export type ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'default'

/** 组件通用大小 */
export type ComponentSize = 'small' | 'normal' | 'large'

export namespace Component {
    /** 预设主题 */
    export type Theme  = 'primary' | 'success' | 'warning' | 'danger'

    /** 预设主题 */
    export type Type  = 'primary' | 'success' | 'warning' | 'danger'

    /** 预设尺寸 */
    export type Size = 'mini' | 'small' | 'large'

    // 微信开放能力
    export type ButtonOpenType = 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback' | 'chooseAvatar'

    // 文本方向
    export type InputAlign = 'left' | 'center' | 'right'

    // 数据项配置
    export type OptionItem = {
        label?: string
        value?: string | number
        [k: string]: any
    }

    // 数据项属性配置
    export type OptionItemProp = {
        label?: string
        value?: string
    } & {
        [key: string]: string
    }
}
