export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    dropdownMenu: {
      slots: {
        item: 'cursor-pointer',
      },
    },
  },
})
