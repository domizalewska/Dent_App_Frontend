<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import plLocale from '@fullcalendar/core/locales/pl'
import { Icon } from '@iconify/vue'
import { useAPI } from '~/composables/useAPI'
import { formatDateToString } from '~/utils/formatDate'
import type { DoctorsScheduleResponse } from '~/types'
import AppointmentDialog from '~/components/schedule-room/dialog/AppointmentDialog.vue'
import { appointmentsByDoctorKey, AppointmentsEndpoints } from '~/features/appointments'
import { mockScheduleDoctors } from '~/mock/schedule-doctors/mockScheduleDoctors'

definePageMeta({ layout: 'dashboard', ssr: false })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik lekarzy', link: '/schedule-doctors' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik lekarzy')

const currentDate = ref(new Date())
const calendarRef = ref()

function goPrev() {
  calendarRef.value?.getApi().prev()
  currentDate.value = calendarRef.value?.getApi().getDate()
}

function goNext() {
  calendarRef.value?.getApi().next()
  currentDate.value = calendarRef.value?.getApi().getDate()
}

function goToday() {
  calendarRef.value?.getApi().today()
  currentDate.value = new Date()
}

const dateLabel = computed(() => {
  const d = currentDate.value
  const day = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return `${formatDateToString(monday, 'd MMM')} – ${formatDateToString(sunday, 'd MMM yyyy')}`
})

const dateRangeQuery = computed(() => {
  const d = currentDate.value
  const day = d.getDay()
  const monday = new Date(d)
  monday.setDate(d.getDate() - (day === 0 ? 6 : day - 1))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return {
    date_from: monday.toISOString().slice(0, 10),
    date_to: sunday.toISOString().slice(0, 10),
  }
})

const { data: schedule, pending } = useAPI<DoctorsScheduleResponse>(
  AppointmentsEndpoints.BY_DOCTORS,
  {
    key: appointmentsByDoctorKey,
    query: dateRangeQuery,
    server: false,
    default: () => mockScheduleDoctors,
  },
)

const selectedDoctorUuids = ref<Set<string>>(new Set())

watch(
  () => schedule.value?.doctors,
  (doctors) => {
    if (doctors?.length && selectedDoctorUuids.value.size === 0) {
      selectedDoctorUuids.value = new Set(doctors.map((d) => d.uuid))
    }
  },
  { immediate: true },
)

function toggleDoctor(uuid: string) {
  const next = new Set(selectedDoctorUuids.value)
  if (next.has(uuid)) {
    if (next.size > 1) next.delete(uuid)
  } else {
    next.add(uuid)
  }
  selectedDoctorUuids.value = next
}

const resources = computed(() =>
  schedule.value.doctors
    .filter((d) => selectedDoctorUuids.value.has(d.uuid))
    .map((d) => ({
      id: d.uuid,
      title: `${d.first_name} ${d.last_name}`,
      extendedProps: { jobPosition: d.job_position?.name },
    })),
)

const events = computed(() =>
  Object.entries(schedule.value.appointments_by_doctor).flatMap(([doctorUuid, appointments]) =>
    appointments.map((a) => ({
      id: a.uuid,
      resourceId: doctorUuid,
      start: a.start_date,
      end: a.end_date,
      title: `${a.patient.first_name} ${a.patient.last_name}`,
      extendedProps: { appointment: a },
    })),
  ),
)

const { open, close, activeComponent, activeProps } = useDialog()

function openAddDialog() {
  open(AppointmentDialog, { date: currentDate.value.toISOString().slice(0, 10) })
}

function openEditDialog(uuid: string) {
  const appointment = Object.values(schedule.value.appointments_by_doctor)
    .flat()
    .find((a) => a.uuid === uuid)
  if (appointment) open(AppointmentDialog, { appointment })
}

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridWeek',
  initialDate: currentDate.value,
  locale: plLocale,
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
  resourceLabelContent: (arg: any) => {
    const el = document.createElement('div')
    el.className = 'resource-label'
    el.innerHTML = `
      <div class="resource-label__name">${arg.resource.title}</div>
      ${arg.resource.extendedProps.jobPosition ? `<div class="resource-label__role">${arg.resource.extendedProps.jobPosition}</div>` : ''}
    `
    return { domNodes: [el] }
  },
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
        <button
          v-for="doctor in schedule.doctors"
          :key="doctor.uuid"
          type="button"
          class="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors"
          :class="
            selectedDoctorUuids.has(doctor.uuid)
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent text-muted-foreground border-border hover:bg-accent'
          "
          @click="toggleDoctor(doctor.uuid)"
        >
          <BaseUserAvatar :user="doctor" size="size-4" class="shrink-0" />
          {{ doctor.first_name }} {{ doctor.last_name }}
        </button>
      </div>
    </div>

    <component :is="activeComponent" v-bind="activeProps" @close="close" />

    <div
      v-if="pending"
      class="flex flex-1 items-center justify-center text-muted-foreground text-sm"
    >
      Wczytywanie grafiku...
    </div>

    <div v-else class="flex-1 overflow-auto doctors-schedule">
      <ClientOnly>
        <FullCalendar ref="calendarRef" :options="calendarOptions" />
      </ClientOnly>
    </div>
  </Card>
</template>

<style>
.doctors-schedule .fc-theme-standard td,
.doctors-schedule .fc-theme-standard th {
  border-color: hsl(var(--border));
}

.doctors-schedule .fc-theme-standard .fc-scrollgrid {
  border-color: hsl(var(--border));
}

.doctors-schedule .fc-col-header-cell-cushion {
  color: hsl(var(--foreground));
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
}

.doctors-schedule .fc-daygrid-day-number {
  color: hsl(var(--foreground));
}

.doctors-schedule .resource-label {
  padding: 4px 2px;
  text-align: center;
}

.doctors-schedule .resource-label__name {
  font-size: 12px;
  font-weight: 500;
  color: hsl(var(--foreground));
}

.doctors-schedule .resource-label__role {
  font-size: 10px;
  color: hsl(var(--muted-foreground));
  margin-top: 1px;
}

.doctors-schedule .fc-timegrid-slot-label-cushion {
  font-size: 11px;
  color: hsl(var(--muted-foreground));
}

.doctors-schedule .fc-bg-event,
.doctors-schedule .fc-non-business {
  background: transparent;
}
</style>
