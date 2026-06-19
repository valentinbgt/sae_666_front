<script setup lang="ts">
import type { WheelMode, WheelSegment } from '~/types/play'

const props = defineProps<{
  segments: WheelSegment[]
  mode: WheelMode
}>()

const emit = defineEmits<{ settled: [segment: WheelSegment, index: number] }>()

const SIZE = 200
const C = SIZE / 2
const R = 92
const LABEL_R = R * 0.64
const SPIN_MS = 4200

const rotation = ref(0)
const spinning = ref(false)

/** Coordonnées d'un point sur le cercle, angle en degrés horaire depuis le haut. */
function pt(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180
  return [C + r * Math.sin(rad), C - r * Math.cos(rad)]
}

// On duplique les segments pour densifier visuellement la roue : chaque
// libellé apparaît deux fois. La logique de tirage reste juste car on ramène
// l'index du résultat sur les segments d'origine (cf. spin()).
const display = computed(() => [...props.segments, ...props.segments])

// Police adaptative : en mode OVNI (select) les libellés sont des pseudos de
// longueur variable. On réduit la taille pour qu'ils tiennent dans la roue avec
// un peu de marge, et on tronque ceux qui restent trop longs.
const PAD = 8 // marge radiale avec le bord de la roue
const MIN_FONT = 8
const CHAR_W = 0.6 // largeur moyenne d'un caractère ≈ CHAR_W × taille de police
// Longueur radiale exploitable (texte centré à LABEL_R, symétrique).
const AVAIL = 2 * (R - PAD - LABEL_R)
// Au-delà de cette longueur (à la police mini), on tronque avec une ellipse.
const MAX_CHARS = Math.floor(AVAIL / (MIN_FONT * CHAR_W))

function clip(label: string): string {
  return label.length > MAX_CHARS ? label.slice(0, MAX_CHARS - 1) + '…' : label
}

const fontSize = computed(() => {
  const maxFont = props.segments.length > 3 ? 10 : 22
  // On dimensionne sur le libellé le plus long (tronqué) pour rester uniforme.
  const longest = props.segments.reduce(
    (m, s) => Math.max(m, Math.min(s.label.length, MAX_CHARS)),
    1,
  )
  const fit = AVAIL / (longest * CHAR_W)
  return Math.round(Math.max(MIN_FONT, Math.min(maxFont, fit)))
})

const slices = computed(() => {
  const n = display.value.length || 1
  const seg = 360 / n
  return display.value.map((s, i) => {
    const a0 = i * seg
    const a1 = (i + 1) * seg
    const [x0, y0] = pt(R, a0)
    const [x1, y1] = pt(R, a1)
    const large = a1 - a0 > 180 ? 1 : 0
    const mid = a0 + seg / 2
    const [lx, ly] = pt(LABEL_R, mid)
    return {
      d: `M ${C} ${C} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`,
      lx,
      ly,
      // Orientation figée sur la roue : le libellé est droit quand son segment
      // passe devant le pointeur (gauche, 270°). rot = mid - 270.
      rot: mid - 270,
      seg: s,
    }
  })
})

async function spin(): Promise<void> {
  const baseN = props.segments.length
  const n = display.value.length
  if (spinning.value || baseN === 0) return
  spinning.value = true
  const segAngle = 360 / n
  const target = Math.floor(Math.random() * n)
  const targetCenter = target * segAngle + segAngle / 2
  // Pour amener le centre du segment cible sous le pointeur (gauche, à 270°),
  // il faut une rotation R telle que R ≡ 270 - targetCenter (mod 360).
  // On y ajoute 5 tours.
  const desiredMod = (((270 - targetCenter) % 360) + 360) % 360
  const currentMod = ((rotation.value % 360) + 360) % 360
  let delta = desiredMod - currentMod
  if (delta < 0) delta += 360
  rotation.value += 360 * 5 + delta
  await new Promise((r) => setTimeout(r, SPIN_MS))
  spinning.value = false
  // Chaque segment d'origine a deux copies : on ramène l'index sur l'original.
  const realIndex = target % baseN
  emit('settled', props.segments[realIndex]!, realIndex)
}

defineExpose({ spin, spinning })
</script>

<template>
  <div class="relative inline-block aspect-square">
    <svg :viewBox="`0 0 ${SIZE} ${SIZE}`" class="h-full w-full overflow-visible">
      <!-- Groupe qui tourne (disque + segments + libellés) -->
      <g class="wheel-rot" :style="{ transform: `rotate(${rotation}deg)` }">
        <circle :cx="C" :cy="C" :r="R" fill="#3b241a" />
        <path
          v-for="(sl, i) in slices"
          :key="`s${i}`"
          :d="sl.d"
          :fill="mode === 'select' ? (sl.seg.color ?? '#3b241a') : '#3b241a'"
          :fill-opacity="mode === 'select' ? 0.9 : 1"
          stroke="#F7E7C6"
          stroke-width="1.4"
          stroke-linejoin="round"
        />
        <text
          v-for="(sl, i) in slices"
          :key="`t${i}`"
          :x="sl.lx"
          :y="sl.ly"
          :transform="`rotate(${sl.rot} ${sl.lx} ${sl.ly})`"
          text-anchor="middle"
          dominant-baseline="central"
          fill="#F7E7C6"
          font-family="Georgia, serif"
          :font-size="fontSize"
          :font-weight="mode === 'select' ? 600 : 400"
        >{{ clip(sl.seg.label) }}</text>
      </g>

      <!-- Bordure fixe -->
      <circle :cx="C" :cy="C" :r="R" fill="none" stroke="#F7E7C6" stroke-width="2" />

      <!-- Pointeur fixe au milieu à gauche -->
      <polygon
        points="21,100 1,87 1,113"
        fill="#F7E7C6"
        stroke="#3b241a"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.wheel-rot {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 4200ms cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
