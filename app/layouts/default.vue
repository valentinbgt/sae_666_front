<script setup lang="ts">
const route = useRoute();
const hideChrome = computed(() => route.path === "/play" || route.path.startsWith("/play/"));
</script>

<template>
  <div class="relative min-h-screen w-full flex flex-col font-sans">
    <AppNavbar v-if="!hideChrome" />
    <main class="flex-1 w-full">
      <slot />
    </main>
    <AppFooter v-if="!hideChrome" />
  </div>
</template>
