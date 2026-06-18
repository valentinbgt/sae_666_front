<script setup lang="ts">
defineProps<{
  message: { text: string; color?: string }[];
  color?: string;
}>();

const emit = defineEmits<{ dismiss: [] }>();
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex cursor-pointer select-none flex-col items-center justify-evenly bg-[#1a0f09]/95"
    @click="emit('dismiss')"
  >
    <!-- Message retourné (joueur en face) -->
    <div class="flex flex-col items-center gap-5 px-8 text-center rotate-180">
      <p
        class="text-4xl text-primaire sm:text-5xl"
        style="font-family: Georgia, serif"
      >
        <span
          v-for="(part, i) in message"
          :key="i"
          :style="part.color ? { color: part.color } : {}"
          >{{ part.text }}</span
        >
      </p>
      <p class="text-xs uppercase tracking-widest text-primaire/40">
        Appuie pour continuer
      </p>
    </div>

    <!-- Message normal (joueur face à l'écran) -->
    <div class="flex flex-col items-center gap-5 px-8 text-center">
      <p
        class="text-4xl text-primaire sm:text-5xl"
        style="font-family: Georgia, serif"
      >
        <span
          v-for="(part, i) in message"
          :key="i"
          :style="part.color ? { color: part.color } : {}"
          >{{ part.text }}</span
        >
      </p>
      <p class="text-xs uppercase tracking-widest text-primaire/40">
        Appuie pour continuer
      </p>
    </div>
  </div>
</template>
