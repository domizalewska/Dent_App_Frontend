<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import type { EventClickArg, EventDropArg } from '@fullcalendar/core'
import { useDialog } from '~/composables/useDialog.ts'
import { useSchedule } from '~/composables/schedule/useSchedule'
import ScheduleEventDialog from '~/components/schedule/dialog/ScheduleEventDialog.vue'
import type { ScheduleEvent } from '~/types'
import { CalendarType } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik')

const { open, close, activeProps, activeComponent } = useDialog()
const { events, updateEvent } = useSchedule()

const calendarTitle = ref('')
const currentView = ref('timeGridWeek')

const calendarEvents = computed(() =>
  events.value.map((e) => {
    const isWork = e.type === CalendarType.WORK
    return {
      id: e.uuid,
      start: isWork ? `${e.date}T${e.start_time}` : e.date_from,
      end: isWork ? `${e.date}T${e.end_time}` : e.date_to,
      allDay: !isWork,
      extendedProps: { source: e },
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }
  }),
)

function openAdd() {
  open(ScheduleEventDialog, {})
}

function onEventClick(info: EventClickArg) {
  const { source } = info.event.extendedProps as { source: ScheduleEvent }
  open(ScheduleEventDialog, { scheduleEvent: source })
}

function onEventDrop(info: EventDropArg) {
  const { source } = info.event.extendedProps as { source: ScheduleEvent }
  const isWork = source.type === CalendarType.WORK
  updateEvent(source.uuid, {
    ...source,
    ...(isWork
      ? {
          date: info.event.startStr.slice(0, 10),
          start_time: info.event.startStr.slice(11, 16),
          end_time: info.event.endStr.slice(11, 16),
        }
      : {
          date_from: info.event.startStr.slice(0, 10),
          date_to: info.event.endStr.slice(0, 10),
        }),
  })
}

const calendarRef = ref()
const calendarWrapper = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new ResizeObserver(() => {
    calendarRef.value?.getApi()?.updateSize()
  })
  if (calendarWrapper.value) observer.observe(calendarWrapper.value)
  onUnmounted(() => observer.disconnect())
})

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
  allDayText: '',
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
  select: openAdd,
  eventClick: onEventClick,
  eventDrop: onEventDrop,
  events: calendarEvents.value,
}))
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <component :is="activeComponent" v-bind="activeProps" @close="close" />
    <ScheduleLegend />
    <div ref="calendarWrapper" class="fc-wrapper flex-1">
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
