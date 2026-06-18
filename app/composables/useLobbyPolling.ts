import type { Game } from '~/types/play'

/**
 * Polling léger de l'état de partie pendant le lobby (pas de WebSocket).
 * S'arrête automatiquement dès que la partie n'est plus au statut « lobby »
 * et au démontage du composant.
 */
export function useLobbyPolling(
  code: string,
  onUpdate: (game: Game) => void,
  intervalMs = 2000,
) {
  const { fetchGame } = useGame()
  const error = ref<string | null>(null)
  const active = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  async function tick() {
    try {
      const game = await fetchGame(code)
      error.value = null
      onUpdate(game)
      if (game.status !== 'lobby') stop()
    } catch (e: any) {
      error.value = e?.data?.message ?? e?.message ?? 'Connexion au serveur impossible.'
    }
  }

  function start() {
    if (active.value) return
    active.value = true
    tick()
    timer = setInterval(tick, intervalMs)
  }

  function stop() {
    active.value = false
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onBeforeUnmount(stop)

  return { start, stop, tick, error, active }
}
