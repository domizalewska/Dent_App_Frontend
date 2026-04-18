<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue'

const { user } = useAuth()

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
    <ClientOnly>
      <AvatarComponent v-if="user" class="flex items-start" :user="user" />
    </ClientOnly>
  </div>
</template>
