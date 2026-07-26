<script setup lang="ts">
import type { UserStatus } from '~/types'

interface Props {
  status: UserStatus
}

defineProps<Props>()

const statusClass: Record<UserStatus, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-400',
  busy: 'bg-red-500',
  offline: 'bg-muted-foreground',
}
</script>

<template>
  <span
    class="block rounded-full ring-2 ring-background size-2.5"
    :class="statusClass[status]"
  />
</template>
