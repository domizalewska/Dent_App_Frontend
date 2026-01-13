// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    extends: ['plugin:prettier/recommended'],
    plugins: ['prettier'],
    files: [
        '.nuxt/**/*.{ts,js,vue}',
        'src/**/*.{ts,js,vue}'
    ],
    ignores: [
        'node_modules/**',
        'dist/**',
        '.nuxt/**',
        'tests/e2e/**'
    ],
    rules: {
        'prettier/prettier': 'warn',
        'vue/html-self-closing': ['warn', {
            "html": {
                "void": 'never',
                "normal": 'never',
                "component": 'always'
            },
            "svg": 'always',
            "math": 'always'
        }],
        'vue/html-closing-bracket-newline': ['warn', { singleline: 'never', multiline: 'always' }],
        'vue/html-closing-bracket-spacing': ['warn', { startTag: 'never', endTag: 'never', selfClosingTag: 'always' }],
        'semi': ['warn',  'never'],
        'quotes': ['warn', 'single', { avoidEscape: true }],
        'comma-dangle': ['warn', 'only-multiline'],
        'no-console': ['warn'],
        'no-debugger': ['warn'],
        "vue/component-definition-name-casing": ["error", "PascalCase" ]
    }
})
