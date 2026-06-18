<template>
  <nav class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
    <!-- Logo -->
    <NuxtLink to="/">
      <img src="/images/logo_crooak.png" alt="CROOAK" class="h-12 w-auto" />
    </NuxtLink>

    <!-- Liens nav -->
    <ul class="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
      <li><NuxtLink to="/" class="navlink">Le jeu</NuxtLink></li>
      <li><NuxtLink to="/regles" class="navlink">Règles</NuxtLink></li>
      <li><NuxtLink to="/actualites" class="navlink">Actualités</NuxtLink></li>
    </ul>

    <!-- Boutons -->
    <div class="flex items-center gap-3">
      <NuxtLink to="/precommander" class="btn-filled hidden md:inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">
        Précommander
      </NuxtLink>
      <NuxtLink to="/login" class="btn-filled inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">
        Appli
      </NuxtLink>
    </div>
  </nav>
</template>
