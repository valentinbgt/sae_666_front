<script setup lang="ts">
const { email, loading, success, error, subscribe } = useNewsletter()
const localePath = useLocalePath()
const rgpdAccepted = ref(false)
</script>

<template>
  <footer class="bg-[#2E150D] text-[#F3E7D3] pt-20 pb-8 px-6 md:px-16 w-full border-t border-white/5 relative z-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
      <!-- Left Section -->
      <div class="flex-1 max-w-md">
        <h3 class="text-3xl font-bold mb-6" style="font-family: Georgia, serif;">{{ $t('footer.nl_title') }}</h3>
        <p class="text-sm opacity-80 mb-8 leading-relaxed max-w-[90%]">
          {{ $t('footer.nl_sub') }}
        </p>
        <form class="flex flex-col gap-3" @submit.prevent="subscribe">
          <div class="flex items-center gap-4">
            <input
              v-model="email"
              type="email"
              :placeholder="$t('footer.nl_placeholder')"
              required
              class="bg-secondaire text-[#F3E7D3] px-6 py-3 rounded-full outline-none placeholder:text-[#F3E7D3]/40 border border-secondaire focus:border-cta transition-colors w-full max-w-62.5"
            />
            <button
              type="submit"
              :disabled="loading"
              class="bg-cta hover:bg-[#A35222] text-[#F3E7D3] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors shrink-0 disabled:opacity-50"
            >
              {{ loading ? $t('footer.nl_loading') : $t('footer.nl_btn') }}
            </button>
          </div>
          <div class="mt-3 max-w-md">
            <label class="flex items-start gap-2.5 cursor-pointer group">
              <input
                v-model="rgpdAccepted"
                type="checkbox"
                required
                class="peer sr-only"
              />
              <span
                class="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 border-white/30 bg-transparent grid place-items-center transition-all duration-200 group-hover:border-cta/60 peer-checked:bg-cta peer-checked:border-cta peer-checked:[&>svg]:scale-100 peer-focus-visible:ring-2 peer-focus-visible:ring-cta/40 peer-focus-visible:ring-offset-0"
              >
                <svg
                  class="w-3 h-3 text-white scale-0 transition-transform duration-200"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
              </span>
              <span class="text-xs text-white/70 leading-snug">{{ $t('news.nl_rgpd') }}</span>
            </label>
          </div>
        </form>
        <p v-if="success" class="text-validation text-xs mt-2">{{ $t('footer.nl_success') }}</p>
        <p v-if="error" class="text-alerte text-xs mt-2">{{ $t('footer.nl_error') }}</p>
      </div>



      <!-- Right Section -->
      <div class="flex flex-col items-start md:items-end gap-6 mt-8 md:mt-0">
        <img src="/images/logo_crooak.png" alt="CROOAK" class="h-16 w-auto" />
        <div class="flex gap-6 mt-4">
          <NuxtLink to="#" class="opacity-70 hover:opacity-100 transition-opacity">
            <Icon name="ph:x-logo" class="w-6 h-6" />
          </NuxtLink>
          <NuxtLink to="#" class="opacity-70 hover:opacity-100 transition-opacity">
            <Icon name="ph:discord-logo" class="w-6 h-6" />
          </NuxtLink>
          <NuxtLink to="#" class="opacity-70 hover:opacity-100 transition-opacity">
            <Icon name="ph:linkedin-logo" class="w-6 h-6" />
          </NuxtLink>
          <NuxtLink to="#" class="opacity-70 hover:opacity-100 transition-opacity">
            <Icon name="ph:instagram-logo" class="w-6 h-6" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-[#F3E7D3]/10 pt-8 gap-6">
        <div class="flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-white/50 tracking-widest uppercase gap-4 md:gap-8">
          <div class="flex items-center gap-2">
            <span>TEAM MMI TROYES-CASTRE</span>
            <span>—</span>
            <span>{{ $t('footer.rights') }}</span>
          </div>
          <div class="flex items-center gap-6">
            <NuxtLink :to="localePath('/mentions')" class="hover:text-white transition-colors">{{ $t('footer.legal') }}</NuxtLink>
            <NuxtLink :to="localePath('/confidentialite')" class="hover:text-white transition-colors">{{ $t('footer.privacy') }}</NuxtLink>
          </div>
        </div>
    </div>
  </footer>
</template>
