<script setup lang="ts">
const route = useRoute()
const { setToken } = useAuth()

onMounted(async () => {
  const token = route.query.token as string | undefined
  if (token) {
    await setToken(token)
    await navigateTo('/', { replace: true })
  } else {
    await navigateTo('/login', { replace: true })
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Connexion en cours...</p>
  </div>
</template>
