<script setup lang="ts">
import type { Game } from '~/types/play'

const props = defineProps<{
  game: Game
  busy?: boolean
}>()

const emit = defineEmits<{
  add: [name: string]
  remove: [playerId: number | string]
  start: []
  quit: []
}>()

const joinUrl = ref('')
onMounted(() => {
  joinUrl.value = `${window.location.origin}/play/join/${props.game.code}`
})

const newName = ref('')
function submitAdd() {
  const name = newName.value.trim()
  if (!name) return
  emit('add', name)
  newName.value = ''
}

const canStart = computed(() => props.game.players.length >= 2)

const copyFeedback = ref(false)
async function copyInviteLink() {
  await navigator.clipboard.writeText(joinUrl.value)
  copyFeedback.value = true
  setTimeout(() => {
    copyFeedback.value = false
  }, 2000)
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-10 px-6 py-10 lg:flex-row lg:items-stretch lg:justify-center">
    <!-- QR / invitation -->
    <section class="flex flex-col items-center gap-5 text-center">
      <h1 class="text-3xl text-primaire" style="font-family: Georgia, serif">
        Salle d'attente
      </h1>
      <PlayQrCode :value="joinUrl" />
      <div class="space-y-1">
        <p class="text-sm text-primaire/70">Scanne pour rejoindre avec ton téléphone</p>
        <p class="text-xs uppercase tracking-[0.3em] text-primaire/50">Code</p>
        <p class="text-2xl font-bold tracking-[0.4em] text-cta">{{ game.code }}</p>
      </div>
      <button
        type="button"
        :disabled="busy"
        class="rounded-lg bg-secondaire/70 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primaire transition hover:bg-secondaire disabled:opacity-40"
        @click="copyInviteLink"
      >
        {{ copyFeedback ? '✓ Copié !' : 'Copier le lien' }}
      </button>
    </section>

    <!-- Joueurs -->
    <section class="flex w-full max-w-sm flex-col gap-4">
      <div class="flex items-baseline justify-between">
        <h2 class="text-lg font-semibold text-primaire">Joueurs</h2>
        <span class="text-sm text-primaire/50">{{ game.players.length }}/4</span>
      </div>

      <ul class="flex flex-col gap-2">
        <li v-for="p in game.players" :key="p.id">
          <PlayPlayerChip
            :player="p"
            :removable="!p.isHost"
            @remove="emit('remove', p.id)"
          />
        </li>
        <li v-if="game.players.length === 0" class="text-sm text-primaire/40">
          Aucun joueur pour l'instant.
        </li>
      </ul>

      <form class="flex gap-2" @submit.prevent="submitAdd">
        <input
          v-model="newName"
          type="text"
          placeholder="Ajouter un joueur à la main"
          maxlength="20"
          :disabled="busy || game.players.length >= 4"
          class="flex-1 rounded-lg border border-accent/30 bg-accent/30 px-3 py-2 text-sm text-primaire placeholder-primaire/40 focus:border-cta focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          :disabled="busy || !newName.trim() || game.players.length >= 4"
          class="rounded-lg bg-secondaire/70 px-3 text-primaire transition hover:bg-secondaire disabled:opacity-40"
          aria-label="Ajouter"
        >
          <Icon name="ph:plus-bold" class="h-4 w-4" />
        </button>
      </form>

      <button
        type="button"
        :disabled="busy || !canStart"
        class="btn-filled mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest text-primaire disabled:opacity-40"
        @click="emit('start')"
      >
        {{ busy ? '…' : 'Lancer la partie' }}
      </button>
      <p v-if="!canStart" class="text-center text-xs text-primaire/50">
        Il faut au moins 2 joueurs pour commencer.
      </p>

      <button
        type="button"
        :disabled="busy"
        class="mt-1 inline-flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-primaire/50 transition hover:text-primaire disabled:opacity-40"
        @click="emit('quit')"
      >
        Quitter
      </button>
    </section>
  </div>
</template>
