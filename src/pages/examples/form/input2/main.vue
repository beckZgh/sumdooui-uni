<script setup lang="ts">
import { ref } from 'vue'
const text_input = ref('')
const number_input = ref('')
const digit_input = ref('')
const idcard_input = ref('')
const nickname_input = ref('')
const safe_password_input = ref('')
const password_input = ref('')
const input_1 = ref('')
const input_2 = ref('')
const input_3 = ref('')
const input_4 = ref('')
const input_7 = ref('做一个对业务能提效的技术工具！')
const input_8 = ref('做一个对业务能提效的技术工具！')
</script>

<template>
    <sd-page title="Input 输入框">
        <demo-card title="基本用法">
            <sd-input v-model="text_input" border="surround" placeholder="文本输入框" />
            <sd-input v-model="password_input" border="surround" placeholder="密码输入框" type="password" />
            <sd-input v-model="safe_password_input" border="surround" placeholder="安全密码输入框" type="safe-password" />
            <sd-input v-model="number_input" border="surround" placeholder="数字输入框" type="number" />
            <sd-input v-model="digit_input" border="surround" placeholder="带小数点的数字输入框" type="digit" />
            <sd-input v-model="idcard_input" border="surround" placeholder="身份证输入框" type="idcard" />
            <sd-input v-model="nickname_input" border="surround" placeholder="昵称输入框" type="nickname" />
        </demo-card>

        <demo-card title="显示输入计数">
            <sd-input v-model="input_1" :maxlength="50" border="surround" show-word-limit />
        </demo-card>

        <demo-card title="一键清空">
            <sd-input v-model="input_2" clearable border="surround" />
        </demo-card>

        <demo-card title="带图标的输入框">
            <sd-input v-model="input_3" prefix-icon="search" border="surround" />
            <view class="sd-flex sd-mt-20">
                <sd-input v-model="input_3" prefix-icon="calendar-check" border="surround" placeholder="请选择日期" />
                <text style="display: inline-block; width: 32rpx;" />
                <sd-input v-model="input_3" suffix-icon="calendar-check" border="surround" placeholder="请选择日期" />
            </view>
        </demo-card>

        <demo-card title="使用插槽的输入框">
            <sd-input v-model="input_4" placeholder="请输入验证码" border="surround">
                <template #suffix>
                    <sd-button size="small" text bg type="primary">
                        获取验证码
                    </sd-button>
                </template>
            </sd-input>
            <sd-input v-model="input_4" placeholder="请输入验证码" border="surround">
                <template #suffix>
                    <sd-button size="small" text type="primary">
                        获取验证码
                    </sd-button>
                </template>
            </sd-input>
            <sd-input v-model="input_4" placeholder="请输入重量" input-align="right" border="surround">
                <template #suffix>
                    KG
                </template>
            </sd-input>
        </demo-card>

        <demo-card title="不同边框的输入框">
            <sd-input v-model="input_4" border="surround" placeholder="请输入验证码">
                <template #suffix>
                    <sd-button size="small" text bg type="primary">
                        获取验证码
                    </sd-button>
                </template>
            </sd-input>
            <sd-input v-model="input_4" border="bottom" placeholder="请输入验证码">
                <template #suffix>
                    <sd-button size="small" text bg type="primary">
                        获取验证码
                    </sd-button>
                </template>
            </sd-input>
            <sd-input v-model="input_4" border="none" placeholder="请输入验证码">
                <template #suffix>
                    <sd-button size="small" text bg type="primary">
                        获取验证码
                    </sd-button>
                </template>
            </sd-input>
        </demo-card>

        <demo-card title="只读状态">
            <sd-input v-model="input_7" readonly border="surround" />
            <sd-input v-model="input_7" border="bottom" readonly />
            <sd-input v-model="input_7" border="none" readonly />
        </demo-card>

        <demo-card title="禁用状态">
            <sd-input v-model="input_8" disabled border="surround" />
            <sd-input v-model="input_8" border="bottom" disabled />
            <sd-input v-model="input_8" border="none" disabled />
        </demo-card>
    </sd-page>
</template>

<style lnag="scss" scoped>
:deep(.sd-input + .sd-input) {
    margin-top: 20rpx;
}
</style>
