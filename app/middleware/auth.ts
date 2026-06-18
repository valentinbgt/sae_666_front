export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>('auth_token')
  if (!token.value) {
    // Conserve la destination pour y revenir après connexion (ex. page de join).
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
