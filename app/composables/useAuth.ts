export function useAuth() {
  // Options du cookie centralisées dans useAuthCookie (cf. ce fichier pour le
  // pourquoi du `secure` calé sur le protocole : sinon connexion KO sur mobile).
  const token = useAuthCookie()

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
