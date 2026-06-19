import type { Me } from '~/types/play'

/**
 * Profil de l'utilisateur connecté (GET /me).
 * Sert à afficher le pseudo de l'hôte et à confirmer l'identité côté téléphone
 * avant de rejoindre une partie (« tu rejoins en tant que X »).
 */
export function useMe() {
  const me = useState<Me | null>('crooak.me', () => null)
  const { get } = useApi()

  async function fetchMe(force = false): Promise<Me | null> {
    if (me.value && !force) return me.value
    me.value = await get<Me>('/me')
    return me.value
  }

  // À appeler à la déconnexion : sans ça le profil reste en cache dans le
  // useState partagé et /play continue d'afficher « Connecté en tant que X ».
  function clearMe() {
    me.value = null
  }

  return { me, fetchMe, clearMe }
}
