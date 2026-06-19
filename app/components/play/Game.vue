<script setup lang="ts">
import type { Game, WheelMode, WheelSegment } from "~/types/play";

const props = defineProps<{ game: Game }>();
const emit = defineEmits<{ quit: [] }>();

/** Ordonne les joueurs selon turnOrder (sinon ordre des sièges). */
function orderedPlayers(): Game["players"] {
  const order = props.game.turnOrder;
  if (!order?.length) return props.game.players;
  const byId = new Map(props.game.players.map((p) => [String(p.id), p]));
  const ordered = order
    .map((id) => byId.get(String(id)))
    .filter((p): p is Game["players"][number] => !!p);
  const seen = new Set(ordered.map((p) => String(p.id)));
  return [
    ...ordered,
    ...props.game.players.filter((p) => !seen.has(String(p.id))),
  ];
}

const {
  players,
  currentIndex,
  currentPlayer,
  action,
  mode,
  phase,
  cardsLocked,
  segments,
  result,
  terrainResult,
  selectedPlayer,
  chooseAction,
  startSpin,
  settle,
  endTurn,
} = useGameSession(orderedPlayers());

const gameStarted = ref(false);

// --- Scène à dimensions fixes (rendu identique sur tous les écrans) ---------
// L'écran de jeu est dessiné dans une scène de référence (la maquette), puis
// mise à l'échelle d'un seul bloc — comme une photo qu'on redimensionne. On
// garde le ratio : les bords non couverts sont remplis par la couleur de fond
// (letterbox). Toutes les tailles internes sont fixes (aucune media query
// viewport) pour que le rendu soit strictement le même partout. Les overlays
// plein écran (PlayTransitionOverlay) réutilisent la même échelle.
const { stageStyle: stageBaseStyle } = useStageScale();

const stageStyle = computed(() => ({
  ...stageBaseStyle.value,
  backgroundImage: "url(/images/assets/wheel-bg.png)",
}));

/** Passe en plein écran (best effort) — nécessite un geste utilisateur. */
function enterFullscreen() {
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
  };
  if (document.fullscreenElement) return;
  const request = el.requestFullscreen ?? el.webkitRequestFullscreen;
  request?.call(el).catch(() => {});
}

/** Sort du plein écran si on y est (best effort, multi-navigateurs). */
function exitFullscreen() {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void>;
    webkitFullscreenElement?: Element | null;
  };
  if (!doc.fullscreenElement && !doc.webkitFullscreenElement) return;
  const exit = doc.exitFullscreen ?? doc.webkitExitFullscreen;
  exit?.call(doc).catch(() => {});
}

function pickFirstPlayer(index: number) {
  currentIndex.value = index;
  gameStarted.value = true;
  enterFullscreen();
}

function handleQuit() {
  exitFullscreen();
  emit("quit");
}

// Filet de sécurité : quitter le plein écran si le composant est démonté
// (navigation, fin de partie, etc.) sans passer par le bouton Quitter.
onUnmounted(exitFullscreen);

const wheel = ref<{ spin: () => Promise<void> } | null>(null);

async function onWheelClick() {
  if (phase.value !== "ready") return;
  startSpin();
  await wheel.value?.spin();
}

type OverlaySegment = { text: string; color?: string };

const overlayMessage = ref<OverlaySegment[] | null>(null);

function cases(n: number | undefined) {
  return n === 1 ? "1 case" : `${n ?? "?"} cases`;
}

function tiles(n: number | undefined) {
  return n === 1 ? "1 tuile" : `${n ?? "?"} tuiles`;
}

function showOverlay(segments: OverlaySegment[], dotColor?: string) {
  overlayMessage.value = segments;
}

function dismissOverlay() {
  const wasDone = phase.value === "done";
  overlayMessage.value = null;
  if (wasDone) handleEndTurn();
}

/** Message « X échange avec Y » (OVNI), partagé par ses deux déclencheurs. */
function swapMessage(): OverlaySegment[] {
  return [
    { text: currentPlayer.value?.name ?? "?", color: currentPlayer.value?.color },
    { text: " échange avec " },
    {
      text: selectedPlayer.value?.name ?? "?",
      color: selectedPlayer.value?.color,
    },
  ];
}

/**
 * Choix d'une carte. Cas particulier OVNI à 2 joueurs : un seul autre joueur,
 * donc pas de pré-rotation (la roue ne change pas). On annonce tout de même
 * l'échange en plein écran pour que le changement soit clair pour le joueur.
 */
function onChooseAction(a: WheelMode) {
  chooseAction(a);
  if (a === "select" && action.value === "select" && selectedPlayer.value) {
    showOverlay(swapMessage(), selectedPlayer.value?.color);
  }
}

function onSettled(segment: WheelSegment) {
  const prevMode = mode.value;
  settle(segment);

  if (prevMode === "select") {
    showOverlay(swapMessage(), selectedPlayer.value?.color);
  } else if (prevMode === "terrain") {
    showOverlay(
      [
        {
          text: currentPlayer.value?.name ?? "?",
          color: currentPlayer.value?.color,
        },
        { text: `, retire ${tiles(segment.value)} du terrain` },
      ],
      currentPlayer.value?.color,
    );
  } else {
    showOverlay(
      [
        {
          text: currentPlayer.value?.name ?? "?",
          color: currentPlayer.value?.color,
        },
        { text: `, avance de ${cases(result.value?.value)}` },
      ],
      currentPlayer.value?.color,
    );
  }
}

