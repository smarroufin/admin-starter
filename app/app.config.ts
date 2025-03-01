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
    navigationMenu: {
      slots: {
        link: 'cursor-pointer',

      },
    },
    container: {
      base: 'lg:px-6',
    },
    slideover: {
      slots: {
        close: 'end-2 sm:end-4',
        body: 'p-0 sm:p-0',
      },
    },
  },
})
