// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  extends: ['plugin:prettier/recommended', 'eslint:recommended', 'plugin:vue/vue3-recommended'],
  plugins: ['prettier'],
  files: ['.nuxt/**/*.{ts,js,vue}', 'src/**/*.{ts,js,vue}'],
  ignores: ['node_modules/**', 'dist/**', '.nuxt/**', 'tests/e2e/**'],
  rules: {
    'prettier/prettier': 'warn',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
        sortLineLength: false,
      },
    ],
    'vue/html-closing-bracket-newline': ['warn', { singleline: 'never', multiline: 'always' }],
    'vue/html-closing-bracket-spacing': [
      'warn',
      { startTag: 'never', endTag: 'never', selfClosingTag: 'always' },
    ],
    semi: ['warn', 'never'],
    quotes: ['warn', 'single', { avoidEscape: true }],
    'comma-dangle': ['warn', 'only-multiline'],
    'no-console': ['warn'],
    'no-debugger': ['warn'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
  },
});
