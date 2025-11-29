export const MpMixin = {
    options: {
        /**
         * 虚拟化组件节点： 默认情况下，自定义组件本身的那个节点是一个 “普通” 的 view 节点
         * https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E8%99%9A%E6%8B%9F%E5%8C%96%E7%BB%84%E4%BB%B6%E8%8A%82%E7%82%B9
         *
         * 示例：
         * custom-component.vue
         *     <view style="flex: 1;"><view>
         *
         * page.vue
         *      <view style="display: flex;">
         *          <custom-component />
         *      </view>
         *
         * 未开启: custom-component 渲染为一个普通的 view 节点
         * 开启后：custom-component 渲染为一个虚拟的，不会影响自定义组件根节点的布局样式
         *
         * 基础库版本要求：v2.11.2+
         */
        virtualHost: true,

        // 所有组件默认开启 css 样式作用域
        // /**
        //  * 组件样式隔离：默认情况下，自定义组件的样式只受到自定义组件 wxss 的影响
        //  *
        //  * 指定特殊的样式隔离选项 styleIsolation
        //  * addGlobalClass: true 等价于设置 styleIsolation: apply-shared
        //  * apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；
        //  *
        //  * 基础库版本要求：v2.2.3+ (styleIsolation 选项版本需要 v2.6.5+ 支持)
        //  */
        // addGlobalClass: true,

        // /**
        //  * styleIsolation:
        //  * 1. isolated     表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响 (默认值)
        //  * 2. apply-shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式不会影响页面和其它自定义组件
        //  * 3. shared       表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）
        //  *
        //  * https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
        //  *
        //  * 基础库版本要求：v2.10.1+
        //  */
        // styleIsolation: 'shared',
    },
}
