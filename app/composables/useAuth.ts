export function useAuth() {
  const token = useCookie<string | null>('auth_token', {
    default: () => null,
    path: '/',
    sameSite: 'lax',
    secure: !import.meta.dev,
    maxAge: 60 * 60 * 24 * 30,
  })

  const isLoggedIn = computed(() => !!token.value)

  async function setToken(t: string) {
    token.value = t
    // The cookie is written to document.cookie by a Vue watcher that flushes
    // asynchronously. Await a tick so the value is persisted before any
    // subsequent navigation triggers the auth middleware, which reads it back.
    await nextTick()
  }

  function logout() {
    token.value = null
    navigateTo('/login')
  }

  return { token, isLoggedIn, setToken, logout }
}
