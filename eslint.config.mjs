// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt([eslintPluginPrettierRecommended], {
  ignore: [
    '.github/**',
    'tsconfig.json',
    'nuxt.config.ts',
    'package.json',
    'package-lock.json',
    'dist/**',
    '.nuxt/**',
    'node_modules/**',
    'app/components/ui/**',
  ],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
