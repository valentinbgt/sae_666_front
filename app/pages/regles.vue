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
        <h1 class="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg" style="font-family: Georgia, serif;">
          Le marais s'apprend en<br />quelques tuiles.
        </h1>
        <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-10">
          Ce jeu de tuiles et de tromperie est fait pour être joué tout de suite.<br />
          Laissez l'interactif vous guider, ou plongez-vous dans le manuel.<br />
          Ce qui compte ? Comprendre, esquiver et gagner.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#" class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primaire/50 text-primaire text-xs font-bold tracking-widest uppercase hover:border-primaire transition">
            <Icon name="ph:download-simple-bold" class="w-4 h-4" />
            Règles du jeu (PDF)
          </a>
        </div>
      </section>

      <!-- Section Video Tutorial -->
      <section class="mb-40 max-w-4xl mx-auto animate-fade-up animate-delay-200">
        <h2 class="text-3xl md:text-4xl font-bold mb-8 text-center" style="font-family: Georgia, serif;">Tutoriel Vidéo</h2>
        <div class="rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 bg-black">
          <video 
            class="w-full aspect-video object-cover" 
            controls 
            preload="metadata"
          >
            <source src="/video/video_regle.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </section>

      <!-- Section 2: Une quête -->
      <section class="flex flex-col md:flex-row items-center justify-between mb-40 gap-16">
        <div class="md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold mb-6" style="font-family: Georgia, serif;">Une quête au cœur du marais.</h2>
          <div class="space-y-4 opacity-80 leading-relaxed text-sm md:text-base">
            <p>Dans un écosystème en déclin, des royaumes de grenouilles s'affrontent pour s'accaparer les derniers fragments de territoire vivable : la Couronne. Menez votre propre troupe de batraciens dans ce marais hostile.</p>
            <p>Leur survie ne se joue pas au combat, mais par la ruse : construisez un domaine viable, isolez vos adversaires et bloquez leur progression sur un plateau modulaire qui s'étend à chaque tour.</p>
            <p>Restez en mouvement, adaptez-vous aux tuiles des autres, chaque partie est une course de vitesse différente.</p>
          </div>
        </div>
        <div class="md:w-5/12 bg-[#2E150D] p-8 md:p-10 rounded-3xl shadow-2xl border border-white/5">
          <div class="flex items-start gap-6">
            <div class="w-16 h-16 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
              <Icon name="ph:target" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-3 text-white">Objectif de la partie</h3>
              <p class="opacity-70 text-sm leading-relaxed">Enfermer les grenouilles adverses tout en sauvant votre cour. La Couronne n'attend qu'un seul vainqueur !</p>
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
          <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">Quatre éléments,<br />un marais à construire.</h2>
          <p class="opacity-80 mb-12">Tout ce qu'il vous faut pour concevoir, étendre et détruire le paysage.</p>

        <div class="flex flex-col lg:flex-row gap-12 stretch">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3">
            <!-- Cards -->
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">01</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">01</div>
              <h3 class="text-xl font-bold text-white mb-3">Cartes grenouilles</h3>
              <p class="text-sm opacity-70">4 sets contenant les bataillons de chaque clan pour mener vos troupes.</p>
            </div>
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">02</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">02</div>
              <h3 class="text-xl font-bold text-white mb-3">Tuiles marais</h3>
              <p class="text-sm opacity-70">Plateau de base et extensions. Poser un chemin, c'est bloquer les autres.</p>
            </div>
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">03</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">03</div>
              <h3 class="text-xl font-bold text-white mb-3">La Couronne</h3>
              <p class="text-sm opacity-70">L'objectif ultime. Elle ne sera acquise qu'une fois vos adversaires perdus.</p>
            </div>
            <div class="bg-[#2E150D] p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
              <div class="absolute -right-4 -top-4 text-white/5 text-8xl font-bold font-serif">04</div>
              <div class="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mb-6 font-serif text-[#F7E7C6] font-bold text-lg">04</div>
              <h3 class="text-xl font-bold text-white mb-3">Malle Trésor</h3>
              <p class="text-sm opacity-70">Pour le clan qui survit. Le destin des autres s'éteint dans les marécages.</p>
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
        <h2 class="text-3xl md:text-4xl font-bold mb-16" style="font-family: Georgia, serif;">Mise en place, en cinq gestes.</h2>
        
        <div class="space-y-12 max-w-4xl">
          <!-- Step 1 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">01</div>
            <div>
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">Choisir sa couleur</h3>
              <p class="opacity-80 text-sm">Chaque joueur prend les grenouilles de sa couleur. Les pions sont mis en évidence. Tous les joueurs ont les mêmes chances au commencement.</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>
          
          <!-- Step 2 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">02</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">Mélange des tuiles</h3>
              <p class="opacity-80 text-sm">Il y a deux piles. Une de départ. Et une pioche.</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>

          <!-- Step 3 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">03</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">Placer la couronne</h3>
              <p class="opacity-80 text-sm">La tuile de la couronne est placée au centre, à portée de toutes les armées. Le placement doit être fait aléatoirement. Elle reste inaccessible au premier tour.</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>

          <!-- Step 4 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">04</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">Distribuer les cartes</h3>
              <p class="opacity-80 text-sm">Chaque joueur pioche 4 cartes Actions. Ces cartes restent secrètes.</p>
            </div>
          </div>
          <div class="h-px bg-white/10 w-full"></div>

          <!-- Step 5 -->
          <div class="flex items-start gap-8">
            <div class="text-5xl font-serif text-white/50">05</div>
            <div class="flex-1">
              <h3 class="text-sm font-bold tracking-widest uppercase mb-2">Placement des grenouilles</h3>
              <p class="opacity-80 text-sm">Les joueurs posent leurs grenouilles à l'une des extrémités du marais. Le combat commence.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Quatre actions -->
      <section class="mb-40">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">Quatre actions, un seul tour.</h2>
          <p class="opacity-80">Chaque tour, un joueur a le droit de choisir entre l'une de ces quatre actions. La planification de sa survie commence ici.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto mb-16 relative">
          <!-- Central vertical line for desktop -->
          <div class="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/10 transform -translate-x-1/2"></div>
          
          <!-- Action 1 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">01</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">PRENDRE UNE TUILE</h3>
            <p class="text-sm opacity-80 leading-relaxed">Prenez une tuile dans la pioche et reliez-la avec une autre dans le marais, du côté que vous souhaitez. Cette action va permettre de créer un chemin vers la victoire. Mais attention aux tuiles piégées.</p>
          </div>
          <!-- Action 2 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">02</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">JOUER UNE CARTE ACTION</h3>
            <p class="text-sm opacity-80 leading-relaxed">Jouez l'une de vos cartes secrètes de votre main. Les actions sont diverses : annulation d'une action, interdiction d'avancer un tour, déplacer un adversaire, voler une carte, etc.</p>
          </div>
          <!-- Action 3 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">03</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">DÉPLACER LE ROI</h3>
            <p class="text-sm opacity-80 leading-relaxed">Déplacez le Roi sur un emplacement adjacent, s'il n'est pas bloqué. Un pion bloqué restera sur sa tuile.</p>
          </div>
          <!-- Action 4 -->
          <div>
            <div class="text-6xl font-serif text-white/30 mb-4">04</div>
            <h3 class="text-sm font-bold tracking-widest uppercase mb-4">DÉFAUSSER</h3>
            <p class="text-sm opacity-80 leading-relaxed">Si vous êtes bloqué, et qu'aucune action n'est possible, défaussez une de vos cartes action, pour en tirer une nouvelle.</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
          <!-- Box -->
          <div class="bg-[#F3E7D3] text-[#2E150D] p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:w-[60%]">
            <h3 class="font-bold text-xl mb-6">Règle de déplacement à la roue</h3>
            <ul class="list-disc pl-5 space-y-3 text-sm opacity-90 marker:text-[#2E150D]">
              <li>Plusieurs chemins possibles, le joueur choisit librement sa direction.</li>
              <li>Un seul chemin possible, le joueur est obligé de le suivre.</li>
              <li><strong>Aucun chemin possible</strong>, le joueur reste sur sa case (ex : la roue indique 3, seule 1 case est franchissable, le joueur n'avance pas).</li>
              <li>Il est interdit de faire demi-tour au cours d'un même tour.</li>
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
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">Quatre tuiles, mille embûches.</h2>
        <p class="opacity-80 mb-12">Des éléments pour anticiper, bloquer vos adversaires, ou les forcer à changer de stratégie.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">Barrière</h3>
            <p class="text-xs opacity-70">Bloque un chemin. Il est impossible de traverser cette tuile, peu importe la carte jouée.</p>
          </div>
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">Trou</h3>
            <p class="text-xs opacity-70">Piège une tuile. Les pions qui passent dessus s'enfoncent, et leur tour est annulé, bloquant un chemin.</p>
          </div>
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">Portail</h3>
            <p class="text-xs opacity-70">Téléporte un pion qui passe sur cette tuile, pour l'emmener sur un autre Portail aléatoirement tiré de la pioche.</p>
          </div>
          <div class="bg-[#F3E7D3] text-[#2E150D] p-6 rounded-2xl shadow-lg border border-black/5 hover:-translate-y-2 transition-transform">
            <h3 class="font-bold mb-3">+1</h3>
            <p class="text-xs opacity-70">Le joueur avance d'une tuile supplémentaire s'il le souhaite, lors de son tour, gratuitement.</p>
          </div>
        </div>
      </section>

      <!-- Section 7: Cartes action -->
      <section>
        <h2 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: Georgia, serif;">Huit cartes pour bousculer la partie.</h2>
        <p class="opacity-80 mb-12">À garder en main ou à jouer au bon moment. Des alliés de choix ou des pièges machiavéliques.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Esquive</h3>
            <p class="text-xs opacity-70">Annule la dernière action effectuée par un adversaire (hors déplacement). La carte est ensuite défaussée.</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Saut</h3>
            <p class="text-xs opacity-70">Le joueur peut franchir une tuile "Trou" de façon sécurisée (n'est utilisable qu'une seule fois par pion).</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Croc-en-jambe</h3>
            <p class="text-xs opacity-70">Bloque un pion adverse pendant 1 tour. Le pion ciblé ne peut plus se déplacer ni être déplacé par d'autres.</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Vol</h3>
            <p class="text-xs opacity-70">Le joueur cible la main d'un adversaire, et lui vole une carte au hasard. L'adversaire pioche une carte pour compenser.</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Tourbillon</h3>
            <p class="text-xs opacity-70">Le joueur retire une tuile du plateau et la remet dans la pioche. Tous les pions présents sur cette tuile sont replacés sur leur point de départ initial.</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Miroir</h3>
            <p class="text-xs opacity-70">Si un adversaire tente une carte d'attaque contre vous ("Croc-en-jambe", "Vol"), l'effet lui est retourné contre lui-même.</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Éclair</h3>
            <p class="text-xs opacity-70">Gagnez 1 action supplémentaire pendant ce tour (vous pouvez donc vous déplacer 2 fois de suite par exemple).</p>
          </div>
          <div class="bg-[#2E150D] p-6 rounded-2xl border border-white/10 hover:bg-[#3B1F13] transition-colors">
            <h3 class="font-bold mb-3 text-white">Camouflage</h3>
            <p class="text-xs opacity-70">Choisissez l'un de vos pions. Il devient totalement invisible aux yeux des autres joueurs pendant 1 tour, et ne peut être ciblé.</p>
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
