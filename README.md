# 学生营养餐-小程序

家长订餐小程序，使用 [UniApp](https://uniapp.dcloud.net.cn/tutorial/) 开发

![学生营养餐-小程序二维码](../../docs/stu-weapp.png)

## 第三方平台代开发

- 3rdMiniProgramAppid: wx68b518dac9c3ffaf (在线下单 - 绑定第三方平台开发)
- extAppid: wx0f20e43ef6fdfd9e (三度学生营养餐 - 模板开发)

## 页面路径

```ts
// 基础页面
const BASE_PAGES = [
    'pages/home/main'           , // 首页（该位置关联 tabbar 项不可移动）
    'pages/webview/main'        , // 统一显示网页页面
    'pages/user-center/main'    , // 个人中心
    'pages/login/main'          , // 用户登录

    'pages/license/main'        , // 用户协议
    'pages/comm/schools/main'   , // 选择学校
    'pages/comm/classes/main'   , // 选择班级
    'pages/comm/students/main'  , // 选择学生
    'pages/comm/orders/main'    , // 选择订单
]

// 家长操作的相关页面
export const MEMBER_PAGES = [
    'pages/member/students/main'              , // 学生信息（该位置关联 tabbar 项不可移动）
    'pages/member/students/edit/main'         , // 添加、修改学生
    'pages/member/students/edit/allergen/main', // 选择过敏原
    'pages/member/orders/main'                , // 我的订单
    'pages/member/orders/detail/main'         , // 订单详情
    'pages/member/calendar/main'              , // 订餐台历
    'pages/member/buy-plan/main'              , // 订餐缴费
    'pages/member/leave/main'                 , // 请假停餐
    'pages/member/menu/main'                  , // 学校菜单
    'pages/member/report/main'                , // 学校报表
    'pages/member/report/class/main'          , // 学校班级报表
    'pages/member/monitor/main'               , // 直播
    'pages/member/menuset/main'               , // 每周菜单
]
```

## 常见问题

- 微信支付弹窗安卓机器关闭会触发 页面 `onShow` 及应用级 `onShow` 生命周期
https://developers.weixin.qq.com/community/develop/doc/000a6442a08820bd62c9b3ff75b800
https://blog.csdn.net/Luhang12138/article/details/129516663

### onShow触发相关API
- chooseMedia 选择媒体文件
- openEmbeddedMiniProgram 打开半屏小程序
- requestPayment 微信支付（安卓会、iphone不会）

## 中性词替换

- 学生信息页面
- 学生信息 =》学生编辑信息页面
- 我的订单页面
- 我的订单 =》订单详情页面
- 订餐缴费 =》学生选择页面
- 请假停餐 =》订单选择页面

## 个人中心 - 小程序后台管理权限

- 用餐名单 => 后台用户
- 菜单管理 (操作) => 老师权限控制（开启：上传套餐图片）> 后台用户（开启菜单: 基础数据/菜单管理）
- 计划管理 (页面) => 后台用户（开启菜单: 基础数据/计划管理）
- 请假申诉 (页面) => 后台用户（开启菜单: 订餐中心/请假申述）
- 请假停餐 (页面) => 老师权限控制（开启：请假权限）    > 后台用户（开启菜单: 订餐中心/请假记录）
- 上传头像 (页面) => 老师权限控制（开启：上传头像）    > 后台用户（开启菜单: 就餐核验/照片管理）
- 就餐核销 (页面) => 老师权限控制（开启：核销权限）    > 后台用户（开启菜单: 就餐核验/核验报表）

-----------------------------------------------------------------------------------------
后台用户：后台管理用户与小程序登录相同手机号（需启用状态）
老师视角：学校老师与小程序登录相同手机号（需启用状态）
