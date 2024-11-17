import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Vuejs
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'below',
    }],
    // Nuxt
    'nuxt/nuxt-config-keys-order': 'off',
    // FIXME: Eslint workaround https://github.com/eslint/eslint/issues/19134#issuecomment-2480588649
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
  },
})
