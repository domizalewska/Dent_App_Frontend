<script setup lang="ts">
import type { User } from '~/types'

interface Props {
  user: User
}

defineProps<Props>()
const emit = defineEmits<{ select: [user: User] }>()
</script>

<template>
  <button
    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0"
    @click="emit('select', user)"
  >
    <BaseUserAvatar :user="user" show-name />
  </button>
</template>
