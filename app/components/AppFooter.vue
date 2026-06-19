<script setup lang="ts">
const { email, loading, success, error, subscribe } = useNewsletter()
const localePath = useLocalePath()
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
              class="bg-[#431E14] text-[#F3E7D3] px-6 py-3 rounded-full outline-none placeholder:text-[#F3E7D3]/40 border border-[#431E14] focus:border-[#BD652E] transition-colors w-full max-w-[250px]"
            />
            <button
              type="submit"
              :disabled="loading"
              class="bg-[#BD652E] hover:bg-[#A35222] text-[#F3E7D3] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors shrink-0 disabled:opacity-50"
            >
              {{ loading ? $t('footer.nl_loading') : $t('footer.nl_btn') }}
            </button>
          </div>
          <div class="flex items-start gap-3 text-xs text-white/70 mt-3 max-w-md">
            <input type="checkbox" id="rgpd-footer" required class="mt-1 w-4 h-4 accent-[#BD652E] cursor-pointer shrink-0" />
            <label for="rgpd-footer" class="leading-snug cursor-pointer">{{ $t('news.nl_rgpd') }}</label>
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
