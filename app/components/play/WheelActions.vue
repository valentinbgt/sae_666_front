<script setup lang="ts">
import type { WheelMode } from '~/types/play'

defineProps<{
  disabled?: boolean
  active?: WheelMode | null
}>()

const emit = defineEmits<{ choose: [action: WheelMode] }>()

// L'avance est l'action par défaut (clic sur la roue) → pas de bouton dédié.
// Cartes optionnelles, une seule par tour : Boost / OVNI (échange) / Terrain.
const actions: { key: WheelMode; label: string; icon: string }[] = [
  { key: 'boost', label: 'Boost', icon: 'ph:lightning-fill' },
  { key: 'select', label: 'OVNI', icon: 'ph:arrows-left-right-fill' },
  { key: 'terrain', label: 'Terrain', icon: 'ph:shovel-fill' },
]
</script>

<template>
  <div class="flex w-52 flex-col gap-3">
    <button
      v-for="a in actions"
      :key="a.key"
      type="button"
      :disabled="disabled"
      class="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-40"
      :class="
        active === a.key
          ? 'bg-cta text-primaire shadow-[0_4px_0_#9e5227]'
          : 'bg-secondaire/70 text-primaire hover:bg-secondaire'
      "
      @click="emit('choose', a.key)"
    >
      <Icon :name="a.icon" class="h-4 w-4" />
      {{ a.label }}
    </button>
  </div>
</template>
