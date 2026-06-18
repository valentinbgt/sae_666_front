<script setup lang="ts">
const route = useRoute();
const { setToken } = useAuth();

function safePath(p: unknown): string {
  return typeof p === "string" && p.startsWith("/") && !p.startsWith("//")
    ? p
    : "/";
}

onMounted(async () => {
  const token = route.query.token as string | undefined;
  if (token) {
    await setToken(token);
    // Destination mémorisée avant la redirection Google (ex. page de join).
    const stored = sessionStorage.getItem("crooak.postLoginRedirect");
    sessionStorage.removeItem("crooak.postLoginRedirect");
    await navigateTo(safePath(stored));
  } else {
    await navigateTo("/login", { replace: true });
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-gray-500">Connexion en cours...</p>
  </div>
</template>
