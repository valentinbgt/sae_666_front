export function useApi() {
  const { public: { apiBase } } = useRuntimeConfig()

  const token = useCookie<string | null>('auth_token')

  function headers(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
  }

  async function get<T>(path: string): Promise<T> {
    return $fetch<T>(`${apiBase}${path}`, { headers: headers() })
  }

  async function post<T>(path: string, body: unknown): Promise<T> {
    return $fetch<T>(`${apiBase}${path}`, { method: 'POST', headers: headers(), body })
  }

  async function put<T>(path: string, body: unknown): Promise<T> {
    return $fetch<T>(`${apiBase}${path}`, { method: 'PUT', headers: headers(), body })
  }

  async function del<T>(path: string): Promise<T> {
    return $fetch<T>(`${apiBase}${path}`, { method: 'DELETE', headers: headers() })
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
