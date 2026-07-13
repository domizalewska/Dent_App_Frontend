<script setup lang="ts">
import type { AppointmentType } from '~/types'
import {
  getLabelFromAppointmentStatus,
  getBadgeClassFromAppointmentStatus,
} from '~/composables/appointments/useAppointmentStatusMeta'
import { formatDateToString } from '~/utils/formatDate'

defineProps<{ appointment: AppointmentType }>()
</script>

<template>
  <div class="flex items-center gap-6 px-6 py-5 border-b border-border last:border-b-0">
    <span class="text-base font-semibold text-foreground w-14 shrink-0">
      {{ formatDateToString(appointment.start_date, 'HH:mm') }}
    </span>

    <div class="w-px self-stretch bg-border shrink-0" />

    <div class="flex-1 min-w-0">
      <p class="font-semibold text-foreground">
        {{ appointment.patient.first_name }} {{ appointment.patient.last_name }}
      </p>
      <p class="text-sm text-muted-foreground truncate">
        {{ appointment.treatment.name }} · {{ appointment.doctor.first_name }}
        {{ appointment.doctor.last_name }}
      </p>
    </div>

    <span class="text-sm text-muted-foreground shrink-0">{{ appointment.room.name }}</span>

    <span
      class="text-[11px] px-2 py-0.5 rounded-full shrink-0"
      :class="getBadgeClassFromAppointmentStatus(appointment.status)"
    >
      {{ getLabelFromAppointmentStatus(appointment.status) }}
    </span>
  </div>
</template>
