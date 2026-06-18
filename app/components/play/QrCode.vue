<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string
    size?: number
  }>(),
  { size: 232 },
)

const dataUrl = ref('')
const error = ref<string | null>(null)

async function render() {
  if (!props.value || import.meta.server) {
    dataUrl.value = ''
    return
  }
  try {
    const { toDataURL } = await import('qrcode')
    dataUrl.value = await toDataURL(props.value, {
      width: props.size,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#431E14', light: '#F7E7C6' },
    })
    error.value = null
  } catch {
    error.value = 'QR indisponible'
  }
}

watch(() => [props.value, props.size], render, { immediate: true })
</script>

<template>
  <div class="inline-flex items-center justify-center rounded-2xl bg-primaire p-3 shadow-xl">
    <img
      v-if="dataUrl"
      :src="dataUrl"
      :width="size"
      :height="size"
      alt="QR code pour rejoindre la partie"
    />
    <div
      v-else
      class="flex items-center justify-center text-xs text-secondaire/50"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      {{ error ?? 'Génération…' }}
    </div>
  </div>
</template>
