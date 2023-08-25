
declare namespace $api {


    /** 返回类型 */
    type Response <T> = Promise <{
        /** 调用成功     */ ok          : boolean ;
        /** 错误信息     */ err         : string  ;
        /** 返回数据     */ data        : T       ;
        /** 服务器日期   */ server_date : string  ;
        /** 服务器时间戳 */ server_time : number  ;
    }>

    /** 请求设置 */
    interface Option {
        /** 显示加载中   */ showLoading? : boolean ;
        /** 显示错误信息 */ showError?   : boolean ; // 出错时显示错误信息，不返回结果
        /** 延时加载中   */ delay?       : boolean | number;
        /** 其它设置     */ [key: string]: any  ;
    }

    
    /** 电子券表 */
    interface $cp_bi_coupon {
        /** 商户编码     */ CompanyID        : string ;
        /** 用券条码     */ CouponCode       : string ;
        /** 会员卡号     */ MemberCardID     : string ;
        /** 参加活动的ID */ OrderID          : string ;
        /** 活动编码     */ MarketID         : string ;
        /** 券编码       */ CouponID         : string ;
        /** 券起始日期   */ BeginDate        : string ;
        /** 券结束日期   */ EndDate          : string ;
        /** 券状态       */ CouponStatus     : number ;
        /** 发行门店编码 */ CreateBranchID   : string ;
        /** 发行门店名称 */ CreateBranchName : string ;
        /** 使用门店编码 */ BranchID         : string ;
        /** 使用门店名称 */ BranchName       : string ;
        /** 使用日期     */ BillDate         : string ;
        /** 使用时间     */ BillTime         : string ;
        /** 账单编码     */ BillID           : string ;
        /** 明细编码     */ BillItemID       : string ;
        /** 发行日期     */ CreateDate       : string ;
        /** 发行时间     */ CreateTime       : string ;
        /** 撤销时间     */ CancelTime       : string ;
        /** 更新时间     */ UpdateTime       : string ;
    }
    
    /** 营销活动表 */
    interface $cp_dd_market {
        /** 商户编码      */ CompanyID      : string ;
        /** 活动编码      */ MarketID       : string ;
        /** 活动名称      */ MarketName     : string ;
        /** 活动主标题    */ MarketName1    : string ;
        /** 活动副标题    */ MarketName2    : string ;
        /** 活动备注说明  */ MarketName3    : string ;
        /** 活动详情      */ MarketInfo     : string ;
        /** 活动图片链接  */ PicImg         : string ;
        /** 活动类型编码  */ MarketTypeID   : number ;
        /** 活动类型名称  */ MarketTypeName : string ;
        /** 购券金额      */ SumForCash     : number ;
        /** 抵扣积分      */ SumForPoint    : number ;
        /** 最小金额类型  */ MinFlag        : number ;
        /** 最小金额      */ MinAmt         : number ;
        /** 最大金额类型  */ MaxFlag        : number ;
        /** 最大金额      */ MaxAmt         : number ;
        /** 开始日期      */ BeginDate      : string ;
        /** 结束日期      */ EndDate        : string ;
        /** 每人限量0不限 */ LimitQty       : number ;
        /** 总发行量0不限 */ PublishQty     : number ;
        /** 是否停用      */ IsStopFlag     : number ;
        /** 是否上架      */ IsShopFlag     : number ;
        /** 排序          */ ListIndex      : number ;
        /** 创建时间      */ CreateTime     : string ;
        /** 更新时间      */ UpdateTime     : string ;
    }
    
    /** 账单表 */
    interface $mb_bi_bill {
        /** 账单号         */ BillID          : string ;
        /** 订单号         */ OrderID         : string ;
        /** 交易单号       */ TradeID         : string ;
        /** 门店营业日期   */ BillDate        : string ;
        /** 商户编码       */ CompanyID       : string ;
        /** 商户名称       */ CompanyName     : string ;
        /** 交易门店编码   */ BranchID        : string ;
        /** 交易门店名称   */ BranchName      : string ;
        /** 发卡门店编码   */ BranchIDX       : string ;
        /** 发卡门店名称   */ BranchNameX     : string ;
        /** 站点编码       */ WorkStationID   : string ;
        /** 站点名称       */ WorkStationName : string ;
        /** 员工编码       */ UserID          : string ;
        /** 员工名称       */ UserName        : string ;
        /** 会员类型编码   */ MemberTypeID    : string ;
        /** 会员类型名称   */ MemberTypeName  : string ;
        /** 会员编码       */ MemberID        : string ;
        /** 会员卡号       */ MemberCardID    : string ;
        /** 会员姓名       */ MemberName      : string ;
        /** 会员版本       */ MemberVer       : number ;
        /** 会员级别       */ MemberLevel     : number ;
        /** 手机号码       */ MobileNumber    : string ;
        /** 有效期         */ LimitTime       : string ;
        /** 业务类型编码   */ BillTypeID      : number ;
        /** 业务类型名称   */ BillTypeName    : string ;
        /** 交易状态       */ BillState       : number ;
        /** 消费总额       */ SumTotal        : number ;
        /** 支付金额       */ SumPaid         : number ;
        /** 交易前余额     */ CashBegin       : number ;
        /** 交易前基本账户 */ Cash1Begin      : number ;
        /** 交易前赠送账户 */ Cash2Begin      : number ;
        /** 交易前积分     */ PointBegin      : number ;
        /** 交易金额       */ CashChange      : number ;
        /** 交易基本账户   */ Cash1Change     : number ;
        /** 交易赠送账户   */ Cash2Change     : number ;
        /** 交易积分       */ PointChange     : number ;
        /** 交易后余额     */ CashEnd         : number ;
        /** 交易后基本账户 */ Cash1End        : number ;
        /** 交易后赠送账户 */ Cash2End        : number ;
        /** 交易后积分     */ PointEnd        : number ;
        /** 创建时间       */ CreateTime      : string ;
        /** 撤销时间       */ CancelTime      : string ;
        /** 备注信息       */ Remark          : string ;
    }
    
    /** 首页轮播图 */
    interface $mb_dd_banner {
        /** 商户编码 */ CompanyID  : string ;
        /** 图片编码 */ BannerID   : string ;
        /** 图片标题 */ BannerName : string ;
        /** 图片路径 */ BannerImg  : string ;
        /** 图片描述 */ BannerDesc : string ;
        /** 图片类型 */ BannerType : string ;
        /** 页面类型 */ PageType   : string ;
        /** 页面标题 */ PageTitle  : string ;
        /** 页面路径 */ PagePath   : string ;
        /** 排序     */ ListIndex  : number ;
        /** 是否停用 */ StopFlag   : number ;
        /** 创建时间 */ CreateTime : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 门店表 */
    interface $mb_dd_branch {
        /** 商户编码 */ CompanyID  : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 门店名称 */ BranchName : string ;
        /** 区域编码 */ AreaID     : string ;
        /** 门店属性 */ StoreType  : number ;
        /** 省份     */ Province   : string ;
        /** 城市     */ City       : string ;
        /** 店名     */ StoreName  : string ;
        /** 电话     */ Phone      : string ;
        /** 地址     */ Address    : string ;
        /** 是否停用 */ StopFlag   : number ;
        /** 到期日期 */ LimitDate  : string ;
        /** 纬度     */ Latitude   : string ;
        /** 经度     */ Longitude  : string ;
        /** 创建时间 */ CreateTime : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 充值项设置 */
    interface $mb_dd_deposit {
        /** 商户编码 */ CompanyID  : string ;
        /** 充值编码 */ DepositID  : string ;
        /** 充值账户 */ Cash1      : number ;
        /** 赠送账户 */ Cash2      : number ;
        /** 赠送说明 */ Info       : string ;
        /** 是否推荐 */ HotFlag    : number ;
        /** 是否停用 */ StopFlag   : number ;
        /** 排序     */ ListIndex  : number ;
        /** 创建时间 */ CreateTime : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 用户协议 */
    interface $mb_dd_license {
        /** 商户编码 */ CompanyID   : string ;
        /** 协议编码 */ LicenseID   : string ;
        /** 协议标题 */ LicenseName : string ;
        /** 协议描述 */ LicenseDesc : string ;
        /** 协议内容 */ LicenseText : string ;
        /** 协议类型 */ LicenseType : string ;
        /** 是否停用 */ StopFlag    : number ;
        /** 创建时间 */ CreateTime  : string ;
        /** 更新时间 */ UpdateTime  : string ;
    }
    
