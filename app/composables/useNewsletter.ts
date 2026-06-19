export function useNewsletter() {
  const { public: { apiBase } } = useRuntimeConfig()

  const email = ref('')
  const loading = ref(false)
  const success = ref(false)
  const error = ref('')

  async function subscribe() {
    if (!email.value) return
    error.value = ''
    success.value = false
    loading.value = true
    try {
      await $fetch(`${apiBase}/newsletter`, {
        method: 'POST',
        body: { email: email.value },
      })
      success.value = true
      email.value = ''
    } catch (e: any) {
      error.value = e?.data?.message ?? 'Une erreur est survenue.'
    } finally {
      loading.value = false
    }
  }

  return { email, loading, success, error, subscribe }
}
