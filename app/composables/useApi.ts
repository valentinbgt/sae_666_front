export function useApi() {
  const { public: { apiBase } } = useRuntimeConfig()

  const token = useCookie<string | null>('auth_token')

  function headers(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
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
    return request<T>(`${apiBase}${path}`, { headers: headers() })
  }

  function post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(`${apiBase}${path}`, { method: 'POST', headers: headers(), body })
  }

  function put<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(`${apiBase}${path}`, { method: 'PUT', headers: headers(), body })
  }

  function del<T>(path: string): Promise<T> {
    return request<T>(`${apiBase}${path}`, { method: 'DELETE', headers: headers() })
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
