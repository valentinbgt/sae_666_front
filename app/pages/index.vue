<template>
  <div class="min-h-screen" style="background: linear-gradient(to bottom right, #431E14 0%, #431E14 40%, #BD652E 100%);">

    <!-- Hero -->
    <section
      class="relative min-h-screen flex items-center overflow-hidden"
    >
      <!-- Image de fond (parallax au scroll, défile plus lentement = lointain) -->
      <div
        class="parallax absolute inset-y-[-30%] inset-x-0 bg-no-repeat opacity-15"
        data-parallax="-0.6"
        style="background-image: url('/images/assets/chemin1.png'); background-size: 100% auto; background-position: center;"
      />

      <!-- Contenu -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-8 pt-28 pb-16 flex items-center justify-between gap-12">

        <!-- Texte gauche -->
        <div class="flex-1 max-w-xl">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 border border-primaire/40 rounded-full px-4 py-1.5 mb-8 animate-fade-up">
            <svg class="w-3.5 h-3.5 text-primaire/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-primaire/80 text-xs font-semibold tracking-widest uppercase">
              {{ $t('home.hero_badge') }}
            </span>
          </div>

          <!-- Titre -->
          <h1 class="text-primaire text-6xl font-bold leading-tight mb-6 animate-fade-up delay-100" style="font-family: Georgia, serif;" v-html="$t('home.hero_title')"></h1>

          <!-- Description -->
          <p class="text-primaire/70 text-base leading-relaxed mb-10 max-w-md animate-fade-up delay-200" v-html="$t('home.hero_desc')"></p>

          <!-- Boutons -->
          <div class="flex items-center gap-4 animate-fade-up delay-300">
            <a
              href="#discover"
              class="inline-flex items-center px-6 py-3 rounded-full text-primaire text-xs font-bold tracking-widest uppercase btn-filled"
            >
              {{ $t('home.hero_btn_game') }}
            </a>
            <a
              href="#map-section"
              class="inline-flex items-center px-6 py-3 rounded-full border border-primaire/50 text-primaire text-xs font-bold tracking-widest uppercase hover:border-primaire transition"
            >
              {{ $t('home.hero_btn_map') }}
            </a>
          </div>
        </div>

        <!-- Carte droite animée -->
        <div class="hidden lg:flex flex-col items-center justify-center flex-1 max-w-sm relative right-16">
          <div class="relative w-full h-[500px] flex items-center justify-center cursor-pointer group">
            
            <!-- Card 1 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-10
                        -rotate-6 -translate-x-4 translate-y-4
                        group-hover:-translate-x-[130px] group-hover:translate-y-[30px] group-hover:-rotate-[15deg]
                        hover:!-mt-24 hover:!-ml-32">
              <div class="card-float delay-1 rounded-3xl shadow-card-stack border border-white/20 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/recto_carte.png" alt="Carte 1" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 2 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20
                        -rotate-3 -translate-x-2 translate-y-2
                        group-hover:-translate-x-[65px] group-hover:translate-y-[10px] group-hover:-rotate-[7deg]
                        hover:!-mt-24 hover:!-ml-32">
              <div class="card-float rounded-3xl shadow-card-stack border border-white/30 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/carte3.webp" alt="Carte 2" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 3 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-30
                        rotate-0 translate-x-0 translate-y-0
                        group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
                        hover:!-mt-24 hover:!-ml-32">
              <div class="card-float delay-1 rounded-3xl shadow-card-stack border border-white/40 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/carte4.webp" alt="Carte 3" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 4 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-40
                        rotate-3 translate-x-2 translate-y-2
                        group-hover:translate-x-[65px] group-hover:translate-y-[10px] group-hover:rotate-[7deg]
                        hover:!-mt-24 hover:!-ml-32">
              <div class="card-float rounded-3xl shadow-card-stack border border-white/50 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/carte5.webp" alt="Carte 4" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 5 (Top) -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-50
                        rotate-6 translate-x-4 translate-y-4
                        group-hover:translate-x-[130px] group-hover:translate-y-[30px] group-hover:rotate-[15deg]
                        hover:!-mt-24 hover:!-ml-32">
              <div class="card-float delay-1 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/60 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/verso_carte.png" alt="Carte 5" class="w-full h-auto block" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- Section 2 : Les Piliers -->
    <section id="discover" class="relative w-full pt-24 pb-12 px-8 overflow-visible">
      <div class="max-w-7xl mx-auto relative z-10">
        
        <!-- En-tête -->
        <div class="mb-16 max-w-2xl reveal">
          <p class="text-[#E7D6B9] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
            <span class="w-6 h-px bg-[#E7D6B9]"></span> {{ $t('home.sec2_kicker') }}
          </p>
          <h2 class="text-[#F3E7D3] text-5xl md:text-6xl font-bold leading-tight" style="font-family: Georgia, serif;" v-html="$t('home.sec2_title')"></h2>
        </div>

        <!-- Grille de cartes -->
        <div class="flex flex-col gap-6">
          <!-- Ligne 1 : 3 cartes -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Carte 1 -->
            <div class="reveal h-full">
              <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white group h-full">
                <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3] transition-all duration-300 group-hover:bg-[#BD652E] group-hover:scale-110">
                  <Icon name="ph:navigation-arrow-fill" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $t('home.pil1_title') }}</h3>
                <p class="text-sm opacity-80 leading-relaxed">
                  {{ $t('home.pil1_desc') }}
                </p>
              </div>
            </div>

            <!-- Carte 2 -->
            <div class="reveal reveal-delay-100 h-full">
              <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white group h-full">
                <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3] transition-all duration-300 group-hover:bg-[#BD652E] group-hover:scale-110">
                  <Icon name="ph:users-fill" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $t('home.pil2_title') }}</h3>
                <p class="text-sm opacity-80 leading-relaxed">
                  {{ $t('home.pil2_desc') }}
                </p>
              </div>
            </div>

            <!-- Carte 3 -->
            <div class="reveal reveal-delay-200 h-full">
              <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white group h-full">
                <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3] transition-all duration-300 group-hover:bg-[#BD652E] group-hover:scale-110">
                  <Icon name="ph:info-fill" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $t('home.pil3_title') }}</h3>
                <p class="text-sm opacity-80 leading-relaxed">
                  {{ $t('home.pil3_desc') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Ligne 2 : 2 cartes (centrées) -->
          <div class="flex flex-col md:flex-row justify-center gap-6 relative">
            
            <!-- Déco roche abstracte -->
            <div class="absolute -left-12 -bottom-8 pointer-events-none hidden lg:block reveal reveal-delay-200">
              <div class="parallax" data-parallax="0.5">
                <img src="/images/assets/pierre.png" alt="Décoration pierre" class="w-32 h-auto" />
              </div>
            </div>
            <!-- Carte 4 -->
            <div class="md:w-[calc(33.333%-16px)] w-full reveal reveal-delay-100">
              <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white group h-full">
                <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3] transition-all duration-300 group-hover:bg-[#BD652E] group-hover:scale-110">
                  <Icon name="ph:shapes-fill" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $t('home.pil4_title') }}</h3>
                <p class="text-sm opacity-80 leading-relaxed">
                  {{ $t('home.pil4_desc') }}
                </p>
              </div>
            </div>

            <!-- Carte 5 -->
            <div class="md:w-[calc(33.333%-16px)] w-full reveal reveal-delay-200">
              <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:bg-white group h-full">
                <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3] transition-all duration-300 group-hover:bg-[#BD652E] group-hover:scale-110">
                  <Icon name="ph:eye-fill" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $t('home.pil5_title') }}</h3>
                <p class="text-sm opacity-80 leading-relaxed">
                  {{ $t('home.pil5_desc') }}
                </p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 3 : COMMENT JOUER -->
    <section class="w-full pt-24 pb-24 relative z-10 flex flex-col items-center" style="background: linear-gradient(to bottom, rgba(46, 21, 13, 0) 0%, #2E150D 250px, #2E150D 100%);">
      <div class="max-w-5xl w-full px-6 flex flex-col items-center">
        <!-- Header -->
        <div class="flex flex-col items-center text-center mb-24 reveal">
          <div class="flex flex-col items-center gap-4 mb-8">
            <Icon name="ph:book-open" class="w-7 h-7 text-[#F3E7D3]" />
            <span class="text-[#F3E7D3] text-xs font-bold tracking-[0.2em] uppercase opacity-80">
              {{ $t('home.sec3_kicker') }}
            </span>
          </div>
          <h2 class="text-[#F3E7D3] text-5xl md:text-6xl font-bold leading-tight" style="font-family: Georgia, serif;" v-html="$t('home.sec3_title')"></h2>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20 w-full">
          
          <!-- Item 1 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full reveal">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">01</span>
                <img src="/images/assets/grenouille.png" alt="Grenouille" class="h-24 object-contain -mt-4 opacity-90 hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.act1_title') }}</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              {{ $t('home.act1_desc') }}
            </p>
          </div>

          <!-- Item 2 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full reveal reveal-delay-100">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">02</span>
              
              <!-- Carte stylisée -->
                <div class="relative w-16 h-24 -mt-2 bg-[#BD652E] rounded-xl p-[1.5px] shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform rotate-6 hover:-translate-y-4 hover:rotate-12 hover:scale-110 transition-all duration-300 z-10 border border-white/40 group cursor-pointer">
                  <div class="w-full h-full rounded-[10px] overflow-hidden relative">
                    <img src="/images/assets/carte_terrin.webp" alt="Carte Terrain" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <!-- Reflet vitré (glassmorphism) sur la carte -->
                    <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>
                </div>
              </div>

            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.act2_title') }}</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              {{ $t('home.act2_desc') }}
            </p>
          </div>

          <!-- Item 3 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full reveal">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">03</span>
                <img src="/images/assets/pierre_section3.png" alt="Objets" class="h-24 object-contain -mt-4 opacity-90 hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.act3_title') }}</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              {{ $t('home.act3_desc') }}
            </p>
          </div>

          <!-- Item 4 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full reveal reveal-delay-100">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">04</span>
                <img src="/images/assets/coffre_section3.png" alt="Coffre" class="h-24 object-contain -mt-4 opacity-90 hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.act4_title') }}</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              {{ $t('home.act4_desc') }}
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- WRAPPER SECTIONS 4 & 5 (Image de fond unifiée) -->
    <div class="relative w-full overflow-hidden">
      <!-- Fond parallax (chemin_4_5.webp) : défile plus lentement que le
           contenu (vitesse négative = effet de profondeur). La couche déborde
           de 30 % en haut et en bas pour avoir de la marge de translation, le
           débordement est rogné par l'overflow-hidden du wrapper. -->
      <div
        class="parallax absolute inset-y-[-30%] inset-x-0 z-0 opacity-25 pointer-events-none bg-cover bg-top"
        data-parallax="-0.6"
        style="background-image: url('/images/assets/chemin_4_5.webp');"
      ></div>

      <!-- SECTION 4 : LA VISION -->
      <section class="relative z-10 w-full pt-16 pb-32 flex flex-col items-center" style="background: linear-gradient(to bottom, #2E150D 0%, rgba(46, 21, 13, 0) 400px);">

      <!-- Content -->
      <div class="max-w-5xl w-full px-6 relative z-10 flex flex-col items-center text-center">
        <!-- Header -->
        <div class="reveal">
          <span class="text-[#E7D6B9] text-xs font-bold tracking-[0.2em] uppercase mb-6 mt-16 block">
            {{ $t('home.sec4_kicker') }}
          </span>
          <h2 class="text-[#F3E7D3] text-5xl md:text-6xl font-bold leading-tight mb-12" style="font-family: Georgia, serif;" v-html="$t('home.sec4_title')"></h2>
        </div>

        <!-- Decorations (Champignon et Empreinte) -->
        <div class="parallax absolute left-0 md:left-8 top-70 pointer-events-none hidden md:block" data-parallax="0.5">
          <img src="/images/assets/champignon.png" alt="Champignon" class="w-16 md:w-20 opacity-40 -rotate-12" />
        </div>
        <div class="parallax absolute right-0 md:right-16 top-32 pointer-events-none hidden md:block" data-parallax="0.5">
          <img src="/images/assets/main_grenouille.png" alt="Empreinte" class="w-16 md:w-20 opacity-30 rotate-12" />
        </div>

        <!-- Paragraph -->
        <p class="text-[#F3E7D3]/80 text-lg md:text-xl leading-relaxed max-w-3xl mb-24 reveal">
          {{ $t('home.sec4_desc') }}
        </p>

        <!-- 3 Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <!-- Card 1 -->
          <div class="reveal h-full">
            <div class="bg-[#2E150D] rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl transition-transform duration-300 ease-out hover:-translate-y-2 border border-white/5 h-full">
              <Icon name="ph:stack" class="w-8 h-8 text-[#E7D6B9] mb-6" />
              <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.vis1_title') }}</h3>
              <p class="text-[#F3E7D3]/60 text-sm leading-relaxed">
                {{ $t('home.vis1_desc') }}
              </p>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="reveal reveal-delay-100 h-full">
            <div class="bg-[#2E150D] rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl transition-transform duration-300 ease-out hover:-translate-y-2 border border-white/5 h-full">
              <Icon name="ph:map-pin" class="w-8 h-8 text-[#E7D6B9] mb-6" />
              <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.vis2_title') }}</h3>
              <p class="text-[#F3E7D3]/60 text-sm leading-relaxed">
                {{ $t('home.vis2_desc') }}
              </p>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="reveal reveal-delay-200 h-full">
            <div class="bg-[#2E150D] rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl transition-transform duration-300 ease-out hover:-translate-y-2 border border-white/5 h-full">
              <Icon name="ph:user" class="w-8 h-8 text-[#E7D6B9] mb-6" />
              <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">{{ $t('home.vis3_title') }}</h3>
              <p class="text-[#F3E7D3]/60 text-sm leading-relaxed">
                {{ $t('home.vis3_desc') }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION MAP : PARTENAIRES -->
    <section id="map-section" class="relative z-10 w-full py-24 flex flex-col items-center">
      <div class="max-w-6xl w-full px-6 flex flex-col md:flex-row items-center gap-16">
        
        <!-- Texte gauche -->
        <div class="flex-1 text-center md:text-left reveal">
          <span class="text-[#BD652E] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            {{ $t('preorder.map_kicker') }}
          </span>
          <h2 class="text-[#F3E7D3] text-4xl md:text-5xl font-bold leading-tight mb-6" style="font-family: Georgia, serif;" v-html="$t('preorder.map_title')"></h2>
          <p class="text-[#F3E7D3]/80 text-lg leading-relaxed mb-8">
            {{ $t('preorder.map_desc') }}
          </p>

          <!-- Liste des boutiques -->
          <div class="flex flex-col gap-4">
            <div class="bg-[#2E150D] border border-[#BD652E]/30 rounded-2xl p-6 flex items-start gap-4 hover:border-[#BD652E] transition-colors cursor-pointer group shadow-sm">
              <div class="bg-[#BD652E] text-white w-12 h-12 shrink-0 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="ph:map-pin-fill" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="text-[#F3E7D3] font-bold text-lg mb-1">{{ $t('preorder.map_shop_name') }}</h4>
                <p class="text-[#F3E7D3]/60 text-sm">{{ $t('preorder.map_shop_address') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Carte droite -->
        <div class="flex-1 w-full h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#2E150D] relative bg-[#2E150D] reveal reveal-delay-200">
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=4.0807,48.2669,4.0887,48.2729&amp;layer=mapnik&amp;marker=48.2699,4.0847" 
            style="border: 0; filter: invert(90%) hue-rotate(180deg) sepia(20%) contrast(110%); pointer-events: auto;"
          ></iframe>
        </div>

      </div>
    </section>

    <!-- SECTION 5 : CALL TO ACTION -->
    <section class="relative z-10 w-full pt-16 pb-40 flex flex-col items-center">

      <!-- Content -->
      <div class="max-w-4xl w-full px-6 relative z-10 flex flex-col items-center text-center">
        
        <!-- Logo Couronne (Favicon) -->
        <img src="/favicon.png" alt="Logo Crooak" class="w-24 h-24 md:w-28 md:h-28 object-contain mb-8 drop-shadow-md" />

        <!-- Titre -->
        <h2 class="text-[#F3E7D3] text-5xl md:text-7xl font-bold leading-tight mb-8" style="font-family: Georgia, serif;" v-html="$t('home.sec5_title')"></h2>

        <!-- Paragraphe -->
        <p class="text-[#F3E7D3]/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
          {{ $t('home.sec5_desc') }}
        </p>

        <!-- Boutons -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Bouton Précommander -->
          <NuxtLink :to="localePath('/precommander')" class="bg-[#2E150D] text-[#F3E7D3] px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#1A0A06] transition-colors shadow-lg">
            {{ $t('home.sec5_btn_preorder') }}
          </NuxtLink>

          <!-- Bouton Découvrir -->
          <NuxtLink :to="localePath('/precommander')" class="bg-[#F3E7D3] border border-[#F3E7D3] text-[#2E150D] px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#F3E7D3] hover:text-[#2E150D] transition-colors shadow-lg">
            {{ $t('home.sec5_btn_deluxe') }}
          </NuxtLink>
        </div>

      </div>
    </section>

    </div>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const localePath = useLocalePath()

// Parallax au scroll sur les décorations et le fond des sections 4/5
// (éléments porteurs de l'attribut data-parallax). Respecte prefers-reduced-motion.
useScrollParallax()

let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
