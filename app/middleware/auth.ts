export default defineNuxtRouteMiddleware((to) => {
  // Mêmes options de cookie que partout ailleurs (useAuthCookie) : un
  // `useCookie('auth_token')` nu ici relisait parfois une valeur différente.
  const token = useAuthCookie()
  if (!token.value) {
    // Conserve la destination pour y revenir après connexion (ex. page de join).
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
