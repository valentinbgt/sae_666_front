<script setup lang="ts">
import type { GamePlayer } from "~/types/play";

defineProps<{
  player: GamePlayer | null;
}>();
</script>

<template>
  <div class="flex items-center gap-4">
    <img
      src="/images/assets/grenouille.png"
      alt=""
      class="h-16 w-auto select-none drop-shadow-lg sm:h-20"
    />
    <p
      v-if="player"
      class="text-4xl text-primaire sm:text-5xl"
      style="font-family: Georgia, serif"
    >
      <span class="inline-flex flex-wrap items-center gap-2">
        <span
          class="h-4 w-4 rounded-full ring-2 ring-primaire/40"
          :style="{ backgroundColor: player.color }"
        />
        À toi, {{ player.name }} !
      </span>
    </p>
  </div>
</template>
