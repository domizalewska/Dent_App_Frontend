<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { AppointmentType } from '~/types'
import {
  getLabelFromAppointmentStatus,
  getBadgeClassFromAppointmentStatus,
  getBorderClassFromAppointmentStatus,
  getBgClassFromAppointmentStatus,
} from '~/composables/appointments/useAppointmentStatusMeta'
import { useColors } from '~/composables/colors/useColors'

interface Props {
  title: string
  subtitle?: string
  appointments: AppointmentType[]
  date: Date
  showAxis?: boolean
  colorBy?: 'status' | 'patient'
}

const props = withDefaults(defineProps<Props>(), { showAxis: false, colorBy: 'status' })
const emit = defineEmits<{ appointmentClick: [uuid: string] }>()

const { getColorFromString, getColorWithAlpha } = useColors()

const events = computed(() =>
  props.appointments.map((a) => ({
    id: a.uuid,
    start: a.start_date,
    end: a.end_date,
    extendedProps: a,
  })),
)

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: 'timeGridDay',
  initialDate: props.date,
  headerToolbar: false,
  allDaySlot: false,
  slotMinTime: '08:00:00',
  slotMaxTime: '18:00:00',
  slotDuration: '00:15:00',
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  height: 'auto',
  nowIndicator: true,
  eventBackgroundColor: 'transparent',
  eventBorderColor: 'transparent',
  events: events.value,
  eventClick: (info: any) => emit('appointmentClick', info.event.id),
  eventContent: (arg: any) => {
    const appt = arg.event.extendedProps as AppointmentType
    const patientName = `${appt.patient.first_name} ${appt.patient.last_name}`
    const doctorName = `${appt.doctor.first_name} ${appt.doctor.last_name}`
    const el = document.createElement('div')
    if (props.colorBy === 'patient') {
      el.className = 'appt-event-card appt-event-card--patient'
      el.style.setProperty('--patient-color', getColorFromString(appt.patient.uuid))
      el.style.setProperty('--patient-color-bg', getColorWithAlpha(appt.patient.uuid, 0.1))
    } else {
      el.className = `appt-event-card ${getBgClassFromAppointmentStatus(appt.status)} ${getBorderClassFromAppointmentStatus(appt.status)}`
    }
    el.innerHTML = `
      <div class="appt-event-card__top">
        <span class="appt-event-card__time">${arg.timeText}</span>
        <span class="appt-event-card__badge ${getBadgeClassFromAppointmentStatus(appt.status)}">${getLabelFromAppointmentStatus(appt.status)}</span>
      </div>
      <div class="appt-event-card__patient">${patientName}</div>
      <div class="appt-event-card__treatment">${appt.treatment.name}</div>
      <div class="appt-event-card__doctor">${doctorName}</div>
    `
    return { domNodes: [el] }
  },
}))
</script>

<template>
  <div class="appt-day-cal" :class="{ 'appt-day-cal--no-axis': !showAxis }">
    <div class="appt-day-cal__header">
      <div class="appt-day-cal__title">{{ title }}</div>
      <div v-if="subtitle" class="appt-day-cal__subtitle">{{ subtitle }}</div>
    </div>
    <FullCalendar :key="date.toISOString()" :options="calendarOptions" />
  </div>
</template>

<style scoped>
.appt-day-cal__header {
  padding: 10px;
  text-align: center;
  background: hsl(var(--secondary));
  border-bottom: 1px solid hsl(var(--border));
}

.appt-day-cal__title {
  font-size: 13px;
  font-weight: 500;
}

.appt-day-cal__subtitle {
  font-size: 10px;
  color: hsl(var(--muted-foreground));
  margin-top: 2px;
}

.appt-day-cal--no-axis :deep(th.fc-timegrid-axis),
.appt-day-cal--no-axis :deep(td.fc-timegrid-axis),
.appt-day-cal--no-axis :deep(.fc-timegrid-slot-label),
.appt-day-cal--no-axis :deep(.fc-scrollgrid colgroup col:first-child) {
  display: none !important;
}

.appt-day-cal :deep(.fc-col-header),
.appt-day-cal :deep(.fc-scrollgrid-section-header) {
  display: none;
}

.appt-day-cal :deep(.fc-theme-standard td),
.appt-day-cal :deep(.fc-theme-standard th) {
  border-color: hsl(var(--border));
}

.appt-day-cal :deep(.fc-theme-standard .fc-scrollgrid) {
  border-color: hsl(var(--border));
}

.appt-day-cal :deep(.fc-timegrid-event) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: hsl(var(--foreground)) !important;
  cursor: pointer;
}

.appt-day-cal :deep(.fc-event-main) {
  padding: 0;
}

.appt-day-cal :deep(.appt-event-card) {
  border-left-width: 3px;
  border-left-style: solid;
  border-radius: 6px;
  padding: 4px 6px;
  height: 100%;
  overflow: hidden;
}

.appt-day-cal :deep(.appt-event-card__top) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.appt-day-cal :deep(.appt-event-card__time) {
  font-size: 11px;
  font-weight: 600;
}

.appt-day-cal :deep(.appt-event-card__badge) {
  font-size: 9px;
  padding: 1px 6px;
  border-radius: 999px;
}

.appt-day-cal :deep(.appt-event-card__patient) {
  font-size: 12px;
  font-weight: 600;
}

.appt-day-cal :deep(.appt-event-card__treatment),
.appt-day-cal :deep(.appt-event-card__doctor) {
  font-size: 11px;
  color: hsl(var(--muted-foreground));
}

.appt-day-cal :deep(.appt-event-card--patient) {
  background: var(--patient-color-bg);
  border-left-color: var(--patient-color);
}
</style>
