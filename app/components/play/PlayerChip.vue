<script setup lang="ts">
import type { GamePlayer } from "~/types/play";

defineProps<{
  player: GamePlayer;
  active?: boolean;
  removable?: boolean;
}>();

defineEmits<{ remove: [] }>();
</script>

<template>
  <div
    class="flex items-center gap-2.5 rounded-full pl-2.5 pr-3 py-1.5 transition"
    :class="
      active
        ? 'bg-cta/25 ring-2'
        : 'bg-secondaire/50 ring-1'
    "
    :style="{ '--tw-ring-color': player.color }"
  >
    <span
      class="max-w-[10rem] truncate text-sm font-semibold text-primaire"
      :style="{ color: player.color }"
      >{{ player.name }}</span
    >
    <button
      v-if="removable"
      type="button"
      class="ml-1 text-primaire/40 transition hover:text-alerte"
      aria-label="Retirer le joueur"
      @click="$emit('remove')"
    >
      <Icon name="ph:x-bold" class="h-3.5 w-3.5" />
    </button>
  </div>
</template>
