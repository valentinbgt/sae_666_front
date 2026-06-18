<script setup lang="ts">
//definePageMeta({ middleware: 'auth', title: 'CROOAK – Jouer' })
definePageMeta({ title: "CROOAK – Jouer" });

const { createGame } = useGame();
const { me, fetchMe } = useMe();

const creating = ref(false);
const error = ref<string | null>(null);
const resumeCode = ref<string | null>(null);

const RESUME_KEY = "crooak.activeGame";

onMounted(async () => {
  resumeCode.value = localStorage.getItem(RESUME_KEY);
  try {
    await fetchMe();
  } catch {
    /* token éventuellement expiré : on laisse l'utilisateur agir */
  }
});

async function newGame() {
  creating.value = true;
  error.value = null;
  try {
    const game = await createGame();
    localStorage.setItem(RESUME_KEY, game.code);
    await navigateTo(`/play/${game.code}`);
  } catch (e: any) {
    error.value =
      e?.data?.message ?? "Impossible de créer la partie. Réessaie.";
  } finally {
    creating.value = false;
  }
}
</script>

<template>
  <div
    class="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center"
    style="
      background: linear-gradient(
        to bottom right,
        #431e14 0%,
        #431e14 40%,
        #bd652e 100%
      );
    "
  >
    <img src="/images/logo_crooak.png" alt="CROOAK" class="h-20 w-auto" />

    <div class="space-y-2">
      <h1 class="text-4xl text-primaire" style="font-family: Georgia, serif">
        Prêt à jouer ?
      </h1>
      <p v-if="me" class="text-sm text-primaire/70">
        Connecté en tant que
        <strong class="text-primaire">{{ me.username }}</strong>
      </p>
    </div>

    <div class="flex w-full max-w-xs flex-col gap-3">
      <button
        type="button"
        :disabled="creating"
        class="btn-filled inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-primaire disabled:opacity-50"
        @click="newGame"
      >
        {{ creating ? "Création…" : "Nouvelle partie" }}
      </button>

      <NuxtLink
        v-if="resumeCode"
        :to="`/play/${resumeCode}`"
        class="inline-flex items-center justify-center rounded-full border border-primaire/40 px-8 py-3 text-sm font-bold uppercase tracking-widest text-primaire transition hover:border-primaire"
      >
        Reprendre ({{ resumeCode }})
      </NuxtLink>
    </div>

    <p v-if="error" class="text-sm text-alerte">{{ error }}</p>

    <NuxtLink
      to="/"
      class="text-xs font-semibold uppercase tracking-widest text-primaire/50 transition hover:text-primaire"
    >
      Retour au site
    </NuxtLink>
  </div>
</template>
