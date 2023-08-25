<script lang="ts" setup>
import { ref } from 'vue'
const icon_member = '/static/images/icon-member.svg'
const avatar_img = '/static/images/avatar.png'
const checked = ref(false)
const long_text = ref('我是一段超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长的内容文本')
</script>

<template>
    <sd-page title="Cell 单元格">
        <demo-card title="微信开放能力" :card="false">
            <sd-cell-group clickable arrow>
                <sd-cell open-type="chooseAvatar" icon="user" title="选择头像" />
                <sd-cell open-type="openSetting" icon="setting" title="打开权限设置" />
                <sd-cell open-type="share" icon="share" title="分享好友" />
            </sd-cell-group>
        </demo-card>

        <demo-card title="单行单元格" :card="false" bottom-gap>
            <sd-cell-group border arrow>
                <sd-cell title="单行标题" :arrow="false" />
                <sd-cell title="单行标题" />
                <sd-cell title="单行标题" value="我是值" />
                <sd-cell title="单行标题">
                    <template #extra>
                        <sd-badge content="99" />
                    </template>
                </sd-cell>
                <sd-cell title="单行标题">
                    <template #extra>
                        <sd-switch v-model="checked" />
                    </template>
                </sd-cell>
                <sd-cell icon="lock" :icon-props="{ theme: 'primary' }" title="单行标题" />
                <sd-cell :image="icon_member" title="单行标题" />
            </sd-cell-group>
        </demo-card>

        <demo-card title="多行单元格" :card="false" bottom-gap>
            <sd-cell-group border arrow>
                <sd-cell title="多行标题" description="一段很长很长的内容描述" :arrow="false" />
                <sd-cell title="多行标题" description="一段很长很长的内容描述" />
                <sd-cell title="多行标题" description="一段很长很长的内容描述" value="我是值" />
                <sd-cell title="多行标题" description="一段很长很长的内容描述">
                    <template #extra>
                        <sd-badge content="99" />
                    </template>
                </sd-cell>
                <sd-cell title="多行标题" description="一段很长很长的内容描述">
                    <template #extra>
                        <sd-switch v-model="checked" />
                    </template>
                </sd-cell>
                <sd-cell icon="lock" :icon-props="{ theme: 'primary', size: 80 }" title="多行标题" description="一段很长很长的内容描述" />
                <sd-cell :image="avatar_img" :image-props="{ width: '80rpx', height: '80rpx' }" title="多行标题" description="一段很长很长的内容描述" />
            </sd-cell-group>
        </demo-card>

        <demo-card title="可调整底部边框左右对齐位置" :card="false" bottom-gap>
            <sd-cell-group border>
                <sd-cell :image="icon_member" title="我是标题" arrow />
                <sd-cell :image="icon_member" title="我是标题" :border-style="{ left: '112rpx' }" arrow />
                <sd-cell :image="icon_member" title="我是标题" :border-style="{ left: '112rpx', right: '32rpx' }" arrow />
            </sd-cell-group>
        </demo-card>

        <demo-card title="显示右侧配图" :card="false" bottom-gap>
            <sd-cell v-for="item in 3" :key="item" title="多行标题" description="一段很长很长的内容描述" border>
                <template #extra>
                    <sd-image :src="avatar_img" shape="circle" width="80rpx" height="80rpx" />
                </template>
            </sd-cell>
        </demo-card>

        <demo-card title="显示右侧内容很多" :card="false" bottom-gap>
            <sd-cell
                v-for="item in 3" :key="item"
                :image="icon_member"
                title="我是标题" :right-style="{ flexBasis: '65%' }" :value="long_text" border
            />
        </demo-card>

        <demo-card title="卡片模式" :card="false" transparent>
            <sd-cell-group arrow :body-style="{ padding: '0 30rpx' }">
                <sd-cell :image="icon_member" title="色彩" round />
                <sd-cell :image="icon_member" title="按钮" round />
                <sd-cell :image="icon_member" title="单元格" round />
            </sd-cell-group>
        </demo-card>

        <demo-card title="点击反馈" :card="false">
            <sd-cell-group arrow clickable>
                <sd-cell :image="icon_member" title="我的信息" />
                <sd-cell :image="icon_member" title="我的订单" />
                <sd-cell :image="icon_member" title="我的礼券" />
            </sd-cell-group>
        </demo-card>

        <sd-cell-group title="我是分组标题" border arrow>
            <sd-cell :image="icon_member" title="色彩" />
            <sd-cell :image="icon_member" title="按钮" />
            <sd-cell :image="icon_member" title="单元格" />
        </sd-cell-group>
    </sd-page>
</template>
