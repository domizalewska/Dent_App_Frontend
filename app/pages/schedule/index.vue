<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import type { EventClickArg, EventDropArg } from '@fullcalendar/core'
import { useDialog } from '~/composables/useDialog.ts'
import { useSchedule } from '~/composables/schedule/useSchedule'
import AddScheduleEntryDialog from '~/components/schedule/dialog/AddScheduleEntryDialog.vue'
import type { ScheduleCalendarEvent, ScheduleEntryFormValues } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik')

const { open, close, activeProps, activeComponent } = useDialog()
const { entries, updateEntry } = useSchedule()

const calendarTitle = ref('')
const currentView = ref('timeGridWeek')

const calendarEvents = computed(() =>
  entries.value.map((e) => ({
    id: e.uuid,
    start: e.start,
    end: e.end,
    allDay: e.kind !== 'work',
    extendedProps: { kind: e.kind, source: e },
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  })),
)

function openAdd(prefill?: Partial<ScheduleEntryFormValues>) {
  open(AddScheduleEntryDialog, prefill ? { prefill } : {})
}

function onEventClick(info: EventClickArg) {
  const { id, extendedProps } = info.event
  const { source } = extendedProps as ScheduleCalendarEvent['extendedProps']
  open(AddScheduleEntryDialog, { entry: source })
}

function onEventDrop(info: EventDropArg) {
  const { extendedProps } = info.event
  const { source } = extendedProps as ScheduleCalendarEvent['extendedProps']
  updateEntry(source.uuid, {
    kind: source.kind,
    start: info.event.startStr,
    end: info.event.endStr,
    notes: source.notes,
  })
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
  editable: true,
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
  eventDrop: onEventDrop,
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
        <FullCalendar ref="calendarRef" :options="options">
          <template #eventContent="{ event, timeText }">
            <ScheduleEventContent :entry="event.extendedProps.source" :time-text="timeText" />
          </template>
        </FullCalendar>
      </ClientOnly>
    </div>
  </div>
</template>
