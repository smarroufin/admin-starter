export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === ADMIN_HOME_URL || to.path.startsWith(`${ADMIN_HOME_URL}/`)) {
    const { session } = useUserSession()
    if (ADMIN_PUBLIC_URLS.includes(to.path)) {
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