    /** 会员表 */
    interface $mb_dd_member {
        /** 商户编码     */ CompanyID      : string ;
        /** 商户名称     */ CompanyName    : string ;
        /** 分店编码     */ BranchID       : string ;
        /** 分店名称     */ BranchName     : string ;
        /** 会员类型编码 */ MemberTypeID   : string ;
        /** 会员类型名称 */ MemberTypeName : string ;
        /** 会员编码     */ MemberID       : string ;
        /** 会员卡号     */ MemberCardID   : string ;
        /** 会员姓名     */ MemberName     : string ;
        /** 会员版本     */ MemberVer      : number ;
        /** 会员级别     */ MemberLevel    : number ;
        /** 会员密码     */ Password       : string ;
        /** 会员性别     */ Sex            : string ;
        /** 身份证号码   */ IDCardNumber   : string ;
        /** 生日         */ BirthDate      : string ;
        /** 出生年       */ BirthYear      : number ;
        /** 出生月       */ BirthMonth     : number ;
        /** 出生日       */ BirthDay       : number ;
        /** 地址         */ Address        : string ;
        /** 邮编         */ PostalCode     : string ;
        /** 电话号码     */ PhoneNumber    : string ;
        /** 手机号码     */ MobileNumber   : string ;
        /** 电子邮箱     */ Email          : string ;
        /** 余额         */ Cash           : number ;
        /** 基本账户     */ Cash1          : number ;
        /** 赠送账户     */ Cash2          : number ;
        /** 积分         */ Point          : number ;
        /** 期初余额     */ CashBegin      : number ;
        /** 期初基本账户 */ Cash1Begin     : number ;
        /** 期初赠送账户 */ Cash2Begin     : number ;
        /** 期初积分     */ PointBegin     : number ;
        /** 充值账户     */ DepositSum1    : number ;
        /** 赠送账户     */ DepositSum2    : number ;
        /** 充值次数     */ DepositCount   : number ;
        /** 最后充值时间 */ DepositTime    : string ;
        /** 充值账户     */ PaymentSum1    : number ;
        /** 赠送账户     */ PaymentSum2    : number ;
        /** 充值次数     */ PaymentCount   : number ;
        /** 最后消费时间 */ PaymentTime    : string ;
        /** 发卡标识     */ PublishFlag    : number ;
        /** 发卡时间     */ PublishTime    : string ;
        /** 挂失标识     */ LockFlag       : number ;
        /** 挂失时间     */ LockTime       : string ;
        /** 解挂时间     */ UnLockTime     : string ;
        /** 停用标识     */ StopFlag       : number ;
        /** 停用时间     */ StopTime       : string ;
        /** 换卡到       */ TransferInto   : string ;
        /** 换卡自       */ TransferFrom   : string ;
        /** 换卡时间     */ TransferTime   : string ;
        /** 有效时间     */ LimitTime      : string ;
        /** 创建时间     */ CreateTime     : string ;
        /** 更新时间     */ UpdateTime     : string ;
    }
    
    /** 会员类型表 */
    interface $mb_dd_membertype {
        /** 商户编码         */ CompanyID      : string ;
        /** 会员类型编码     */ MemberTypeID   : string ;
        /** 会员类型名称     */ MemberTypeName : string ;
        /** 充值模式         */ DepositFlag    : number ;
        /** 积分模式         */ PointFlag      : number ;
        /** 积分比率         */ PointRate      : number ;
        /** 充值赠送积分比率 */ PointRate2     : number ;
        /** 微信点餐时折扣率 */ DiscountRate   : number ;
        /** 卡片图片路径     */ MemberTypeImg  : string ;
        /** 创建时间         */ CreateTime     : string ;
        /** 更新时间         */ UpdateTime     : string ;
    }
    
    /** 首页公告条 */
    interface $mb_dd_notice {
        /** 商户编码 */ CompanyID  : string ;
        /** 公告编码 */ NoticeID   : string ;
        /** 公告标题 */ NoticeName : string ;
        /** 公告内容 */ NoticeInfo : string ;
        /** 公告描述 */ NoticeDesc : string ;
        /** 公告类型 */ NoticeType : string ;
        /** 是否停用 */ StopFlag   : number ;
        /** 创建时间 */ CreateTime : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 支付模式配置表 */
    interface $mb_dd_paymode {
        /** 商户编码 */ CompanyID  : string ;
        /** 业务类型 */ BillType   : string ;
        /** 支付模式 */ PayModes   : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 首页弹窗广告 */
    interface $mb_dd_popup {
        /** 商户编码 */ CompanyID  : string ;
        /** 弹窗编码 */ PopupID    : string ;
        /** 弹窗标题 */ PopupName  : string ;
        /** 图片路径 */ PopupImg   : string ;
        /** 弹窗描述 */ PopupDesc  : string ;
        /** 弹窗类型 */ PopupType  : string ;
        /** 页面类型 */ PageType   : string ;
        /** 页面标题 */ PageTitle  : string ;
        /** 页面路径 */ PagePath   : string ;
        /** 是否停用 */ StopFlag   : number ;
        /** 创建时间 */ CreateTime : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 商户APP配置 */
    interface $mb_dd_setting_app {
        /** 商户编码 */ CompanyID : string ;
        /** 配置名称 */ KeyName   : string ;
        /** 配置内容 */ KeyValue  : string ;
    }
    
    /** 用户地址 */
    interface $mb_dd_user_address {
        /** 地址编码     */ AddressID  : string ;
        /** 商户编码     */ CompanyID  : string ;
        /** 用户编码     */ UserID     : string ;
        /** 收件人       */ UserName   : string ;
        /** 手机         */ Mobile     : string ;
        /** 邮编(英国)   */ PostCode   : string ;
        /** 详细地址     */ Address    : string ;
        /** 单元门牌信息 */ Detail     : string ;
        /** 标签         */ Label      : string ;
        /** 默认地址     */ IsDefault  : number ;
        /** 经度         */ Lng        : string ;
        /** 纬度         */ Lat        : string ;
        /** 创建时间     */ CreateTime : string ;
        /** 更新时间     */ UpdateTime : string ;
    }
    
    /** 账单表 */
    interface $pay_bi_bill {
        /** 商户编码 */ CompanyID      : string ;
        /** 商户名称 */ CompanyName    : string ;
        /** 门店编码 */ BranchID       : string ;
        /** 门店名称 */ BranchName     : string ;
        /** 账单编码 */ BillID         : string ;
        /** 桌台编码 */ TableID        : string ;
        /** 桌台名称 */ TableName      : string ;
        /** 消费金额 */ SumOfConsume   : number ;
        /** ＋服务费 */ SumOfService   : number ;
        /** —折扣额  */ SumForDiscount : number ;
        /** 应付金额 */ SumToPay       : number ;
        /** 营业日期 */ BillDate       : string ;
        /** 创建时间 */ CreateTime     : string ;
        /** 更新时间 */ UpdateTime     : string ;
        /** 更新标识 */ UpdateFlag     : string ;
    }
    
    /** 账单明细表 */
    interface $pay_bi_item {
        /** 账单编码 */ BillID     : string ;
        /** 明细编码 */ BillItemID : number ;
        /** 商户编码 */ CompanyID  : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
        /** 菜品编码 */ MenuID     : string ;
        /** 菜品名称 */ MenuName   : string ;
        /** 菜品单位 */ MenuUnit   : string ;
        /** 菜品数量 */ MenuQty    : number ;
        /** 菜品金额 */ MenuAmt    : number ;
    }
    
