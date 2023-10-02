module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vuejs-accessibility/recommended',
    'plugin:nuxt/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'vuejs-accessibility',
    'import',
    'sonarjs',
    'vitest',
  ],
  rules: {
    'vue/require-prop-types': 0,
    'vue/no-duplicate-attributes': 0,
    'vue/no-parsing-errors': 0,
  },
};
