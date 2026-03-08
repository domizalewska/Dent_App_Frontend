// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt([eslintPluginPrettierRecommended], {
  ignores: ['app/components/ui/**'],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
