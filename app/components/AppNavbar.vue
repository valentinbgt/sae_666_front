<template>
  <nav
    class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
  >
    <!-- Logo -->
    <NuxtLink to="/">
      <img src="/images/logo_crooak.png" alt="CROOAK" class="h-12 w-auto" />
    </NuxtLink>

    <!-- Liens nav -->
    <ul
      class="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase"
    >
      <li><NuxtLink to="/le-jeu" class="navlink">Le jeu</NuxtLink></li>
      <li><NuxtLink to="/regles" class="navlink">Règles</NuxtLink></li>
      <li>
        <NuxtLink to="/qui-sommes-nous" class="navlink"
          >Qui sommes-nous ?</NuxtLink
        >
      </li>
      <li><NuxtLink to="/actualites" class="navlink">Actualités</NuxtLink></li>
    </ul>

    <!-- Boutons -->
    <div class="flex items-center gap-3">
      <!-- Indicateur de connexion -->
      <template v-if="isLoggedIn">
        <span
          class="hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/70"
        >
          <span class="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_1px_rgba(74,222,128,0.7)]" />
          Connecté
        </span>
        <NuxtLink
          to="/logout"
          class="hidden md:inline-flex items-center px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 text-xs font-semibold tracking-widest uppercase transition-colors"
        >
          Déconnexion
        </NuxtLink>
      </template>
      <NuxtLink
        v-else
        to="/login"
        class="hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/50 hover:text-white/80 transition-colors"
      >
        <span class="w-2 h-2 rounded-full bg-white/30" />
        Se connecter
      </NuxtLink>

      <NuxtLink
        to="/precommander"
        class="btn-filled hidden md:inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase"
      >
        Précommander
      </NuxtLink>
      <NuxtLink
        to="/play"
        class="btn-filled inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase"
      >
        Jouer
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { token } = useApi()
const isLoggedIn = computed(() => !!token.value)
</script>
