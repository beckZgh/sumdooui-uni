export default [
    {
        id  : 'basics', name: '基础组件',
        // --------------------------------------------------------
        data: [
            { name: 'Color 色彩'        , page: 'color'     },
            { name: 'Icon 图标'         , page: 'icon'      },
            { name: 'Image 图片'        , page: 'image'     },
            { name: 'Button 按钮'       , page: 'button'    },
            { name: 'Animtae 动画/动效' , page: 'animate'   },
            { name: 'Overlay 遮罩层'    , page: 'overlay'   },
            { name: 'Popup 弹出层'      , page: 'popup'     },
        ],
    },
    {
        id  : 'layout', name: '布局组件',
        // --------------------------------------------------------
        data: [
            { name: 'Page 页面布局'     ,  page: 'page'     },
            { name: 'Cell 单元格'       ,  page: 'cell'     },
            { name: 'Layout 栅格布局'   , page: 'layout'    },
            { name: 'Grid 宫格'         , page: 'grid'      },
            { name: 'Divider 分割线'    , page: 'divider'   },
            { name: 'Empty 缺省页'      , page: 'empty'     },
        ],
    },
    {
        id  : 'nav', name: '导航组件',
        // --------------------------------------------------------
        data: [
            { name: 'Navbar 头部导航'       , page: 'navbar'        },
            { name: 'Tabbar 底部标签栏'     , page: 'tabbar'        },
            { name: 'Tabs 标签页'           , page: 'tabs'          },
            { name: 'SwitchBar 条件切换栏'  , page: 'switch-bar'    },
            { name: 'Sticky 吸顶组件'       , page: 'sticky'        },
            { name: 'IndexList 索引列表'    , page: ''              },
            { name: 'Steps 步骤条'          , page: 'steps'         },
            { name: 'Pagination 分页器'     , page: ''              },
            { name: 'FixedNav 悬浮导航'     , page: ''              },
            { name: 'DropdownMenu 下拉菜单' , page: ''              },
        ],
    },  {
        id  : 'operate', name: '操作反馈',
        // --------------------------------------------------------
        data: [
            { name: 'Toast 轻提示'          , page: 'toast'         },
            { name: 'ActionSheet 上拉菜单'  , page: 'actionsheet'   },
            { name: 'Dialog 对话框'         , page: 'dialog'        },
            { name: 'Loading 加载'          , page: 'loading'       },
            { name: 'Swipe 滑动菜单'        , page: ''              },
            { name: 'Backtop 返回顶部'      , page: ''              },
            { name: 'PullRefresh 下拉刷新'  , page: ''              }, // TODO: 待完成
        ],
    }, {
        id  : 'data', name: '数据组件',
        // --------------------------------------------------------
        data: [
            { name: 'Badge 徽章'            , page: 'badge'         },
            { name: 'Alert 警告框'          , page: 'alert'         },
            { name: 'Swiper 轮播图'         , page: 'swiper'        },
            { name: 'Avatar 头像'           , page: 'avatar'        },
            { name: 'Tag 标签'              , page: 'tag'           },
            { name: 'Progress 进度条'       , page: 'progress'      },
            { name: 'Collapse 折叠面板'     , page: 'collapse'      },
            { name: 'Noticebar 公告栏'      , page: 'notice-bar'    },
            { name: 'Table 表格'            , page: 'table'         }, // TODO: 待完成
            { name: 'ImagePreview 图片预览' , page: ''              },
        ],
    }, {
        id  : 'form', name: '表单组件',
        // --------------------------------------------------------
        data: [
            { name: 'Form 表单应用'                 , page: 'form'              }, // TODO: 待完成
            { name: 'Input 输入框'                  , page: 'input'             },
            { name: 'Input2 输入框'                 , page: 'input2'            }, // TODO: 待完成
            { name: 'Textarea 多行输入框'           , page: 'textarea'          },
            { name: 'Textarea2 多行输入框'          , page: 'textarea2'         }, // TODO: 待完成
            { name: 'Checkbox 复选框'               , page: 'checkbox'          },
            { name: 'Checkbox2 复选框'              , page: 'checkbox2'         },
            { name: 'Radio 单选框'                  , page: 'radio'             },
            { name: 'Radio2 单选框'                 , page: 'radio2'            },
            { name: 'Switch 开关'                   , page: 'switch'            },
            { name: 'Stepper 步进器'                , page: 'stepper'           },
            { name: 'Rate 评分'                     , page: 'rate'              },
            { name: 'Picker 数据选择器'             , page: 'picker'            },
            { name: 'Picker2 数据选择器'            , page: 'picker2'           },
            { name: 'Select 选择器'                 , page: 'select'            }, // TODO: 待完成
            { name: 'Calendar 日历'                 , page: 'calendar'          }, // TODO: 待完成
            { name: 'DatetimePicker 日期时间选择器' , page: 'datetime-picker'   }, // TODO: 待完成
            { name: 'Upload 上传'                   , page: 'upload'            }, // TODO: 待完成
            // { name: 'SliderRange 滑块区间'       , page: ''                  },
            { name: 'Keyboard 键盘'                 , page: 'number-keyboard'   }, // TODO: 待完成
        ],
    }]
