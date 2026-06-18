<template>
  <div class="bg-primaire min-h-screen relative font-sans">
    
    <!-- HEADER HERO -->
    <section class="bg-[#2E150D] rounded-b-[40px] md:rounded-b-[80px] pt-40 pb-24 px-6 text-center shadow-xl relative z-10">
      <h1 class="text-5xl md:text-6xl text-primaire font-bold mb-6" style="font-family: Georgia, serif;">Actualités</h1>
      <p class="text-primaire/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        Plongez dans les eaux troubles mais passionnantes de Crooak. Découvrez les dernières mises à jour tactiques, les extensions à venir et rejoignez la communauté lors de nos tournois officiels.
      </p>
    </section>

    <!-- MAIN CONTENT -->
    <main class="max-w-4xl mx-auto px-6 py-20">
      
      <!-- Titre section -->
      <div class="text-center mb-16">
        <h2 class="text-[#2E150D] text-4xl font-bold mb-3" style="font-family: Georgia, serif;">Dernières Nouvelles</h2>
        <p class="text-[#2E150D]/60 text-sm">Restez à l'affût des secrets du marécage.</p>
      </div>

      <!-- Grande Carte A LA UNE -->
      <article class="bg-white rounded-2xl p-8 mb-8 border border-[#2E150D]/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] cursor-pointer group hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all">
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-cta text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">À LA UNE</span>
        </div>
        <div class="flex items-center gap-2 text-xs font-bold text-[#2E150D]/50 mb-3 tracking-widest uppercase">
          <span>15 MARS 2024</span>
          <span>•</span>
          <span>STRATÉGIE</span>
        </div>
        <h3 class="text-[#2E150D] text-2xl md:text-3xl font-bold mb-4 group-hover:text-cta transition-colors" style="font-family: Georgia, serif;">Nouvelle extension : Les Marais Maudits</h3>
        <p class="text-[#2E150D]/70 text-sm leading-relaxed max-w-3xl">
          L'horizon s'obscurcit sur le plateau de jeu. Cette nouvelle extension introduit des tuiles "Brouillard de Guerre" et des reliques interdites qui bousculeront vos stratégies les plus établies. Préparez vos grenouilles pour une aventure plus sombre.
        </p>
      </article>

      <!-- Cartes standard -->
      <div class="space-y-6 mb-16">
        
        <!-- Article 1 -->
        <article class="bg-white rounded-2xl p-6 border border-[#2E150D]/10 shadow-sm cursor-pointer group hover:shadow-md transition-all">
          <div class="text-[10px] font-bold text-cta mb-2 tracking-widest uppercase">08 MARS 2024</div>
          <h3 class="text-[#2E150D] text-lg font-bold mb-2 group-hover:text-cta transition-colors" style="font-family: Georgia, serif;">Guide Tactique : Le saut de la foi</h3>
          <p class="text-[#2E150D]/60 text-sm">
            Maîtrisez les déplacements avancés pour surprendre vos adversaires avant la pose de la tuile finale.
          </p>
        </article>

        <!-- Article 2 -->
        <article class="bg-white rounded-2xl p-6 border border-[#2E150D]/10 shadow-sm cursor-pointer group hover:shadow-md transition-all">
          <div class="text-[10px] font-bold text-cta mb-2 tracking-widest uppercase">02 MARS 2024</div>
          <h3 class="text-[#2E150D] text-lg font-bold mb-2 group-hover:text-cta transition-colors" style="font-family: Georgia, serif;">Communauté : Les fans créent leurs tuiles</h3>
          <p class="text-[#2E150D]/60 text-sm">
            Découvrez les meilleures créations du concours "Marshland Designer" de ce mois-ci.
          </p>
        </article>

      </div>

      <!-- Newsletter Box -->
      <div class="bg-[#2E150D] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div class="flex-1">
          <Icon name="ph:envelope-simple-fill" class="w-8 h-8 text-primaire mb-4" />
          <h3 class="text-primaire text-2xl font-bold mb-2" style="font-family: Georgia, serif;">Restez informé</h3>
          <p class="text-primaire/70 text-sm">Recevez les secrets du marécage directement.</p>
        </div>
        <div class="w-full md:w-auto">
          <button class="w-full bg-cta text-white font-bold text-sm px-12 py-4 rounded-xl uppercase tracking-widest hover:bg-[#c9733d] transition-colors shadow-lg">
            S'inscrire
          </button>
        </div>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'CROOAK – Actualités'
})
</script>
