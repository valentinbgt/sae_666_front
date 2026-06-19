<template>
  <nav
    class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5"
  >
    <!-- Logo -->
    <NuxtLink :to="localePath('/')" class="z-50 relative">
      <img src="/images/logo_crooak.png" alt="CROOAK" class="h-12 w-auto" />
    </NuxtLink>

    <!-- Liens nav (Desktop) -->
    <ul
      class="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase"
    >
      <li>
        <NuxtLink :to="localePath('/')" class="navlink">{{
          $t("nav.game")
        }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/regles')" class="navlink">{{
          $t("nav.rules")
        }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/actualites')" class="navlink">{{
          $t("nav.news")
        }}</NuxtLink>
      </li>
    </ul>

    <!-- Boutons (Desktop) -->
    <div class="hidden md:flex items-center gap-3">
      <!-- Sélecteur de langue avec drapeau (Hover) -->
      <div class="relative group z-50">
        <button
          class="flex items-center gap-2 text-xs font-bold text-white uppercase px-3 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
        >
          <span>{{ locale === "fr" ? "🇫🇷" : "🇬🇧" }}</span>
          <Icon
            name="ph:caret-down-bold"
            class="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
          />
        </button>

        <div
          class="absolute top-full right-0 mt-2 bg-[#2E150D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100"
        >
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

      <NuxtLink
        :to="localePath('/precommander')"
        class="btn-filled inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase"
      >
        {{ $t("nav.preorder") }}
      </NuxtLink>
      <div class="play-btn-wrapper relative inline-block">
        <template v-for="(sp, i) in sparkles" :key="i">
          <span
            v-if="sp"
            class="sparkle"
            :style="{
              top: sp.top,
              left: sp.left,
              '--size': sp.size,
              '--dur': sp.dur,
              '--delay': sp.delay,
            }"
            @animationiteration="reposition(i)"
          ></span>
        </template>
        <NuxtLink
          :to="localePath('/play')"
          class="btn-filled inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase relative z-10"
        >
          {{ $t("nav.play") }}
        </NuxtLink>
      </div>
    </div>

    <!-- Hamburger Button (Mobile) -->
    <button
      @click="isMenuOpen = !isMenuOpen"
      class="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 z-50 relative focus:outline-none"
    >
      <span
        class="w-8 h-[5px] bg-[#D47035] rounded-full transition-transform duration-300"
        :class="isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''"
      ></span>
      <span
        class="w-8 h-[5px] bg-[#D47035] rounded-full transition-opacity duration-300"
        :class="isMenuOpen ? 'opacity-0' : ''"
      ></span>
      <span
        class="w-8 h-[5px] bg-[#D47035] rounded-full transition-transform duration-300"
        :class="isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''"
      ></span>
    </button>

    <!-- Mobile Menu Overlay -->
    <div
      class="md:hidden fixed inset-0 bg-[#2E150D] z-40 flex flex-col items-center justify-center transition-all duration-300"
      :class="
        isMenuOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible pointer-events-none'
      "
    >
      <ul
        class="flex flex-col items-center gap-8 text-2xl font-bold tracking-widest uppercase text-white mb-12"
      >
        <li>
          <NuxtLink
            :to="localePath('/')"
            @click="isMenuOpen = false"
            class="hover:text-[#D47035] transition"
            >{{ $t("nav.game") }}</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            :to="localePath('/regles')"
            @click="isMenuOpen = false"
            class="hover:text-[#D47035] transition"
            >{{ $t("nav.rules") }}</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            :to="localePath('/actualites')"
            @click="isMenuOpen = false"
            class="hover:text-[#D47035] transition"
            >{{ $t("nav.news") }}</NuxtLink
          >
        </li>
      </ul>

      <div class="flex flex-col items-center gap-6">
        <NuxtLink
          :to="localePath('/precommander')"
          @click="isMenuOpen = false"
          class="btn-filled px-8 py-4 rounded-full text-white text-sm font-bold tracking-widest uppercase text-center w-64"
        >
          {{ $t("nav.preorder") }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/play')"
          @click="isMenuOpen = false"
          class="btn-filled px-8 py-4 rounded-full text-white text-sm font-bold tracking-widest uppercase text-center w-64"
        >
          {{ $t("nav.play") }}
        </NuxtLink>

        <!-- Language Selector for mobile -->
        <div class="flex gap-6 mt-6">
          <NuxtLink
            :to="switchLocalePath('fr')"
            @click="isMenuOpen = false"
            class="text-4xl opacity-50 hover:opacity-100 transition-opacity"
            :class="locale === 'fr' ? 'opacity-100 drop-shadow-lg' : ''"
          >
            🇫🇷
          </NuxtLink>
          <NuxtLink
            :to="switchLocalePath('en')"
            @click="isMenuOpen = false"
            class="text-4xl opacity-50 hover:opacity-100 transition-opacity"
            :class="locale === 'en' ? 'opacity-100 drop-shadow-lg' : ''"
          >
            🇬🇧
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.sparkle {
  --size: 4px;
  --color: #F7E7C6;
  --dur: 1.8s;
  --delay: 0s;

  position: absolute;
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 50%;
  box-shadow: 0 0 4px 1px var(--color);
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  animation: sparkle-twinkle var(--dur) ease-in-out var(--delay) infinite;
}


@keyframes sparkle-twinkle {
  0%   { opacity: 0;   transform: scale(0.2); }
  35%  { opacity: 1;   transform: scale(1.3); }
  100% { opacity: 0;   transform: scale(0.2); }
}
</style>

<script setup>
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const isMenuOpen = ref(false);

/* --- Étincelles autour du bouton "Jouer" ---
   Halo de sparks qui scintillent autour du bouton : positions vraiment
   aléatoires, jamais devant le texte (anneau autour du bouton), espacées
   les unes des autres, et un seul scintillement par apparition. */
const COUNT = 8;
const HALO = 16;     // débordement du halo au-delà des bords du bouton (%)
const GAP = 4;       // marge libre gardée autour du bouton/texte (%)
const MIN_DIST = 14; // espacement minimal entre deux sparks (%)

const OUTER_MIN = -HALO;
const OUTER_MAX = 100 + HALO;
const INNER_MIN = -GAP;
const INNER_MAX = 100 + GAP;

const rnd = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(1));

