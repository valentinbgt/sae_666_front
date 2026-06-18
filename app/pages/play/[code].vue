<script setup lang="ts">
import type { Game } from '~/types/play'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const code = String(route.params.code)

const game = ref<Game | null>(null)
const loadError = ref<string | null>(null)
const busy = ref(false)

const { fetchGame, addManualPlayer, removePlayer, startGame } = useGame()
const RESUME_KEY = 'crooak.activeGame'

const polling = useLobbyPolling(code, (g) => {
  game.value = g
})

async function refresh() {
  game.value = await fetchGame(code)
}

onMounted(async () => {
  try {
    await refresh()
    loadError.value = null
    localStorage.setItem(RESUME_KEY, code)
    if (game.value?.status === 'lobby') polling.start()
  } catch (e: any) {
    loadError.value = e?.data?.message ?? 'Partie introuvable ou inaccessible.'
  }
})

async function handleAdd(name: string) {
  busy.value = true
  loadError.value = null
  try {
    await addManualPlayer(code, name)
    await refresh()
  } catch (e: any) {
    loadError.value = e?.data?.message ?? "Ajout impossible."
  } finally {
    busy.value = false
  }
}

async function handleRemove(id: number | string) {
  busy.value = true
  try {
    await removePlayer(code, id)
    await refresh()
  } catch (e: any) {
    loadError.value = e?.data?.message ?? 'Suppression impossible.'
  } finally {
    busy.value = false
  }
}

async function handleStart() {
  busy.value = true
  loadError.value = null
  try {
    game.value = await startGame(code)
    polling.stop()
  } catch (e: any) {
    loadError.value = e?.data?.message ?? 'Démarrage impossible.'
  } finally {
    busy.value = false
  }
}

function quit() {
  localStorage.removeItem(RESUME_KEY)
  polling.stop()
  navigateTo('/play')
}
</script>

<template>
  <div
    class="flex min-h-dvh flex-col"
    style="background: linear-gradient(to bottom right, #431e14 0%, #431e14 40%, #bd652e 100%)"
  >
    <!-- Erreur de chargement -->
    <div
      v-if="loadError && !game"
      class="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <p class="text-alerte">{{ loadError }}</p>
      <NuxtLink
        to="/play"
        class="inline-flex items-center justify-center rounded-full border border-primaire/40 px-6 py-2 text-sm font-bold uppercase tracking-widest text-primaire transition hover:border-primaire"
      >
        Retour
      </NuxtLink>
    </div>

    <PlayLobby
      v-else-if="game && game.status === 'lobby'"
      :game="game"
      :busy="busy"
      @add="handleAdd"
      @remove="handleRemove"
      @start="handleStart"
    />

    <PlayGame
      v-else-if="game && game.status === 'active'"
      :game="game"
      @quit="quit"
    />

    <div
      v-else-if="game && game.status === 'finished'"
      class="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <p class="text-xl text-primaire" style="font-family: Georgia, serif">
        Partie terminée 🎉
      </p>
      <NuxtLink
        to="/play"
        class="btn-filled inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest text-primaire"
      >
        Nouvelle partie
      </NuxtLink>
    </div>

    <div v-else class="flex flex-1 items-center justify-center text-primaire/60">
      Chargement…
    </div>
  </div>
</template>
