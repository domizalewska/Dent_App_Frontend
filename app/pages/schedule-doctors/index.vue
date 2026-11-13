<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import plLocale from '@fullcalendar/core/locales/pl'
import { Icon } from '@iconify/vue'
import { useAPI } from '~/composables/useAPI'
import { useCalendarNav } from '~/composables/schedule/useCalendarNav'
import type { CalendarEventType, User } from '~/types'
import AppointmentDialog from '~/components/schedule-room/dialog/AppointmentDialog.vue'
import { CalendarEndpoints, calendarKey } from '~/features/calendar'
import { UsersEndpoints } from '~/features/users'
import { mockDentists, mockScheduleDoctors } from '~/mock/schedule-doctors/mockScheduleDoctors'

definePageMeta({ layout: 'dashboard', ssr: false })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik lekarzy', link: '/schedule-doctors' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik lekarzy')

const { currentDate, calendarRef, calendarWrapper, goPrev, goNext, goToday, dateLabel, dateQuery } =
  useCalendarNav()

const { data: dentistsData } = useAPI<User[]>(UsersEndpoints.DENTIST_LIST_SELECT, {
  server: false,
  default: () => mockDentists,
  transform: (res: User[] | { data: User[] }) => (Array.isArray(res) ? res : res.data),
})

const selectedUuids = ref<string[]>((dentistsData.value ?? []).map((d) => d.uuid))

function handleSelection(val: string[]) {
  if (val.length > 0) selectedUuids.value = val
}

const appointmentQuery = computed(() => ({
  ...dateQuery.value,
  ...(selectedUuids.value.length > 0 && { 'doctor_uuids[]': selectedUuids.value }),
}))

const { data: appointments, pending } = useAPI<CalendarEventType[]>(CalendarEndpoints.BASE, {
  key: calendarKey,
  query: appointmentQuery,
  server: false,
  default: () => mockScheduleDoctors,
})

const resources = computed(() =>
  (dentistsData.value ?? [])
    .filter((d) => selectedUuids.value.includes(d.uuid))
    .map((d) => ({
      id: d.uuid,
      title: `${d.first_name} ${d.last_name}`,
      extendedProps: { jobPosition: d.job_positions?.[0]?.name },
    })),
)

const events = computed(() =>
  (appointments.value ?? []).map((a) => ({
    id: a.uuid,
    resourceId: a.users[0]?.uuid,
    start: `${a.date}T${a.start_time}`,
    end: `${a.date}T${a.end_time}`,
    title: a.patients[0]
      ? `${a.patients[0].first_name} ${a.patients[0].last_name}`
      : (a.name ?? ''),
    extendedProps: { appointment: a },
  })),
)

function resourceLabel(arg: any) {
  return {
    html: `
      <div class="resource-label__name">${arg.resource.title}</div>
      ${arg.resource.extendedProps.jobPosition ? `<div class="resource-label__role">${arg.resource.extendedProps.jobPosition}</div>` : ''}
    `,
  }
}

const { open, close, activeComponent, activeProps } = useDialog()

function openAddDialog() {
  open(AppointmentDialog, { date: currentDate.value.toISOString().slice(0, 10) })
}

function openEditDialog(uuid: string) {
  const appointment = (appointments.value ?? []).find((a) => a.uuid === uuid)
  if (appointment) open(AppointmentDialog, { appointment })
}

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  initialDate: currentDate.value,
  locale: plLocale,
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  headerToolbar: false,
  allDaySlot: false,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  dayHeaderFormat: { weekday: 'short', day: 'numeric', month: 'numeric' },
  height: 'auto',
  nowIndicator: true,
  resources: resources.value,
  events: events.value,
  resourceLabelContent: resourceLabel,
  eventClick: (info: any) => openEditDialog(info.event.id),
}))
</script>

<template>
  <Card class="h-full overflow-hidden flex flex-col">
    <div class="flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-border">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon" @click="goPrev">
            <Icon icon="lucide:chevron-left" class="size-4" />
          </Button>
          <Button variant="outline" size="sm" @click="goToday">Dziś</Button>
          <Button variant="outline" size="icon" @click="goNext">
            <Icon icon="lucide:chevron-right" class="size-4" />
          </Button>
          <span class="min-w-[200px] text-center text-sm font-medium px-2">
            {{ dateLabel }}
          </span>
        </div>
        <Button @click="openAddDialog">
          <Icon icon="lucide:plus" class="size-4" />
          Dodaj wizytę
        </Button>
      </div>

      <div class="flex items-center gap-2 flex-wrap px-4 py-2 border-b border-border bg-muted/30">
        <span class="text-xs text-muted-foreground font-medium shrink-0">Lekarze:</span>
        <ToggleGroup
          type="multiple"
          :model-value="selectedUuids"
          @update:model-value="handleSelection"
        >
          <ToggleGroupItem
            v-for="doctor in dentistsData"
            :key="doctor.uuid"
            :value="doctor.uuid"
            class="flex items-center gap-1.5 text-xs"
          >
            <BaseUserAvatar :user="doctor" size="size-6" class="shrink-0" />
            {{ doctor.first_name }} {{ doctor.last_name }}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>

    <component :is="activeComponent" v-bind="activeProps" @close="close" />

    <ClientOnly>
      <div
        v-if="pending"
        class="flex flex-1 items-center justify-center text-muted-foreground text-sm"
      >
        Wczytywanie grafiku...
      </div>

      <div v-else ref="calendarWrapper" class="flex-1 overflow-auto doctors-schedule">
        <div :style="{ minWidth: `${Math.max(resources.length, 2) * 50}%` }">
          <FullCalendar :key="resources.length" ref="calendarRef" :options="calendarOptions" />
        </div>
      </div>
    </ClientOnly>
  </Card>
</template>
