// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  vue: true,

  ignores: [
    '.nuxt/**',
    'node_modules/**',
    'app/components/ui/**',
  ],
});
