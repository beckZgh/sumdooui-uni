
export default {
    // -------------------------------------------------------------
    // 页面标题
    pages: {
        mb: {
            home                   : '首页',
            // user                   : '个人中心',
            orders                 : '我的订单',
            register               : '会员注册',
            login                  : '会员登录',
            logout                 : '退出登录',
            deposit                : '在线充值',
            qrcode                 : '付款码',
            shop                   : '卡券商城',
            shop_detail            : '活动详情',
            license                : '条款协议',
            coupon                 : '我的礼券',
            coupon_detail          : '礼券详情',
            branch                 : '适用门店',
            branch_choose_takeout  : '选择外送门店',
            branch_choose_takeoutex: '选择自取门店',
            bills                  : '消费记录',
            address                : '地址管理',
            address_choose_takeout : '选择配送地址',
            address_add            : '新建地址',
            address_edit           : '编辑地址',
            edit                   : '个人资料',
            reset                  : '重置密码',
            language               : '切换语言',
            setting                : '设置',
        },
        mn: {
            people : '用餐人数',
            menu   : '在线点餐',
            menuset: '套餐详情',
            search : '商品搜索',
            payment: '订单确认',
            remark : '订单备注',
            order  : '订单详情',
        },
        wxpay: '订单支付',
    },

    // -------------------------------------------------------------
    // 全局共用
    g: {
        currency_symbol: '¥',
        currency_unit  : '元',

        // 营业状态
        business_status: {
            takeout_closed            : '外卖已停止接单',
            takeout_stopped_business  : '外卖模式已停止接单',
            // -------------------------------
            takeoutex_closed          : '自提已停止接单',
            takeoutex_stopped_business: '自提模式已停止接单',
            // -------------------------------
            business_hours_are        : '营业时间为: ',
            branch_stopped_business   : '门店已停止接单',
            branch_over_business_time : '门店已打烊，营业时间为: ',
        },

        // 价格
        member_price    : "会员价",
        member_reduction: "会员立减",
        balance         : '余额',
        to_ogin         : '去登录',
        not_login_tips  : '您还没有登录呢！',
        max_optional    : '最多可选',

        // 商品
        dish: {
            exclusive         : '招牌',
            new               : '新品',
            not_for_sale      : '非可售',
            time              : '时间',
            sold_out          : '已售罄',
            up                : '起',
            // -------------------------------------------
            // qty_left_msg: '剩余 { qty } { unit }',
            qty_left_msg_left : '剩余',
            qty_left_msg_right: '',
            // -------------------------------------------
        },

        // 商品状态
        dish_status: {
            not_in_sale_time      : '非可售,时间',
            sold_out              : '已售罄',
            insufficient_inventory: '库存,不足',
        },

        // 商品选规格
        dish_sku: {
            spec           : '规格',
            single_option  : '仅单选',
            multiple_option: '可多选',
            selected_spec  : '已选规格',
            total          : '总计',
            optional       : '任选',
        },

        // 商品库存校验
        dish_qty_validate: {
            // -----------------------------------------------
            // input_min: '商品数量不能少于{ qty }份',
            input_min_left  : '商品数量不能少于',
            input_min_right : '份',
            // -----------------------------------------------
            // plus_over: '“{ name }”商品仅剩余{ qty }份',
            plus_over_middle: '商品仅剩余',
            plus_over_right : '份',
            // -----------------------------------------------
            // plus_max : '“{ name }”商品每单限购{ qty }份',
            plus_max_middle : '商品每单限购',
            plus_max_right  : '份',
            // -----------------------------------------------
            // plus_min : '“{ name }”商品{ qty }份起购',
            plus_min_left   : '商品',
            plus_min_right  : '份起购',
            // -----------------------------------------------
        },

        // 套餐
        menuset: {
            choose_spec_button_text: '选规格',
            join_btn               : '加入我的套餐',
            choose                 : '请选择',
            fixed_set_menu         : '固定套餐',
            select_mode            : {
                all         : '默认全选',
                optional    : '任选',
                max_optional: '最多可选',
                not_empty   : '不可为空',
            },
            not_for_sale      : '非可售',
            sold_out          : '已售罄',
            need_to_select    : '需要选择',
            valid_no_items_msg: '您还未添加任何商品呢!',
            qty_left_msg_left : '剩余',
            qty_left_msg_right: '',
            footer            : {
                set_menu_price: '套餐价格',
                confirm       : '已选好',
            },
        },

        // 支付类型
        pay_type: {
            mb  : "会员支付",
            wx  : "微信支付",
            ali : "支付宝支付",
            bank: "银行卡支付",
            cash: "餐后付款",
            none: "无需付款",
        },

        // 自提时间超时提示
        collect_time_timeout: '自提时间已超时，请重新选择',

        // 支付失败相关提示
        pay_tip: {
            pay_fail            : "支付失败",
            empty_order         : "订单不能为空",
            no_select_pay       : "请选择支付方式",
            confirm_msg         : "当前会员卡余额不足",
            confirm_title       : "温馨提示",
            cancel_button_text  : "我知道了",
            confirm_button_text : "前去充值",
            cash_pay_confirm_msg: "是否使用餐后付款",
            mbpay_confirm_msg   : "是否使用会员支付",
        },

        // 订单校验
        orders_validate: {
            empty                            : '订单不能为空',
            // -----------------------------------------------------------------
            // insufficient_starting_price: '还差 { price }{ price_unit }可配送',
            insufficient_starting_price_left : '还差',
            insufficient_starting_price_right: '可配送',
            // -----------------------------------------------------------------
        },

        // 购物车缓存数据状态
        orders_cache_status: {
            alert_title             : '以下商品已下架',
            alert_content           : '部分商品数据发生变化，请检查购物车',
            alert_cancel_button_text: '请检查购物车',
        },
    },
    // 可共用
    comm: {
        order_item: {
            // 订单步骤状态
            steps: {
                submitted     : '提交',
                confirmed     : '确认',
                in_preparation: '备餐中',
                completed     : '完成',
            },
        },

        // 性别
        gender: {
            male   : '先生',
            female : '女士',
            unknown: '未知',
        },

        // 地址标签
        address_labels: {
            home   : '家',
            company: '公司',
            school : '学校',
        },
    },

    // -------------------------------------------------------------
    // store 共享数据
    store: {
        app: {
            onAppVersionUpdate: {
                confirm_content_text: '新版本已经准备好，是否重启应用？',
                confirm_tips_text   : '更新提示',
            },
        },
        branch: {
            applyEatin: {
                invalid_qrcode                  : '无效的二维码',
                branch_not_exist                : '门店不存在',
                over_distance_alert_content_text: '您距离当前门店过远，已超出',
            },
            applyTakeout: {
                not_address_alert_content_text: '请选择地址',
            },
            loadUserLocation: {
                auth_deny        : '获取当前位置失败，如需使用该功能；请授权获取当前位置',
                permission_denied: '获取当前位置失败, 请检查是否已开启定位；如需使用该功能需开启定位获取当前位置',
            },
        },
        mb: {
            card$: {
                member_name     : '尊敬的用户',
                member_type_name: '微信会员',
            },
        },
    },

    // -------------------------------------------------------------
    // utils/notification.ts
    alert: {
        tip                : '提示',
        confirm_text       : '确定',
        i_already_know_text: '我已知晓',
    },
    confirm: {
        tip                : '提示',
        confirm_text       : '确定',
        cancel_text        : '取消',
        i_already_know_text: '我已知晓',
    },
    prompt: {
        tip                : '提示',
        confirm_text       : '确定',
        cancel_text        : '@取消',
        i_already_know_text: '我已知晓',
        placeholder_text   : '请输入',
    },
    loading: {
        title: '加载中',
    },

    // utils/scope-api/index
    scope_api: {
        openAuthSetting: {
            title       : '提示',
            content     : '如需正常使用小程序功能，请点击授权',
            cancel_text : '我再想想',
            confirm_text: '前往授权',
        },
    },
    // ------------------------------------------------------------------
}
