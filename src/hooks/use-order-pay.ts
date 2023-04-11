/**
 * 订单支付
 * v22.11.08
 */

import { useMbStore } from '@/store'
import { app_config } from '@/config'
import { ref        } from 'vue'

// 会员数据
const mbStore = useMbStore()

// API 列表
const apiMap = {
    market : $api.mb.market,
    deposit: $api.mb.deposit,
    order  : $api.mn.order,
}

// 支付类型
type PayType = 'wxpay' | 'mbpay' | 'pointpay'

// API 类型
type ApiType = keyof typeof apiMap

// API 参数
type ApiParmas<T extends ApiType> = Omit<ParamsApiReq<typeof apiMap[T]['create']>, 'AppID' | 'AppType' | 'PayType'>
type ApiRes<T extends ApiType> = ReturnApiRes<typeof apiMap[T]['query']>

// 订单支付
export function useOrderPay<T extends ApiType>(options: { apiType: T }) {
    const stop_payment = ref(false) // 退出支付状态
    const in_payment   = ref(false) // 支付中状态

    // 开始付款
    async function startPayment(PayType: PayType, params: ApiParmas<T>): Promise<ApiRes<T> | void> {
        // 支付中，不允许重复调用
        if (in_payment.value) return
        in_payment.value = true

        // 显示进度 Loading
        $utils.showLoading()

        // 取得支付模式
        const pay_type = PayType
        if ( !pay_type ) return

        // 创建订单
        const res = await createOrder(options.apiType, pay_type, params)

        // 外部调用停止支付
        if (stop_payment.value) {
            $utils.hideLoading()
            in_payment.value = false
            res.ok && closeOrder(options.apiType, res.data.OrderID) // 创建成功则关闭订单
            return
        }

        // 创建订单失败
        if (!res.ok) {
            $utils.hideLoading()
            $utils.showAlert(res.err)
            in_payment.value = false
            return
        }

        // 是否使用微信支付
        if (pay_type === 'wxpay') {
            // 微信支付，后端未返回 pkg
            const pkg = res.data.pkg
            if ( !pkg ) {
                $utils.hideLoading()
                in_payment.value = false
                return
            }

            // 发起微信支付
            const wxpay_res = await uni.$.requestPayment({
                provider : 'wxpay',
                orderInfo: '',
                timeStamp: pkg.timeStamp,
                nonceStr : pkg.nonceStr,
                package  : pkg.package,
                signType : pkg.signType,
                paySign  : pkg.paySign,
            })

            // 微信支付失败
            if (!wxpay_res.ok) {
                $utils.hideLoading()
                in_payment.value = false
                closeOrder(options.apiType, res.data.OrderID)
                return
            }
        }

        // 查询订单
        const query_res = await queryOrder<T>(options.apiType, res.data.OrderID)

        // 同步会员数据
        await mbStore.syncMember()

        $utils.hideLoading()
        in_payment.value = false

        return query_res
    }

    // 停止付款
    function stopPayment() {
        stop_payment.value = true
    }

    return {
        in_payment,
        startPayment,
        stopPayment,
    }
}

// 创建订单
async function createOrder<T extends ApiType>(apiType: T, payType: PayType, params: ApiParmas<T>) {
    return await apiMap[apiType].create({
        ...params,
        PayType: payType,
        AppType: 'wxapp',
        AppID  : app_config.extid,
    } as any, { showError: false })
}

// 关闭订单
async function closeOrder(apiType: ApiType, OrderID: string) {
    return await apiMap[apiType].close({ OrderID }, { showError: false })
}

// 查询订单
async function queryOrder<T extends ApiType>(apiType: ApiType, OrderID: string): Promise<ApiRes<T>> {
    return await apiMap[apiType].query({ OrderID }, { showError: false }) as any
}

