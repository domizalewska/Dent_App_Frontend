<script setup lang="ts">
import type { AppointmentType, PatientType } from '~/types'
import { formatDateToString } from '~/utils/formatDate'
import { getLabelFromAppointmentStatus } from '~/composables/appointments/useAppointmentStatusMeta'

interface Props {
  patient: PatientType
  appointments?: AppointmentType[]
}

const props = withDefaults(defineProps<Props>(), { appointments: () => [] })
</script>

<template>
  <Card class="overflow-hidden rounded-lg">
    <CardHeader class="px-6 pb-2 pt-4">
      <CardTitle class="text-xs font-medium text-muted-foreground tracking-wide uppercase">
        Nadchodzące wizyty
      </CardTitle>
    </CardHeader>
    <CardContent class="px-6 pt-4">
      <div v-if="props.appointments.length" class="flex flex-col gap-3">
        <div
          v-for="appt in props.appointments"
          :key="appt.uuid"
          class="flex items-center gap-3 rounded-lg border p-3"
        >
          <div class="flex flex-col items-center min-w-[28px]">
            <span class="text-sm font-semibold leading-none">
              {{ formatDateToString(appt.start_date, 'dd') }}
            </span>
            <span class="text-xs text-muted-foreground uppercase">
              {{ formatDateToString(appt.start_date, 'LLL') }}
            </span>
          </div>
          <div class="w-px h-8 bg-border shrink-0" />
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-medium truncate">{{ appt.name }}</span>
              <Badge variant="default" class="shrink-0 text-xs">
                {{ getLabelFromAppointmentStatus(appt.status) }}
              </Badge>
            </div>
            <span class="text-xs text-muted-foreground">
              {{ formatDateToString(appt.start_date, 'HH:mm') }} ·
              {{ appt.doctor.last_name }}
            </span>
          </div>
        </div>
      </div>
      <p v-else class="text-xs text-muted-foreground">Brak nadchodzących wizyt</p>
    </CardContent>
  </Card>
</template>
