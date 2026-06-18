<template>
  <div />
</template>

<script setup lang="ts">
const { logout } = useApi()
logout()
await navigateTo('/')
</script>
