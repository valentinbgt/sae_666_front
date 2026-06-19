<script setup lang="ts">
definePageMeta({ title: "CROOAK – Connexion", layout: false });

const {
  public: { apiBase },
} = useRuntimeConfig();
const { setToken } = useAuth();
const route = useRoute();

// Destination post-connexion (ex. revenir sur une page de join). On n'autorise
// que des chemins internes pour éviter les redirections ouvertes.
function safePath(p: unknown): string {
  return typeof p === "string" && p.startsWith("/") && !p.startsWith("//")
    ? p
    : "/";
}
const redirectTo = computed(() => safePath(route.query.redirect));

const tab = ref<"connexion" | "inscription">("connexion");

// Connexion
const loginEmail = ref("");
const loginPassword = ref("");
const loginError = ref("");
const loginLoading = ref(false);

async function handleLogin() {
  loginError.value = "";
  loginLoading.value = true;
  try {
    const data = await $fetch<{ token: string }>(`${apiBase}/login`, {
      method: "POST",
      body: { email: loginEmail.value, password: loginPassword.value },
    });
    await setToken(data.token);
    await navigateTo(redirectTo.value);
  } catch {
    loginError.value = "Email ou mot de passe incorrect.";
  } finally {
    loginLoading.value = false;
  }
}

// Inscription
const regUsername = ref("");
const regEmail = ref("");
const regPassword = ref("");
const regAccept = ref(false);
const regErrors = ref<Record<string, string>>({});
const regLoading = ref(false);

async function handleRegister() {
  regErrors.value = {};
  if (!regAccept.value) {
    regErrors.value.accept = "Vous devez accepter le Code de Conduite.";
    return;
  }
  regLoading.value = true;
  try {
    await $fetch(`${apiBase}/register`, {
      method: "POST",
      body: {
        email: regEmail.value,
        username: regUsername.value,
        password: regPassword.value,
      },
    });
    const data = await $fetch<{ token: string }>(`${apiBase}/login`, {
      method: "POST",
      body: { email: regEmail.value, password: regPassword.value },
    });
    setToken(data.token);
    await navigateTo("/");
  } catch (e: any) {
    const d = e?.data;
    if (d?.errors) regErrors.value = d.errors;
    else regErrors.value.general = d?.message ?? "Une erreur est survenue.";
  } finally {
    regLoading.value = false;
  }
}

function loginWithGoogle() {
  // L'URL de callback OAuth est fixe côté backend : on mémorise la destination
  // pour la réappliquer dans /auth/callback après le retour de Google.
  if (redirectTo.value !== "/") {
    sessionStorage.setItem("crooak.postLoginRedirect", redirectTo.value);
  }
  window.location.href = `${apiBase}/auth/google`;
}

const isDark = computed(() => tab.value === "connexion");

const showLoginPassword = ref(false);
const showRegPassword = ref(false);

// Hauteur du panneau de formulaires : suit le contenu actif (connexion plus
// court que inscription) pour une transition douce. Un ResizeObserver couvre
// aussi l'apparition/disparition des messages d'erreur de validation.
const panelRef = ref<HTMLElement | null>(null);
const panelHeight = ref("auto");
let panelObserver: ResizeObserver | null = null;

onMounted(() => {
  if (!panelRef.value) return;
  panelObserver = new ResizeObserver(() => {
    if (panelRef.value) panelHeight.value = `${panelRef.value.offsetHeight}px`;
  });
  panelObserver.observe(panelRef.value);
  panelHeight.value = `${panelRef.value.offsetHeight}px`;
});

