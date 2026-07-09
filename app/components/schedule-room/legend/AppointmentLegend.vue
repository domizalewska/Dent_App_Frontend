<script setup lang="ts">
import { useAppointmentStatusMeta } from '~/composables/appoitment/useAppointmentStatusMeta'
import { AppointmentStatus } from '~/types'

const { labels, borderColor } = useAppointmentStatusMeta()

const statuses = [AppointmentStatus.CONFIRMED, AppointmentStatus.IN_PROGRESS, AppointmentStatus.PENDING]
</script>

<template>
  <div class="flex items-center gap-4">
    <div v-for="status in statuses" :key="status" class="flex items-center gap-1.5">
      <span class="size-2.5 rounded-full" :style="{ backgroundColor: borderColor[status] }" />
      <span class="text-xs text-muted-foreground">{{ labels[status] }}</span>
    </div>
  </div>
</template>
