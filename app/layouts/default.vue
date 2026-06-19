<script setup lang="ts">
const route = useRoute();
const hideNavbar = computed(() => route.path === "/play" || route.path.startsWith("/play/"));
</script>

<template>
  <div class="relative min-h-screen w-full flex flex-col font-sans">
    <AppNavbar v-if="!hideNavbar" />
    <main class="flex-1 w-full">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
