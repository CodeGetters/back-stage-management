// TODO:进入eslint官网更新以下配置
module.exports = {
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    // extends: [
    //     'plugin:vue/vue3-recommended',
    //     'plugin:@typescript-eslint/recommended',
    // ],

    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    rules: {
        // override/add rules settings here, such as:
    }
};