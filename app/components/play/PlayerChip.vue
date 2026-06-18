<script setup lang="ts">
import type { GamePlayer } from '~/types/play'

defineProps<{
  player: GamePlayer
  active?: boolean
  removable?: boolean
}>()

defineEmits<{ remove: [] }>()
</script>

<template>
  <div
    class="flex items-center gap-2.5 rounded-full pl-2.5 pr-3 py-1.5 transition"
    :class="active ? 'bg-cta/25 ring-2 ring-cta' : 'bg-secondaire/50 ring-1 ring-primaire/10'"
  >
    <span
      class="h-3.5 w-3.5 shrink-0 rounded-full ring-2 ring-primaire/30"
      :style="{ backgroundColor: player.color }"
    />
    <span class="max-w-[10rem] truncate text-sm font-semibold text-primaire">{{ player.name }}</span>
    <span
      v-if="player.isHost"
      class="rounded bg-cta/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primaire"
    >hôte</span>
    <span
      v-else-if="player.kind === 'manual'"
      class="rounded bg-primaire/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primaire/60"
    >manuel</span>
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
