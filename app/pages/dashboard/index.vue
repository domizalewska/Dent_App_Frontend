<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { ActivityIcon, CalendarIcon, StethoscopeIcon } from 'lucide-vue-next'
import { useAPI } from '~/composables/useAPI'
import type { AppointmentType } from '~/types'
import { AppointmentsEndpoints, appointmentsTodayKey } from '~/features/appointments'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Pulpit', link: '/dashboard' }])
resetHeader()
setHeader('Pulpit')

const { data: todayData, status } = await useAPI<AppointmentType[]>(AppointmentsEndpoints.TODAY, {
  key: appointmentsTodayKey,
  server: false,
})

const appointments = computed(() =>
  (todayData.value ?? []).map((appt) => ({
    id: appt.uuid,
    time: new Date(appt.date).toLocaleTimeString('pl', { hour: '2-digit', minute: '2-digit' }),
    patientName: appt.patient_name ?? '',
    procedure: appt.name,
    doctorName: `${appt.doctor.first_name} ${appt.doctor.last_name}`,
    room: appt.room ?? '',
  })),
)
</script>

<template>
  <div class="flex h-screen">
    <div class="flex flex-col gap-6 w-full">
      <div class="grid grid-cols-3 gap-4 w-full">
        <StatisticWidgets
          label="Wizyty dzisiaj"
          :value="38"
          :icon="CalendarIcon"
          hint="8 oczekujących"
        />
        <StatisticWidgets
          label="Aktywni lekarze"
          :value="9"
          :icon="StethoscopeIcon"
          hint="2 na urlopie"
        />
        <StatisticWidgets
          label="Obłożenie gabinetów"
          value="82%"
          :icon="ActivityIcon"
          :trend="{ value: '+5% wzg. tygodnia', direction: 'up' }"
        />
      </div>
      <div class="flex items-center justify-center gap-2 text-sm w-full">
        <ScheduleWidgets :appointments="appointments" :loading="status === 'pending'" />
      </div>
    </div>
  </div>
</template>
