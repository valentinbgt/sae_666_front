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

const slices = computed(() => {
  const n = props.segments.length || 1
  const seg = 360 / n
  return props.segments.map((s, i) => {
    const a0 = i * seg
    const a1 = (i + 1) * seg
    const [x0, y0] = pt(R, a0)
    const [x1, y1] = pt(R, a1)
    const large = a1 - a0 > 180 ? 1 : 0
    const [lx, ly] = pt(LABEL_R, a0 + seg / 2)
    return {
      d: `M ${C} ${C} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`,
      lx,
      ly,
      seg: s,
    }
  })
})

async function spin(): Promise<void> {
  const n = props.segments.length
  if (spinning.value || n === 0) return
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
  emit('settled', props.segments[target]!, target)
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
          text-anchor="middle"
          dominant-baseline="central"
          fill="#F7E7C6"
          font-family="Georgia, serif"
          :font-size="segments.length > 3 ? 10 : 22"
          :font-weight="mode === 'select' ? 600 : 400"
        >{{ sl.seg.label }}</text>
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
