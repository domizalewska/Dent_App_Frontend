<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { AppointmentType, RoomType } from '~/types'
import {
  getLabelFromAppointmentStatus,
  getBadgeClassFromAppointmentStatus,
  getBorderClassFromAppointmentStatus,
  getBgClassFromAppointmentStatus,
} from '~/composables/appointments/useAppointmentStatusMeta'

interface Props {
  room: RoomType
  appointments: AppointmentType[]
  date: Date
  showAxis?: boolean
}

const props = withDefaults(defineProps<Props>(), { showAxis: false })
const emit = defineEmits<{ eventClick: [uuid: string] }>()


const events = computed(() =>
  props.appointments
    .filter((a) => a.room.uuid === props.room.uuid)
    .map((a) => ({
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
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:15:00',
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  height: 'auto',
  nowIndicator: true,
  eventBackgroundColor: 'transparent',
  eventBorderColor: 'transparent',
  events: events.value,
  eventClick: (info: any) => emit('eventClick', info.event.id),
  eventContent: (arg: any) => {
    const appt = arg.event.extendedProps as AppointmentType
    const patientName = `${appt.patient.first_name} ${appt.patient.last_name}`
    const doctorName = `${appt.doctor.first_name} ${appt.doctor.last_name}`
    const el = document.createElement('div')
    el.className = `room-event-card ${getBgClassFromAppointmentStatus(appt.status)} ${getBorderClassFromAppointmentStatus(appt.status)}`
    el.innerHTML = `
      <div class="room-event-card__top">
        <span class="room-event-card__time">${arg.timeText}</span>
        <span class="room-event-card__badge ${getBadgeClassFromAppointmentStatus(appt.status)}">${getLabelFromAppointmentStatus(appt.status)}</span>
      </div>
      <div class="room-event-card__patient">${patientName}</div>
      <div class="room-event-card__treatment">${appt.treatment.name}</div>
      <div class="room-event-card__doctor">${doctorName}</div>
    `
    return { domNodes: [el] }
  },
}))
</script>

<template>
  <div class="room-day-calendar" :class="{ 'room-day-calendar--no-axis': !showAxis }">
    <div class="room-day-calendar__header">{{ room.name }}</div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style scoped>
.room-day-calendar {
  --fc-event-text-color: hsl(var(--foreground));
}

.room-day-calendar__header {
  padding: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  background: hsl(var(--secondary));
  border-bottom: 1px solid hsl(var(--border));
}

.room-day-calendar--no-axis :deep(th.fc-timegrid-axis),
.room-day-calendar--no-axis :deep(td.fc-timegrid-axis),
.room-day-calendar--no-axis :deep(.fc-timegrid-slot-label),
.room-day-calendar--no-axis :deep(.fc-scrollgrid colgroup col:first-child) {
  display: none !important;
}

.room-day-calendar :deep(.fc-col-header),
.room-day-calendar :deep(.fc-scrollgrid-section-header) {
  display: none;
}

.room-day-calendar :deep(.fc-theme-standard td),
.room-day-calendar :deep(.fc-theme-standard th) {
  border-color: hsl(var(--border));
}

.room-day-calendar :deep(.fc-theme-standard .fc-scrollgrid) {
  border-color: hsl(var(--border));
}

.room-day-calendar :deep(.fc-timegrid-event) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: hsl(var(--foreground)) !important;
  cursor: pointer;
}

.room-day-calendar :deep(.fc-event-main) {
  padding: 0;
}

.room-day-calendar :deep(.room-event-card) {
  border-left-width: 3px;
  border-left-style: solid;
  border-radius: 6px;
  padding: 4px 6px;
  height: 100%;
  overflow: hidden;
}

.room-day-calendar :deep(.room-event-card__top) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.room-day-calendar :deep(.room-event-card__time) {
  font-size: 11px;
  font-weight: 600;
}

.room-day-calendar :deep(.room-event-card__badge) {
  font-size: 9px;
  padding: 1px 6px;
  border-radius: 999px;
}

.room-day-calendar :deep(.room-event-card__patient) {
  font-size: 12px;
  font-weight: 600;
}

.room-day-calendar :deep(.room-event-card__treatment),
.room-day-calendar :deep(.room-event-card__doctor) {
  font-size: 11px;
  color: hsl(var(--muted-foreground));
}
</style>
