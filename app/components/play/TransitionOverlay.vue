<script setup lang="ts">
defineProps<{
  message: { text: string; color?: string }[];
}>();

const emit = defineEmits<{ dismiss: [] }>();

// Même scène à dimensions fixes que l'écran de jeu (cf. PlayGame) : le message
// est dessiné dans la maquette puis mis à l'échelle d'un bloc, pour occuper la
// même zone que le jeu et se redimensionner exactement comme lui.
const { stageStyle } = useStageScale();
</script>

<template>
  <div
    class="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden bg-[#1a0f09]/95"
    @click="emit('dismiss')"
  >
    <!-- Scène (784×515) centrée et mise à l'échelle ; le fond sombre plein
         écran (letterbox compris) reste derrière. -->
    <div class="flex flex-col items-center justify-evenly" :style="stageStyle">
      <!-- Message retourné (joueur en face) -->
      <div class="flex rotate-180 flex-col items-center gap-3 px-6 text-center">
        <p class="text-5xl text-primaire" style="font-family: Georgia, serif">
          <span
            v-for="(part, i) in message"
            :key="i"
            :style="part.color ? { color: part.color } : {}"
            >{{ part.text }}</span
          >
        </p>
        <p class="mt-4 text-lg uppercase tracking-widest text-primaire/40">
          Appuie pour continuer
        </p>
      </div>

      <!-- Message normal (joueur face à l'écran) -->
      <div class="flex flex-col items-center gap-3 px-6 text-center">
        <p class="text-5xl text-primaire" style="font-family: Georgia, serif">
          <span
            v-for="(part, i) in message"
            :key="i"
            :style="part.color ? { color: part.color } : {}"
            >{{ part.text }}</span
          >
        </p>
        <p class="mt-4 text-lg uppercase tracking-widest text-primaire/40">
          Appuie pour continuer
        </p>
      </div>
    </div>
  </div>
</template>
