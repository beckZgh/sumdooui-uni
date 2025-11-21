/**
 * 兼容 package.josn 未配置 type: "module"
 * - 配置了 type: "module"，@dcloudio/vite-plugin-uni 插件不能运行
 */
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
    {
        // 默认 4 个空格
        stylistic: { indent: 4     },
        vue      : { vueVersion: 3 }, // 需要声明开启，否则不会校验 .vue 文件

        // 忽略常用文件检查
        ignores: [
            '**/apis/api.ts',
            '**/typings/shims-api.d.ts',
            '**/sumdooui-uni/utils/async-validator/**',
        ],
    },
    {
        rules: {
            'antfu/if-newline'             : 'off', // 关闭 if 语句后单独一行样式
            'antfu/top-level-function'     : 'off', // 关闭声明顶级函数必须使用 function 表示法（可以开启）
            'antfu/consistent-list-newline': 'off', // 关闭在对象/数组/命名导入/导出和函数参数的大括号内强制执行一致的换行符。

            // -------------------------------------------------------------
            'import/first'                        : 'off',
            'import/order'                        : 'off', // 关闭导入顺序检查
            'curly'                               : 'off', // 关闭对所有控制语句强制执行一致的大括号样式
            'sort-imports'                        : 'off', // 关闭排序导入
            'dot-notation'                        : 'off', // 关闭检查非必要方括号表示法时修改为使用点表示法
            'no-restricted-syntax'                : 'off', // 关闭 enums 语法检查
            'new-cap'                             : 'off',
            'no-new'                              : 'off',
            'no-alert'                            : 'off',
            'no-console'                          : 'off',
            'import/newline-after-import'         : 'off',
            'unicorn/prefer-number-properties'    : 'off',
            'unicorn/prefer-node-protocol'        : 'off',
            'unicorn/no-new-array'                : 'off',
            'node/prefer-global/process'          : 'off',
            'yaml/plain-scalar'                   : 'off',
            'yaml/indent'                         : 'off',
            'jsdoc/multiline-blocks'              : 'off',
            'eslint-comments/no-unlimited-disable': 'off',

            // -------------------------------------------------------------
            'style/no-multi-spaces'        : 'off'              , // 不检查多个空格
            'style/max-statements-per-line': 'off'              , // 关闭一行存在多条语句检查
            'style/indent-binary-ops'      : 'off'              , // 关闭缩进二进制操作
            'style/comma-spacing'          : 'off'              , // 关闭逗号前后空格的检查
            'style/template-curly-spacing' : ['error', 'always'], // 模板字符串前后需要一个或多个空格
            'style/space-in-parens'        : 'off'              , // 关闭括号内空格检查
            'style/type-annotation-spacing': 'off'              , // 关闭类型间距检查
            'style/brace-style'            : 'off'              , // 关闭控制语句大括号样式检查
            'style/padded-blocks'          : 'off'              , // 关闭块语句填充行检查
            'style/no-multiple-empty-lines': 'off'              , // 关闭多个空行检查
            'style/multiline-ternary'      : 'off'              , // 关闭多元表达式检查
            // 'style/member-delimiter-style' : 'off'           , // 强制类型成员统一分隔符
            'style/member-delimiter-style' : ['error', {
                multiline: {
                    delimiter  : 'none', // 多行以 ; 作为分隔符
                    requireLast: true  , // 最后一个需要有 ；分隔符
                },
                singleline: {
                    delimiter  : 'semi', // 多行以 ; 作为分隔符
                    requireLast: false , // 最后一个无需要有 ；分隔符
                },
            }],
            // 对象字面量键间距
            'style/key-spacing': ['error', {
                beforeColon: false  , // 在对象字面量中，键和冒号之间至少需要一个空格。
                afterColon : true   , // 冒号和对象字面量中的值之间至少需要一个空格。
                align      : 'colon', // 强制对象字面量中冒号和值的水平对齐。
            }],
            // 'style/key-spacing': 'off', // TODO: 暂时不校验

            // -------------------------------------------------------------
            // 关闭强制类型定义一致使用 interface 或 type。
            'ts/consistent-type-definitions': 'off',
            'ts/ban-types'                  : 'off', // 关闭禁用某些类型如 Symbol
            'ts/no-namespace'               : 'off', // 关闭禁用 namespace
            'ts/method-signature-style'     : 'off', // 关闭函数必须指定类型声明
            'ts/no-require-imports'         : 'off',
            'ts/no-var-requires'            : 'off',
            'ts/key-spacing'                : 'off',

            // -------------------------------------------------------------
            'jsonc/sort-keys'  : 'off', // 关闭配置项属性 key 排序
            'jsonc/key-spacing': ['error', {
                beforeColon: false  , // 在对象字面量中，键和冒号之间至少需要一个空格。
                afterColon : true   , // 冒号和对象字面量中的值之间至少需要一个空格。
                align      : 'colon', // 强制对象字面量中冒号和值的水平对齐。
            }],

            // -------------------------------------------------------------
            'vue/key-spacing': ['error', {
                beforeColon: false  , // 在对象字面量中，键和冒号之间至少需要一个空格。
                afterColon : true   , // 冒号和对象字面量中的值之间至少需要一个空格。
                align      : 'colon', // 强制对象字面量中冒号和值的水平对齐。
            }],
            'vue/custom-event-name-casing'               : 'off'              , // 关闭事件名必须驼峰命名
            'vue/template-curly-spacing'                 : ['error', 'always'], // 模板字符串前后需要一个或多个空格
            'vue/no-multi-spaces'                        : 'off'              , // 关闭缩进的多个空格检查
            'vue/singleline-html-element-content-newline': 'off', // 关闭单行元素强制换行检查
            'vue/define-macros-order'                    : ['error', {
                order           : ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'], // 声明宏的顺序
                defineExposeLast: false, // 关闭 defineExpose 宏是否需要在最后一行
            }],

            // --------------------------------------------------------------
        },
    },
    {
        // 重写 types.ts 部分规则
        files: ['**/types.ts', '**/types/index.ts'],
        rules: {
            'style/key-spacing': 'off', // 关闭对象字面量键间距检查
        },
    },
)
