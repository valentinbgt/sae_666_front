import type { GamePlayer, WheelMode, WheelSegment } from '~/types/play'

export type TurnPhase = 'idle' | 'ready' | 'spinning' | 'done'

const ADVANCE_VALUES = [1, 2, 3]
const BOOST_VALUES = [2, 4, 6]

/**
 * Machine à états LOCALE d'une partie en cours (côté hôte uniquement, aucun
 * échange réseau). Gère l'ordre des tours, le tour courant, et le déroulé d'une
 * action. Boost est immédiat → aucun modificateur conservé d'un tour à l'autre.
 *
 * Déroulé d'un tour :
 *   idle → (chooseAction) → ready → (startSpin) → spinning → (settle) → done → (endTurn) → idle
 * Cas Echange : la 1re roue (select) choisit un joueur puis on repasse en
 * « ready » pour la roue d'avancement.
 */
export function useGameSession(initialPlayers: GamePlayer[]) {
  const players = ref<GamePlayer[]>([...initialPlayers])
  const currentIndex = ref(0)

  /** Action choisie pour ce tour (null = pas encore choisie). */
  const action = ref<WheelMode | null>(null)
  /** Mode courant de la roue (Echange passe de « select » à « advance »). */
  const mode = ref<WheelMode>('advance')
  const phase = ref<TurnPhase>('idle')
  /** Résultat d'avancement final du tour. */
  const result = ref<WheelSegment | null>(null)
  /** Joueur ciblé en mode Echange. */
  const selectedPlayer = ref<GamePlayer | null>(null)

  const currentPlayer = computed<GamePlayer | null>(
    () => players.value[currentIndex.value] ?? null,
  )
  const otherPlayers = computed(() =>
    players.value.filter((_, i) => i !== currentIndex.value),
  )

  const segments = computed<WheelSegment[]>(() => {
    if (mode.value === 'boost') {
      return BOOST_VALUES.map((v) => ({ label: String(v), value: v }))
    }
    if (mode.value === 'select') {
      return otherPlayers.value.map((p) => ({
        label: p.name,
        playerId: p.id,
        color: p.color,
      }))
    }
    // advance + terrain : mêmes valeurs (Terrain n'est qu'un habillage visuel)
    return ADVANCE_VALUES.map((v) => ({ label: String(v), value: v }))
  })

  /** Le joueur courant choisit une des 4 actions. */
  function chooseAction(a: WheelMode) {
    action.value = a
    result.value = null
    selectedPlayer.value = null

    if (a === 'select') {
      if (otherPlayers.value.length <= 1) {
        // Un seul autre joueur : sélection auto, on passe direct à l'avancement.
        selectedPlayer.value = otherPlayers.value[0] ?? null
        mode.value = 'advance'
      } else {
        mode.value = 'select'
      }
    } else {
      mode.value = a
    }
    phase.value = 'ready'
  }

  /** Annule l'action tant que la roue n'a pas tourné. */
  function reset() {
    action.value = null
    mode.value = 'advance'
    result.value = null
    selectedPlayer.value = null
    phase.value = 'idle'
  }

  function startSpin() {
    if (phase.value === 'ready') phase.value = 'spinning'
  }

  /** Appelé quand la roue s'immobilise sur un segment. */
  function settle(segment: WheelSegment) {
    if (mode.value === 'select') {
      selectedPlayer.value =
        otherPlayers.value.find((p) => p.id === segment.playerId) ?? null
      // Après l'échange, on enchaîne sur la roue d'avancement (1/2/3).
      mode.value = 'advance'
      phase.value = 'ready'
      return
    }
    result.value = segment
    phase.value = 'done'
  }

  /** Termine le tour et passe au joueur suivant. */
  function endTurn() {
    if (players.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % players.value.length
    }
    reset()
  }

  return {
    players,
    currentIndex,
    currentPlayer,
    otherPlayers,
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
  }
}
