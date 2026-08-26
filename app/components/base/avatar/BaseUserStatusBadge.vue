<script setup lang="ts">
import { UserStatus } from '~/types'

interface Props {
  status: UserStatus
}

defineProps<Props>()

const statusClass: Record<UserStatus, string> = {
  ACTIVE: 'bg-green-500',
  NON_ACTIVE: 'bg-muted-foreground',
}
</script>

<template>
  <span
    class="block rounded-full ring-2 ring-background size-2.5"
    :class="statusClass[status]"
  />
</template>
