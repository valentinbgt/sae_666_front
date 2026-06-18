<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { logout } = useAuth()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold">Bienvenue sur CROOAK</h1>
      <p class="text-gray-600">Vous êtes connecté.</p>
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        @click="logout"
      >
        Se déconnecter
      </button>
    </div>
  </div>
</template>