    /** 支付订单 */
    interface $pay_bi_order {
        /** 订单编码  */ OrderID      : string ;
        /** 交易编码  */ TradeID      : string ;
        /** 账单编码  */ BillID       : string ;
        /** 账单类型  */ BillType     : string ;
        /** 账单数据  */ BillJson     : string ;
        /** 账单描述  */ BillInfo     : string ;
        /** 会员卡号  */ MemberCardID : string ;
        /** 支付通道  */ PayChannel   : string ;
        /** 流水号    */ TraceNo      : string ;
        /** 付款码    */ BarCode      : string ;
        /** 商户编码  */ CompanyID    : string ;
        /** 商户名称  */ CompanyName  : string ;
        /** 门店编码  */ BranchID     : string ;
        /** 门店名称  */ BranchName   : string ;
        /** 桌台编码  */ TableID      : string ;
        /** 桌台名称  */ TableName    : string ;
        /** 应付金额  */ SumToPay     : number ;
        /** 支付金额  */ SumPaid      : number ;
        /** 退款次数  */ RefundCount  : number ;
        /** 退款金额  */ RefundAmt    : number ;
        /** 营业日期  */ BillDate     : string ;
        /** 创建时间  */ CreateTime   : string ;
        /** 更新时间  */ UpdateTime   : string ;
        /** 更新标识  */ UpdateFlag   : string ;
        /** 应用编码  */ AppID        : string ;
        /** 应用类型  */ AppType      : string ;
        /** 商户编码  */ MchID        : string ;
        /** 支付账号  */ PayUserID    : string ;
        /** 支付名称  */ PayUserName  : string ;
        /** 支付方式  */ PayType      : string ;
        /** 支付状态  */ PayState     : number ;
        /** 支付时间  */ PayTime      : string ;
        /** IP地址    */ IP           : string ;
        /** 国家      */ Country      : string ;
        /** 地区      */ Area         : string ;
        /** 省份      */ Region       : string ;
        /** 城市      */ City         : string ;
        /** ISP服务商 */ ISP          : string ;
    }
    
    /** 微信点餐订单 */
    interface $wx_bi_orderbill {
        /** 订单编码         */ OrderID        : string ;
        /** 订单流水号       */ OrderNO        : string ;
        /** POS单号          */ BillID         : string ;
        /** 商户编码         */ CompanyID      : string ;
        /** 商户名称         */ CompanyName    : string ;
        /** 门店编码         */ BranchID       : string ;
        /** 门店名称         */ BranchName     : string ;
        /** 桌台编码         */ TableID        : string ;
        /** 桌台名称         */ TableName      : string ;
        /** 提交日期         */ BillDate       : string ;
        /** 订单类型         */ BillType       : number ;
        /** 订单状态         */ BillStatus     : number ;
        /** 点餐人数         */ PeopleCount    : number ;
        /** 取餐码           */ TakeCode       : number ;
        /** 服务费率         */ ServiceRate    : number ;
        /** 服务费           */ SumOfService   : number ;
        /** 项目数           */ TotalCount     : number ;
        /** 数量合计         */ TotalQty       : number ;
        /** 订单总金额       */ TotalAmt       : number ;
        /** 积分兑换合计     */ TotalPoint     : number ;
        /** 是否涉及会员交易 */ MemberFlag     : number ;
        /** 是否涉及券交易   */ CouponFlag     : number ;
        /** 部分退款数量     */ RefundQty      : number ;
        /** 部分退款金额     */ RefundAmt      : number ;
        /** 部分退款积分     */ RefundPoint    : number ;
        /** 会员卡号         */ MemberCardID   : string ;
        /** 会员卡号         */ MemberID       : string ;
        /** 会员姓名         */ MemberName     : string ;
        /** 手机             */ Mobile         : string ;
        /** 大厦             */ Building       : string ;
        /** 地址             */ Address        : string ;
        /** 备注             */ Remark         : string ;
        /** 经度             */ Lng            : string ;
        /** 纬度             */ Lat            : string ;
        /** 预达小时         */ DeliveryHour   : number ;
        /** 预达分钟         */ DeliveryMinute : number ;
        /** 预达时间         */ DeliveryPeriod : string ;
        /** 支付通道         */ PayChannel     : string ;
        /** 支付方式         */ PayType        : string ;
        /** 支付账号         */ PayUserID      : string ;
        /** 付款时间         */ PaymentTime    : string ;
        /** 是否付款         */ PaymentFlag    : number ;
        /** 付款方式         */ PaymentType    : string ;
        /** 付款消息         */ PaymentInfo    : string ;
        /** 实收金额         */ SumPaid        : number ;
        /** 下载时间         */ DownloadTime   : string ;
        /** 是否下载         */ DownloadFlag   : number ;
        /** 确认时间         */ ConfirmTime    : string ;
        /** 确认消息         */ ConfirmInfo    : string ;
        /** 送达时间         */ DeliveryTime   : string ;
        /** 送达消息         */ DeliveryInfo   : string ;
        /** 送餐员           */ DeliveryMan    : string ;
        /** 送餐员手机       */ DeliveryMobile : string ;
        /** 结账时间         */ CheckOutTime   : string ;
        /** 是否结账         */ CheckOutFlag   : number ;
        /** 结账消息         */ CheckOutInfo   : string ;
        /** 撤销时间         */ CancelTime     : string ;
        /** 是否撤销         */ CancelFlag     : number ;
        /** 撤销原因         */ CancelInfo     : string ;
        /** 出品时间         */ FinishTime     : string ;
        /** 出品状态         */ FinishFlag     : number ;
        /** 出品消息         */ FinishInfo     : string ;
        /** 消费前余额       */ CashBegin      : number ;
        /** 消费前基本       */ Cash1Begin     : number ;
        /** 消费前赠送       */ Cash2Begin     : number ;
        /** 消费前积分       */ PointBegin     : number ;
        /** 余额变化         */ CashChange     : number ;
        /** 基本变化         */ Cash1Change    : number ;
        /** 赠送变化         */ Cash2Change    : number ;
        /** 积分变化         */ PointChange    : number ;
        /** 消费后余额       */ CashEnd        : number ;
        /** 消费后基本       */ Cash1End       : number ;
        /** 消费后赠送       */ Cash2End       : number ;
        /** 消费后积分       */ PointEnd       : number ;
        /** 创建时间         */ CreateTime     : string ;
        /** 更新时间         */ UpdateTime     : string ;
    }
    
    /** 微信点餐明细 */
    interface $wx_bi_orderitem {
        /** 商户编码     */ CompanyID    : string ;
        /** 订单编码     */ OrderID      : string ;
        /** 明细编码     */ ItemID       : string ;
        /** 明细状态     */ ItemStatus   : number ;
        /** 菜品编码     */ MenuID       : string ;
        /** 菜品名称     */ MenuName     : string ;
        /** 菜品名称英文 */ MenuNameEN   : string ;
        /** 单位         */ MenuUnit     : string ;
        /** 类编码       */ ParentID     : string ;
        /** 单位编码     */ UnitID       : string ;
        /** 图片链接     */ PicImg       : string ;
        /** 原价         */ MenuPriceOld : number ;
        /** 单价         */ MenuPrice    : number ;
        /** 数量         */ MenuQty      : number ;
        /** 金额         */ MenuAmt      : number ;
        /** 所需积分     */ MenuPoint    : number ;
        /** 套餐价格     */ PriceSets    : number ;
        /** 做法价格     */ PriceCook    : number ;
        /** 单品服务费   */ MenuService  : number ;
        /** 服务费       */ SumOfService : number ;
        /** 部分退款数量 */ RefundQty    : number ;
        /** 部分退款金额 */ RefundAmt    : number ;
        /** 部分退款积分 */ RefundPoint  : number ;
        /** 子菜列表     */ MenuList     : string ;
        /** 做法列表     */ CookList     : string ;
        /** 子菜明细     */ SubMenus     : string ;
        /** 做法明细     */ Cookways     : string ;
        /** 备注         */ Remark       : string ;
        /** 创建时间     */ CreateTime   : string ;
        /** 更新时间     */ UpdateTime   : string ;
    }
    
