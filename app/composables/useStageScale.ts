/** Dimensions de référence de la scène de jeu (la « maquette »). */
export const STAGE_BASE_W = 784
export const STAGE_BASE_H = 515

/**
 * Échelle d'une scène à dimensions fixes, mise à l'échelle d'un seul bloc pour
 * un rendu strictement identique sur tous les écrans : tout est dessiné à taille
 * fixe dans `baseW × baseH`, puis l'ensemble est redimensionné comme une photo.
 * Le ratio est conservé (les bords non couverts forment un letterbox, rempli par
 * le conteneur plein écran).
 *
 * Partagée par l'écran de jeu (PlayGame) et les overlays plein écran
 * (PlayTransitionOverlay) pour qu'ils se redimensionnent exactement pareil.
 *
 * @returns `stageStyle` à poser sur la scène (positionnée et centrée dans son
 * conteneur plein écran) et l'`scale` courante.
 */
export function useStageScale(baseW = STAGE_BASE_W, baseH = STAGE_BASE_H) {
  const scale = ref(1)

  function update() {
    scale.value = Math.min(window.innerWidth / baseW, window.innerHeight / baseH)
  }

  const stageStyle = computed(() => ({
    position: 'absolute' as const,
    left: '50%',
    top: '50%',
    width: `${baseW}px`,
    height: `${baseH}px`,
    transformOrigin: 'center center',
    transform: `translate(-50%, -50%) scale(${scale.value})`,
  }))

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.visualViewport?.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
    window.removeEventListener('orientationchange', update)
    window.visualViewport?.removeEventListener('resize', update)
  })

  return { scale, stageStyle }
}
