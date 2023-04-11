/**
 * 提交规范
 * v22.09.20
 *
 * 参考链接
 * - Git 提交指南
 * https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
 *
 * - Git husky 钩子文档
 * https://typicode.github.io/husky/#/?id=manual
 *
 * - 提交规则文档 => @commitlint/config-conventional
 * https://commitlint.js.org/#/
 */
module.exports = {
    extends: [
        '@commitlint/config-conventional',
    ],

    rules: {
        // 提交类型
        'type-enum': [
            2,
            'always',
            [
                'feat'      , // 新功能
                'fix'       , // 错误修复
                'refactor'  , // 重构，既不修复错误也不添加功能的代码更改
                'perf'      , // 提高性能的代码更改
                'ui'        , // 页面样式变更
                'docs'      , // 文档更改
                'style'     , // 不影响代码含义的更改：空格、格式、缺少分号等
                'test'      , // 添加缺失或纠正现有测试
                'revert'    , // 撤销上一次提交
                'chore'     , // 对构建过程或辅助工具和库的更改，例如文档生成
                'release'   , // 发布版本
            ],
        ],

        // <type> 格式 小写
        'type-case': [2, 'always', 'lower-case'],

        // <type> 不能为空
        'type-empty': [2, 'never'],

        // <scope> 范围格式
        'scope-case': [0],

        // <subject> 主要 message 不能为空
        'subject-empty': [2, 'never'],

        // <subject> 以什么为结束标志，禁用
        'subject-full-stop': [0, 'never'],

        // <subject> 格式，禁用
        'subject-case': [0, 'never'],

        // header 最长72个字符
        'header-max-length': [0, 'always', 72],

        // <body> 以空行开头
        'body-leading-blank': [1, 'always'],
    },
}