    /** 点餐控制 */
    interface $wx_mn_branchtime {
        /** 商户编码 */ CompanyID  : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 点餐类型 */ BillTypeID : number ;
        /** 接单状态 */ StopFlag   : number ;
        /** 开始时间 */ BeginHH    : number ;
        /** 开始时间 */ BeginMM    : number ;
        /** 结束时间 */ EndHH      : number ;
        /** 结束时间 */ EndMM      : number ;
        /** 创建时间 */ CreateTime : string ;
        /** 更新时间 */ UpdateTime : string ;
    }
    
    /** 微信点餐库存表 */
    interface $wx_mn_menuqty {
        /** 商户编码 */ CompanyID  : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 菜品编码 */ MenuID     : string ;
        /** 菜品库存 */ MenuQty    : number ;
        /** 创建时间 */ CreateTime : string ;
    }
    
    /** 微信点餐桌台表 */
    interface $wx_tb_table {
        /** 商户编码   */ CompanyID   : string ;
        /** 门店编码   */ BranchID    : string ;
        /** 桌台编码   */ TableID     : string ;
        /** 桌台名称   */ TableName   : string ;
        /** 价格类型   */ PriceType   : number ;
        /** 服务费率   */ ServiceRate : number ;
        /** 桌台二维码 */ QrCode      : string ;
        /** 创建时间   */ CreateTime  : string ;
    }

}

declare namespace $api.event {

    /** 生成通讯key */
    function gen_key (req?: object, opt?: Option): Response <string>;

    /** 拉取消息 */
    function pull (req : {
        /** 通讯密钥   */ key        : string ;
        /** 等待时间秒 */ wait_time? : number ;

    }, opt?: Option): Response <{
        /** 通讯密钥 */ key   : string ;
        /** 通讯内容 */ data? : string ;
    }>;

    /** 推送消息 */
    function push (req : {
        /** 通讯密钥   */ key       : string ;
        /** 通讯内容   */ data      : string ;
        /** 缓存时间秒 */ exp_time? : number ;
    }, opt?: Option): Response <boolean>;

}

declare namespace $api.mb {}

declare namespace $api.mb.address {

    /** 添加地址 */
    function add (req : {
        /** 商户编码     */ CompanyID? : string ;
        /** 用户编码     */ UserID?    : string ;
        /** 收件人       */ UserName   : string ;
        /** 手机         */ Mobile     : string ;
        /** 邮编(英国)   */ PostCode?  : string ;
        /** 详细地址     */ Address    : string ;
        /** 单元门牌信息 */ Detail     : string ;
        /** 标签         */ Label?     : string ;
        /** 默认地址     */ IsDefault? : number ;
        /** 经度         */ Lng        : number ;
        /** 纬度         */ Lat        : number ;
    }, opt?: Option): Response <$mb_dd_user_address>;

