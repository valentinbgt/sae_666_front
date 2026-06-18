<template>
  <footer class="bg-[#2E150D] text-[#F3E7D3] pt-20 pb-8 px-6 md:px-16 w-full border-t border-white/5 relative z-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
      <!-- Left Section -->
      <div class="flex-1 max-w-md">
        <h3 class="text-3xl font-bold mb-6" style="font-family: Georgia, serif;">Restez à l'affût du marais</h3>
        <p class="text-sm opacity-80 mb-8 leading-relaxed max-w-[90%]">
          Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles, les aperçus des extensions et des offres exclusives.
        </p>
        <form class="flex items-center gap-4" @submit.prevent>
          <input 
            type="email" 
            placeholder="Votre email" 
            class="bg-[#431E14] text-[#F3E7D3] px-6 py-3 rounded-full outline-none placeholder:text-[#F3E7D3]/40 border border-[#431E14] focus:border-[#BD652E] transition-colors w-full max-w-[250px]"
          />
          <button 
            type="submit" 
            class="bg-[#BD652E] hover:bg-[#A35222] text-[#F3E7D3] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors shrink-0"
          >
            S'abonner
          </button>
        </form>
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
      <p class="text-[10px] tracking-widest uppercase opacity-50 font-semibold text-center md:text-left">
        TEAM MMI — © 2025 CROOAK — TOUS DROITS RÉSERVÉS. NE PAS AVALER LES PETITES PIÈCES.
      </p>
      
      <div class="flex gap-8 text-[10px] tracking-widest uppercase opacity-50 font-semibold">
        <NuxtLink to="#" class="hover:opacity-100 transition-opacity">Mentions Légales</NuxtLink>
        <NuxtLink to="#" class="hover:opacity-100 transition-opacity">Confidentialité</NuxtLink>
        <NuxtLink to="#" class="hover:opacity-100 transition-opacity">Contact</NuxtLink>
      </div>
    </div>
  </footer>
</template>
