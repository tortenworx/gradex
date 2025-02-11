export default defineNuxtRouteMiddleware((to, from) => {
  // check if the user is logged in
  const { loggedIn } = useUserSession();
  if (import.meta.server) return

  const authRoutes = ['/accounts/login', '/accounts/resend', '/accounts/forgot-password', '/accounts/reset-password', '/accounts/accept']
  const guestRoutes = ['/legal/terms', '/legal/privacy', '/about']
  // redirect the user to the login screen if they're not authenticated
  if (!authRoutes.includes(to.path) && !guestRoutes.includes(to.path) && !loggedIn.value) {
    return navigateTo('/accounts/login')
  }
  if (authRoutes.includes(to.path) && loggedIn.value && to.path != '/') {
    return navigateTo('/')
  }
});