onUnmounted(() => panelObserver?.disconnect());
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#1a0e09] px-4 py-10"
  >
    <div
      class="w-full max-w-sm rounded-2xl overflow-hidden transition-colors duration-300 shadow-2xl"
      :class="
        isDark ? 'bg-secondaire text-primaire' : 'bg-primaire text-secondaire'
      "
    >
      <!-- Bouton retour -->
      <div class="px-6 pt-5">
        <NuxtLink
          :to="redirectTo !== '/' ? redirectTo : '/'"
          class="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase transition-colors"
          :class="
            isDark
              ? 'text-primaire/40 hover:text-primaire/80'
              : 'text-secondaire/40 hover:text-secondaire/80'
          "
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour
        </NuxtLink>
      </div>

      <!-- Logo -->
      <div class="flex justify-center pt-4 pb-4">
        <img src="/images/logo_crooak.png" alt="CROOAK" class="h-16 w-auto" />
      </div>

      <!-- Onglets -->
      <div
        class="flex border-b"
        :class="isDark ? 'border-accent/40' : 'border-accent/30'"
      >
        <button
          class="flex-1 py-3 text-sm font-semibold transition-colors relative"
          :class="
            tab === 'connexion'
              ? 'text-cta'
              : isDark
                ? 'text-primaire/50'
                : 'text-secondaire/50'
          "
          @click="tab = 'connexion'"
        >
          Connexion
          <span
            v-if="tab === 'connexion'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-cta"
          />
        </button>
        <button
          class="flex-1 py-3 text-sm font-semibold transition-colors relative"
          :class="
            tab === 'inscription'
              ? 'text-cta'
              : isDark
                ? 'text-primaire/50'
                : 'text-secondaire/50'
          "
          @click="tab = 'inscription'"
        >
          Inscription
          <span
            v-if="tab === 'inscription'"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-cta"
          />
        </button>
      </div>

      <!-- Formulaires (hauteur adaptée au contenu, transition douce) -->
      <div
        class="overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        :style="{ height: panelHeight }"
      >
        <div ref="panelRef">
        <!-- Formulaire Connexion -->
        <form
          v-if="tab === 'connexion'"
          class="px-8 py-6 space-y-4 form-fade"
          @submit.prevent="handleLogin"
        >
          <div>
            <label class="block text-xs font-semibold mb-1 text-primaire/80"
              >Adresse mail</label
            >
            <input
              v-model="loginEmail"
              type="email"
              placeholder="commandant@crooak.com"
              required
              class="w-full rounded-lg px-4 py-3 text-sm bg-accent/40 border border-accent/30 text-primaire placeholder-primaire/40 focus:outline-none focus:border-cta"
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-primaire/80"
                >Mot de passe</label
              >
              <a href="#" class="text-xs text-cta hover:underline">Oublié ?</a>
            </div>
            <div class="relative">
              <input
                v-model="loginPassword"
                :type="showLoginPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="w-full rounded-lg px-4 py-3 pr-10 text-sm bg-accent/40 border border-accent/30 text-primaire placeholder-primaire/40 focus:outline-none focus:border-cta"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-primaire/40 hover:text-primaire/80 transition"
                @click="showLoginPassword = !showLoginPassword"
              >
                <svg
                  v-if="!showLoginPassword"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="loginError" class="text-alerte text-xs">{{ loginError }}</p>

          <button
            type="submit"
            :disabled="loginLoading"
            class="w-full bg-cta text-white py-3 rounded-lg text-sm font-bold tracking-widest uppercase hover:opacity-90 disabled:opacity-50 transition"
          >
            {{ loginLoading ? "Connexion..." : "Se connecter" }}
          </button>

          <div class="flex items-center gap-3 py-1">
            <div class="flex-1 h-px" :class="'bg-primaire/20'" />
            <span class="text-xs font-semibold tracking-widest text-primaire/40"
              >OU VIA FOURNISSEUR</span
            >
            <div class="flex-1 h-px" :class="'bg-primaire/20'" />
          </div>

          <button
            type="button"
            class="w-full bg-white text-secondaire py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            @click="loginWithGoogle"
          >
            <GoogleIcon />
            Continuer avec Google
          </button>

          <!--<p class="text-center text-xs text-primaire/40 pt-2">
            Soutien Stratégique :
            <a href="#" class="text-cta hover:underline">Centre d'Aide</a>
          </p>-->
        </form>

        <!-- Formulaire Inscription -->
        <form
          v-else
          class="px-8 py-6 space-y-4 form-fade"
          @submit.prevent="handleRegister"
        >
          <div>
            <label class="block text-xs font-semibold mb-1 text-secondaire/70"
              >Pseudo</label
            >
            <input
              v-model="regUsername"
              type="text"
              placeholder="Gedeon_Gris"
              required
              class="w-full rounded-lg px-4 py-3 text-sm bg-primaire border border-accent/30 text-secondaire placeholder-secondaire/40 focus:outline-none focus:border-cta"
              :class="{ 'border-alerte': regErrors.username }"
            />
            <p v-if="regErrors.username" class="text-alerte text-xs mt-1">
              {{ regErrors.username }}
            </p>
          </div>

          <div>
            <label class="block text-xs font-semibold mb-1 text-secondaire/70"
              >Votre adresse mail</label
            >
            <input
              v-model="regEmail"
              type="email"
              placeholder="cadet@tactics.io"
              required
              class="w-full rounded-lg px-4 py-3 text-sm bg-primaire border border-accent/30 text-secondaire placeholder-secondaire/40 focus:outline-none focus:border-cta"
              :class="{ 'border-alerte': regErrors.email }"
            />
            <p v-if="regErrors.email" class="text-alerte text-xs mt-1">
              {{ regErrors.email }}
            </p>
          </div>

          <div>
            <label class="block text-xs font-semibold mb-1 text-secondaire/70"
              >Définir le mot de passe</label
            >
            <div class="relative">
              <input
                v-model="regPassword"
                :type="showRegPassword ? 'text' : 'password'"
                placeholder="Minimum 8 caractères"
                required
                class="w-full rounded-lg px-4 py-3 pr-10 text-sm bg-primaire border border-accent/30 text-secondaire placeholder-secondaire/40 focus:outline-none focus:border-cta"
                :class="{ 'border-alerte': regErrors.password }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-secondaire/40 hover:text-secondaire/80 transition"
                @click="showRegPassword = !showRegPassword"
              >
                <svg
                  v-if="!showRegPassword"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              </button>
            </div>
            <p v-if="regErrors.password" class="text-alerte text-xs mt-1">
              {{ regErrors.password }}
            </p>
          </div>

          <label class="flex items-start gap-2.5 cursor-pointer group">
            <input
              v-model="regAccept"
              type="checkbox"
              class="peer sr-only"
            />
            <span
              class="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 border-secondaire/30 bg-transparent grid place-items-center transition-all duration-200 group-hover:border-cta/60 peer-checked:bg-cta peer-checked:border-cta peer-checked:[&>svg]:scale-100 peer-focus-visible:ring-2 peer-focus-visible:ring-cta/40 peer-focus-visible:ring-offset-0"
            >
              <svg
                class="w-3 h-3 text-white scale-0 transition-transform duration-200"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <span class="text-xs text-secondaire/70 leading-snug">
              J'accepte les CGU et j'autorise Crooak à traiter mes données.
            </span>
          </label>
          <p v-if="regErrors.accept" class="text-alerte text-xs">
            {{ regErrors.accept }}
          </p>
          <p v-if="regErrors.general" class="text-alerte text-xs">
            {{ regErrors.general }}
          </p>

          <button
            type="submit"
            :disabled="regLoading"
            class="w-full bg-cta text-white py-3 rounded-lg text-sm font-bold tracking-widest uppercase hover:opacity-90 disabled:opacity-50 transition"
          >
            {{ regLoading ? "Création..." : "Créer mon compte" }}
          </button>

          <div class="flex items-center gap-3 py-1">
            <div class="flex-1 h-px bg-secondaire/20" />
            <span
              class="text-xs font-semibold tracking-widest text-secondaire/40"
              >OU VIA FOURNISSEUR</span
            >
            <div class="flex-1 h-px bg-secondaire/20" />
          </div>

          <button
            type="button"
            class="w-full bg-white text-secondaire py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            @click="loginWithGoogle"
          >
            <GoogleIcon />
            Continuer avec Google
          </button>
        </form>
        </div>
      </div>
      <!-- fin formulaires -->
    </div>
    <!-- fin carte -->
  </div>
  <!-- fin page -->
</template>

<style scoped>
/* Petit fondu/glissement à chaque changement d'onglet */
@keyframes formFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-fade {
  animation: formFade 0.3s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .form-fade {
    animation: none;
  }
}
</style>
