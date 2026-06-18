<template>
  <div class="bg-gradient-to-b from-[#2E150D] via-[#B86532] to-[#2E150D] min-h-screen relative font-sans overflow-hidden" style="color: var(--color-primaire);">
    <!-- Background Path Image -->
    <div 
      class="absolute inset-0 z-0 opacity-15 pointer-events-none" 
      style="background-image: url('/images/assets/chemin1.png'); background-size: cover; background-position: top center; mix-blend-mode: overlay;"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32">
      
      <!-- Section 1: Hero -->
      <section class="text-center mb-32 animate-fade-up">
        <h1 class="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg" style="font-family: Georgia, serif;" v-html="$t('rules.title')"></h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-10" v-html="$t('rules.desc')"></p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="/regles_jeu.pdf" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primaire/50 text-primaire text-xs font-bold tracking-widest uppercase hover:border-primaire transition">
            <Icon name="ph:download-simple-bold" class="w-4 h-4" />
            {{ $t('rules.pdf_btn') }}
          </a>
        </div>
      </section>

      <!-- Section Video Tutorial -->
      <section class="mb-40 max-w-4xl mx-auto animate-fade-up animate-delay-200">
        <h2 class="text-3xl md:text-4xl font-bold mb-8 text-center" style="font-family: Georgia, serif;">{{ $t('rules.video_title') }}</h2>
        <div class="rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-black relative aspect-video">
          <iframe 
            class="absolute top-0 left-0 w-full h-full" 
            src="https://www.youtube.com/embed/PhijKyzApcA" 
            title="Tutoriel Vidéo Crooak" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </section>

      <!-- Section 2: Une quête -->
      <section class="flex flex-col md:flex-row items-center justify-between mb-40 gap-16">
        <div class="md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold mb-6" style="font-family: Georgia, serif;">{{ $t('rules.quest_title') }}</h2>
          <div class="space-y-4 opacity-80 leading-relaxed text-sm md:text-base">
            <p>{{ $t('rules.quest_p1') }}</p>
            <p>{{ $t('rules.quest_p2') }}</p>
            <p>{{ $t('rules.quest_p3') }}</p>
          </div>
        </div>
        <div class="md:w-5/12 bg-[#2E150D] p-8 md:p-10 rounded-3xl shadow-2xl border border-white/5">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
              <Icon name="ph:target" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-3 text-white">{{ $t('rules.obj_title') }}</h3>
              <p class="opacity-70 text-sm leading-relaxed">{{ $t('rules.obj_desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Quatre éléments -->
      <section class="mb-40 relative py-12">
        <!-- Background path for this specific section -->
        <div 
          class="absolute inset-y-0 z-0 pointer-events-none w-[100vw] left-1/2 -translate-x-1/2 opacity-20" 
          style="background-image: url('/images/assets/chemin1.png'); background-size: cover; background-position: center;"
        ></div>

        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;" v-html="$t('rules.elem_title')"></h2>
          <p class="opacity-80 mb-12">{{ $t('rules.elem_desc') }}</p>

        <div class="flex flex-col lg:flex-row gap-12 stretch">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3">
            <!-- Cards -->
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">01</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">01</div>
              <h3 class="text-xl font-bold text-white mb-3">{{ $t('rules.elem1_title') }}</h3>
              <p class="text-sm opacity-70">{{ $t('rules.elem1_desc') }}</p>
            </div>
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">02</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">02</div>
              <h3 class="text-xl font-bold text-white mb-3">{{ $t('rules.elem2_title') }}</h3>
              <p class="text-sm opacity-70">{{ $t('rules.elem2_desc') }}</p>
            </div>
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">03</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">03</div>
              <h3 class="text-xl font-bold text-white mb-3">{{ $t('rules.elem3_title') }}</h3>
              <p class="text-sm opacity-70">{{ $t('rules.elem3_desc') }}</p>
            </div>
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">04</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">04</div>
              <h3 class="text-xl font-bold text-white mb-3">{{ $t('rules.elem4_title') }}</h3>
              <p class="text-sm opacity-70">{{ $t('rules.elem4_desc') }}</p>
            </div>
          </div>
          <!-- Illustration Grenouille -->
          <div class="lg:w-1/3 flex justify-center items-end opacity-80 mix-blend-screen">
            <img src="/images/assets/grenouille.png" alt="Grenouille" class="max-w-[200px] object-contain drop-shadow-2xl" />
          </div>
        </div>
        </div>
      </section>

      <!-- Section 4: Mise en place -->
      <section class="mb-40">
        <h2 class="text-3xl md:text-4xl font-bold mb-16" style="font-family: Georgia, serif;">{{ $t('rules.setup_title') }}</h2>
        
        <div class="space-y-12 max-w-4xl">
          <!-- Step 1 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">01</div>
            <div>
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">{{ $t('rules.set1_title') }}</h3>
              <p class="opacity-80 text-sm">{{ $t('rules.set1_desc') }}</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>
          
          <!-- Step 2 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">02</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">{{ $t('rules.set2_title') }}</h3>
              <p class="opacity-80 text-sm">{{ $t('rules.set2_desc') }}</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>

          <!-- Step 3 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">03</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">{{ $t('rules.set3_title') }}</h3>
              <p class="opacity-80 text-sm">{{ $t('rules.set3_desc') }}</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>

          <!-- Step 4 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">04</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">{{ $t('rules.set4_title') }}</h3>
              <p class="opacity-80 text-sm">{{ $t('rules.set4_desc') }}</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>

          <!-- Step 5 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">05</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">{{ $t('rules.set5_title') }}</h3>
              <p class="opacity-80 text-sm">{{ $t('rules.set5_desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Quatre actions -->
      <section class="mb-40">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">{{ $t('rules.act_title') }}</h2>
          <p class="opacity-80">{{ $t('rules.act_desc') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto mb-16 relative">
          <!-- Central vertical line for desktop -->
          <div class="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/10 transform -translate-x-1/2"></div>
          
          <!-- Action 1 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">01</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">{{ $t('rules.act1_title') }}</h3>
            <p class="text-sm opacity-80 leading-relaxed">{{ $t('rules.act1_desc') }}</p>
          </div>
          <!-- Action 2 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">02</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">{{ $t('rules.act2_title') }}</h3>
            <p class="text-sm opacity-80 leading-relaxed">{{ $t('rules.act2_desc') }}</p>
          </div>
          <!-- Action 3 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">03</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">{{ $t('rules.act3_title') }}</h3>
            <p class="text-sm opacity-80 leading-relaxed">{{ $t('rules.act3_desc') }}</p>
          </div>
          <!-- Action 4 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">04</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">{{ $t('rules.act4_title') }}</h3>
            <p class="text-sm opacity-80 leading-relaxed">{{ $t('rules.act4_desc') }}</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
          <!-- Box -->
          <div class="bg-[#F3E7D3] text-[#2E150D] p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:w-[60%]">
            <h3 class="font-bold text-xl mb-6">{{ $t('rules.wheel_title') }}</h3>
            <ul class="list-disc pl-5 space-y-3 text-sm opacity-90 marker:text-[#2E150D]">
              <li>{{ $t('rules.wheel_l1') }}</li>
              <li>{{ $t('rules.wheel_l2') }}</li>
              <li v-html="$t('rules.wheel_l3')"></li>
              <li>{{ $t('rules.wheel_l4') }}</li>
            </ul>
          </div>
          <!-- Treasure chest -->
          <div class="md:w-[40%] flex justify-center">
            <img src="/images/page_regles/coffre_regles.png" alt="Coffre au trésor" class="w-64 md:w-80 object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <!-- Section 6: Tuiles et embûches -->
      <section class="mb-40">
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">{{ $t('rules.tile_title') }}</h2>
        <p class="opacity-80 mb-12">{{ $t('rules.tile_desc') }}</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">{{ $t('rules.t1_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.t1_desc') }}</p>
          </div>
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">{{ $t('rules.t2_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.t2_desc') }}</p>
          </div>
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">{{ $t('rules.t3_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.t3_desc') }}</p>
          </div>
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">{{ $t('rules.t4_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.t4_desc') }}</p>
          </div>
        </div>
      </section>

      <!-- Section 7: Cartes action -->
      <section>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">{{ $t('rules.card_title') }}</h2>
        <p class="opacity-80 mb-12">{{ $t('rules.card_desc') }}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c1_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c1_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c2_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c2_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c3_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c3_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c4_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c4_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c5_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c5_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c6_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c6_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c7_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c7_desc') }}</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">{{ $t('rules.c8_title') }}</h3>
            <p class="text-xs opacity-70">{{ $t('rules.c8_desc') }}</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
// Page logic if needed
useHead({
  title: 'Règles - Crooak'
})
</script>
