<script setup lang="ts">

</script>

<template>
    <sd-page title="Layout 栅格布局">
        <demo-card title="基本用法">
            <sd-row>
                <sd-col>
                    <view class="span-box">
                        span 24
                    </view>
                </sd-col>
            </sd-row>
            <sd-row>
                <sd-col v-for="idx in 2" :key="idx" :span="12">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 12
                    </view>
                </sd-col>
            </sd-row>
            <sd-row>
                <sd-col v-for="idx in 3" :key="idx" :span="8">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 8
                    </view>
                </sd-col>
            </sd-row>
            <sd-row>
                <sd-col v-for="idx in 4" :key="idx" :span="6">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 6
                    </view>
                </sd-col>
            </sd-row>
        </demo-card>

        <demo-card title="分栏间隔">
            <sd-row :gutter="10">
                <sd-col v-for="idx in 3" :key="idx" :span="8">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 8
                    </view>
                </sd-col>
            </sd-row>
        </demo-card>

        <demo-card title="Flex布局">
            <sd-row>
                <sd-col v-for="idx in 3" :key="idx" :span="6">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 6
                    </view>
                </sd-col>
            </sd-row>
            <sd-row flex :custom-style="{ justifyContent: 'center' }">
                <sd-col v-for="idx in 3" :key="idx" :span="6">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 6
                    </view>
                </sd-col>
            </sd-row>
            <sd-row flex :custom-style="{ justifyContent: 'flex-end' }">
                <sd-col v-for="idx in 3" :key="idx" :span="6">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 6
                    </view>
                </sd-col>
            </sd-row>
            <sd-row flex :custom-style="{ justifyContent: 'space-between' }">
                <sd-col v-for="idx in 3" :key="idx" :span="6">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 6
                    </view>
                </sd-col>
            </sd-row>
            <sd-row flex :custom-style="{ justifyContent: 'space-around' }">
                <sd-col v-for="idx in 3" :key="idx" :span="6">
                    <view class="span-box" :class="{ 'is-even': (idx % 2) === 0 }">
                        span 6
                    </view>
                </sd-col>
            </sd-row>
        </demo-card>
    </sd-page>
</template>

<style lang='scss' scoped>
:deep(.sd-row:not(:first-child)) {
    margin-top: 30rpx;
}

.span-box {
    height: 100rpx;
    line-height: 100rpx;
    background-color: $sd-primary-color;
    color: $sd-white;
    text-align: center;
    border-radius: $sd-border-radius-base;

    &.is-even {
        background-color: $sd-primary-color-3;
    }
}
</style>
