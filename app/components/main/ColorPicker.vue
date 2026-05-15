<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const colorMode = useColorMode()

const isToggle = computed(
  () =>
    colorMode.preference === 'dark' ||
    (colorMode.preference === 'system' && colorMode.value === 'dark'),
)

function toggleTheme() {
  colorMode.preference = isToggle.value ? 'light' : 'dark'
}
</script>
<template>
  <ClientOnly>
    <Button variant="ghost" class="rounded-full" @click="toggleTheme">
      <Sun v-if="isToggle" />
      <Moon v-if="!isToggle" />
    </Button>
    <template #fallback>
      <Button variant="ghost" class="rounded-full" disabled>
        <Sun />
      </Button>
    </template>
  </ClientOnly>
</template>
