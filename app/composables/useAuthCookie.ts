/**
 * Source unique de vérité pour le cookie de session `auth_token`.
 *
 * Tout accès au cookie DOIT passer par ici. Si les options diffèrent d'un appel
 * `useCookie('auth_token')` à l'autre (path, secure…), le navigateur peut
 * écrire et relire des cookies distincts — ou refuser celui qu'on relit. C'est
 * ce qui cassait la connexion sur mobile.
 *
 * `secure` est calé sur le protocole RÉEL de la page, pas sur le mode de build :
 * un cookie `Secure` est silencieusement ignoré par le navigateur hors contexte
 * sécurisé. Le bureau teste sur http://localhost (contexte sécurisé → `Secure`
 * accepté), mais un téléphone ouvre le build via http://<IP-du-LAN>, qui n'est
 * PAS un contexte sécurisé : le cookie `Secure` n'est jamais stocké, le token
 * disparaît et l'utilisateur retombe déconnecté sur l'accueil. On n'active donc
 * `Secure` qu'en HTTPS (prod), et on le laisse off en HTTP (tests, LAN).
 */
export function useAuthCookie() {
  return useCookie<string | null>('auth_token', {
    default: () => null,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.client && window.location.protocol === 'https:',
    maxAge: 60 * 60 * 24 * 30,
  })
}
