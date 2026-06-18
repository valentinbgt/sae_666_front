<template>
  <nav class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
    <!-- Logo -->
    <NuxtLink :to="localePath('/')">
      <img src="/images/logo_crooak.png" alt="CROOAK" class="h-12 w-auto" />
    </NuxtLink>

    <!-- Liens nav -->
    <ul class="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
      <li><NuxtLink :to="localePath('/')" class="navlink">{{ $t('nav.game') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/regles')" class="navlink">{{ $t('nav.rules') }}</NuxtLink></li>
      <li><NuxtLink :to="localePath('/actualites')" class="navlink">{{ $t('nav.news') }}</NuxtLink></li>
    </ul>

    <!-- Boutons -->
    <div class="flex items-center gap-3">
      <!-- Sélecteur de langue avec drapeau (Hover) -->
      <div class="relative hidden sm:block mr-2 group z-50">
        <button class="flex items-center gap-2 text-xs font-bold text-white uppercase px-3 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
          <span>{{ locale === 'fr' ? '🇫🇷' : '🇬🇧' }}</span>
          <Icon name="ph:caret-down-bold" class="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
        </button>

        <div class="absolute top-full right-0 mt-2 bg-[#2E150D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
          <NuxtLink 
            v-if="locale !== 'fr'"
            :to="switchLocalePath('fr')" 
            class="flex items-center gap-3 px-5 py-3 text-xs font-bold text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>🇫🇷</span> Français
          </NuxtLink>
          <NuxtLink 
            v-if="locale !== 'en'"
            :to="switchLocalePath('en')" 
            class="flex items-center gap-3 px-5 py-3 text-xs font-bold text-white/80 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>🇬🇧</span> English
          </NuxtLink>
        </div>
      </div>

      <NuxtLink :to="localePath('/precommander')" class="btn-filled hidden md:inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">
        {{ $t('nav.preorder') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/login')" class="btn-filled inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase">
        {{ $t('nav.app') }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>
