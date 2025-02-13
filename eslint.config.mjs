import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Vuejs
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'beside',
      multiline: 'below',
    }],
  },
})
