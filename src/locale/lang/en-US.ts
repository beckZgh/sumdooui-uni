export default {
    // -------------------------------------------------------------
    // 页面标题
    pages: {
        mb: {
            home                   : 'Home',
            // user                   : 'User Center',
            orders                 : 'My Order',
            register               : 'Member Register',
            login                  : 'Member Login',
            logout                 : 'Lou Out',
            deposit                : 'Online Recharge',
            qrcode                 : 'Payment code',
            shop                   : 'Points Mall',
            shop_detail            : 'Activity Details',
            license                : 'Membership Terms',
            coupon                 : 'My Coupons',
            coupon_detail          : 'Coupon Details',
            branch                 : 'Avaliable Stores',
            branch_choose_takeout  : 'Select Delivery Store',
            branch_choose_takeoutex: 'Select Collect Store',
            bills                  : 'Records Of Consumption',
            address                : 'Address Management',
            address_choose_takeout : 'Select delivery address',
            address_add            : 'New Address',
            address_edit           : 'Edit Address',
            edit                   : 'Personal Data',
            reset                  : 'Reset Password',
            language               : 'Switch Language',
            setting                : 'Setting',
        },
        mn: {
            people : 'Choose People',
            menu   : 'Online Order',
            menuset: 'Set Meal Details',
            search : 'Goods Search',
            payment: 'Order Confirm',
            remark : 'Order Remark',
            order  : 'Order Detail',
        },
        wxpay: 'Order payment',
    },

    // -------------------------------------------------------------
    // 全局共用
    g: {
        currency_symbol: '¥',
        currency_unit  : '元',

        // 营业状态
        business_status: {
            takeout_closed            : 'Takeout, Closed',
            takeout_stopped_business  : 'Closed, no more oder for delivery',
            // -------------------------------
            takeoutex_closed          : 'Collect, Closed',
            takeoutex_stopped_business: 'Closed, no more oder for collect',
            // -------------------------------
            business_hours_are        : 'Business hours are: ',
            branch_stopped_business   : 'The store is closed',
            branch_over_business_time : 'The store is closed, Business hours are: ',
        },

        // 价格
        member_price    : "Member Price",
        member_reduction: "Membership Reduction",
        balance         : 'Balance',
        to_ogin         : 'Go to login',
        not_login_tips  : 'You are not logged in yet !',
        max_optional    : 'Up to optional',

        // 商品
        dish: {
            exclusive         : 'Exclusive',
            new               : 'New',
            not_for_sale      : 'Not for sale',
            time              : 'Time',
            sold_out          : 'Sold out',
            up                : '',
            // -------------------------------------------
            // qty_left_msg      : '{ qty } copies left',
            qty_left_msg_left : '',
            qty_left_msg_right: 'copies left',
            // -------------------------------------------
        },

        // 商品状态
        dish_status: {
            not_in_sale_time      : 'Not available for sale',
            sold_out              : 'Sold Out',
            insufficient_inventory: 'Inventory Shortage',
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
            //  input_min: 'The number of items cannot be less than { qty }',
            input_min_left  : 'The number of items cannot be less than ',
            input_min_right : '',
            // -----------------------------------------------
            // plus_over: '“{ name }”Min order quantity is { qty } units',
            plus_over_middle: '”Min order quantity is ',
            plus_over_right : ' units',
            // -----------------------------------------------
            // plus_max: '“{ name }”Items are limited to { qty } per order',
            plus_max_middle : 'Items are limited to ',
            plus_max_right  : ' per order',
            // -----------------------------------------------
            // plus_min: '“{ name }”Only { qty } of item left',
            plus_min_left   : '”Only ',
            plus_min_right  : ' of item left',
            // -----------------------------------------------
        },

        // 套餐
        menuset: {
            choose_spec_button_text: 'Multi Spec',
            join_btn               : 'Add',
            choose                 : 'Please choose',
            fixed_set_menu         : 'Fixed set menu',
            select_mode            : {
                all         : 'Select all by default',
                optional    : 'Optional',
                max_optional: 'Up to optional',
                not_empty   : 'Cannot be empty',
            },
            not_for_sale      : 'Not for sale',
            sold_out          : 'Sold out',
            need_to_select    : 'Need to select',
            valid_no_items_msg: 'No item added',
            qty_left_msg_left : '',
            qty_left_msg_right: ' copies left',
            footer            : {
                set_menu_price: 'Set Menu Price',
                confirm       : 'Confirm',
            },
        },

        // 支付类型
        pay_type: {
            mb  : "Member Pay",
            wx  : "WeChat Pay",
            ali : "Alipay",
            bank: "Card Pay",
            cash: "Counter Pay",
            none: "No payment required",
        },

        // 自提时间超时提示
        collect_time_timeout: 'Self lifting time has expired, please select again',

        // 支付失败相关提示
        pay_tip: {
            pay_fail            : "Payment failure",
            empty_order         : "Order cannot be empty",
            no_select_pay       : "Please select the payment method",
            confirm_msg         : "Insufficient Credit",
            confirm_title       : "Tips",
            cancel_button_text  : "I know",
            confirm_button_text : "Go to recharge",
            cash_pay_confirm_msg: "Are you sure pay in cash at the counter?",
            mbpay_confirm_msg   : "Whether to use member payment",
        },

        // 订单进度
        order_process: {
            submit  : "Submit",
            confirm : "Confirm",
            finished: "Finished",
        },

        // 订单校验
        orders_validate: {
            empty                            : 'Order cannot be empty',
            // -----------------------------------------------------------------
            // insufficient_starting_price: '{ price }{ price_unit } more for delivery',
            insufficient_starting_price_left : '',
            insufficient_starting_price_right: ' more for delivery',
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
                submitted     : 'Submit',
                confirmed     : 'Confirm',
                in_preparation: 'Preparing',
                completed     : 'Complete',
            },
        },

        // 性别
        gender: {
            male   : 'Male',
            female : 'Female',
            unknown: 'Unknown',
        },

        // 地址标签
        address_labels: {
            home   : 'Home',
            company: 'Company',
            school : 'School',
        },
    },

    // -------------------------------------------------------------
    // store 共享数据
    store: {
        app: {
            onAppVersionUpdate: {
                confirm_content_text: 'The new version is ready. Do you want to restart the application?',
                confirm_tips_text   : 'Update Tips',
            },
        },
        branch: {
            applyEatin: {
                invalid_qrcode                  : 'Invalid QR code',
                branch_not_exist                : 'Store does not exist',
                over_distance_alert_content_text: 'You are too far from the current store, more than 500 meters.',
            },
            applyTakeout: {
                not_address_alert_content_text: 'Please select an address',
            },
            loadUserLocation: {
                get_location_err_text: 'Failed to obtain the current location. If you need to use this function, please authorize to obtain the current location first',
            },
        },
        mb: {
            card$: {
                member_name     : 'Dear user',
                member_type_name: 'WeChat member',
            },
        },
    },


    // -------------------------------------------------------------
    // utils/notification.ts
    alert: {
        tip                : 'Tips',
        confirm_text       : 'Confirm',
        i_already_know_text: 'I got it',
    },
    confirm: {
        tip                : 'Tips',
        confirm_text       : 'Confirm',
        cancel_text        : 'Cancel',
        i_already_know_text: 'I got it',
    },
    prompt: {
        tip                : 'Tips',
        confirm_text       : 'Confirm',
        cancel_text        : 'Cancel',
        i_already_know_text: 'I got it',
        placeholder_text   : 'Please enter',
    },
    loading: {
        title: 'Loading',
    },

    // utils/scope-api/index
    scope_api: {
        openAuthSetting: {
            title       : 'Tips',
            content     : 'To use the applet function normally, click Authorize',
            cancel_text : `Later`,
            confirm_text: 'To Auth',
        },
    },
    // -------------------------------------------------------------
}