    /** 删除地址 */
    function del (req : {
        /** 地址编码 */ AddressID  : string ;
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <boolean>;

    /** 获取地址 */
    function get (req : {
        /** 地址编码 */ AddressID  : string ;
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <$mb_dd_user_address>;

    /** 获取地址列表 */
    function list (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <$mb_dd_user_address[]>;

    /** 修改地址 */
    function set (req : {
        /** 地址编码     */ AddressID  : string ;
        /** 商户编码     */ CompanyID? : string ;
        /** 用户编码     */ UserID?    : string ;
        /** 收件人       */ UserName?  : string ;
        /** 手机         */ Mobile?    : string ;
        /** 邮编(英国)   */ PostCode?  : string ;
        /** 详细地址     */ Address?   : string ;
        /** 单元门牌信息 */ Detail?    : string ;
        /** 标签         */ Label?     : string ;
        /** 默认地址     */ IsDefault? : number ;
        /** 经度         */ Lng?       : number ;
        /** 纬度         */ Lat?       : number ;
    }, opt?: Option): Response <$mb_dd_user_address>;

    /** 设置为默认地址 */
    function set_default (req : {
        /** 地址编码 */ AddressID  : string ;
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <$mb_dd_user_address[]>;

}

declare namespace $api.mb.data {
    
    /** CouponItem (自定义类型) */
    interface CouponItem extends $cp_bi_coupon {
        /** 券类型编码   */ CouponTypeID    : number ;
        /** 券类型名称   */ CouponTypeName  : string ;
        /** 券名称       */ CouponName      : string ;
        /** 券主标题     */ CouponName1     : string ;
        /** 券副标题     */ CouponName2     : string ;
        /** 券备注说明   */ CouponName3     : string ;
        /** 券详情       */ CouponInfo      : string ;
        /** 券图片链接   */ PicImg?         : string ;
        /** 券图片链接   */ CouponPicImg    : string ;
        /** 能否分享     */ ShareFlag       : number ;
        /** 可用时间     */ UseTime         : string ;
        /** 产品编码     */ ProductID       : string ;
        /** 折扣编码     */ DiscountID      : string ;
        /** 活动类型编码 */ MarketTypeID    : string ;
        /** 活动类型名称 */ MarketTypeName  : string ;
        /** 活动编码     */ MarketID        : string ;
        /** 活动名称     */ MarketName      : string ;
        /** 活动主标题   */ MarketName1     : string ;
        /** 活动副标题   */ MarketName2     : string ;
        /** 活动备注说明 */ MarketName3     : string ;
        /** 活动详情     */ MarketInfo      : string ;
        /** 活动图片链接 */ MarketPicImg    : string ;
        /** 是否允许使用 */ BranchAllowFlag : number ;
        /** 关联门店列表 */ Branches        : string ;
    }
    
    /** CouponList (自定义类型) */
    interface CouponList {
        /** 未使用券列表 */ CouponValid   : CouponItem[] ;
        /** 已过期券列表 */ CouponInvalid : CouponItem[] ;
        /** 已使用券列表 */ CouponUsed    : CouponItem[] ;
    }
    
    /** MemberDDInfo (自定义类型) */
    interface MemberDDInfo {
        /** 数据版本号         */ mb_dd_ver   : number               ;
        /** 充值项列表         */ deposit     : $mb_dd_deposit[]     ;
        /** 商城列表           */ market      : $cp_dd_market[]      ;
        /** 轮播图列表         */ banner      : $mb_dd_banner[]      ;
        /** 公告列表           */ notice      : $mb_dd_notice[]      ;
        /** 协议列表           */ license     : $mb_dd_license[]     ;
        /** 弹窗广告列表       */ popup       : $mb_dd_popup[]       ;
        /** 支付模式           */ paymode     : $mb_dd_paymode[]     ;
        /** App配置            */ setting     : $mb_dd_setting_app[] ;
        /** 小程序订阅消息列表 */ wx_msg_temp : WxMsgTemp[]          ;
        /** 会员卡类型         */ membertypes : $mb_dd_membertype[]  ;
    }
    
    /** MemberInfoWithVer (自定义类型) */
    interface MemberInfoWithVer extends $mb_dd_member {
        /** 会员版本 */ card_ver : number ;
    }
    
    /** WxMsgTemp (自定义类型) */
    interface WxMsgTemp {
        /** 模板编码 */ TemplateID : string ;
        /** 消息类型 */ MsgType    : string ;
    }
    
    /** BranchInfo (自定义类型) */
    interface BranchInfo extends $mb_dd_branch {
        /** 外卖桌台编码 */ TakeoutTableID   : string ;
        /** 自取桌台编码 */ TakeoutexTableID : string ;
    }

    /** 加载门店列表 */
    function loadBranches (req?: {
        /** 商户编码         */ CompanyID?   : string  ;
        /** 是否包含桌台编码 */ WithTableID? : boolean ;

    }, opt?: Option): Response <{
        /** 门店列表 */ list  : BranchInfo[]        ;
        /** 营业时间 */ times : $wx_mn_branchtime[] ;
    }>;

    /** 加载会员数据 */
    function load (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;

    }, opt?: Option): Response <{
        /** 会员数据   */ card         : $mb_dd_member      ;
        /** 用户电子券 */ coupon       : CouponList         ;
        /** 基础数据   */ mb_dd        : MemberDDInfo       ;
        /** 订单列表   */ mn_order     : $wx_bi_orderbill[] ;
        /** 订单版本号 */ mn_order_ver : number             ;
        /** 会员版本   */ card_ver     : number             ;
        /** 数据版本   */ mb_dd_ver    : number             ;
    }>;

    /** 同步会员数据 */
    function sync (req?: {
        /** 商户编码   */ CompanyID?    : string ;
        /** 用户编码   */ UserID?       : string ;
        /** 会员版本   */ card_ver?     : number ;
        /** 数据版本   */ mb_dd_ver?    : number ;
        /** 订单版本号 */ mn_order_ver? : number ;
        /** 等待时间   */ wait_time?    : number ;

    }, opt?: Option): Response <{
        /** 会员数据   */ card?        : $mb_dd_member      ;
        /** 用户电子券 */ coupon?      : CouponList         ;
        /** 基础数据   */ mb_dd?       : MemberDDInfo       ;
        /** 订单列表   */ mn_order?    : $wx_bi_orderbill[] ;
        /** 会员版本   */ card_ver     : number             ;
        /** 数据版本   */ mb_dd_ver    : number             ;
        /** 订单版本号 */ mn_order_ver : number             ;
    }>;

}

declare namespace $api.mb.deposit {  // v22.07.14
    
    /** OrderWithPkg (自定义类型) */
    interface OrderWithPkg extends $pay_bi_order {
        /** 微信支付数据包 */ pkg?     : WxPkg  ;
        /** 银行卡支付路径 */ pay_url? : string ;
    }
    
    /** WxPkg (自定义类型) */
    interface WxPkg {
        /** 应用ID       */ appId     : string ;
        /** 时间戳       */ timeStamp : string ;
        /** 时间戳(小写) */ timestamp : string ;
        /** 随机码       */ nonceStr  : string ;
        /** 数据包       */ package   : string ;
        /** 签名方式     */ signType  : string ;
        /** 签名         */ paySign   : string ;
    }

    /** 关闭订单 [user] */
    function close (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 创建订单 [user] */
    function create (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 应用编码 */ AppID      : string ;
        /** 应用类型 */ AppType    : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 支付类型 */ PayType    : string ;
        /** 充值编码 */ DepositID  : string ;
        /** 充值金额 */ Cash1      : number ;
        /** 赠送金额 */ Cash2      : number ;
    }, opt?: Option): Response <OrderWithPkg>;

    /** 查询订单 [user] */
    function query (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

}

declare namespace $api.mb.market {  // v22.12.26
    
    /** OrderWithPkg (自定义类型) */
    interface OrderWithPkg extends $pay_bi_order {
        /** 微信支付数据包 */ pkg?     : WxPkg  ;
        /** 银行卡支付路径 */ pay_url? : string ;
    }
    
    /** WxPkg (自定义类型) */
    interface WxPkg {
        /** 应用ID       */ appId     : string ;
        /** 时间戳       */ timeStamp : string ;
        /** 时间戳(小写) */ timestamp : string ;
        /** 随机码       */ nonceStr  : string ;
        /** 数据包       */ package   : string ;
        /** 签名方式     */ signType  : string ;
        /** 签名         */ paySign   : string ;
    }

    /** 关闭订单 [user] */
    function close (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 创建订单 [user] */
    function create (req : {
        /** 商户编码 */ CompanyID?   : string ;
        /** 应用编码 */ AppID        : string ;
        /** 应用类型 */ AppType      : string ;
        /** 用户编码 */ UserID?      : string ;
        /** 支付类型 */ PayType      : string ;
        /** 活动编码 */ MarketID     : string ;
        /** 购券金额 */ SumForCash?  : number ;
        /** 抵扣积分 */ SumForPoint? : number ;
    }, opt?: Option): Response <OrderWithPkg>;

    /** 加载活动详情 */
    function load (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 活动编码 */ MarketID   : string ;
        /** 用户编码 */ UserID?    : string ;

    }, opt?: Option): Response <{
        /** 活动详情       */ market    : $cp_dd_market ;
        /** 能否参与       */ check_ok  : boolean       ;
        /** 不能参与的原因 */ check_err : string        ;
    }>;

    /** 查询订单 [user] */
    function query (req : {
        /** 订单编码 */ OrderID : string ;

    }, opt?: Option): Response <{
        /** 订单详情 */ order : $pay_bi_order ;
        /** 领券数量 */ count : number        ;
    }>;

    /** 参加活动 */
    function receive (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 活动编码 */ MarketID   : string ;

    }, opt?: Option): Response <{
        /** 领券数量 */ count : number ;
    }>;

}

declare namespace $api.mb.member {

    /** 消费记录 */
    function getBills (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <$mb_bi_bill[]>;

    /** 获取当前用户绑定的会员卡 [local] */
    function getCard (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <$mb_dd_member>;

    /** 电子券列表 */
    function getCoupons (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;

    }, opt?: Option): Response <{
        /** 未使用券列表 */ CouponValid   : $cp_bi_coupon[] ;
        /** 已过期券列表 */ CouponInvalid : $cp_bi_coupon[] ;
        /** 已使用券列表 */ CouponUsed    : $cp_bi_coupon[] ;
    }>;

    /** 卡号密码登录 [user] */
    function loginByCard (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 应用编码 */ app_id     : string ;
        /** 应用类型 */ app_type   : string ;
        /** 卡号     */ card_id    : string ;
        /** 密码     */ password   : string ;
    }, opt?: Option): Response <$mb_dd_member>;

    /** 手机验证码登录 [user] */
    function loginByCode (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 应用编码 */ app_id     : string ;
        /** 应用类型 */ app_type   : string ;
        /** 手机号码 */ mobile     : string ;
        /** 验证码   */ code       : string ;
    }, opt?: Option): Response <$mb_dd_member>;

    /** 小程序一键登录 [user] */
    function loginByWxApp (req : {
        /** 商户编码       */ CompanyID? : string ;
        /** 用户编码       */ UserID?    : string ;
        /** 应用编码       */ app_id     : string ;
        /** 手机号获取凭证 */ code       : string ;
    }, opt?: Option): Response <$mb_dd_member>;

    /** 登录或注册会员卡(本地) [localhost] */
    function loginOrRegCard (req : {
        /** 商户编码 */ CompanyID?    : string ;
        /** 用户编码 */ UserID?       : string ;
        /** 应用编码 */ app_id        : string ;
        /** 应用类型 */ app_type      : string ;
        /** 手机号码 */ mobile        : string ;
        /** 生日     */ BirthDate?    : string ;
        /** 姓名     */ MemberName?   : string ;
        /** 性别     */ Sex?          : string ;
        /** 身份证   */ IDCardNumber? : string ;
        /** 地址     */ Address?      : string ;
        /** 电子邮箱 */ Email?        : string ;
    }, opt?: Option): Response <$mb_dd_member>;

    /** 生成二维码 [user] */
    function qrcode (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;

    }, opt?: Option): Response <{
        /** 二维码 */ qrcode : string ;
    }>;

    /** 注册 [user] */
    function reg (req : {
        /** 商户编码 */ CompanyID?    : string ;
        /** 用户编码 */ UserID?       : string ;
        /** 应用编码 */ app_id        : string ;
        /** 应用类型 */ app_type      : string ;
        /** 手机号码 */ mobile        : string ;
        /** 验证码   */ code          : string ;
        /** 生日     */ BirthDate?    : string ;
        /** 姓名     */ MemberName?   : string ;
        /** 性别     */ Sex?          : string ;
        /** 身份证   */ IDCardNumber? : string ;
        /** 地址     */ Address?      : string ;
        /** 电子邮箱 */ Email?        : string ;
    }, opt?: Option): Response <$mb_dd_member>;

    /** 修改密码 [user] */
    function resetPsw (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 手机号码 */ mobile     : string ;
        /** 验证码   */ code       : string ;
        /** 新密码   */ password   : string ;
    }, opt?: Option): Response <boolean>;

    /** 发送验证码 [user] */
    function sendCode (req : {
        /** 商户编码 */ CompanyID?  : string ;
        /** 用户编码 */ UserID?     : string ;
        /** 手机号码 */ mobile      : string ;
        /** 国家编码 */ NationCode? : string ;
    }, opt?: Option): Response <boolean>;

    /** 解除绑定 [user] */
    function unbind (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <boolean>;

    /** 修改资料 [user] */
    function update (req?: {
        /** 商户编码 */ CompanyID?    : string ;
        /** 用户编码 */ UserID?       : string ;
        /** 姓名     */ MemberName?   : string ;
        /** 身份证   */ IDCardNumber? : string ;
        /** 性别     */ Sex?          : string ;
        /** 地址     */ Address?      : string ;
        /** 电子邮箱 */ Email?        : string ;
        /** 生日     */ BirthDate?    : string ;
    }, opt?: Option): Response <$mb_dd_member>;

}

declare namespace $api.mn {}

declare namespace $api.mn.cart {
    
    /** OrderData (自定义类型) */
    interface OrderData {
        /** 订单数据 */ order     : OrderInfo   ;
        /** 商品明细 */ items     : OrderItem[] ;
        /** 订单版本 */ order_ver : number      ;
    }
    
    /** OrderInfo (自定义类型) */
    interface OrderInfo {
        /** 商户编码 */ CompanyID : string ;
        /** 门店编码 */ BranchID  : string ;
        /** 桌台编码 */ TableID   : string ;
    }
    
    /** OrderItem (自定义类型) */
    interface OrderItem {
        /** 菜品编码 */ id  : string ;
        /** 菜品数量 */ qty : number ;
    }

    /** 加菜 */
    function add (req : {
        /** 商户编码 */ CompanyID? : string    ;
        /** 门店编码 */ BranchID   : string    ;
        /** 桌台编码 */ TableID    : string    ;
        /** 点菜数据 */ item       : OrderItem ;
    }, opt?: Option): Response <OrderData>;

    /** 清空购物车 */
    function clear (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
    }, opt?: Option): Response <OrderData>;

    /** 加载订单 */
    function load (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
    }, opt?: Option): Response <OrderData>;

    /** 同步订单数据 */
    function sync (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
        /** 订单版本 */ order_ver? : number ;
    }, opt?: Option): Response <OrderData>;

}

declare namespace $api.mn.data {
    
