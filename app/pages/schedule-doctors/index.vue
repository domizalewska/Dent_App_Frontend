<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { useAPI } from '~/composables/useAPI'
import { formatDateToString } from '~/utils/formatDate'
import type { DoctorsScheduleResponse } from '~/types'
import AppointmentDialog from '~/components/schedule-room/dialog/AppointmentDialog.vue'
import DoctorsDayPlan from '~/components/schedule-doctors/widgets/DoctorsDayPlan.vue'
import { appointmentsByDoctorKey, AppointmentsEndpoints } from '~/features/appointments'
import { mockScheduleDoctors } from '~/mock/schedule-doctors/mockScheduleDoctors'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()
set([{ name: 'Grafik lekarzy', link: '/schedule-doctors' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik lekarzy')

const currentDate = ref(new Date())

function goPrevDay() {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() - 1)
  currentDate.value = d
}

function goNextDay() {
  const d = new Date(currentDate.value)
  d.setDate(d.getDate() + 1)
  currentDate.value = d
}

function goToday() {
  currentDate.value = new Date()
}

const dateParam = computed(() => currentDate.value.toISOString().slice(0, 10))

const { data: schedule, pending } = useAPI<DoctorsScheduleResponse>(
  AppointmentsEndpoints.BY_DOCTORS,
  {
    key: appointmentsByDoctorKey,
    query: computed(() => ({ date_from: dateParam.value, date_to: dateParam.value })),
    default: () => mockScheduleDoctors,
  },
)

const { open, close, activeComponent, activeProps } = useDialog()

function openAddDialog() {
  open(AppointmentDialog, { date: dateParam.value })
}

function openEditDialog(uuid: string) {
  const appointment = Object.values(schedule.value.appointments_by_doctor).flat().find((a) => a.uuid === uuid)
  if (appointment) open(AppointmentDialog, { appointment })
}
</script>

<template>
  <Card class="h-full overflow-hidden">
    <div>
      <div class="flex items-center justify-between px-4 py-3 border-b border-border">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Poprzedni dzień" @click="goPrevDay">
              <Icon icon="lucide:chevron-left" class="size-4" />
            </Button>

            <Button variant="outline" @click="goToday">Dziś</Button>

            <span class="min-w-[130px] text-center text-sm font-medium">
              {{ formatDateToString(currentDate, 'd MMMM yyyy') }}
            </span>

            <Button variant="outline" size="icon" aria-label="Następny dzień" @click="goNextDay">
              <Icon icon="lucide:chevron-right" class="size-4" />
            </Button>
          </div>
        </div>

        <Button @click="openAddDialog">
          <Icon icon="lucide:plus" class="size-4" />
          Dodaj wizytę
        </Button>
      </div>

      <component :is="activeComponent" v-bind="activeProps" @close="close" />

      <div v-if="pending" class="flex h-[400px] items-center justify-center text-muted-foreground">
        Wczytywanie terminarza...
      </div>

      <DoctorsDayPlan v-else :schedule="schedule" :date="currentDate" @appointment-click="openEditDialog" />
    </div>
  </Card>
</template>
