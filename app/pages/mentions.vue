<template>
  <div class="bg-gradient-to-b from-[#2E150D] via-[#B86532] to-[#2E150D] min-h-screen relative font-sans overflow-hidden text-[#F3E7D3] pt-40 pb-32 px-6">
    <div class="max-w-4xl mx-auto bg-[#2E150D]/80 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
      <h1 class="text-4xl font-bold mb-8" style="font-family: Georgia, serif;">{{ $t('footer.legal') }}</h1>
      <div class="space-y-6 opacity-80 leading-relaxed">
        <p><strong>{{ $t('legal.publisher_lbl') }}</strong> {{ $t('legal.publisher') }}</p>
        <p><strong>{{ $t('legal.host_lbl') }}</strong> {{ $t('legal.host') }}</p>
        <p><strong>{{ $t('legal.director_lbl') }}</strong> {{ $t('legal.director') }}</p>
        <p><strong>{{ $t('legal.creator_lbl') }}</strong> {{ $t('legal.creator') }}</p>
        <p>{{ $t('legal.text') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Mentions Légales - Crooak'
})
</script>