    /** CouponItem (自定义类型) */
    interface CouponItem extends $cp_bi_coupon {
        /** 券类型编码   */ CouponTypeID    : number ;
        /** 券类型名称   */ CouponTypeName  : string ;
        /** 券名称       */ CouponName      : string ;
        /** 券主标题     */ CouponName1     : string ;
        /** 券副标题     */ CouponName2     : string ;
        /** 券备注说明   */ CouponName3     : string ;
        /** 券详情       */ CouponInfo      : string ;
        /** 券图片链接   */ PicImg?         : string ;
        /** 券图片链接   */ CouponPicImg    : string ;
        /** 能否分享     */ ShareFlag       : number ;
        /** 可用时间     */ UseTime         : string ;
        /** 产品编码     */ ProductID       : string ;
        /** 折扣编码     */ DiscountID      : string ;
        /** 活动类型编码 */ MarketTypeID    : string ;
        /** 活动类型名称 */ MarketTypeName  : string ;
        /** 活动编码     */ MarketID        : string ;
        /** 活动名称     */ MarketName      : string ;
        /** 活动主标题   */ MarketName1     : string ;
        /** 活动副标题   */ MarketName2     : string ;
        /** 活动备注说明 */ MarketName3     : string ;
        /** 活动详情     */ MarketInfo      : string ;
        /** 活动图片链接 */ MarketPicImg    : string ;
        /** 是否允许使用 */ BranchAllowFlag : number ;
        /** 关联门店列表 */ Branches        : string ;
    }
    
    /** CouponList (自定义类型) */
    interface CouponList {
        /** 未使用券列表 */ CouponValid   : CouponItem[] ;
        /** 已过期券列表 */ CouponInvalid : CouponItem[] ;
        /** 已使用券列表 */ CouponUsed    : CouponItem[] ;
    }
    
    /** MemberDDInfo (自定义类型) */
    interface MemberDDInfo {
        /** 数据版本号         */ mb_dd_ver   : number               ;
        /** 充值项列表         */ deposit     : $mb_dd_deposit[]     ;
        /** 商城列表           */ market      : $cp_dd_market[]      ;
        /** 轮播图列表         */ banner      : $mb_dd_banner[]      ;
        /** 公告列表           */ notice      : $mb_dd_notice[]      ;
        /** 协议列表           */ license     : $mb_dd_license[]     ;
        /** 弹窗广告列表       */ popup       : $mb_dd_popup[]       ;
        /** 支付模式           */ paymode     : $mb_dd_paymode[]     ;
        /** App配置            */ setting     : $mb_dd_setting_app[] ;
        /** 小程序订阅消息列表 */ wx_msg_temp : WxMsgTemp[]          ;
        /** 会员卡类型         */ membertypes : $mb_dd_membertype[]  ;
    }
    
    /** MemberInfoWithVer (自定义类型) */
    interface MemberInfoWithVer extends $mb_dd_member {
        /** 会员版本 */ card_ver : number ;
    }
    
    /** WxMsgTemp (自定义类型) */
    interface WxMsgTemp {
        /** 模板编码 */ TemplateID : string ;
        /** 消息类型 */ MsgType    : string ;
    }
    
    /** CookwayInfo (自定义类型) */
    interface CookwayInfo {
        /** 菜类编码   */ tid   : string  ;
        /** 做法编码   */ id    : string  ;
        /** 做法名称   */ name  : string  ;
        /** 做法附加价 */ price : number  ;
        /** 按数量计价 */ qty   : boolean ;
    }
    
    /** ExtrafeeInfo (自定义类型) */
    interface ExtrafeeInfo {
        /** 父类编码 */ pid?  : string ;
        /** 菜品编码 */ id    : string ;
        /** 菜品名称 */ name  : string ;
        /** 标准价格 */ price : number ;
    }
    
    /** MenuDDInfo (自定义类型) */
    interface MenuDDInfo {
        /** 菜类         */ types      : MenuTypeInfo[]      ;
        /** 菜品         */ menus      : MenuInfo[]          ;
        /** 单位         */ menuunits  : MenuUnitInfo[]      ;
        /** 套餐         */ menusets   : MenuSetInfo[]       ;
        /** 做法         */ cookways   : CookwayInfo[]       ;
        /** 要求         */ requests   : RequestInfo[]       ;
        /** 打折方式     */ disc       : any                 ;
        /** 最低配送金额 */ MinAmt?    : number              ;
        /** 额外费用     */ extrafee?  : ExtrafeeInfo        ;
        /** 门店营业设置 */ times?     : $wx_mn_branchtime[] ;
        /** 数据版本号   */ mn_dd_ver? : number              ;
    }
    
