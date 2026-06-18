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

  return { me, fetchMe }
}
