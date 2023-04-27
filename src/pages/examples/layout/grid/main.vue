<script setup lang="ts">
function onChooseAvatar(e: any) {
    console.log('--e', e)
}
</script>

<template>
    <sd-page title="Grid 网格布局">
        <demo-card title="基本用法">
            <sd-grid>
                <sd-grid-item icon="user" text="用户" />
                <sd-grid-item icon="setting" text="设置" />
                <sd-grid-item icon="like" text="顶" />
                <sd-grid-item icon="unlike" text="踩" />
                <sd-grid-item icon="mobile" text="手机" />
                <sd-grid-item icon="share" text="分享" />
                <sd-grid-item icon="star" text="收藏" />
                <sd-grid-item icon="rocket" text="置顶" />
            </sd-grid>
        </demo-card>

        <demo-card title="微信开放能力">
            <sd-grid @chooseavatar="onChooseAvatar">
                <sd-grid-item open-type="chooseAvatar" icon="user" text="头像" />
                <sd-grid-item open-type="openSetting" icon="setting" text="设置" />
                <sd-grid-item open-type="getPhoneNumber" icon="mobile" text="手机" />
                <sd-grid-item open-type="share" icon="share" text="分享" />
            </sd-grid>
        </demo-card>

        <demo-card title="横向内容排版">
            <sd-grid :column="3" direction="row">
                <sd-grid-item icon="rocket" text="文字" />
                <sd-grid-item icon="rocket" text="文字" />
                <sd-grid-item icon="rocket" text="文字" />
                <sd-grid-item icon="rocket" text="文字" />
                <sd-grid-item icon="rocket" text="文字" />
                <sd-grid-item icon="rocket" text="文字" />
            </sd-grid>
        </demo-card>

        <demo-card title="带徽标的图片图标展示">
            <sd-grid>
                <sd-grid-item :image-props="{ width: '80rpx', height: '80rpx' }" image="/static/images/icon-sign-in.svg" text="签到" dot />
                <sd-grid-item :image-props="{ width: '80rpx', height: '80rpx' }" image="/static/images/icon-member.svg" text="会员" badge="8" />
                <sd-grid-item :image-props="{ width: '80rpx', height: '80rpx' }" image="/static/images/icon-order.svg" text="订单"  :badge="999" :badge-props="{ max: 99 }" />
                <sd-grid-item :image-props="{ width: '80rpx', height: '80rpx' }" image="/static/images/icon-coupon.svg" text="礼券" badge="New" />
            </sd-grid>
        </demo-card>

        <demo-card title="带边框的正方形格子">
            <sd-grid border square>
                <sd-grid-item icon="user" text="用户" />
                <sd-grid-item icon="setting" text="设置" />
                <sd-grid-item icon="like" text="顶" />
                <sd-grid-item icon="unlike" text="踩" />
                <sd-grid-item icon="mobile" text="手机" />
                <sd-grid-item icon="share" text="分享" />
                <sd-grid-item icon="star" text="收藏" />
                <sd-grid-item icon="rocket" text="置顶" />
            </sd-grid>
        </demo-card>

        <demo-card title="自定义内容">
            <sd-grid border square>
                <sd-grid-item>
                    自定义
                </sd-grid-item>
                <sd-grid-item>
                    自定义
                </sd-grid-item>
                <sd-grid-item>
                    自定义
                </sd-grid-item>
                <sd-grid-item>
                    自定义
                </sd-grid-item>
            </sd-grid>
        </demo-card>
    </sd-page>
</template>
