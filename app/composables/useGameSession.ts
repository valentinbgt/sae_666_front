import type { GamePlayer, WheelMode, WheelSegment } from '~/types/play'

export type TurnPhase = 'ready' | 'spinning' | 'done'

const ADVANCE_VALUES = [1, 2, 3]
const BOOST_VALUES = [2, 4, 6]
const TERRAIN_VALUES = [1, 2, 3]

/**
 * Machine à états LOCALE d'une partie en cours (côté hôte uniquement, aucun
 * échange réseau). Gère l'ordre des tours, le tour courant, et le déroulé d'une
 * action.
 *
 * Déroulé d'un tour (la roue se lance au clic) :
 *   - Action par défaut = « avancer » : la roue est prête dès le début du tour.
 *   - Le joueur peut activer AU PLUS une carte (Boost / OVNI / Terrain) tant
 *     qu'aucune rotation n'a eu lieu :
 *       • Boost   → la roue d'avance affiche 2/4/6 (une seule rotation).
 *       • Terrain → pré-rotation 1/2/3, puis rotation d'avance.
 *       • OVNI    → pré-rotation sur les autres joueurs, puis rotation d'avance.
 *   - Une fois la 1re rotation lancée, les cartes sont verrouillées : le joueur
 *     n'a plus qu'à (re)lancer la roue jusqu'à l'avance finale.
 *
 *   ready → (startSpin) → spinning → (settle) → ready|done → (endTurn) → ready
 */
export function useGameSession(initialPlayers: GamePlayer[]) {
  const players = ref<GamePlayer[]>([...initialPlayers])
  const currentIndex = ref(0)

  /** Carte choisie pour ce tour ('advance' = aucune carte, avance simple). */
  const action = ref<WheelMode>('advance')
  /** Mode courant de la roue (pré-action Terrain/OVNI puis 'advance'/'boost'). */
  const mode = ref<WheelMode>('advance')
  const phase = ref<TurnPhase>('ready')
  /** true dès qu'une rotation a démarré ce tour → verrouille les cartes. */
  const hasSpun = ref(false)

  /** Résultat d'avancement final du tour. */
  const result = ref<WheelSegment | null>(null)
  /** Résultat de la pré-rotation Terrain (1/2/3), informatif. */
  const terrainResult = ref<WheelSegment | null>(null)
  /** Joueur ciblé en mode OVNI. */
  const selectedPlayer = ref<GamePlayer | null>(null)

  const currentPlayer = computed<GamePlayer | null>(
    () => players.value[currentIndex.value] ?? null,
  )
  const otherPlayers = computed(() =>
    players.value.filter((_, i) => i !== currentIndex.value),
  )

  /** Les cartes ne sont sélectionnables qu'avant la 1re rotation du tour. */
  const cardsLocked = computed(() => hasSpun.value || phase.value !== 'ready')

  const segments = computed<WheelSegment[]>(() => {
    if (mode.value === 'boost') {
      return BOOST_VALUES.map((v) => ({ label: String(v), value: v }))
    }
    if (mode.value === 'terrain') {
      return TERRAIN_VALUES.map((v) => ({ label: String(v), value: v }))
    }
    if (mode.value === 'select') {
      return otherPlayers.value.map((p) => ({
        label: p.name,
        playerId: p.id,
        color: p.color,
      }))
    }
    return ADVANCE_VALUES.map((v) => ({ label: String(v), value: v }))
  })

  /**
   * Active/désactive une carte (Boost / OVNI / Terrain). Re-cliquer la carte
   * active revient à l'avance simple. Ignoré une fois la roue lancée.
   */
  function chooseAction(a: WheelMode) {
    if (cardsLocked.value) return
    terrainResult.value = null
    selectedPlayer.value = null

    // Toggle : re-cliquer la carte active → retour à l'avance simple.
    const next: WheelMode = action.value === a ? 'advance' : a
    action.value = next

    if (next === 'select') {
      if (otherPlayers.value.length <= 1) {
        // Un seul autre joueur : sélection auto, pas de pré-rotation.
        selectedPlayer.value = otherPlayers.value[0] ?? null
        mode.value = 'advance'
      } else {
        mode.value = 'select'
      }
    } else {
      mode.value = next
    }
  }

  /** Réinitialise l'état du tour (avance simple, roue prête). */
  function reset() {
    action.value = 'advance'
    mode.value = 'advance'
    phase.value = 'ready'
    hasSpun.value = false
    result.value = null
    terrainResult.value = null
    selectedPlayer.value = null
  }

  function startSpin() {
    if (phase.value !== 'ready') return
    hasSpun.value = true
    phase.value = 'spinning'
  }

  /** Appelé quand la roue s'immobilise sur un segment. */
  function settle(segment: WheelSegment) {
    if (mode.value === 'select') {
      // Pré-rotation OVNI : on enchaîne sur la roue d'avancement.
      selectedPlayer.value =
        otherPlayers.value.find((p) => p.id === segment.playerId) ?? null
      mode.value = 'advance'
      phase.value = 'ready'
      return
    }
    if (mode.value === 'terrain') {
      // Pré-rotation Terrain : on affiche le résultat puis on avance.
      terrainResult.value = segment
      mode.value = 'advance'
      phase.value = 'ready'
      return
    }
    // Rotation d'avance (advance ou boost) : fin du tour.
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
    cardsLocked,
    segments,
    result,
    terrainResult,
    selectedPlayer,
    chooseAction,
    reset,
    startSpin,
    settle,
    endTurn,
  }
}
