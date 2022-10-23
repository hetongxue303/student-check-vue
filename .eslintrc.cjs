module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    overrides: [],
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
            tsx: true,
            jsx: true
        }
    },
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    settings: {
        alias: {
            map: [['@', './src']]
        },
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    },
    // 0 = off, 1 = warn, 2 = error
    rules: {
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/no-unused-vars': 0,
        'import/order': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': [2, {devDependencies: true}],
        'no-console': 1,
        'no-unused-vars': 0,
        'vue/multi-word-component-names': 0,
        'vue/valid-template-root': 0,
        'prettier/prettier': 0,
        'no-param-reassign': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'no-case-declarations': 0,
        'default-case': 0,
        'no-bitwise': 0,
        'no-shadow': 0
    }
}
