<script setup lang="ts">
import type { User } from '~/types'

interface Props {
  user: User
}

defineProps<Props>()

const statusClass = {
  ACTIVE: 'bg-green-500',
  NON_ACTIVE: 'bg-muted-foreground',
}
</script>

<template>
  <span
    class="block rounded-full ring-2 ring-background size-2.5"
    :class="statusClass"
  />
</template>
