export function useApi() {
  const { public: { apiBase } } = useRuntimeConfig()

  const token = useCookie<string | null>('auth_token', { path: '/' })
  const route = useRoute()

  function headers(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
  }

  // Le cookie auth_token vit 30 j (cf. useAuth) mais le JWT Lexik qu'il porte
  // expire bien plus tôt (~1 h) — et devient invalide si l'API régénère sa
  // paire de clés. Sans ce garde, un token périmé laisse passer le middleware
  // puis fait échouer tous les appels en 401 « Invalid credentials » sans
  // issue. On purge le token mort et on renvoie vers /login en gardant la
  // destination. Le login lui-même (401 = mauvais identifiants) est exclu.
  function onResponseError({ request, response }: {
    request: RequestInfo
    response: { status: number }
  }) {
    const url = typeof request === 'string' ? request : (request as Request).url
    if (response?.status === 401 && import.meta.client && !url.endsWith('/login')) {
      token.value = null
      return navigateTo(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
    }
  }

  // $fetch est typé avec les routes Nitro internes ; sur une URL dynamique vers
  // une API externe (crooak_api), cela déclenche une récursion de types coûteuse
  // (TS2321). On le caste vers une signature simple — comportement identique à
  // l'exécution.
  const request = $fetch as unknown as <T>(
    url: string,
    options?: Record<string, unknown>,
  ) => Promise<T>

  function get<T>(path: string): Promise<T> {
    return request<T>(`${apiBase}${path}`, { headers: headers(), onResponseError })
  }

  function post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(`${apiBase}${path}`, { method: 'POST', headers: headers(), body, onResponseError })
  }

  function put<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(`${apiBase}${path}`, { method: 'PUT', headers: headers(), body, onResponseError })
  }

  function del<T>(path: string): Promise<T> {
    return request<T>(`${apiBase}${path}`, { method: 'DELETE', headers: headers(), onResponseError })
  }

  async function login(email: string, password: string): Promise<string> {
    const data = await post<{ token: string }>('/login', { email, password })
    token.value = data.token
    return data.token
  }

  function logout() {
    token.value = null
  }

  return { get, post, put, del, login, logout, token }
}
