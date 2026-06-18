<script setup lang="ts">
import type { WheelMode } from "~/types/play";

defineProps<{
  disabled?: boolean;
  active?: WheelMode | null;
}>();

const emit = defineEmits<{ choose: [action: WheelMode] }>();

// L'avance est l'action par défaut (clic sur la roue) → pas de bouton dédié.
// Cartes optionnelles, une seule par tour : Boost / OVNI (échange) / Terrain.
const actions: { key: WheelMode; label: string; image: string }[] = [
  { key: "boost", label: "Boost", image: "/images/assets/boost.png" },
  { key: "select", label: "OVNI", image: "/images/assets/ovni.png" },
  { key: "terrain", label: "Terrain", image: "/images/assets/terrain.png" },
];
</script>

<template>
  <div
    class="flex w-full flex-wrap justify-center gap-2 landscape:w-52 landscape:flex-col landscape:gap-3"
  >
    <button
      v-for="a in actions"
      :key="a.key"
      type="button"
      :disabled="disabled"
      class="flex flex-col items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-40 lg:px-6 lg:py-3"
      :class="
        active === a.key
          ? 'opacity-100 text-primaire'
          : 'opacity-50  text-primaire hover:bg-secondaire'
      "
      @click="emit('choose', a.key)"
    >
      <img
        :src="a.image"
        :alt="a.label"
        class="h-24 w-auto select-none object-contain transition"
        :class="
          active === a.key ? 'drop-shadow-[0_0_8px_rgba(247,231,198,1)]' : ''
        "
      />
      {{ a.label }}
    </button>
  </div>
</template>
