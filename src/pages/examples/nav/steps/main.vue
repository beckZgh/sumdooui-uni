<script setup lang="ts">
import { reactive } from 'vue'
const m = reactive({
    curr_step: 1,
    items    : [
        { name: '步骤一', desc: '描述信息一' },
        { name: '步骤二', desc: '描述信息二' },
        { name: '步骤三', desc: '描述信息三' },
        { name: '步骤四', desc: '描述信息四' },
    ],
    column_items: [
        { name: '步骤一', desc: '描述信息一' },
        { name: '步骤二', desc: '描述信息二\n描述信息二' },
        { name: '步骤三', desc: '描述信息三\n描述信息三\n描述信息三' },
        { name: '步骤四', desc: '描述信息四\n描述信息四\n描述信息四\n描述信息四' },
    ],
    custom_image_items: [
        {
            name         : '步骤一',
            desc         : '描述信息一',
            activeImage  : '/static/tabbar/assembly_selected_3x.png',
            inactiveImage: '/static/tabbar/assembly_default_3x.png',
        },
        {
            name         : '步骤二',
            desc         : '描述信息二',
            activeImage  : '/static/tabbar/layout_selected_3x.png',
            inactiveImage: '/static/tabbar/layout_default_3x.png',
        },
        {
            name         : '步骤三',
            desc         : '描述信息三',
            activeImage  : '/static/tabbar/mod_selected_3x.png',
            inactiveImage: '/static/tabbar/mod_default_3x.png',
        },
        {
            name         : '步骤四',
            desc         : '描述信息四',
            activeImage  : '/static/tabbar/my_selected_3x.png',
            inactiveImage: '/static/tabbar/my_default_3x.png',
        },
    ],
})

function handleSwitch(index: number) {
    const curr_step = m.curr_step + index
    if (curr_step < 0 || curr_step > m.items.length) return
    m.curr_step = curr_step
}
</script>

<template>
    <sd-page title="Steps 步骤条">
        <demo-card title="数字步骤 - 横向">
            <sd-steps :current="m.curr_step" :items="m.items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="数字步骤 - 垂直">
            <sd-steps :current="m.curr_step" direction="column" :items="m.column_items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="自定义数字颜色">
            <sd-steps active-color="#f67b7b" :current="m.curr_step" :items="m.items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="图标步骤 - 横向">
            <sd-steps type="icon" :current="m.curr_step" :items="m.items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="图标步骤 - 垂直">
            <sd-steps type="icon" :current="m.curr_step" direction="column" :items="m.column_items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="自定义图标颜色">
            <sd-steps type="icon" active-color="#f67b7b" :current="m.curr_step" :items="m.items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="图片步骤 - 横向">
            <sd-steps
                type="image"
                :current="m.curr_step" :items="m.items"
                active-image="/static/tabbar/assembly_selected_3x.png"
                inactive-image="/static/tabbar/assembly_default_3x.png"
            />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="图片步骤 - 垂直">
            <sd-steps
                type="image" :current="m.curr_step" direction="column" :items="m.column_items"
                active-image="/static/tabbar/assembly_selected_3x.png"
                inactive-image="/static/tabbar/assembly_default_3x.png"
            />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>

        <demo-card title="自定义每项图片步骤">
            <sd-steps type="image" :current="m.curr_step" :items="m.custom_image_items" />
            <view class="sd-flex-x-center sd-pt-30">
                <sd-button size="small" @click="handleSwitch(-1)">
                    上一步
                </sd-button>
                <sd-button type="primary" size="small" custom-class="sd-ml-30" @click="handleSwitch(1)">
                    下一步
                </sd-button>
            </view>
        </demo-card>
    </sd-page>
</template>
