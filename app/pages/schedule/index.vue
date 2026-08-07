<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import type { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core'
import { toast } from 'vue-sonner'
import { toastErrorStyle } from '~/utils/toast'
import { useDialog } from '~/composables/useDialog.ts'
import { useSchedule } from '~/composables/schedule/useSchedule'
import { useDayOfWeek } from '~/composables/schedule/useDayOfWeek'
import ScheduleEventDialog from '~/components/schedule/dialog/ScheduleEventDialog.vue'
import type { ScheduleEvent, ScheduleRule } from '~/types'
import { CalendarType, DayOfWeek } from '~/types'
import { ScheduleRuleEndpoints, scheduleRulesKey } from '~/features/schedule'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik')

const { open, close, activeProps, activeComponent } = useDialog()
const { events, updateEvent } = useSchedule()
const { getDayNumber } = useDayOfWeek()

const { data: rulesData } = useAPI<{ data: ScheduleRule[] }>(ScheduleRuleEndpoints.BASE, {
  key: scheduleRulesKey,
  default: () => ({
    data: [
      { uuid: 'mock-rule-1', day: DayOfWeek.Monday, start_time: '08:00', end_time: '16:00' },
      { uuid: 'mock-rule-2', day: DayOfWeek.Wednesday, start_time: '10:00', end_time: '18:00' },
      { uuid: 'mock-rule-3', day: DayOfWeek.Friday, start_time: '09:00', end_time: '15:00' },
    ] as ScheduleRule[],
  }),
})
const rules = computed(() => rulesData.value?.data ?? [])

const calendarTitle = ref('')
const currentView = ref('timeGridWeek')

const calendarEvents = computed(() => [
  ...events.value.map((e) => {
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
  ...rules.value.map((rule) => ({
    id: `rule-${rule.uuid}`,
    daysOfWeek: [getDayNumber(rule.day)],
    startTime: rule.start_time,
    endTime: rule.end_time,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    extendedProps: { source: { ...rule, type: CalendarType.WORK }, isRule: true },
  })),
])

function isDateBlocked(date: string): boolean {
  return events.value.some(
    (e) =>
      (e.type === CalendarType.VACATION || e.type === CalendarType.SICK_LEAVE) &&
      date >= e.date_from &&
      date <= e.date_to,
  )
}

function openAdd(info: DateSelectArg) {
  const date = info.startStr.slice(0, 10)
  if (isDateBlocked(date)) {
    toast('Nie można dodać wpisu — dzień jest zajęty przez urlop lub L4', {
      style: toastErrorStyle,
    })
    return
  }
  open(ScheduleEventDialog, {})
}

function onEventClick(info: EventClickArg) {
  if (info.event.id.startsWith('rule-')) {
    const date = info.event.startStr.slice(0, 10)
    if (isDateBlocked(date)) {
      toast('Nie można dodać wpisu — dzień jest zajęty przez urlop lub L4', {
        style: toastErrorStyle,
      })
      return
    }
    open(ScheduleEventDialog, {
      initialValues: {
        date,
        start_time: info.event.startStr.slice(11, 16),
        end_time: info.event.endStr.slice(11, 16),
      } as ScheduleEvent,
    })
    return
  }
  const { source } = info.event.extendedProps as { source: ScheduleEvent }
  open(ScheduleEventDialog, { scheduleEvent: source })
}

function onEventDrop(info: EventDropArg) {
  const date = info.event.startStr.slice(0, 10)
  if (isDateBlocked(date)) {
    info.revert()
    toast('Nie można przenieść wpisu — dzień jest zajęty przez urlop lub L4', {
      style: toastErrorStyle,
    })
    return
  }
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
  allDayText: 'Cały dzień',
  editable: true,
  selectable: true,
  selectMirror: true,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  eventMaxStack: 1,
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
          <template #dayHeaderContent="{ date, isToday }">
            <div class="flex flex-col items-center gap-0.5 pt-1.5 pb-0.5">
              <span class="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {{ date.toLocaleDateString('pl', { weekday: 'short' }) }}
              </span>
              <span
                :class="[
                  'flex size-7 items-center justify-center rounded-full text-sm font-semibold',
                  isToday ? 'bg-primary text-primary-foreground' : 'text-foreground',
                ]"
              >
                {{ date.getDate() }}
              </span>
            </div>
          </template>
          <template #eventContent="{ event, timeText }">
            <ScheduleEventContent
              :entry="event.extendedProps.source"
              :time-text="timeText"
              :color-class="
                event.extendedProps.isRule ? 'bg-emerald-600 border-emerald-700' : undefined
              "
            />
          </template>
        </FullCalendar>
      </ClientOnly>
    </div>
  </div>
</template>
