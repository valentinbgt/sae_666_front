<script setup lang="ts">
import type { WheelMode } from "~/types/play";

const props = defineProps<{
  disabled?: boolean;
  active?: WheelMode | null;
}>();

const emit = defineEmits<{ choose: [action: WheelMode] }>();

// L'avance est l'action par défaut (clic sur la roue) → pas de bouton dédié.
// Cartes optionnelles, une seule par tour : Boost / OVNI (échange) / Terrain.
type Action = { key: WheelMode; label: string; image: string };

const boost: Action = {
  key: "boost",
  label: "Boost",
  image: "/images/assets/boost.png",
};
// OVNI (échange) et Terrain restent toujours côte à côte.
const pair: Action[] = [
  { key: "select", label: "OVNI", image: "/images/assets/ovni.png" },
  { key: "terrain", label: "Terrain", image: "/images/assets/terrain.png" },
];

// Une carte est sélectionnée uniquement si `active` correspond à une carte
// (boost/select/terrain). La valeur par défaut "advance" = aucune sélection.
const hasCardSelected = computed(() =>
  [boost, ...pair].some((a) => a.key === props.active),
);
</script>

<template>
  <!-- Bouton réutilisable : Boost seul au-dessus, OVNI + Terrain côte à côte.
       Layout fixe (la scène /play est toujours en paysage de référence). -->
  <div
    class="flex w-auto flex-col items-center justify-center gap-3"
  >
    <button
      type="button"
      :disabled="disabled"
      class="flex h-48 w-auto flex-col items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-40"
      :class="
        !hasCardSelected
          ? 'opacity-100 text-primaire '
          : active === boost.key
            ? 'opacity-100 text-primaire'
            : 'opacity-50 text-primaire '
      "
      @click="emit('choose', boost.key)"
    >
      <img
        :src="boost.image"
        :alt="boost.label"
        class="h-32 w-auto select-none object-contain transition"
        :class="
          active === boost.key
            ? 'drop-shadow-[0_0_8px_rgba(247,231,198,1)]'
            : ''
        "
      />
      {{ boost.label }}
    </button>

    <!-- OVNI + Terrain : toujours sur une même ligne horizontale. -->
    <div class="flex items-start justify-center gap-3">
      <button
        v-for="a in pair"
        :key="a.key"
        type="button"
        :disabled="disabled"
        class="flex h-48 w-auto flex-col items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-40"
        :class="
          !hasCardSelected
            ? 'opacity-100 text-primaire '
            : active === a.key
              ? 'opacity-100 text-primaire'
              : 'opacity-50 text-primaire '
        "
        @click="emit('choose', a.key)"
      >
        <img
          :src="a.image"
          :alt="a.label"
          class="h-32 w-auto select-none object-contain transition"
          :class="
            active === a.key ? 'drop-shadow-[0_0_8px_rgba(247,231,198,1)]' : ''
          "
        />
        {{ a.label }}
      </button>
    </div>
  </div>
</template>
