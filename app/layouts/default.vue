<template>
  <div class="relative min-h-screen w-full flex flex-col font-sans">
    <AppNavbar />
    <main class="flex-1 w-full">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
