<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import type { EventClickArg } from '@fullcalendar/core'
import { useDialog } from '~/composables/useDialog.ts'
import { useSchedule } from '~/composables/schedule/useSchedule'
import type { ScheduleEntryKind } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik')

const { open, close, activeProps, activeComponent } = useDialog()
const { entries, deleteEntry } = useSchedule()

const calendarTitle = ref('')
const currentView = ref('timeGridWeek')

const ENTRY_STYLES: Record<ScheduleEntryKind, { backgroundColor: string; borderColor: string }> = {
  work: { backgroundColor: '#6366f1', borderColor: '#4f46e5' },
  vacation: { backgroundColor: '#f59e0b', borderColor: '#d97706' },
  sick_leave: { backgroundColor: '#ef4444', borderColor: '#dc2626' },
}

const calendarEvents = computed(() =>
  entries.value.map((e) => ({
    id: e.uuid,
    title: e.kind === 'work' ? 'Praca' : e.kind === 'vacation' ? 'Urlop' : 'L4',
    start: e.start,
    end: e.end,
    allDay: e.kind !== 'work',
    extendedProps: { kind: e.kind, notes: e.notes },
    ...ENTRY_STYLES[e.kind],
  })),
)

function onEventClick(info: EventClickArg) {
  const kind = info.event.extendedProps.kind as ScheduleEntryKind
  if (confirm(`Usunąć wpis "${info.event.title}"?`)) {
    deleteEntry(info.event.id)
  }
}

const calendarRef = ref()

function handlePrev() {
  calendarRef.value.getApi().prev()
}
function handleNext() {
  calendarRef.value.getApi().next()
}
function handleToday() {
  calendarRef.value.getApi().today()
}
function handleWeek() {
  calendarRef.value.getApi().changeView('timeGridWeek')
}
function handleMonth() {
  calendarRef.value.getApi().changeView('dayGridMonth')
}

const options = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locale: plLocale,
  allDaySlot: true,
  editable: false,
  selectable: true,
  selectMirror: true,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  dayHeaderFormat: { weekday: 'short', day: 'numeric' },
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  datesSet: (info: { view: { title: string; type: string } }) => {
    calendarTitle.value = info.view.title
    currentView.value = info.view.type
  },
  headerToolbar: false,
  select: (info: { startStr: string; endStr: string; allDay: boolean }) => {
    if (info.allDay) {
      openAdd({
        kind: 'vacation',
        date_from: info.startStr,
        date_to: info.startStr,
      })
    } else {
      openAdd({
        kind: 'work',
        date: info.startStr.slice(0, 10),
        start_time: info.startStr.slice(11, 16),
        end_time: info.endStr.slice(11, 16),
      })
    }
  },
  eventClick: onEventClick,
  events: calendarEvents.value,
}))
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <component :is="activeComponent" v-bind="activeProps" @close="close" />
    <ScheduleLegend />
    <div class="fc-wrapper flex-1">
      <ClientOnly>
        <div class="flex">
          <ScheduleHeader
            :current-title="calendarTitle"
            :current-view="currentView"
            @prev="handlePrev"
            @next="handleNext"
            @today="handleToday"
            @week="handleWeek"
            @month="handleMonth"
          />
        </div>
        <FullCalendar ref="calendarRef" :options="options" />
      </ClientOnly>
    </div>
  </div>
</template>
