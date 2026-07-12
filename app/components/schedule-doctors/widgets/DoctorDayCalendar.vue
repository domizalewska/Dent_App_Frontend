<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { AppointmentType, User } from '~/types'
import { useColors } from '@/composables/colors/useColors'

interface Props {
  doctor: User
  appointments: AppointmentType[]
  date: Date
  showAxis?: boolean
}

const props = withDefaults(defineProps<Props>(), { showAxis: false })
const emit = defineEmits<{ appointmentClick: [uuid: string] }>()

const { getColorFromString } = useColors()

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
}))
</script>

<template>
  <div
    class="overflow-hidden rounded-lg border border-border"
    :class="{ '[&_.fc-timegrid-axis]:hidden [&_.fc-timegrid-slot-label]:hidden': !showAxis }"
  >
    <div class="border-b border-border bg-secondary px-2 py-2.5 text-center">
      <div class="text-sm font-medium text-foreground">
        {{ doctor.first_name }} {{ doctor.last_name }}
      </div>
      <div class="text-[10px] text-muted-foreground">
        {{ doctor.job_position?.name }}
      </div>
    </div>

    <FullCalendar :key="date.toISOString()" :options="calendarOptions">
      <template #eventContent="arg">
        <div
          class="h-full overflow-hidden rounded-md bg-[var(--patient-color)] p-1.5"
          :style="{ '--patient-color': getColorFromString(arg.event.extendedProps.patient.uuid) }"
        >
          <div class="text-[11px] font-semibold text-white">
            {{ arg.timeText }}
          </div>
          <div class="text-xs font-semibold text-white">
            {{ arg.event.extendedProps.patient.first_name }}
            {{ arg.event.extendedProps.patient.last_name }}
          </div>
          <div class="text-[11px] text-white/80">
            {{ arg.event.extendedProps.treatment.name }}
          </div>
        </div>
      </template>
    </FullCalendar>
  </div>
</template>
