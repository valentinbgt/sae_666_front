/**
 * Parallax au scroll, léger et sans dépendance.
 *
 * Chaque élément portant l'attribut `data-parallax="<vitesse>"` est translaté
 * verticalement selon sa distance au centre du viewport :
 *   offset = (centreÉlément − centreViewport) × vitesse
 * Une vitesse positive fait « traîner » l'élément (il défile plus lentement
 * que la page et semble reculer), une vitesse négative l'envoie dans le sens
 * inverse. Valeurs typiques : ~0.1 à 0.3.
 *
 * Le décalage est exposé via la variable CSS `--parallax-y` que la classe
 * `.parallax` (cf. main.css) applique en `translate3d`. Un seul listener de
 * scroll passif, throttlé en requestAnimationFrame. Respecte
 * `prefers-reduced-motion` (aucun effet alors).
 *
 * `getBoundingClientRect()` renvoie la position *transformée* : on retranche le
 * décalage déjà appliqué (`applied`) pour mesurer la position naturelle et
 * éviter toute boucle d'amplification.
 */
export function useScrollParallax(options: { root?: () => ParentNode | null } = {}) {
  let layers: { el: HTMLElement; speed: number; applied: number }[] = []
  let frame = 0
  let viewportCenter = 0

  function update() {
    frame = 0
    for (const layer of layers) {
      const rect = layer.el.getBoundingClientRect()
      const naturalCenter = rect.top - layer.applied + rect.height / 2
      const offset = (naturalCenter - viewportCenter) * layer.speed
      layer.applied = offset
      layer.el.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
    }
  }

  function onScroll() {
    if (frame) return
    frame = requestAnimationFrame(update)
  }

  function onResize() {
    viewportCenter = window.innerHeight / 2
    onScroll()
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = options.root?.() ?? document
    layers = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'))
      .map((el) => ({ el, speed: Number.parseFloat(el.dataset.parallax || '0') || 0, applied: 0 }))
      .filter(({ speed }) => speed !== 0)
    if (!layers.length) return

    viewportCenter = window.innerHeight / 2
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
    if (frame) cancelAnimationFrame(frame)
  })
}