    /** MenuInfo (自定义类型) */
    interface MenuInfo {
        /** 父类编码     */ pid          : string  ;
        /** 菜类编码     */ tid          : string  ;
        /** 菜品编码     */ id           : string  ;
        /** 菜品名称     */ name         : string  ;
        /** 英文名称     */ name_en?     : string  ;
        /** 菜品描述     */ text?        : string  ;
        /** 可售时间     */ time?        : string  ;
        /** 菜品拼音     */ spell?       : string  ;
        /** 菜品条码     */ code?        : string  ;
        /** 单位名称     */ unit         : string  ;
        /** 标准价格     */ price        : number  ;
        /** 标准包房价   */ pricer       : number  ;
        /** 会员价       */ pricem       : number  ;
        /** 会员包房价   */ pricerm      : number  ;
        /** 菜品是否打折 */ isdisc       : number  ;
        /** 是否套餐     */ ismenuset    : boolean ;
        /** 是否收服务费 */ service_flag : boolean ;
        /** 图片链接     */ pic_img?     : string  ;
    }
    
    /** MenuQtyInfo (自定义类型) */
    interface MenuQtyInfo {
        /** 菜品库存 */ menuqty    : $wx_mn_menuqty[] ;
        /** 库存版本 */ mn_qty_ver : number           ;
    }
    
    /** MenuSetInfo (自定义类型) */
    interface MenuSetInfo {
        /** 菜品编码   */ pid       : string  ;
        /** 菜类编码   */ tid       : string  ;
        /** 菜品编码   */ id        : string  ;
        /** 菜品名称   */ name      : string  ;
        /** 英文名称   */ name_en?  : string  ;
        /** 菜品描述   */ text?     : string  ;
        /** 可售时间   */ time?     : string  ;
        /** 菜品拼音   */ spell?    : string  ;
        /** 菜品条码   */ code?     : string  ;
        /** 子菜单位   */ unit      : string  ;
        /** 子菜数量   */ qty       : number  ;
        /** 子菜附加价 */ price     : number  ;
        /** 是否沽清   */ isnull    : boolean ;
        /** 是否套餐   */ ismenuset : boolean ;
        /** 图片链接   */ pic_img?  : string  ;
    }
    
    /** MenuTypeInfo (自定义类型) */
    interface MenuTypeInfo {
        /** 父类编码 */ pid? : string ;
        /** 类别编码 */ id   : string ;
        /** 类别名称 */ name : string ;
    }
    
    /** MenuUnitInfo (自定义类型) */
    interface MenuUnitInfo {
        /** 菜品编码   */ pid     : string ;
        /** 单位编码   */ id      : string ;
        /** 单位名称   */ name    : string ;
        /** 标准价格   */ price   : number ;
        /** 标准包房价 */ pricer  : number ;
        /** 会员价     */ pricem  : number ;
        /** 会员包房价 */ pricerm : number ;
    }
    
    /** PosBillInfo (自定义类型) */
    interface PosBillInfo extends $pay_bi_bill {
        /** 账单明细 */ BillItems? : $pay_bi_item[] ;
    }
    
    /** RequestInfo (自定义类型) */
    interface RequestInfo {
        /** 要求类编码 */ tid  : string ;
        /** 要求编码   */ id   : string ;
        /** 要求名称   */ name : string ;
    }

    /** 加载门店菜品数据 */
    function load (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
        /** 用户编码 */ UserID?    : string ;

    }, opt?: Option): Response <{
        /** 会员数据     */ card               : $mb_dd_member ;
        /** 用户电子券   */ coupon             : CouponList    ;
        /** 商户基础数据 */ mb_dd              : MemberDDInfo  ;
        /** 门店基础数据 */ mn_dd              : MenuDDInfo    ;
        /** 库存数据     */ mn_qty             : MenuQtyInfo   ;
        /** 会员版本     */ card_ver           : number        ;
        /** 商户数据版本 */ mb_dd_ver          : number        ;
        /** 门店数据版本 */ mn_dd_ver          : number        ;
        /** 库存版本     */ mn_qty_ver         : number        ;
        /** 账单版本     */ pos_bill_ver       : number        ;
        /** 门店编码     */ branch_id          : string        ;
        /** 门店名称     */ branch_name        : string        ;
        /** 门店地址     */ branch_address     : string        ;
        /** 桌台编码     */ table_id           : string        ;
        /** 桌台名称     */ table_name         : string        ;
        /** 桌台类型     */ table_price_type   : number        ;
        /** 桌台服务费率 */ table_service_rate : number        ;
        /** 桌台类型     */ table_type         : string        ;
        /** 账单信息     */ pos_bill           : PosBillInfo   ;
    }>;

    /** 加载本地账单 */
    function load_pos_bill (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
    }, opt?: Option): Response <PosBillInfo>;

    /** 通过二维码识别桌台 */
    function load_table_by_qrcode (req : {
        /** 商户编码   */ CompanyID? : string ;
        /** 桌台二维码 */ QrCode     : string ;
    }, opt?: Option): Response <$wx_tb_table>;

    /** 同步门店菜品数据 */
    function sync (req : {
        /** 商户编码     */ CompanyID?    : string ;
        /** 门店编码     */ BranchID      : string ;
        /** 桌台编码     */ TableID?      : string ;
        /** 用户编码     */ UserID?       : string ;
        /** 会员版本     */ card_ver?     : number ;
        /** 商户数据版本 */ mb_dd_ver?    : number ;
        /** 门店数据版本 */ mn_dd_ver?    : number ;
        /** 库存版本     */ mn_qty_ver?   : number ;
        /** 账单版本     */ pos_bill_ver? : number ;
        /** 等待时间     */ wait_time?    : number ;

    }, opt?: Option): Response <{
        /** 会员数据     */ card?        : $mb_dd_member ;
        /** 用户电子券   */ coupon?      : CouponList    ;
        /** 商户基础数据 */ mb_dd?       : MemberDDInfo  ;
        /** 门店基础数据 */ mn_dd?       : MenuDDInfo    ;
        /** 库存数据     */ mn_qty?      : MenuQtyInfo   ;
        /** 账单信息     */ pos_bill?    : PosBillInfo   ;
        /** 会员版本     */ card_ver     : number        ;
        /** 商户数据版本 */ mb_dd_ver    : number        ;
        /** 门店数据版本 */ mn_dd_ver    : number        ;
        /** 库存版本     */ mn_qty_ver   : number        ;
        /** 账单版本     */ pos_bill_ver : number        ;
    }>;

}

declare namespace $api.mn.order {
    
    /** CookListInfo (自定义类型) */
    interface CookListInfo {
        /** 做法编码 */ id    : string ;
        /** 做法名称 */ name  : string ;
        /** 做法数量 */ qty   : number ;
        /** 做法价格 */ price : number ;
    }
    
    /** CouponItem (自定义类型) */
    interface CouponItem {
        /** 产品编码   */ ProductID    : string ;
        /** 券名称     */ CouponName   : string ;
        /** 金额       */ Price        : number ;
        /** 券编码     */ CouponCode   : string ;
        /** 券类型编码 */ CouponTypeID : number ;
        /** 明细编码   */ ItemID?      : string ;
    }
    
    /** MenuListInfo (自定义类型) */
    interface MenuListInfo {
        /** 子菜编码 */ id        : string         ;
        /** 子菜名称 */ name      : string         ;
        /** 子菜数量 */ qty       : number         ;
        /** 子菜单位 */ unit      : string         ;
        /** 子菜价格 */ price     : number         ;
        /** 做法列表 */ CookList? : CookListInfo[] ;
    }
    
    /** OrderItem (自定义类型) */
    interface OrderItem {
        /** 菜品编码     */ MenuID       : string         ;
        /** 菜品名称     */ MenuName     : string         ;
        /** 菜品名称英文 */ MenuNameEN?  : string         ;
        /** 单位         */ MenuUnit     : string         ;
        /** 类编码       */ ParentID     : string         ;
        /** 单位编码     */ UnitID?      : string         ;
        /** 图片链接     */ PicImg?      : string         ;
        /** 原价         */ MenuPriceOld : number         ;
        /** 单价         */ MenuPrice    : number         ;
        /** 数量         */ MenuQty      : number         ;
        /** 金额         */ MenuAmt      : number         ;
        /** 所需积分     */ MenuPoint?   : number         ;
        /** 单品服务费   */ MenuService  : number         ;
        /** 服务费       */ SumOfService : number         ;
        /** 子菜列表     */ MenuList?    : MenuListInfo[] ;
        /** 做法列表     */ CookList?    : CookListInfo[] ;
        /** 备注         */ Remark?      : string         ;
    }
    
