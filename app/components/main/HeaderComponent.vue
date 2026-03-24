<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue'

const isToggle = ref(false)
const colorMode = useColorMode()
function toggleTheme() {
  isToggle.value = !isToggle.value
  return isToggle.value ? (colorMode.value = 'dark') : (colorMode.value = 'light')
}
</script>
<template>
  <div class="flex gap-2 items-center justify-center cursor-pointer">
    <Button variant="ghost" class="rounded-full" @click="toggleTheme">
      <Sun v-if="isToggle" />
      <Moon v-if="!isToggle" />
    </Button>
    <AvatarComponent class="flex items-start" />
  </div>
</template>
