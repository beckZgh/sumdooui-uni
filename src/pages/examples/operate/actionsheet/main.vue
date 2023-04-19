<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    actionsheet_1: false,
    actionsheet_2: false,
    actionsheet_3: false,
    actionsheet_4: false,
    actionsheet_5: false,
    actionsheet_6: false,
    actionsheet_7: false,
    actionsheet_8: false,
    items        : [
        { text: '选项一' },
        { text: '选项二' },
        { text: '选项二' },
    ],
    icon_items: [
        { text: '选项一', icon: 'heart' },
        { text: '选项二', icon: 'star' },
        { text: '选项二', icon: 'camera' },
    ],
    color_items: [
        { text: '选项一', icon: 'heart' , color: '#09BE4F' },
        { text: '选项二', icon: 'star'  , color: '#FFB703' },
        { text: '选项二', icon: 'camera', color: '#FF2B2B' },
    ],
    disabled_items: [
        { text: '选项一', icon: 'heart', disabled: true },
        { text: '选项二', icon: 'star'   },
        { text: '选项二', icon: 'camera' },
    ],
    spec_items: [
        { text: '分享到微信群', open_type: 'share' },
        { text: '打开意见反馈', open_type: 'feedback' },
        { text: '打开客服会话', open_type: 'contact' },
    ],
})

function onSelect(item: { text: string }, index: number) {
    uni.showToast({
        title: `选择了${ item.text }, 下标为: ${ index }`,
    })
}
</script>

<template>
    <sd-page title="Actionsheet 动作面板">
        <view class="demo-card">
            <view class="demo-card__title">
                基本用法
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_1 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                文本左对齐
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_2 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                文本右对齐
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_3 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带描述的动作面板
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_4 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带图标的动作面板
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_5 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带颜色的动作面板
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_6 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                带禁用选项的动作面板
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_7 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <view class="demo-card">
            <view class="demo-card__title">
                微信特性按钮的动作面板
            </view>
            <view class="demo-card__body flex-xc">
                <sd-button width="75%" variant="plain" @click="m.actionsheet_8 = true">
                    应用
                </sd-button>
            </view>
        </view>

        <!-- 基本用法 -->
        <sd-actionsheet v-model:visible="m.actionsheet_1" :items="m.items" @select="onSelect" />
        <!-- 文本左对齐 -->
        <sd-actionsheet v-model:visible="m.actionsheet_2" align="left" description="我是一段描述" :items="m.items" @select="onSelect" />
        <!-- 文本右对齐 -->
        <sd-actionsheet v-model:visible="m.actionsheet_3" align="right" description="我是一段描述" :items="m.items" @select="onSelect" />
        <!-- 带描述的动作面板 -->
        <sd-actionsheet v-model:visible="m.actionsheet_4" description="我是一段描述" :items="m.items" @select="onSelect" />
        <!-- 带图标的动作面板 -->
        <sd-actionsheet v-model:visible="m.actionsheet_5" description="我是一段描述" :items="m.icon_items" @select="onSelect" />
        <!-- 带颜色的动作面板 -->
        <sd-actionsheet v-model:visible="m.actionsheet_6" description="我是一段描述" :items="m.color_items" @select="onSelect" />
        <!-- 带禁用的动作面板 -->
        <sd-actionsheet v-model:visible="m.actionsheet_7" description="我是一段描述" :items="m.disabled_items" @select="onSelect" />
        <!-- 微信特性的动作面板 -->
        <sd-actionsheet v-model:visible="m.actionsheet_8" description="我是一段描述" :items="m.spec_items" @select="onSelect" />
    </sd-page>
</template>
