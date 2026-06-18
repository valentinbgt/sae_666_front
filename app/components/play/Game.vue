<script setup lang="ts">
import type { Game, WheelSegment } from '~/types/play'

const props = defineProps<{ game: Game }>()
const emit = defineEmits<{ quit: [] }>()

/** Ordonne les joueurs selon turnOrder (sinon ordre des sièges). */
function orderedPlayers(): Game['players'] {
  const order = props.game.turnOrder
  if (!order?.length) return props.game.players
  const byId = new Map(props.game.players.map((p) => [String(p.id), p]))
  const ordered = order
    .map((id) => byId.get(String(id)))
    .filter((p): p is Game['players'][number] => !!p)
  const seen = new Set(ordered.map((p) => String(p.id)))
  return [...ordered, ...props.game.players.filter((p) => !seen.has(String(p.id)))]
}

const {
  players,
  currentIndex,
  currentPlayer,
  action,
  mode,
  phase,
  segments,
  result,
  selectedPlayer,
  chooseAction,
  reset,
  startSpin,
  settle,
  endTurn,
} = useGameSession(orderedPlayers())

const wheel = ref<{ spin: () => Promise<void> } | null>(null)

async function onSpinClick() {
  if (phase.value !== 'ready') return
  startSpin()
  await wheel.value?.spin()
}

function onSettled(segment: WheelSegment) {
  settle(segment)
}

const hint = computed(() => {
  if (phase.value === 'idle') return 'Choisis une action'
  if (phase.value === 'spinning') return 'La roue tourne…'
  if (mode.value === 'select') return 'Lance la roue pour désigner un joueur'
  if (action.value === 'select' && selectedPlayer.value && phase.value === 'ready')
    return `Échange avec ${selectedPlayer.value.name} — lance la roue pour avancer`
  if (phase.value === 'ready') return 'Lance la roue'
  if (phase.value === 'done') return `Avance de ${result.value?.value ?? ''} case(s)`
  return ''
})
</script>

<template>
  <div class="relative flex min-h-dvh flex-col">
    <!-- En-tête -->
    <header class="flex items-center justify-between px-6 pt-5">
      <span class="w-20" />
      <img src="/images/logo_crooak.png" alt="CROOAK" class="h-10 w-auto" />
      <button
        type="button"
        class="w-20 text-right text-xs font-semibold uppercase tracking-widest text-primaire/50 transition hover:text-primaire"
        @click="emit('quit')"
      >
        Quitter
      </button>
    </header>

    <!-- Zone de jeu -->
    <main class="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-6 lg:flex-row lg:items-center lg:gap-12">
      <!-- Actions -->
      <PlayWheelActions
        :active="action"
        :disabled="phase !== 'idle'"
        @choose="chooseAction"
      />

      <!-- Roue + contrôles -->
      <div class="flex flex-col items-center gap-4">
        <PlayGameWheel
          ref="wheel"
          :segments="segments"
          :mode="mode"
          class="w-[min(58vh,26rem)]"
          @settled="onSettled"
        />

        <p class="min-h-6 text-center text-sm text-primaire/80">{{ hint }}</p>

        <div class="flex items-center gap-3">
          <button
            v-if="phase === 'ready'"
            type="button"
            class="btn-filled inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest text-primaire"
            @click="onSpinClick"
          >
            Lancer la roue
          </button>
          <button
            v-if="phase === 'done'"
            type="button"
            class="btn-filled inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest text-primaire"
            @click="endTurn"
          >
            Joueur suivant
          </button>
          <button
            v-if="phase === 'ready'"
            type="button"
            class="text-xs font-semibold uppercase tracking-widest text-primaire/40 transition hover:text-primaire/80"
            @click="reset"
          >
            Annuler
          </button>
        </div>

        <!-- Résultat -->
        <div
          v-if="phase === 'done' && result"
          class="flex flex-col items-center"
        >
          <span class="text-xs uppercase tracking-[0.3em] text-primaire/50">Résultat</span>
          <span class="text-5xl text-cta" style="font-family: Georgia, serif">
            {{ result.value }}
          </span>
        </div>
      </div>
    </main>

    <!-- Pied : tour courant + ordre des joueurs -->
    <footer class="flex flex-col items-start gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <PlayTurnBanner :player="currentPlayer" />
      <div class="flex flex-wrap gap-2">
        <PlayPlayerChip
          v-for="(p, i) in players"
          :key="p.id"
          :player="p"
          :active="i === currentIndex"
        />
      </div>
    </footer>
  </div>
</template>
