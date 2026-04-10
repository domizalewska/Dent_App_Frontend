<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const colorMode = useColorMode()

onMounted(() => {
  colorMode.preference = 'light'
  colorMode.value = 'light'
})
</script>

<template>
  <div id="app">
    <Toaster position="top-right" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
