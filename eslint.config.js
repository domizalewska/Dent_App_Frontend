// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'antfu/if-newline': 'off',
  },
  ignores: ['.nuxt/**', 'node_modules/**', 'app/components/ui/**'],
})
