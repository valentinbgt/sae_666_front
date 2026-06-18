<script setup lang="ts">
import type { Game, WheelSegment } from "~/types/play";

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

function pickFirstPlayer(index: number) {
  currentIndex.value = index;
  gameStarted.value = true;
}

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

function showOverlay(segments: OverlaySegment[], dotColor?: string) {
  overlayMessage.value = segments;
}

function dismissOverlay() {
  const wasDone = phase.value === "done";
  overlayMessage.value = null;
  if (wasDone) handleEndTurn();
}

function onSettled(segment: WheelSegment) {
  const prevMode = mode.value;
  settle(segment);

  if (prevMode === "select") {
    showOverlay(
      [
        {
          text: currentPlayer.value?.name ?? "?",
          color: currentPlayer.value?.color,
        },
        { text: " échange avec " },
        {
          text: selectedPlayer.value?.name ?? "?",
          color: selectedPlayer.value?.color,
        },
      ],
      selectedPlayer.value?.color,
    );
  } else if (prevMode === "terrain") {
    showOverlay(
      [{ text: `Terrain : ${cases(segment.value)}` }],
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
    return "Lance la roue pour définir le nombre de terrains à déplacer";
  if (selectedPlayer.value)
    return `Échange de place avec ${selectedPlayer.value.name} et lance la roue pour avancer`;
  if (terrainResult.value)
    return `Déplace ${terrainResult.value.value} tuile${(terrainResult.value?.value ?? 0) > 1 ? "s" : ""} et lance la roue pour avancer`;
  if (mode.value === "boost")
    return "La roue est boostée, tu peux la lancer pour avancer";
  return "Lance la roue pour avancer";
});
</script>

<template>
  <div
    class="relative flex min-h-dvh flex-col bg-cover bg-center transition-[background-image]"
    :style="
      gameStarted ? { backgroundImage: 'url(/images/assets/wheel-bg.png)' } : {}
    "
  >
    <!-- En-tête -->
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
        @click="emit('quit')"
      >
        Quitter
      </button>
    </header>

    <!-- Sélection du premier joueur -->
    <main
      v-if="!gameStarted"
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

    <!-- Zone de jeu -->
    <main
      v-else
      class="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-4 landscape:flex-row landscape:gap-8 lg:gap-12 [@media(max-height:500px)]:py-2"
    >
      <!-- Cartes optionnelles (une seule par tour) -->
      <PlayWheelActions
        :active="action"
        :disabled="cardsLocked"
        @choose="chooseAction"
      />

      <!-- Roue + contrôles -->
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
            class="w-[min(74vw,56vh,26rem)] [@media(max-height:500px)]:w-[min(74vw,42vh)]"
            @settled="onSettled"
          />
        </button>

        <p
          class="min-h-6 max-w-[18rem] text-center text-xs text-primaire/80 sm:text-sm"
        >
          {{ hint }}
        </p>
      </div>
    </main>

    <!-- Overlay de transition plein écran (tap to dismiss) -->
    <Transition name="overlay">
      <PlayTransitionOverlay
        v-if="overlayMessage"
        :message="overlayMessage"
        @dismiss="dismissOverlay"
      />
    </Transition>

    <!-- Pied : tour courant + ordre des joueurs -->
    <footer
      v-if="gameStarted"
      class="flex flex-col items-start gap-3 px-4 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-6 lg:pb-6"
    >
      <PlayTurnBanner :player="currentPlayer" />
    </footer>
  </div>
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
