export function useAuth() {
  const token = useCookie<string | null>('auth_token', { default: () => null })

  const isLoggedIn = computed(() => !!token.value)

  function setToken(t: string) {
    token.value = t
  }

  function logout() {
    token.value = null
    navigateTo('/login')
  }

  return { token, isLoggedIn, setToken, logout }
}
