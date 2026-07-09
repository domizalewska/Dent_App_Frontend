<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { useAPI } from '~/composables/useAPI'
import { formatDateToString } from '~/utils/formatDate'
import type { AppointmentType, RoomType } from '~/types'
import { RoomsEndpoints, roomsKey } from '~/features/rooms'
import RoomPlanCalendar from '~/components/schedule-room/calendar/RoomPlanCalendar.vue'
import { mockRooms, mockScheduleAppointments } from '~/mock/schedule-room/mockScheduleRoom'
import AppointmentDialog from '~/components/schedule-room/dialog/AppointmentDialog.vue'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()
set([{ name: 'Grafik wizyt', link: '/schedule-room' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik wizyt')

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

const { data: rooms } = useAPI<RoomType[]>(RoomsEndpoints.BASE, { key: roomsKey })
const { data: appointments, pending } = useAPI<AppointmentType[]>('/appointment', {
  query: computed(() => ({ date: dateParam.value })),
})

const displayRooms = computed(() => (rooms.value?.length ? rooms.value : mockRooms))
const displayAppointments = computed(() =>
  appointments.value?.length ? appointments.value : mockScheduleAppointments,
)

const { open, close, activeComponent, activeProps } = useDialog()

function openAddDialog() {
  open(AppointmentDialog, { date: dateParam.value })
}

function openEditDialog(uuid: string) {
  const appointment = displayAppointments.value.find((a) => a.uuid === uuid)
  if (appointment) open(AppointmentDialog, { appointment })
}
</script>

<template>
  <Card class="h-full overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border">
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

      <Button @click="openAddDialog">
        <Icon icon="lucide:plus" class="size-4" />
        Dodaj wizytę
      </Button>
    </div>

    <component :is="activeComponent" v-bind="activeProps" @close="close" />

    <div class="p-4">
      <div v-if="pending" class="flex h-[400px] items-center justify-center text-muted-foreground">
        Wczytywanie planu dnia...
      </div>

      <RoomPlanCalendar
        v-else-if="displayRooms.length"
        :rooms="displayRooms"
        :appointments="displayAppointments"
        :date="currentDate"
        @event-click="openEditDialog"
      />

      <div v-else class="flex h-[400px] items-center justify-center text-muted-foreground">
        Brak skonfigurowanych gabinetów
      </div>
    </div>
  </Card>
</template>
