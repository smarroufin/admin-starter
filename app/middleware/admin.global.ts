const PUBLIC_PATHS = [
  `/${ADMIN_PREFIX}/login`,
  `/${ADMIN_PREFIX}/register`,
]

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === `/${ADMIN_PREFIX}` || to.path.startsWith(`/${ADMIN_PREFIX}/`)) {
    const { session } = useUserSession()
    if (PUBLIC_PATHS.includes(to.path)) {
      if (session.value?.user) {
        return navigateTo(ADMIN_HOME_URL, { replace: true })
      }
    }
    else {
      if (!session.value?.user) {
        return navigateTo(ADMIN_LOGIN_URL, { replace: true })
      }
    }
  }
})
