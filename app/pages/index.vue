<template>
  <div class="min-h-screen" style="background: linear-gradient(to bottom right, #431E14 0%, #431E14 40%, #BD652E 100%);">

    <!-- Hero -->
    <section
      class="relative min-h-screen flex items-center overflow-hidden"
    >
      <!-- Image de fond -->
      <div
        class="absolute inset-0 bg-no-repeat opacity-15"
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
              Jeu de société tactique — 2 à 4 joueurs
            </span>
          </div>

          <!-- Titre -->
          <h1 class="text-primaire text-6xl font-bold leading-tight mb-6 animate-fade-up delay-100" style="font-family: Georgia, serif;">
            Le chemin<br />
            <em class="text-cta not-italic" style="font-style: italic;">se crée</em> en<br />
            avançant.
          </h1>

          <!-- Description -->
          <p class="text-primaire/70 text-base leading-relaxed mb-10 max-w-md animate-fade-up delay-200">
            Prenez la tête d'une expédition de grenouilles héroïques. Construisez le marais, tendez des pièges
            et soyez le premier à conquérir le Trésor Perdu et le cœur de la Princesse.
            <strong class="text-primaire font-semibold">Chaque tuile posée change votre destin.</strong>
          </p>

          <!-- Boutons -->
          <div class="flex items-center gap-4 animate-fade-up delay-300">
            <NuxtLink
              to="/le-jeu"
              class="inline-flex items-center px-6 py-3 rounded-full text-primaire text-xs font-bold tracking-widest uppercase btn-filled"
            >
              Découvrir le jeu
            </NuxtLink>
            <NuxtLink
              to="/regles"
              class="inline-flex items-center px-6 py-3 rounded-full border border-primaire/50 text-primaire text-xs font-bold tracking-widest uppercase hover:border-primaire transition"
            >
              Voir les règles
            </NuxtLink>
          </div>
        </div>

        <!-- Carte droite animée -->
        <div class="hidden lg:flex flex-col items-center justify-center flex-1 max-w-sm relative right-16">
          <div class="relative w-full h-[500px] flex items-center justify-center cursor-pointer group">
            
            <!-- Card 1 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-10
                        -rotate-6 -translate-x-4 translate-y-4
                        group-hover:-translate-x-[130px] group-hover:translate-y-[30px] group-hover:-rotate-[15deg]
                        hover:!-mt-24 hover:!-ml-32 animate-gather-1">
              <div class="card-float delay-1 rounded-3xl shadow-card-stack border border-white/20 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/recto_carte.png" alt="Carte 1" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 2 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20
                        -rotate-3 -translate-x-2 translate-y-2
                        group-hover:-translate-x-[65px] group-hover:translate-y-[10px] group-hover:-rotate-[7deg]
                        hover:!-mt-24 hover:!-ml-32 animate-gather-2">
              <div class="card-float rounded-3xl shadow-card-stack border border-white/30 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/carte3.webp" alt="Carte 2" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 3 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-30
                        rotate-0 translate-x-0 translate-y-0
                        group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
                        hover:!-mt-24 hover:!-ml-32 animate-gather-3">
              <div class="card-float delay-1 rounded-3xl shadow-card-stack border border-white/40 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/carte4.webp" alt="Carte 3" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 4 -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-40
                        rotate-3 translate-x-2 translate-y-2
                        group-hover:translate-x-[65px] group-hover:translate-y-[10px] group-hover:rotate-[7deg]
                        hover:!-mt-24 hover:!-ml-32 animate-gather-4">
              <div class="card-float rounded-3xl shadow-card-stack border border-white/50 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/carte5.webp" alt="Carte 4" class="w-full h-auto block" />
              </div>
            </div>

            <!-- Card 5 (Top) -->
            <div class="absolute w-[240px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-50
                        rotate-6 translate-x-4 translate-y-4
                        group-hover:translate-x-[130px] group-hover:translate-y-[30px] group-hover:rotate-[15deg]
                        hover:!-mt-24 hover:!-ml-32 animate-gather-5">
              <div class="card-float delay-1 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/60 overflow-hidden" style="--rot: 0deg;">
                <img src="/images/assets/verso_carte.png" alt="Carte 5" class="w-full h-auto block" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- Section 2 : Les Piliers -->
    <section class="relative w-full pt-24 pb-12 px-8 overflow-visible">
      <div class="max-w-7xl mx-auto relative z-10">
        
        <!-- En-tête -->
        <div class="mb-16 max-w-2xl">
          <p class="text-[#E7D6B9] text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
            <span class="w-6 h-px bg-[#E7D6B9]"></span> Les piliers du jeu
          </p>
          <h2 class="text-[#F3E7D3] text-5xl md:text-6xl font-bold leading-tight" style="font-family: Georgia, serif;">
            Cinq valeurs,<br />
            une aventure unique.
          </h2>
        </div>

        <!-- Grille de cartes -->
        <div class="flex flex-col gap-6">
          <!-- Ligne 1 : 3 cartes -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Carte 1 -->
            <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-transform hover:-translate-y-2">
              <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3]">
                <Icon name="ph:navigation-arrow-fill" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">Stratégie</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Anticipez, planifiez, contrôlez le terrain. La victoire sourit à la grenouille qui voit au-delà du prochain nénuphar.
              </p>
            </div>

            <!-- Carte 2 -->
            <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-transform hover:-translate-y-2">
              <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3]">
                <Icon name="ph:users-fill" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">Convivialité</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Des parties courtes, rythmées et pleines de rebondissements. Rires et trahisons garantis autour de la table.
              </p>
            </div>

            <!-- Carte 3 -->
            <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-transform hover:-translate-y-2">
              <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3]">
                <Icon name="ph:info-fill" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">Créativité</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Le plateau de jeu n'existe pas. C'est vous qui le construisez tuile par tuile. Aucune partie ne se ressemble.
              </p>
            </div>
          </div>

          <!-- Ligne 2 : 2 cartes (centrées) -->
          <div class="flex flex-col md:flex-row justify-center gap-6 relative">
            
            <!-- Déco roche abstracte -->
            <div class="absolute -left-12 -bottom-8 opacity-70 pointer-events-none hidden lg:block">
              <img src="/images/assets/pierre.png" alt="Décoration pierre" class="w-32 h-auto" />
            </div>
            <!-- Carte 4 -->
            <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-transform hover:-translate-y-2 md:w-[calc(33.333%-16px)] w-full">
              <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3]">
                <Icon name="ph:shapes-fill" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">Équité</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Chaque expédition débute avec le même équipement de base. Seuls vos choix feront la différence.
              </p>
            </div>

            <!-- Carte 5 -->
            <div class="bg-[#F3E7D3] rounded-[32px] p-8 text-[#3B2513] shadow-xl flex flex-col items-start transition-transform hover:-translate-y-2 md:w-[calc(33.333%-16px)] w-full">
              <div class="w-12 h-12 bg-[#3B2513] rounded-full flex items-center justify-center mb-6 text-[#F3E7D3]">
                <Icon name="ph:eye-fill" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">Accessibilité</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Des règles qui s'expliquent en 5 minutes. Simple à apprendre, mais délicieusement complexe à maîtriser.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 3 : COMMENT JOUER -->
    <section class="w-full pt-24 pb-24 relative z-10 flex flex-col items-center" style="background: linear-gradient(to bottom, rgba(46, 21, 13, 0) 0%, #2E150D 250px, #2E150D 100%);">
      <div class="max-w-5xl w-full px-6 flex flex-col items-center">
        <!-- Header -->
        <div class="flex flex-col items-center text-center mb-24">
          <div class="flex flex-col items-center gap-4 mb-8">
            <Icon name="ph:book-open" class="w-7 h-7 text-[#F3E7D3]" />
            <span class="text-[#F3E7D3] text-xs font-bold tracking-[0.2em] uppercase opacity-80">
              COMMENT JOUER
            </span>
          </div>
          <h2 class="text-[#F3E7D3] text-5xl md:text-6xl font-bold leading-tight" style="font-family: Georgia, serif;">
            La mécanique en<br />
            quatre actes.
          </h2>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-20 w-full">
          
          <!-- Item 1 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">01</span>
              <img src="/images/assets/grenouille.png" alt="Grenouille" class="h-24 object-contain -mt-4 opacity-90 hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Incarner une grenouille</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              Chaque joueur reçoit un deck de départ incluant une carte clé unique. C'est votre secret et votre objectif stratégique principal.
            </p>
          </div>

          <!-- Item 2 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full">
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
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Construire la carte</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              Posez une carte terrain par tour pour former des chemins interconnectés qui s'assemblent dangereusement vers le coffre central.
            </p>
          </div>

          <!-- Item 3 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">03</span>
              <img src="/images/assets/pierre_section3.png" alt="Objets" class="h-24 object-contain -mt-4 opacity-90 hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Jouer des objets</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              Utilisez des reliques poisseuses pour modifier l'environnement, booster votre propre chemin ou saboter allègrement celui de vos adversaires.
            </p>
          </div>

          <!-- Item 4 -->
          <div class="flex flex-col border-l-2 border-[#BD652E] pl-8 relative h-full">
            <div class="flex justify-between items-start mb-6">
              <span class="text-[#BD652E] text-7xl font-bold leading-none" style="font-family: Georgia, serif;">04</span>
              <img src="/images/assets/coffre_section3.png" alt="Coffre" class="h-24 object-contain -mt-4 opacity-90 hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Atteindre le coffre</h3>
            <p class="text-[#F3E7D3]/70 text-sm leading-relaxed max-w-sm">
              Le premier batracien à relier continuellement sa clé au coffre remporte la partie. Soyez rusé, soyez rapide. Croâ !
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- WRAPPER SECTIONS 4 & 5 (Image de fond unifiée) -->
    <div class="relative w-full overflow-hidden">
      <!-- Background Image (chemin_4_5.webp) -->
      <div class="absolute inset-0 z-0 pointer-events-none flex justify-center items-start opacity-25">
        <img src="/images/assets/chemin_4_5.webp" alt="" class="w-full h-full object-cover object-top" />
      </div>

      <!-- SECTION 4 : LA VISION -->
      <section class="relative z-10 w-full pt-16 pb-32 flex flex-col items-center" style="background: linear-gradient(to bottom, #2E150D 0%, rgba(46, 21, 13, 0) 400px);">

      <!-- Content -->
      <div class="max-w-5xl w-full px-6 relative z-10 flex flex-col items-center text-center">
        <!-- Header -->
        <span class="text-[#E7D6B9] text-xs font-bold tracking-[0.2em] uppercase mb-6 mt-16">
          LA VISION
        </span>
        <h2 class="text-[#F3E7D3] text-5xl md:text-6xl font-bold leading-tight mb-12" style="font-family: Georgia, serif;">
          Un univers qui<br />grandit avec vous.
        </h2>

        <!-- Decorations (Champignon et Empreinte) -->
        <img src="/images/assets/champignon.png" alt="Champignon" class="absolute left-0 md:left-8 top-[280px] w-16 md:w-20 opacity-40 -rotate-12 pointer-events-none hidden md:block" />
        <img src="/images/assets/main_grenouille.png" alt="Empreinte" class="absolute right-0 md:right-16 top-32 w-16 md:w-20 opacity-30 rotate-12 pointer-events-none hidden md:block" />

        <!-- Paragraph -->
        <p class="text-[#F3E7D3]/80 text-lg md:text-xl leading-relaxed max-w-3xl mb-24">
          Crooak n'est pas qu'un simple passe-temps d'un soir. C'est un terrain de jeu modulaire conçu pour devenir une référence dans l'univers des jeux de pose de tuiles. Une expérience qui mêle intimement construction et interaction directe, conçue pour durer éternellement dans vos ludothèques.
        </p>

        <!-- 3 Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <!-- Card 1 -->
          <div class="bg-[#2E150D] rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl transition-transform hover:-translate-y-2 border border-white/5">
            <Icon name="ph:stack" class="w-8 h-8 text-[#E7D6B9] mb-6" />
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Pérennité</h3>
            <p class="text-[#F3E7D3]/60 text-sm leading-relaxed">
              Des extensions à venir et des guides de grenouilles. Le marais s'étend.
            </p>
          </div>
          <!-- Card 2 -->
          <div class="bg-[#2E150D] rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl transition-transform hover:-translate-y-2 border border-white/5">
            <Icon name="ph:map-pin" class="w-8 h-8 text-[#E7D6B9] mb-6" />
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Innovation</h3>
            <p class="text-[#F3E7D3]/60 text-sm leading-relaxed">
              Un système où la topographie évolue à chaque pose. Un champ de bataille vivant.
            </p>
          </div>
          <!-- Card 3 -->
          <div class="bg-[#2E150D] rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl transition-transform hover:-translate-y-2 border border-white/5">
            <Icon name="ph:user" class="w-8 h-8 text-[#E7D6B9] mb-6" />
            <h3 class="text-[#F3E7D3] text-sm font-bold tracking-widest uppercase mb-4">Rassemblement</h3>
            <p class="text-[#F3E7D3]/60 text-sm leading-relaxed">
              Un design intergénérationnel. Des règles fluides pour tous les joueurs.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 5 : CALL TO ACTION -->
    <section class="relative z-10 w-full py-40 flex flex-col items-center">

      <!-- Content -->
      <div class="max-w-4xl w-full px-6 relative z-10 flex flex-col items-center text-center">
        
        <!-- Logo Couronne (Favicon) -->
        <img src="/favicon.png" alt="Logo Crooak" class="w-24 h-24 md:w-28 md:h-28 object-contain mb-8 drop-shadow-md" />

        <!-- Titre -->
        <h2 class="text-[#F3E7D3] text-5xl md:text-7xl font-bold leading-tight mb-8" style="font-family: Georgia, serif;">
          Prêt à poser la<br />
          <span class="italic">première tuile ?</span>
        </h2>

        <!-- Paragraphe -->
        <p class="text-[#F3E7D3]/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
          Rejoins la communauté Crooak dès maintenant. Précommande ton édition fondateurs et gagne des cartes "objet" exclusives.
        </p>

        <!-- Boutons -->
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Bouton Précommander -->
          <NuxtLink to="/precommander" class="bg-[#2E150D] text-[#F3E7D3] px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#1A0A06] transition-colors shadow-lg">
            Précommander (Édition Base)
          </NuxtLink>

          <!-- Bouton Découvrir -->
          <NuxtLink to="/precommander" class="bg-transparent border border-[#F3E7D3] text-[#F3E7D3] px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#F3E7D3] hover:text-[#2E150D] transition-colors shadow-lg">
            Découvrir l'édition Deluxe
          </NuxtLink>
        </div>

      </div>
    </section>

    </div>

  </div>
</template>