function handleEndTurn() {
  endTurn();
  showOverlay([
    { text: "Au tour de " },
    {
      text: currentPlayer.value?.name ?? "?",
      color: currentPlayer.value?.color,
    },
  ]);
}

const hint = computed(() => {
  if (phase.value === "spinning") return "";
  if (phase.value === "done") return "";
  // phase 'ready' : on attend un clic sur la roue.
  if (mode.value === "select") return "Lance la roue pour désigner un joueur";
  if (mode.value === "terrain")
    return "Lance la roue pour définir le nombre de tuiles à retirer du terrain";
  if (selectedPlayer.value)
    return `Échange de place avec ${selectedPlayer.value.name} et lance la roue pour avancer`;
  if (terrainResult.value)
    return `Retire ${tiles(terrainResult.value.value)} du terrain et lance la roue pour avancer`;
  if (mode.value === "boost")
    return "La roue est boostée, tu peux la lancer pour avancer";
  return "Lance la roue pour avancer";
});
</script>

<template>
  <!-- Écran de sélection du premier joueur (mise en page responsive). -->
  <div v-if="!gameStarted" class="relative flex min-h-dvh flex-col">
    <header class="flex items-center justify-between px-4 pt-4 lg:px-6 lg:pt-5">
      <span class="w-16 sm:w-20" />
      <img
        src="/images/logo_crooak.png"
        alt="CROOAK"
        class="absolute left-5 top-4 h-12 w-auto lg:h-10"
      />
      <button
        type="button"
        class="absolute right-8 top-7 w-16 text-right text-xs font-semibold uppercase tracking-widest text-primaire/50 transition hover:text-primaire sm:w-20"
        @click="handleQuit"
      >
        Quitter
      </button>
    </header>

    <main
      class="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-6 sm:gap-8 sm:px-6"
    >
      <p
        class="text-xl text-primaire sm:text-2xl"
        style="font-family: Georgia, serif"
      >
        Qui commence ?
      </p>
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        <button
          v-for="(p, i) in players"
          :key="p.id"
          type="button"
          class="flex items-center gap-3 rounded-full bg-secondaire/70 px-6 py-3 text-sm font-bold uppercase tracking-wide text-primaire transition hover:bg-secondaire hover:scale-105"
          @click="pickFirstPlayer(i)"
        >
          <span
            class="h-4 w-4 shrink-0 rounded-full ring-2 ring-primaire/40"
            :style="{ backgroundColor: p.color }"
          />
          {{ p.name }}
        </button>
      </div>
    </main>
  </div>

  <!-- Écran de jeu : scène à dimensions fixes, mise à l'échelle d'un bloc.
       Le conteneur plein écran fournit le fond des bandes (letterbox) ; la
       scène (784×515) garde des tailles fixes pour un rendu identique partout. -->
  <div v-else class="fixed inset-0 overflow-hidden bg-[#2a1206]">
    <div
      class="flex flex-col overflow-hidden bg-cover bg-center"
      :style="stageStyle"
    >
      <!-- En-tête -->
      <header class="flex items-center justify-between px-4 pt-4">
        <span class="w-20" />
        <img
          src="/images/logo_crooak.png"
          alt="CROOAK"
          class="absolute left-5 top-4 h-16 w-auto"
        />
        <button
          type="button"
          class="absolute right-8 top-7 w-20 text-right text-base font-semibold uppercase tracking-widest text-primaire/50 transition hover:text-primaire"
          @click="handleQuit"
        >
          Quitter
        </button>
      </header>

      <!-- Zone de jeu : cartes optionnelles + roue -->
      <main class="flex flex-1 items-center justify-center gap-8 px-4 py-4">
        <PlayWheelActions
          :active="action"
          :disabled="cardsLocked"
          @choose="onChooseAction"
        />

        <div class="flex flex-col items-center gap-4">
          <button
            type="button"
            :disabled="phase !== 'ready'"
            class="rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cta disabled:cursor-default"
            :class="phase === 'ready' ? 'cursor-pointer hover:scale-[1.02]' : ''"
            :aria-label="hint"
            @click="onWheelClick"
          >
            <PlayGameWheel
              ref="wheel"
              :segments="segments"
              :mode="mode"
              class="w-72"
              @settled="onSettled"
            />
          </button>

          <p
            class="text-center text-sm w-lg text-primaire/80 absolute bottom-3 left-1/2 -translate-x-1/2"
          >
            {{ hint }}
          </p>
        </div>
      </main>

      <!-- Pied : tour courant -->
      <footer class="flex items-end justify-between gap-4 px-6 pb-4">
        <PlayTurnBanner :player="currentPlayer" />
      </footer>
    </div>
  </div>

  <!-- Overlay de transition plein écran (tap to dismiss) -->
  <Transition name="overlay">
    <PlayTransitionOverlay
      v-if="overlayMessage"
      :message="overlayMessage"
      @dismiss="dismissOverlay"
    />
  </Transition>
</template>

<style scoped>
.overlay-enter-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}
.overlay-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
