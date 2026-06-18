// Types du compagnon numérique CROOAK (page /play).
// Voir le contrat backend dans « Doc API.md » (section Domaine Jeu).

export type GameStatus = 'lobby' | 'active' | 'finished'
export type PlayerKind = 'account' | 'manual'

export interface GamePlayer {
  id: number | string
  name: string
  /** Couleur hex assignée par le serveur depuis une palette fixe. */
  color: string
  kind: PlayerKind
  isHost?: boolean
  userId?: number | null
  seat?: number
}

export interface Game {
  id: number | string
  code: string
  status: GameStatus
  hostUserId?: number | null
  players: GamePlayer[]
  /** Ordre des tours (ids de GamePlayer), figé au démarrage. */
  turnOrder?: (number | string)[]
  /** Index du tour courant (optionnel, pour reprise). */
  currentTurn?: number | null
}

/** Réponse de POST /games/{code}/join. */
export interface JoinResult {
  player: GamePlayer
  game: Pick<Game, 'code' | 'status'>
}

/** Réponse de GET /me. */
export interface Me {
  id: number
  email: string
  username: string
  roles: string[]
}

/**
 * Modes de la roue :
 * - advance : tirage 1/2/3 (mode par défaut de chaque tour)
 * - boost   : tirage 2/4/6 (carte Boost, immédiat)
 * - terrain : 1/2/3 habillé d'une pelle (carte Terrain)
 * - select  : sélection d'un autre joueur (carte Echange / OVNI)
 */
export type WheelMode = 'advance' | 'boost' | 'terrain' | 'select'

export interface WheelSegment {
  /** Texte affiché dans le segment (chiffre, ou nom du joueur en mode select). */
  label: string
  /** Valeur d'avancement, présente pour advance/boost/terrain. */
  value?: number
  /** Id du joueur ciblé, présent en mode select. */
  playerId?: number | string
  /** Couleur du segment (couleur du joueur en mode select). */
  color?: string
}
