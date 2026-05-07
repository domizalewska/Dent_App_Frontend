<script setup lang="ts">
import type { AppointmentType, PatientType } from '~/types'
import { ref } from 'vue'
import { generateMockAppointments } from '~/mock/appointments/mockAppointments'
import { getLabelFormStatus } from '~/composables/appoitment/useAppoitmentStatusLabel'

interface Props {
  patient: PatientType
}

const props = defineProps<Props>()

const appointmentData = ref<AppointmentType[]>(generateMockAppointments(props.patient.uuid, 3))
</script>
<template>
  <Card class="overflow-hidden rounded-lg col-span-1">
    <CardContent class="px-6 pt-4">
      <div class="flex flex-col gap-3">
        <div
          v-for="single in appointmentData"
          :key="single.uuid"
          class="flex items-center gap-3 rounded-lg border p-3"
        >
          <div class="flex flex-col items-center min-w-[28px]">
            <span class="text-sm font-semibold leading-none">
              {{ formatDateToString(single.date, 'dd') }}
            </span>
            <span class="text-xs text-muted-foreground uppercase">
              {{ formatDateToString(single.date, 'LLL') }}
            </span>
          </div>
          <div class="w-px h-8 bg-border shrink-0" />
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-medium truncate">{{ single.name }}</span>
              <Badge variant="default" class="shrink-0 text-xs">
                {{ getLabelFormStatus(single.status) }}
              </Badge>
            </div>
            <span class="text-xs text-muted-foreground">
              {{ formatDateToString(single.date, 'HH:mm') }} ·
              {{ single.doctor.last_name ?? 'Brak danych' }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
