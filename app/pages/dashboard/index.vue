<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { ActivityIcon, CalendarIcon, StethoscopeIcon } from 'lucide-vue-next'
import { useAPI } from '~/composables/useAPI'
import type { AppointmentType, User } from '~/types'
import { AppointmentsEndpoints, appointmentsTodayKey } from '~/features/appointments'
import { TeamActivityEndpoints, teamActivityKey } from '~/features/team-activity'
import { mockTodayAppointments } from '~/mock/appointments/mockTodayAppointments'

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

const appointments = computed<AppointmentType[]>(() =>
  todayData.value?.length ? todayData.value : mockTodayAppointments,
)

const { data: teamData, status: teamStatus } = await useAPI<User[]>(TeamActivityEndpoints.TODAY, {
  key: teamActivityKey,
  server: false,
})
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
      <div class="flex gap-6 w-full">
        <ScheduleWidgets :appointments="appointments" :loading="status === 'pending'" />
      </div>
      <div class="flex gap-6 w-full">
        <TeamActivityWidget :users="teamData ?? []" :loading="teamStatus === 'pending'" />
      </div>
    </div>
  </div>
</template>
