<template>
  <div />
</template>

<script setup lang="ts">
const { logout } = useApi()
const { clearMe } = useMe()
logout()
clearMe()
await navigateTo('/')
</script>
