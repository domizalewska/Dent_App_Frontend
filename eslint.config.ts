// eslint.config.ts
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['app/**/*.{ts,js,vue}', 'src/**/*.{ts,js,vue}', '.nuxt/**/*.{ts,js,vue}'],
    ignores: [
      'node_modules/**',
      'dist/**',
      '.nuxt/**',
      'tests/e2e/**',
      'app/components/ui/**',
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      semi: ['warn', 'never'],
      quotes: ['warn', 'single', { avoidEscape: true }],
      'comma-dangle': ['warn', 'only-multiline'],
      'no-console': ['warn'],
      'no-debugger': ['warn'],
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'never', normal: 'never', component: 'always' },
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
      'vue/no-multiple-template-root': 'off',
      'vue/html-closing-bracket-newline': ['warn', { singleline: 'never', multiline: 'always' }],
      'vue/html-closing-bracket-spacing': [
        'warn',
        { startTag: 'never', endTag: 'never', selfClosingTag: 'always' },
      ],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
    },
  },
]);
