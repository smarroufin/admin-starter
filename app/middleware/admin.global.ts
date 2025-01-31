const PUBLIC_PATHS = [
  '/admin/login',
  '/admin/register',
]

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin' || to.path.startsWith('/admin/')) {
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
