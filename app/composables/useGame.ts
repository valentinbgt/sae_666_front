import type { Game, GamePlayer, JoinResult } from '~/types/play'

/**
 * Appels REST vers les routes de partie de crooak_api (cf. « Doc API.md »,
 * section Domaine Jeu). Réutilise le Bearer JWT via useApi().
 */
export function useGame() {
  const { get, post, del } = useApi()

  const enc = (code: string) => encodeURIComponent(code)

  /** Hôte : crée une partie et devient le premier GamePlayer. */
  function createGame() {
    return post<Game>('/games', {})
  }

  /** État courant d'une partie (l'hôte poll ici pendant le lobby). */
  function fetchGame(code: string) {
    return get<Game>(`/games/${enc(code)}`)
  }

  /** Téléphone : rejoint la partie ; le serveur résout le pseudo via le JWT. */
  function joinGame(code: string) {
    return post<JoinResult>(`/games/${enc(code)}/join`, {})
  }

  /** Hôte : ajoute un joueur manuel (sans compte). */
  function addManualPlayer(code: string, name: string, color?: string) {
    return post<{ player: GamePlayer }>(`/games/${enc(code)}/players`, { name, color })
  }

  /** Hôte : retire / kick un joueur. */
  function removePlayer(code: string, playerId: GamePlayer['id']) {
    return del<void>(`/games/${enc(code)}/players/${playerId}`)
  }

  /** Hôte : démarre la partie (fige l'ordre des tours). */
  function startGame(code: string) {
    return post<Game>(`/games/${enc(code)}/start`, {})
  }

  return { createGame, fetchGame, joinGame, addManualPlayer, removePlayer, startGame }
}