    /** OrderWithPkg (自定义类型) */
    interface OrderWithPkg extends $pay_bi_order {
        /** 微信支付数据包 */ pkg?     : WxPkg  ;
        /** 银行卡支付路径 */ pay_url? : string ;
    }
    
    /** WxPkg (自定义类型) */
    interface WxPkg {
        /** 应用ID       */ appId     : string ;
        /** 时间戳       */ timeStamp : string ;
        /** 时间戳(小写) */ timestamp : string ;
        /** 随机码       */ nonceStr  : string ;
        /** 数据包       */ package   : string ;
        /** 签名方式     */ signType  : string ;
        /** 签名         */ paySign   : string ;
    }

    /** 关闭订单 [user] */
    function close (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 创建订单 */
    function create (req : {
        /** 商户编码     */ CompanyID?      : string       ;
        /** 门店编码     */ BranchID        : string       ;
        /** 桌台编码     */ TableID         : string       ;
        /** 桌台编码     */ TableName       : string       ;
        /** 用户编码     */ UserID?         : string       ;
        /** 应用编码     */ AppID           : string       ;
        /** 应用类型     */ AppType         : string       ;
        /** 支付类型     */ PayType         : string       ;
        /** 订单类型     */ BillType        : number       ;
        /** 用餐人数     */ PeopleCount?    : number       ;
        /** 服务费率     */ ServiceRate     : number       ;
        /** 服务费       */ SumOfService    : number       ;
        /** 订单总金额   */ TotalAmt        : number       ;
        /** 积分兑换合计 */ TotalPoint      : number       ;
        /** 会员卡号     */ MemberCardID?   : string       ;
        /** 姓名         */ MemberName?     : string       ;
        /** 手机         */ Mobile?         : string       ;
        /** 大厦         */ Building?       : string       ;
        /** 地址         */ Address?        : string       ;
        /** 备注         */ Remark?         : string       ;
        /** 经度         */ Lng?            : number       ;
        /** 纬度         */ Lat?            : number       ;
        /** 预达小时     */ DeliveryHour?   : number       ;
        /** 预达分钟     */ DeliveryMinute? : number       ;
        /** 订单明细     */ Items           : OrderItem[]  ;
        /** 用券列表     */ Coupons?        : CouponItem[] ;
    }, opt?: Option): Response <OrderWithPkg>;

    /** 订单详情 */
    function get (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 订单编码 */ OrderID    : string ;

    }, opt?: Option): Response <{
        /** 订单数据 */ Order : $wx_bi_orderbill   ;
        /** 订单明细 */ Items : $wx_bi_orderitem[] ;
    }>;

    /** 最近20张订单列表 */
    function list (req?: {
        /** 商户编码 */ CompanyID? : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 门店编码 */ BranchID?  : string ;

    }, opt?: Option): Response <{
        /** 订单列表 */ Orders : $wx_bi_orderbill[] ;
        /** 明细列表 */ Items  : $wx_bi_orderitem[] ;
    }>;

    /** 订单会员或现金支付 */
    function pay (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 查询订单 [user] */
    function query (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 同步订单 [user] */
    function sync (req : {
        /** 订单编码 */ OrderID    : string ;
        /** 等待秒数 */ wait_time? : number ;
    }, opt?: Option): Response <$pay_bi_order>;

}

declare namespace $api.mn.order_ws {

    /** 加菜 */
    function add_menu (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
        /** 用户编码 */ UserID?    : string ;
        /** 用户顺序 */ UserIndex  : number ;
        /** 菜品编码 */ MenuID     : string ;
        /** 用户编码 */ MenuName   : string ;
        /** 用户编码 */ MenuUnit   : string ;
        /** 用户编码 */ MenuPrice  : number ;
        /** 菜品数量 */ MenuQty    : number ;
    }, opt?: Option): Response <any>;

    /** 进入菜单 */
    function join_user (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
        /** 用户编码 */ UserID?    : string ;
    }, opt?: Option): Response <any>;

    /** 加载订单 */
    function load_order (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
    }, opt?: Option): Response <any>;

    /** 监听订单 [local] */
    function watch_order (req : {
        /** 商户编码 */ CompanyID?  : string ;
        /** 门店编码 */ BranchID    : string ;
        /** 桌台编码 */ TableID     : string ;
        /** 订单版本 */ OrderIndex? : number ;
    }, opt?: Option): Response <any>;

}

declare namespace $api.pay {}

declare namespace $api.pay.order {
    
    /** OrderWithPkg (自定义类型) */
    interface OrderWithPkg extends $pay_bi_order {
        /** 微信支付数据包 */ pkg?     : WxPkg  ;
        /** 银行卡支付路径 */ pay_url? : string ;
    }
    
    /** WxPkg (自定义类型) */
    interface WxPkg {
        /** 应用ID       */ appId     : string ;
        /** 时间戳       */ timeStamp : string ;
        /** 时间戳(小写) */ timestamp : string ;
        /** 随机码       */ nonceStr  : string ;
        /** 数据包       */ package   : string ;
        /** 签名方式     */ signType  : string ;
        /** 签名         */ paySign   : string ;
    }

    /** 关闭订单 [user] */
    function close (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 创建订单 [user] */
    function create (req : {
        /** 商户编码 */ CompanyID?    : string ;
        /** 门店编码 */ BranchID      : string ;
        /** 桌台编码 */ TableID       : string ;
        /** 桌台编码 */ TableName     : string ;
        /** 用户编码 */ UserID?       : string ;
        /** 会员卡号 */ MemberCardID? : string ;
        /** 应用编码 */ AppID         : string ;
        /** 应用类型 */ AppType       : string ;
        /** 支付类型 */ PayType       : string ;
        /** 账单金额 */ SumToPay      : number ;
        /** 账单编码 */ BillID?       : string ;
    }, opt?: Option): Response <OrderWithPkg>;

    /** 获取订单 */
    function get_bill (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 门店编码 */ BranchID   : string ;
        /** 桌台编码 */ TableID    : string ;
        /** 订单编码 */ BillID?    : string ;

    }, opt?: Option): Response <{
        /** 账单数据 */ bill  : $pay_bi_bill   ;
        /** 账单明细 */ items : $pay_bi_item[] ;
    }>;

    /** 会员支付 */
    function pay (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 查询订单 [user] */
    function query (req : {
        /** 订单编码 */ OrderID : string ;
    }, opt?: Option): Response <$pay_bi_order>;

    /** 同步订单 [user] */
    function sync (req : {
        /** 订单编码 */ OrderID    : string ;
        /** 等待秒数 */ wait_time? : number ;
    }, opt?: Option): Response <$pay_bi_order>;

}

declare namespace $api.wxa {

    /** 微信小程序登录 */
    function code2session (req : {
        /** 商户编码 */ CompanyID? : string ;
        /** 应用ID   */ app_id?    : string ;
        /** 微信code */ code       : string ;

    }, opt?: Option): Response <{
        /** openid  */ openid  : string ;
        /** unionid */ unionid : string ;
    }>;

    /** 微信小程序获取手机号 */
    function get_phone_number (req : {
        /** 商户编码       */ CompanyID? : string ;
        /** 应用ID         */ app_id?    : string ;
        /** 手机号获取凭证 */ code       : string ;

    }, opt?: Option): Response <{
        /** 用户绑定的手机号 */ phoneNumber     : string ;
        /** 没有区号的手机号 */ purePhoneNumber : string ;
        /** 区号             */ countryCode     : string ;
    }>;

}