// Sur le bouton (zone du texte + marge) → on n'y place jamais de spark
const overButton = (top, left) =>
  top > INNER_MIN && top < INNER_MAX && left > INNER_MIN && left < INNER_MAX;

// Assez loin de tous les sparks déjà placés
const spaced = (top, left, others) =>
  others.every((sp) =>
    !sp || Math.hypot(parseFloat(sp.top) - top, parseFloat(sp.left) - left) >= MIN_DIST
  );

// Position aléatoire dans le halo, hors du bouton et espacée si possible
const pickPos = (others) => {
  let fallback = { top: OUTER_MIN, left: rnd(OUTER_MIN, OUTER_MAX) };
  for (let a = 0; a < 30; a++) {
    const top = rnd(OUTER_MIN, OUTER_MAX);
    const left = rnd(OUTER_MIN, OUTER_MAX);
    if (overButton(top, left)) continue;                 // jamais devant le texte
    fallback = { top, left };
    if (spaced(top, left, others)) return { top, left }; // + petit gap entre sparks
  }
  return fallback;
};

const makeSparkle = (delayOverride, others = []) => {
  const { top, left } = pickPos(others);
  return {
    top: `${top}%`,
    left: `${left}%`,
    size: `${rnd(2, 4)}px`,
    dur: `${(Math.random() * 0.5 + 0.5).toFixed(2)}s`,
    delay: delayOverride ?? `${(Math.random() * 2).toFixed(2)}s`,
  };
};

const initial = [];
for (let i = 0; i < COUNT; i++) {
  initial.push(makeSparkle(`${(i * 0.25).toFixed(2)}s`, initial));
}
const sparkles = ref(initial);

// Fin de cycle : on démonte le spark (invisible à opacity 0) puis on le
// replace au tick suivant — évite tout "téléport" visible pendant l'anim.
const reposition = async (i) => {
  sparkles.value[i] = null;
  await nextTick();
  sparkles.value[i] = makeSparkle("0s", sparkles.value.filter((_, idx) => idx !== i));
};
</script>
