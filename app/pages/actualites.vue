<template>
  <div class="bg-primaire min-h-screen relative font-sans">

    <!-- HEADER HERO -->
    <section class="bg-[#2E150D] rounded-b-[40px] md:rounded-b-[80px] pt-40 pb-24 px-6 text-center shadow-xl relative z-10">
      <h1 class="text-5xl md:text-6xl text-primaire font-bold mb-6" style="font-family: Georgia, serif;">{{ $t('news.title') }}</h1>
      <p class="text-primaire/80 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
        {{ $t('news.subtitle') }}
      </p>
    </section>

    <!-- MAIN CONTENT -->
    <main class="max-w-4xl mx-auto px-6 py-20">

      <!-- Titre section -->
      <div class="text-center mb-16">
        <h2 class="text-[#2E150D] text-4xl font-bold mb-3" style="font-family: Georgia, serif;">{{ $t('news.latest_title') }}</h2>
        <p class="text-[#2E150D]/60 text-sm">{{ $t('news.latest_sub') }}</p>
      </div>

      <!-- Chargement -->
      <div v-if="pending" class="text-center py-20 text-[#2E150D]/50 text-sm">
        Chargement des actualités...
      </div>

      <!-- Erreur -->
      <div v-else-if="fetchError" class="text-center py-20 text-alerte text-sm">
        Impossible de charger les actualités.
      </div>

      <!-- Aucun article -->
      <div v-else-if="!articles.length" class="text-center py-20 text-[#2E150D]/50 text-sm">
        Aucune actualité pour le moment.
      </div>

      <template v-else>
        <!-- Grande Carte A LA UNE (premier article) -->
        <article class="bg-white rounded-2xl p-8 mb-8 border border-[#2E150D]/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)] cursor-pointer group hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-cta text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{{ $t('news.featured_badge') }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs font-bold text-[#2E150D]/50 mb-3 tracking-widest uppercase">
            <span>{{ formatDate(articles[0].date ?? articles[0].createdAt) }}</span>
            <span>•</span>
            <span>{{ articles[0].type === 'event' ? 'Événement' : 'Actualité' }}</span>
          </div>
          <h3 class="text-[#2E150D] text-2xl md:text-3xl font-bold mb-4 group-hover:text-cta transition-colors" style="font-family: Georgia, serif;">{{ articles[0].titre }}</h3>
          <p class="text-[#2E150D]/70 text-sm leading-relaxed max-w-3xl">
            {{ articles[0].description }}
          </p>
        </article>

        <!-- Cartes standard (reste des articles) -->
        <div class="space-y-6 mb-16">
          <article
            v-for="article in articles.slice(1)"
            :key="article.id"
            class="bg-white rounded-2xl p-6 border border-[#2E150D]/10 shadow-sm cursor-pointer group hover:shadow-md transition-all"
          >
            <div class="text-[10px] font-bold text-cta mb-2 tracking-widest uppercase">
              {{ formatDate(article.date ?? article.createdAt) }}
            </div>
            <h3 class="text-[#2E150D] text-lg font-bold mb-2 group-hover:text-cta transition-colors" style="font-family: Georgia, serif;">{{ article.titre }}</h3>
            <p class="text-[#2E150D]/60 text-sm">
              {{ article.description }}
            </p>
          </article>
        </div>
      </template>

      <!-- Newsletter Box -->
      <div class="bg-[#2E150D] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div class="flex-1">
          <Icon name="ph:envelope-simple-fill" class="w-8 h-8 text-primaire mb-4" />
          <h3 class="text-primaire text-2xl font-bold mb-2" style="font-family: Georgia, serif;">{{ $t('news.nl_title') }}</h3>
          <p class="text-primaire/70 text-sm">{{ $t('news.nl_sub') }}</p>
        </div>
        <form class="w-full md:w-auto flex flex-col sm:flex-row gap-3" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            :placeholder="$t('news.nl_placeholder')"
            required
            class="bg-[#431E14] text-primaire px-5 py-3 rounded-xl outline-none placeholder:text-primaire/40 border border-[#431E14] focus:border-cta transition-colors w-full sm:w-64"
          />
          <button
            type="submit"
            :disabled="loading"
            class="bg-cta text-white font-bold text-sm px-8 py-3 rounded-xl uppercase tracking-widest hover:bg-[#c9733d] transition-colors shadow-lg disabled:opacity-50"
          >
            {{ loading ? $t('news.nl_loading') : $t('news.nl_btn') }}
          </button>
        </form>
        <p v-if="success" class="text-validation text-xs mt-2 w-full text-center">{{ $t('news.nl_success') }}</p>
        <p v-if="error" class="text-alerte text-xs mt-2 w-full text-center">{{ error }}</p>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ title: 'CROOAK – Actualités' })

const { email, loading, success, error, subscribe } = useNewsletter()
const { public: { apiBase } } = useRuntimeConfig()

interface Content {
  id: number
  type: string
  titre: string
  description: string
  date: string | null
  createdAt: string
}

const { data, pending, error: fetchError } = useFetch<{ member?: Content[], 'hydra:member'?: Content[] }>(
  `${apiBase}/contents`,
  {
    query: { type: 'article', 'order[createdAt]': 'desc' },
    server: false,
  }
)

const articles = computed(() => data.value?.['member'] ?? data.value?.['hydra:member'] ?? [])

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateStr))
}
</script>
