module.exports = {
    env: {
        'browser': true,
        'es6': true,
        'node': true,
        // vue语法糖
        'vue/setup-compiler-macros': true
    },
    overrides: [],
    extends: [
        // vue3默认的推荐规范
        'plugin:vue/vue3-recommended',
        // eslint/typescript 默认的推荐规范
        'plugin:@typescript-eslint/recommended',
        // airbnb代码规范
        'airbnb-base',
        // eslint默认推荐的规范
        'eslint:recommended',
        // 解决 eslint 与 eslint 冲突
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            tsx: true,
            jsx: true,
        },
    },
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    settings: {
        alias: {
            map: [['@', './src']],
        },
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    // 0 = off, 1 = warn, 2 = error
    rules: {
        'vue/no-multiple-template-root': 0,
        'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
        'block-spacing': [2, 'always'], // =>的前/后括号
        'arrow-parens': 0, // 箭头函数用小括号括起来
        'indent': [2, 2], // 缩进风格
        "strict": 2,//使用严格模式
        "no-alert": 0,//禁止使用alert confirm prompt
        "no-continue": 0,//禁止使用continue
        "camelcase": 2,//强制驼峰法命名
        "comma-spacing": 0,//逗号前后的空格
        "no-console": 2,//禁止使用console
        "lines-around-comment": 0,//行前/行后备注
        "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
        "import/no-unresolved": 0,
        "import/extensions": 0,
        "import/no-absolute-path": 0,
        "import/no-extraneous-dependencies": [2, {"devDependencies": true}]
    }
}