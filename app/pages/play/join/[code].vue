<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const code = String(route.params.code)

const { me, fetchMe } = useMe()
const { joinGame } = useGame()

const status = ref<'loading' | 'confirm' | 'joining' | 'done' | 'error'>('loading')
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await fetchMe()
    status.value = 'confirm'
  } catch {
    error.value = 'Session expirée. Reconnecte-toi pour rejoindre.'
    status.value = 'error'
  }
})

async function join() {
  status.value = 'joining'
  error.value = null
  try {
    await joinGame(code)
    status.value = 'done'
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Impossible de rejoindre cette partie.'
    status.value = 'error'
  }
}
</script>

<template>
  <div
    class="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    style="background: linear-gradient(to bottom right, #431e14 0%, #431e14 40%, #bd652e 100%)"
  >
    <img src="/images/logo_crooak.png" alt="CROOAK" class="h-14 w-auto" />

    <template v-if="status === 'confirm' || status === 'joining'">
      <p class="text-sm uppercase tracking-[0.3em] text-primaire/60">Tu rejoins la partie</p>
      <p class="text-3xl font-bold tracking-[0.4em] text-cta">{{ code }}</p>
      <p class="text-primaire">
        en tant que <strong>{{ me?.username }}</strong>
      </p>
      <button
        type="button"
        :disabled="status === 'joining'"
        class="btn-filled inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-primaire disabled:opacity-50"
        @click="join"
      >
        {{ status === 'joining' ? '…' : 'Rejoindre' }}
      </button>
    </template>

    <template v-else-if="status === 'done'">
      <Icon name="ph:check-circle-fill" class="h-16 w-16 text-validation" />
      <h1 class="text-2xl text-primaire" style="font-family: Georgia, serif">
        C'est bon, {{ me?.username }} !
      </h1>
      <p class="text-primaire/70">Regarde l'écran principal, la partie va commencer.</p>
    </template>

    <template v-else-if="status === 'error'">
      <p class="text-alerte">{{ error }}</p>
      <NuxtLink
        :to="`/login?redirect=${encodeURIComponent(`/play/join/${code}`)}`"
        class="inline-flex items-center justify-center rounded-full border border-primaire/40 px-6 py-2 text-sm font-bold uppercase tracking-widest text-primaire transition hover:border-primaire"
      >
        Se reconnecter
      </NuxtLink>
    </template>

    <p v-else class="text-primaire/60">Chargement…</p>
  </div>
</template>
