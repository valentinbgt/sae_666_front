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
      class="h-48 w-auto select-none drop-shadow-lg absolute -bottom-12 -left-8 z-0 opacity-80 -rotate-6 brightness-60"
    />
    <p
      v-if="player"
      class="text-2xl text-primaire z-10 absolute bottom-3 right-5"
    >
      <span class="flex items-end justify-end flex-col flex-wrap">
        <span class="text-lg" style="font-family: Georgia, serif"
          >Au tour de</span
        >
        <span class="text-4xl font-semibold" :style="{ color: player.color }">{{
          player.name
        }}</span>
      </span>
    </p>
  </div>
</template>
